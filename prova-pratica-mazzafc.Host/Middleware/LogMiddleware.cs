using Newtonsoft.Json;
using System.Text;
using prova_pratica_mazzafc.Util.ExtensionsMethods;
using prova_pratica_mazzafc.Models.Response.Log;
using prova_pratica_mazzafc.Repository;
using prova_pratica_mazzafc.Models.Model;

namespace prova_pratica_mazzafc.Server.Middleware
{
    public class LogMiddleware(RequestDelegate _next)
    {
        public async Task InvokeAsync(HttpContext context, IServiceProvider serviceProvider, IServiceScopeFactory _serviceScopeFactory)
        {
            var skips = new List<string> { "/swagger", "/.ico", "/assets", };
            var startTime = DateTime.UtcNow;
            var endpoint = $"{context.Request.Method} {context.Request.Path}";
            var ticket = Guid.NewGuid().ToString();
            StringBuilder builder = new();

            var info = await GetInfo(context.Request);
            if (info != null)
            {
                if (!string.IsNullOrEmpty(info.QueryString))
                    builder.Append($"QueryString: {info.QueryString}\n");
                if (!string.IsNullOrEmpty(info.Body))
                    builder.Append($"Body: {info.Body}\n");
            }

            var request = builder.ToString();
            var originalBodyStream = context.Response.Body;

            using (var responseBody = new MemoryStream())
            {
                context.Response.Body = responseBody;

                try
                {
                    await _next(context);
                    var response = await FormatResponse(context.Response);

                    if (context.Response.StatusCode >= 400)
                    {

                        var error = new ErrorResponse();
                        var message = $"Desculpe, mas algo deu errado.\n Por favor, tente novamente mais tarde.\n Ticket: {ticket}\n Erro: {response}";
                        if (context.Response.StatusCode == 401)
                        {
                            message = $"Desculpe, mas você não está autorizado.\n Realiza o login novamente.\n Ticket: {ticket}";
                            context.Response.StatusCode = 401;
                        }
                        else
                        {
                            context.Response.StatusCode = 500;
                        }
                        await InsertLogAsync(context, endpoint, startTime, info?.Path ?? "", request, message, ticket);

                        error.AddMessage(new(message, ticket));

                        var errorJson = JsonConvert.SerializeObject(message);
                        var errorBytes = Encoding.UTF8.GetBytes(errorJson);

                        await context.Response.WriteAsJsonAsync(error);
                        await originalBodyStream.WriteAsync(errorBytes, 0, errorBytes.Length);
                    }
                    else
                    {
                        responseBody.Seek(0, SeekOrigin.Begin);
                    }

                    await responseBody.CopyToAsync(originalBodyStream);
                }
                catch (Exception ex)
                {
                    var error = new ErrorResponse();

                    context.Response.StatusCode = 500;

                    error.AddMessage(new(GetMessageErro(ticket, ex.Message, ex.InnerException?.Message ?? ""), ticket));

                    if (!skips.Any(s => endpoint.Contains(s)))
                    {
                        await InsertLogAsync(context, endpoint, startTime, info?.Path ?? "", request, JsonConvert.SerializeObject(ex), ticket);
                    }

                    var errorJson = JsonConvert.SerializeObject(error);
                    var errorBytes = Encoding.UTF8.GetBytes(errorJson);

                    await context.Response.WriteAsJsonAsync(error);
                    await originalBodyStream.WriteAsync(errorBytes, 0, errorBytes.Length);
                }
                finally
                {
                    context.Response.Body = originalBodyStream;
                }
            }
        }

        public async Task<RequestInfo> GetInfo(HttpRequest request)
        {
            try
            {
                string body = "";
                request.EnableBuffering();
                using (var reader = new StreamReader(request.Body, Encoding.UTF8, true, 1024, true))
                {
                    body = await reader.ReadToEndAsync();
                }
                request.Body.Position = 0;

                var requestInfo = new RequestInfo();
                requestInfo.Method = request.Method;
                requestInfo.Host = request.Host.ToString();
                requestInfo.Path = request.Path;
                requestInfo.QueryString = request.QueryString.ToString();
                requestInfo.Body = body;

                return requestInfo;
            }
            catch
            {
                throw;
            }
        }

        private string GetMessageErro(string ticket, string exMessage, string exInnerException) =>
            $"Desculpe, mas algo deu errado.\n Por favor, tente novamente mais tarde.\n Ticket: {ticket}\n Erro: {exMessage} \n InnerException: {exInnerException}";

        private async Task InsertLogAsync(HttpContext context, string endpoint, DateTime startTime,
            string path, string request, string message, string ticket)
        {
            using var contextDb = SqlContext.GetContextConnection();

            await contextDb.LogError.AddAsync(new Repository.Map.LogError
            {
                Endpoint = endpoint,
                DtRequest = startTime,
                DtResponse = DateTime.Now,
                Method = path,
                Request = request,
                Response = message,
                HttpCod = context.Response.StatusCode,
                Ticket = new Guid(ticket),
            });

            await contextDb.SaveChangesAsync();
        }

        private async Task<string> FormatResponse(HttpResponse response)
        {
            response.Body.Seek(0, SeekOrigin.Begin);
            var text = await new StreamReader(response.Body).ReadToEndAsync();
            response.Body.Seek(0, SeekOrigin.Begin);

            return $"{text}";
        }
    }
}

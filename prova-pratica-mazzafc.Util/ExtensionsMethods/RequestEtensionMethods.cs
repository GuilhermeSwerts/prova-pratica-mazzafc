using Microsoft.AspNetCore.Http;
using prova_pratica_mazzafc.Models.Model;
using System.Text;

namespace prova_pratica_mazzafc.Util.ExtensionsMethods
{
    public static class RequestEtensionMethods
    {
        public static async Task<RequestInfo> GetInfo(this HttpRequest request)
        {
            try
            {
                string body = "";
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
    }
}

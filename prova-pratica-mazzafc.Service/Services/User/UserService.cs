using prova_pratica_mazzafc.Models.Request.User;
using prova_pratica_mazzafc.Models.Response.Order;
using prova_pratica_mazzafc.Models.Response;
using prova_pratica_mazzafc.Repository;
using prova_pratica_mazzafc.Repository.Map;
using prova_pratica_mazzafc.Util.ExtensionsMethods;
using prova_pratica_mazzafc.Util.Cript;
using prova_pratica_mazzafc.Util.Auth;
using prova_pratica_mazzafc.Service.Interfaces.User;
using prova_pratica_mazzafc.Models.Response.User;

namespace prova_pratica_mazzafc.Service.Services.User
{
    public class UserService(SqlContext _sqlContext) : IUserService
    {
        public ApiResponse<UserLoginDto> UserLogin(UserLoginRequest request)
        {
			try
			{
                    var user = _sqlContext.GetValue<UserMap>(x=> x.Email == request.Email);

                if(user == null)
                {
                    return new ApiResponse<UserLoginDto>
                    {
                        RequestSuccess = false,
                        Erro = new ApiErro
                        {
                            Exception = "Usuário não encontrado",
                            Message = "Email não encontrado"
                        },
                        ResponseData = null
                    };
                }

                if(request.Password == CriptUtil.Decrypt(user.Password))
                {
                    return new ApiResponse<UserLoginDto>
                    {
                        RequestSuccess = true,
                        ResponseData = new()
                        {
                            Name = user.Name,
                            Token = Authentication.GenerateToken(user.Id, user.Name)
                        }
                    };
                }

                return new ApiResponse<UserLoginDto>
                {
                    RequestSuccess = false,
                    Erro = new ApiErro
                    {
                        Exception = "Senha inválida",
                        Message = "Senha inválida"
                    },
                    ResponseData = null
                };
            }
			catch (Exception ex)
			{
                return new ApiResponse<UserLoginDto>
                {
                    RequestSuccess = false,
                    Erro = new ApiErro
                    {
                        Exception = ex.Message,
                        Message = "Erro ao buscar pedidos"
                    },
                    ResponseData = null
                };
            }
        }
    }
}

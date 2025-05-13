using prova_pratica_mazzafc.Models.Request.User;
using prova_pratica_mazzafc.Models.Response;
using prova_pratica_mazzafc.Models.Response.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace prova_pratica_mazzafc.Service.Interfaces.User
{
    public interface IUserService
    {
        ApiResponse<UserLoginDto> UserLogin(UserLoginRequest request);
    }
}

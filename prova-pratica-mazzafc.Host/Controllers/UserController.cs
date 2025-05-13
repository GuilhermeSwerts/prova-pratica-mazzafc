using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using prova_pratica_mazzafc.Models.Request.User;
using prova_pratica_mazzafc.Service.Interfaces.User;

namespace prova_pratica_mazzafc.Server.Controllers
{
    [Route("api/[controller]")]
    public class UserController(IUserService _userService): JwtController
    {
        [AllowAnonymous]
        [HttpPost]
        [Route("login")]
        public IActionResult GetLogin([FromBody] UserLoginRequest userLogin)
        {
            try
            {
                var result = _userService.UserLogin(userLogin);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}

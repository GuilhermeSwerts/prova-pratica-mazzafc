using Microsoft.AspNetCore.Mvc;
using prova_pratica_mazzafc.Util.Auth;

namespace prova_pratica_mazzafc.Server.Controllers
{
    [Route("api/[controller]")]
    public class HomeController : Controller
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(Authentication.GenerateToken(1));
        }
    }
}

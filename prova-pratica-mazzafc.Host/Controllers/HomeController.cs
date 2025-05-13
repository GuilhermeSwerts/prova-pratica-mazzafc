using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using prova_pratica_mazzafc.Util.AppSetings;
using prova_pratica_mazzafc.Util.Auth;

namespace prova_pratica_mazzafc.Server.Controllers
{
    [Route("api")]
    public class HomeController : Controller
    {
        [HttpGet]
        public IActionResult Get()
        {
            var apiName = ConfigUtil.GetByKey("Api:Name");
            var apiEnv = ConfigUtil.GetByKey("Api:Env");
            var apiVersion = ConfigUtil.GetByKey("Api:Version");

            return Ok($"Api {apiName} rodando no ambiente de {apiEnv} com a versão {apiVersion}");
        }
    }
}

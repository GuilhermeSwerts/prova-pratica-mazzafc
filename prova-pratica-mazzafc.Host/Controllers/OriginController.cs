using Microsoft.AspNetCore.Mvc;
using prova_pratica_mazzafc.Service.Interfaces.Origin;

namespace prova_pratica_mazzafc.Server.Controllers
{
    [Route("api/[controller]")]
    public class OriginController(IOriginService _originSerivce) : JwtController
    {
        [HttpGet]
        public ActionResult AllOrigins()
        {
            try
            {
                var origins = _originSerivce.AllOrigins();
                return Ok(origins);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}

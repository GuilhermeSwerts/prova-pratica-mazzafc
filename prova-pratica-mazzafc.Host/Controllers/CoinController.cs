using Microsoft.AspNetCore.Mvc;
using prova_pratica_mazzafc.Service.Interfaces.Coin;

namespace prova_pratica_mazzafc.Server.Controllers
{
    [Route("api/[controller]")]
    public class CoinController(ICoinService _coinService) : JwtController
    {
        [HttpGet]
        public ActionResult AllCoins()
        {
            try
            {
                var coins = _coinService.AllCoins();
                return Ok(coins);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}

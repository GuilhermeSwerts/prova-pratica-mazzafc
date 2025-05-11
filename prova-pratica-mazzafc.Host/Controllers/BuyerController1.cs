using Microsoft.AspNetCore.Mvc;
using prova_pratica_mazzafc.Models.Request.Buyer;
using prova_pratica_mazzafc.Models.Request.Meat;
using prova_pratica_mazzafc.Service.Interfaces.Buyer;

namespace prova_pratica_mazzafc.Server.Controllers
{
    [Route("api/[controller]")]
    public class BuyerController(IBuyerService _buyerService) : JwtController
    {

        [HttpGet]
        public IActionResult AllMeats()
        {
            try
            {
                var result = _buyerService.AllBuyers();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public IActionResult NewMeat([FromBody] BuyerRequest request)
        {
            try
            {
                var result = _buyerService.NewBuyer(request, UserId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("{identifier}")]
        public IActionResult NewMeat([FromRoute] Guid identifier)
        {
            try
            {
                var result = _buyerService.BuyerByIdentifier(identifier);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Route("{identifier}")]
        public IActionResult ModifyMeat([FromBody] BuyerRequest request, [FromRoute] Guid identifier)
        {
            try
            {
                request.Identifier = identifier;
                var result = _buyerService.ModifyBuyer(request, UserId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route("{identifier}")]
        public IActionResult DeleteMeat([FromRoute] Guid identifier)
        {
            try
            {
                var result = _buyerService.DeleteBuyer(identifier, UserId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}

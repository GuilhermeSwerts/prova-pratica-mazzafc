using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using prova_pratica_mazzafc.Models.Request.Buyer;
using prova_pratica_mazzafc.Models.Request.Filter;
using prova_pratica_mazzafc.Models.Request.Meat;
using prova_pratica_mazzafc.Service.Interfaces.Buyer;

namespace prova_pratica_mazzafc.Server.Controllers
{
    [Route("api/[controller]")]
    public class BuyerController(IBuyerService _buyerService) : JwtController
    {

        [HttpGet]
        public IActionResult AllBuyer([FromQuery] string filters = "[]")
        {
            try
            {
                var paramsFilter = new List<FilterRequest>();

                if (!string.IsNullOrEmpty(filters))
                {
                    paramsFilter = JsonConvert.DeserializeObject<List<FilterRequest>>(filters)
                        ?? [];
                }

                var result = _buyerService.AllBuyers(paramsFilter);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public IActionResult NewBuyer([FromBody] BuyerRequest request)
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
        public IActionResult NewBuyer([FromRoute] Guid identifier)
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
        public IActionResult ModifyBuyer([FromBody] BuyerRequest request, [FromRoute] Guid identifier)
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

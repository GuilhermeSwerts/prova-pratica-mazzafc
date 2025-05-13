using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using prova_pratica_mazzafc.Models.Request.Filter;
using prova_pratica_mazzafc.Models.Request.Meat;
using prova_pratica_mazzafc.Service.Interfaces.Meat;

namespace prova_pratica_mazzafc.Server.Controllers
{
    [Route("api/[controller]")]
    public class MeatController(IMeatService _meatService) : JwtController
    {
        [HttpGet]
        public IActionResult AllMeats([FromQuery] string filters = "[]")
        {
            try
            {
                var paramsFilter = new List<FilterRequest>();

                if(!string.IsNullOrEmpty(filters))
                {
                    paramsFilter = JsonConvert.DeserializeObject<List<FilterRequest>>(filters) 
                        ?? [];
                }

                var result = _meatService.AllMeats(paramsFilter);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public IActionResult NewMeat([FromBody] MeatRequest request)
        {
            try
            {
                var result = _meatService.NewMeat(request, UserId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("{identifier}")]
        public IActionResult MeatByIdentifier([FromRoute] Guid identifier)
        {
            try
            {
                var result = _meatService.MeatByIdentifier(identifier);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Route("{identifier}")]
        public IActionResult ModifyMeat([FromBody] MeatRequest request, [FromRoute] Guid identifier)
            {
            try
            {
                request.Identifier = identifier;
                var result = _meatService.ModifyMeat(request, UserId);
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
                var result = _meatService.DeleteMeat(identifier, UserId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}

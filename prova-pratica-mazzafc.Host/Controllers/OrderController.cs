using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using prova_pratica_mazzafc.Models.Request.Buyer;
using prova_pratica_mazzafc.Models.Request.Filter;
using prova_pratica_mazzafc.Models.Request.Order;
using prova_pratica_mazzafc.Service.Interfaces.Buyer;
using prova_pratica_mazzafc.Service.Interfaces.Order;

namespace prova_pratica_mazzafc.Server.Controllers
{
    [Route("api/[controller]")]
    public class OrderController(IOrderService _orderService) : JwtController
    {
        [HttpGet]
        public IActionResult AllOrders([FromQuery] string filters)
        {
            try
            {
                var paramsFilter = new List<FilterRequest>();

                if (!string.IsNullOrEmpty(filters))
                {
                    paramsFilter = JsonConvert.DeserializeObject<List<FilterRequest>>(filters)
                        ?? [];
                }

                var result = _orderService.AllOrders(paramsFilter);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public IActionResult NewOrder([FromBody] OrderRequest request)
        {
            try
            {
                var result = _orderService.NewOrder(request, UserId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{identifier}")]
        public IActionResult OrderByIdentifier([FromRoute] Guid identifier)
        {
            try
            {
                var result = _orderService.OrderByIdentifier(identifier);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{identifier}")]
        public IActionResult ModifyOrder([FromBody] OrderRequest request, [FromRoute] Guid identifier)
        {
            try
            {
                request.Identifier = identifier;
                var result = _orderService.ModifyOrder(request, UserId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{identifier}")]
        public IActionResult DeleteOrder([FromRoute] Guid identifier)
        {
            try
            {
                var result = _orderService.DeleteOrder(identifier, UserId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }

}

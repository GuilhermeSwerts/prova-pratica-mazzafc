using prova_pratica_mazzafc.Models.Request.Filter;
using prova_pratica_mazzafc.Models.Request.Order;
using prova_pratica_mazzafc.Models.Response;
using prova_pratica_mazzafc.Models.Response.Order;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace prova_pratica_mazzafc.Service.Interfaces.Order
{
    public interface IOrderService
    {
        ApiResponse<List<OrderDto>> AllOrders(List<FilterRequest> filters);
        ApiResponse<OrderDto> OrderByIdentifier(Guid identifier);
        ApiResponse<bool> NewOrder(OrderRequest request, int userId);
        ApiResponse<bool> DeleteOrder(Guid identifier, int userId);
        ApiResponse<bool> ModifyOrder(OrderRequest request, int userId);
    }
}

using prova_pratica_mazzafc.Models.Request.Buyer;
using prova_pratica_mazzafc.Models.Response;
using prova_pratica_mazzafc.Models.Response.Buyer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace prova_pratica_mazzafc.Service.Interfaces.Buyer
{
    public interface IBuyerService
    {
        ApiResponse<List<BuyerDto>> AllBuyers();
        ApiResponse<BuyerDto> BuyerByIdentifier(Guid identifier);
        ApiResponse<bool> NewBuyer(BuyerRequest request, int userId);
        ApiResponse<bool> ModifyBuyer(BuyerRequest request, int userId);
        ApiResponse<bool> DeleteBuyer(Guid identifier, int userId);
    }
}

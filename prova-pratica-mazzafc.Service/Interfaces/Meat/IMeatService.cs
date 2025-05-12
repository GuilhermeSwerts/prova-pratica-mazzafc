using prova_pratica_mazzafc.Models.Response.Meat;
using prova_pratica_mazzafc.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using prova_pratica_mazzafc.Models.Request.Meat;
using prova_pratica_mazzafc.Models.Request.Filter;

namespace prova_pratica_mazzafc.Service.Interfaces.Meat
{
    public interface IMeatService
    {
        public ApiResponse<List<MeatDto>> AllMeats(List<FilterRequest> filters);
        public ApiResponse<bool> NewMeat(MeatRequest request, int userId);
        public ApiResponse<MeatDto> MeatByIdentifier(Guid identifier);
        public ApiResponse<bool> ModifyMeat(MeatRequest request, int userId);
        public ApiResponse<bool> DeleteMeat(Guid identifier, int userId);
    }
}

using prova_pratica_mazzafc.Models.Response;
using prova_pratica_mazzafc.Models.Response.Origin;
using prova_pratica_mazzafc.Repository.Map;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace prova_pratica_mazzafc.Service.Interfaces.Origin
{
    public interface IOriginService
    {
        ApiResponse<List<OriginDto>> AllOrigins();
    }
}

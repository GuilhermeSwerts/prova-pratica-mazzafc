using prova_pratica_mazzafc.Models.Response.Buyer;
using prova_pratica_mazzafc.Models.Response;
using prova_pratica_mazzafc.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using prova_pratica_mazzafc.Util.ExtensionsMethods;
using prova_pratica_mazzafc.Repository.Map;
using prova_pratica_mazzafc.Models.Response.Origin;
using prova_pratica_mazzafc.Service.Interfaces.Origin;

namespace prova_pratica_mazzafc.Service.Services.Origin
{
    public class OriginService(SqlContext _sqlContext) : IOriginService
    {
        public ApiResponse<List<OriginDto>> AllOrigins()
        {
            try
            {
                var origins = _sqlContext
                    .GetValues<OriginMap>(x => !x.HasDeleted)
                    .Select(x => new OriginDto
                    {
                        Id = x.Id,
                        Name = x.Description,
                        DtCreated = x.CreatedOn.ToString("dd/MM/yyyy hh:mm:ss"),
                    }).ToList();
                    
                return new ApiResponse<List<OriginDto>>
                {
                    RequestSuccess = true,
                    ResponseData = origins
                };
            }
            catch (Exception ex)
            {
                return new ApiResponse<List<OriginDto>>
                {
                    RequestSuccess = false,
                    Erro = new ApiErro
                    {
                        Exception = ex.Message,
                        Message = "Houve um erro ao buscar todos as origens"
                    },
                    ResponseData = []
                };
            }
        }
    }
}

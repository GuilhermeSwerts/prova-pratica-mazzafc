using prova_pratica_mazzafc.Models.Response.Origin;
using prova_pratica_mazzafc.Models.Response;
using prova_pratica_mazzafc.Repository.Map;
using prova_pratica_mazzafc.Repository;
using prova_pratica_mazzafc.Service.Interfaces.Coin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using prova_pratica_mazzafc.Util.ExtensionsMethods;
using prova_pratica_mazzafc.Models.Response.Coin;

namespace prova_pratica_mazzafc.Service.Services.Coin
{
    public class CoinService(SqlContext _sqlContext) : ICoinService
    {
        public ApiResponse<List<CoinDto>> AllCoins()
        {
            try
            {
                var origins = _sqlContext
                    .GetValues<TypeCoinMap>(x => !x.HasDeleted)
                    .Select(x => new CoinDto
                    {
                        Id = x.Id,
                        Name = x.Name,
                        Prefix = x.Prefix,
                        DtCreated = x.CreatedOn.ToString("dd/MM/yyyy hh:mm:ss"),
                        CreatedOn = DateTime.Parse(x.CreatedOn.ToString("yyyy-MM-dd")),
                    }).ToList();

                return new ApiResponse<List<CoinDto>>
                {
                    RequestSuccess = true,
                    ResponseData = origins
                };
            }
            catch (Exception ex)
            {
                return new ApiResponse<List<CoinDto>>
                {
                    RequestSuccess = false,
                    Erro = new ApiErro
                    {
                        Exception = ex.Message,
                        Message = "Houve um erro ao buscar todos as moedas"
                    },
                    ResponseData = []
                };
            }
        }
    }
}

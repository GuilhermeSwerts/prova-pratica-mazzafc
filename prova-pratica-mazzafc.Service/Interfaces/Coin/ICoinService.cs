using prova_pratica_mazzafc.Models.Response.Coin;
using prova_pratica_mazzafc.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace prova_pratica_mazzafc.Service.Interfaces.Coin
{
    public interface ICoinService
    {
        ApiResponse<List<CoinDto>> AllCoins();
    }
}

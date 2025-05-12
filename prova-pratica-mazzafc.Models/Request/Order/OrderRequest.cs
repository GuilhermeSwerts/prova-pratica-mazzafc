using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace prova_pratica_mazzafc.Models.Request.Order
{
    public class OrderRequest
    {
        public Guid? Identifier { get; set; }
        public int BuyerId { get; set; }
        public int TypeCoinId { get; set; }
        public List<OrderMeatOriginRequest> MeatOrigins { get; set; } = [];
    }

}

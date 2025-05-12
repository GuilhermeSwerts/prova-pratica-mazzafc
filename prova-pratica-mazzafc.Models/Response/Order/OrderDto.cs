using prova_pratica_mazzafc.Models.Response.Meat;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace prova_pratica_mazzafc.Models.Response.Order
{
    public class OrderDto
    {
        public string Identifier { get; set; }
        public int BuyerId { get; set; }
        public decimal Total { get; set; }
        public string BuyerName { get; set; }
        public string TypeCoin { get; set; }
        public string PrefixCoin { get; set; }
        public string DtRegister { get; set; }
        public List<MeatDto> Meats { get; set; }
    }

}

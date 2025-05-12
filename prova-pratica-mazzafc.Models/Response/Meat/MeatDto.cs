using prova_pratica_mazzafc.Models.Response.Origin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace prova_pratica_mazzafc.Models.Response.Meat
{
    public class MeatDto : DtoBase
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Origin { get; set; }
        public int OriginId { get; set; }
        public string Identifier { get; set; }
        public string DtRegister { get; set; }

        public int? Quantity { get; set; }
        public decimal? Price { get; set; }
    }
}

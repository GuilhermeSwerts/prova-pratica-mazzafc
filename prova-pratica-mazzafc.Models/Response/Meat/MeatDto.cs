using prova_pratica_mazzafc.Models.Response.Origin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace prova_pratica_mazzafc.Models.Response.Meat
{
    public class MeatDto
    {
        public string Name { get; set; }
        public string Origin { get; set; }
        public int OriginId { get; set; }
        public string Identifier { get; set; }
        public string DtRegister { get; set; }
    }
}

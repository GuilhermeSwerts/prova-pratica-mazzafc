using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace prova_pratica_mazzafc.Models.Response.Buyer
{
    public class BuyerDto
    {
        public string Identifier { get; set; }
        public string Name { get; set; }
        public string DocNumber { get; set; }
        public string DtRegister { get; set; }
        public string State { get; set; }
        public string City { get; set; }
    }
}

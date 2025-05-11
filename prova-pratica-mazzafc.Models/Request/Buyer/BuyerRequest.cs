using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace prova_pratica_mazzafc.Models.Request.Buyer
{
    public class BuyerRequest
    {
        public Guid? Identifier { get; set; }
        public string Name { get; set; }
        public string DocNumber { get; set; }
        public string Statae { get; set; }
        public string City { get; set; }
    }
}

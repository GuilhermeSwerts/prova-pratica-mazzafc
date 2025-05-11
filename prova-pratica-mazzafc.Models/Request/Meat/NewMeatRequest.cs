using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace prova_pratica_mazzafc.Models.Request.Meat
{
    public class MeatRequest
    {
        public Guid? Identifier { get; set; }
        public string Description { get; set; }
        public int Origin { get; set; }
    }
}

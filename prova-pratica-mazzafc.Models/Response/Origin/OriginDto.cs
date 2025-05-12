using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace prova_pratica_mazzafc.Models.Response.Origin
{
    public class OriginDto : DtoBase
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string DtCreated { get; set; }
    }
}

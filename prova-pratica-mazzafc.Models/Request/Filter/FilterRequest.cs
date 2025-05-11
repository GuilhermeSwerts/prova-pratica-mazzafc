using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static prova_pratica_mazzafc.Models.Enums.FilterEnum;

namespace prova_pratica_mazzafc.Models.Request.Filter
{
    public class FilterRequest
    {
        public string FieldKey { get; set; }
        public EFilterCondition Condition { get; set; }
        public string Comparison { get; set; }
    }
}

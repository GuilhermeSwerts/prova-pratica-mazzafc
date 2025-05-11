using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Diagnostics.Metrics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace prova_pratica_mazzafc.Models.Enums
{
    public class FilterEnum
    {
        public enum EFilterCondition
        {
            [Description("==")]
            Equals,
            [Description(">")]
            Greater_Than,
            [Description("<")]
            Less_Than,
            [Description(">=")]
            Greater_Than_Or_Equal_To,
            [Description("<=")]
            Less_Than_Or_Equal_To
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace prova_pratica_mazzafc.Util.ExtensionsMethods
{
    public static class DecimalExtensionMethods
    {
        public static string GetMaskCoin(this decimal value, string prefix)
        {
            return $"{prefix} {value:N2}";
        }
    }
}

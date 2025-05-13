using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace prova_pratica_mazzafc.Util.AppSetings
{
    public class ConfigUtil
    {
        private readonly static IConfiguration _configuration;
        public static string GetByKey(string key)
            => _configuration[key]?.ToString() ?? throw new Exception(key + " não definida");
        static ConfigUtil()
        {
            _configuration = new ConfigurationBuilder()
                .SetBasePath(AppContext.BaseDirectory)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .Build();
        }
    }
}


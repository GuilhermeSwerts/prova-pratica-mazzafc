using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace prova_pratica_mazzafc.Models.Response.User
{
    public class UserLoginDto : DtoBase
    {
        public string Name { get; set; }
        public string Token { get; set; }
    }
}

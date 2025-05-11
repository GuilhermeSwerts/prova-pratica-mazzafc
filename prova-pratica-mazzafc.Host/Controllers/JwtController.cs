using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace prova_pratica_mazzafc.Server.Controllers
{

    [Authorize]
    public class JwtController : Controller
    {
        public int UserId => GetUserId();

        protected int GetUserId()
        {
            if (User != null)
            {
                if (User.Claims.Count() == 0) { return 0; }

                var userdata = User.Claims.First(x => x.Type.Contains("userdata"));

                if (userdata != null)
                {
                    return int.Parse(userdata.Value);
                }
            }
            return 0;
        }
    }

}

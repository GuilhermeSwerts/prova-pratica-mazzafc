using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using prova_pratica_mazzafc.Util.AppSetings;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace prova_pratica_mazzafc.Util.Auth
{
    public class Authentication(IConfiguration _configuration)
    {

        public static class Settings
        {
            public static string Secret = ConfigUtil.GetKey("BearerKey");
        }

        public static string GenerateToken(int userId)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(Settings.Secret);

            List<Claim> claimsIdentity = new()
            {
               new Claim(ClaimTypes.UserData,userId.ToString()),
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claimsIdentity),
                Expires = DateTime.UtcNow.AddHours(24),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}

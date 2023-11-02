using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Techwaukee.goRecruitAI.Data;
using Techwaukee.goRecruitAI.Services;
using Techwaukee.goRecruitAI.ViewModels;

namespace Techwaukee.goRecruitAI.Repository
{
    public class TokenRepository : ITokenService
    {
        private RecruitContext _context;
        private IConfiguration _configuration;
        private IUserService _userService;

        public TokenRepository(RecruitContext context, IUserService userService, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
            _userService = userService;
        }

        public async Task<string> GetToken(string emailId, string password)
        {
            try
            {
                if (!string.IsNullOrEmpty(emailId) && !string.IsNullOrEmpty(password))
                {
                    var user = await GetUser(emailId, password);

                    if (user != null)
                    {
                        //create claims details based on the user information
                        var claims = new[] {
                        new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                        new Claim("UserId", user.Userid.ToString()),
                        new Claim("LastName", user.Lastname),
                        new Claim("FirstName", user.Firstname),
                        new Claim("Email", user.Emailid)
                    };

                        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                        var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                        var token = new JwtSecurityToken(
                            _configuration["Jwt:Issuer"],
                            _configuration["Jwt:Audience"],
                            claims,
                            expires: DateTime.UtcNow.AddMinutes(10),
                            signingCredentials: signIn);

                        return new JwtSecurityTokenHandler().WriteToken(token);
                    }
                    else
                    {
                        return "Invalid credentials";
                    }
                }
                else
                {
                    return "Invalid credentials";
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private async Task<UserDetail> GetUser(string emailId, string password)
        {
            return await _userService.GetUserDetails(emailId, password);
        }
    }
}
using Microsoft.AspNetCore.Mvc;
using Techwaukee.goRecruitAI.Services;
using Techwaukee.goRecruitAI.ViewModels;

namespace Techwaukee.goRecruitAI.UI.Controllers
{
    public class TokenController : Controller
    {
        private ITokenService _tokenRepo;
        private ILogger<UserController> _logger;

        public TokenController(ITokenService tokenRepo, ILogger<UserController> logger)
        {
            _tokenRepo = tokenRepo;
            _logger = logger;
        }

        [HttpGet]
        public async Task<string> GetToken(UserLogin userLogin)
        {
            try
            {
                var token = await _tokenRepo.GetToken(userLogin.EmailId, userLogin.Password);
                return token.ToString();
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
    }
}
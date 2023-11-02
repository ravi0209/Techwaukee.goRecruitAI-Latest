using recruIT_CurrentModels.Models;
using recruIT_CurrentModels.ViewModels;
using recruIT_Utilities;

namespace recruIT_CurrentUI.Services
{
    public class TokenService : ITokenService
    {
        private readonly HttpClient httpClient;

        public TokenService(HttpClient httpClient)
        {
            this.httpClient = httpClient;
        }
        public async Task<string> GetToken(UserLogin userLogin)
        {
            return await httpClient.GetStringAsync($@"GetToken?emailId={userLogin.EmailId}&password={MyUtilities.CleanUpEncription(userLogin.Password)}");
        }
    }
}

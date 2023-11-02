using recruIT_CurrentModels.Models;
using recruIT_CurrentModels.ViewModels;
using recruIT_Utilities;

namespace recruIT_CurrentUI.Services
{
    public class UserService: IUserService
    {
        private readonly HttpClient httpClient;

        public UserService(HttpClient httpClient)
        {
            this.httpClient = httpClient;
        }
        public async Task<UserDetail> GetUserDetails(string emailId, string password)
        {
            return await httpClient.GetFromJsonAsync<UserDetail>($@"GetUserDetails?emailId={emailId}&password={MyUtilities.CleanUpEncription(password)}");
        }
        public async Task<bool> GetVerifyUserAndSendResetPasswordLink(string emailId)
        {
            return await httpClient.GetFromJsonAsync<bool>($@"GetVerifyUserAndSendResetPasswordLink?emailId={emailId}");
        }
        public async Task<IEnumerable<Userprofilecreation>> GetAllUsers()
        {
            return await httpClient.GetFromJsonAsync<List<Userprofilecreation>>("GetAllUsers");
        }
    }
}

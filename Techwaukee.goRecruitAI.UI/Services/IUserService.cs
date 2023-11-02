using recruIT_CurrentModels.Models;
using recruIT_CurrentModels.ViewModels;

namespace recruIT_CurrentUI.Services
{
    public interface IUserService
    {
        Task<UserDetail> GetUserDetails(string emailId, string password);
        Task<bool> GetVerifyUserAndSendResetPasswordLink(string emailId);
        Task<IEnumerable<Userprofilecreation>> GetAllUsers();
    }
}

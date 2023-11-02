using Techwaukee.goRecruitAI.Models;
using Techwaukee.goRecruitAI.ViewModels;

namespace Techwaukee.goRecruitAI.Services
{
    public interface IUserService
    {
        Task<UserDetail> GetUserDetails(string emailId, string password);

        Task<IEnumerable<Userprofilecreation>> GetAllUsers();

        Task<bool> GetVerifyUserAndSendResetPasswordLink(string emailId);
    }
}
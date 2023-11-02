using recruIT_CurrentModels.Models;
using recruIT_CurrentModels.ViewModels;

namespace recruIT_CurrentUI.Services
{
    public interface ITokenService
    {
        Task<string> GetToken(UserLogin userLogin);
    }
}

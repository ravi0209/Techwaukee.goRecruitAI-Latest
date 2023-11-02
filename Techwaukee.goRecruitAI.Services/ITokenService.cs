namespace Techwaukee.goRecruitAI.Services
{
    public interface ITokenService
    {
        Task<string> GetToken(string emailId, string password);
    }
}
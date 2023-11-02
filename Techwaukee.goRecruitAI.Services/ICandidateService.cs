using Techwaukee.goRecruitAI.Models;

namespace Techwaukee.goRecruitAI.Services
{
    public interface ICandidateService
    {
        Task<IEnumerable<CandidateDetail>> GetCandidateDetails();
    }
}
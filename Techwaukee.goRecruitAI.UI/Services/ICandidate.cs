using recruIT_CurrentModels.Models;

namespace recruIT_CurrentUI.Services
{
    public interface ICandidate
    {
        Task<IEnumerable<CandidateDetail>> GetCandidates();
    }
}

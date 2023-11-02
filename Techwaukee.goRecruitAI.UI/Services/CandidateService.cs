using recruIT_CurrentModels;
using recruIT_CurrentModels.Models;

namespace recruIT_CurrentUI.Services
{
    public class CandidateService : ICandidate
    {
        private readonly HttpClient httpClient;

        public CandidateService(HttpClient httpClient)
        {
            this.httpClient = httpClient;
        }
        public async Task<IEnumerable<CandidateDetail>> GetCandidates()
        {
            return await httpClient.GetFromJsonAsync<CandidateDetail[]>("GetCandidates");
        }
    }
}

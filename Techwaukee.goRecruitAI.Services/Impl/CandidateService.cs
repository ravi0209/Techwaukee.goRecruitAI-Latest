using Microsoft.EntityFrameworkCore;
using Techwaukee.goRecruitAI.Repository;
using Techwaukee.goRecruitAI.Repository.Models;

namespace Techwaukee.goRecruitAI.Services.Impl
{
    public class CandidateService : ICandidateService
    {
        private readonly RecruitContext context;
        public CandidateService(RecruitContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<CandidateDetail>> GetCandidateDetails()
        {
            IEnumerable<CandidateDetail> candidateDetails = new List<CandidateDetail>();
            candidateDetails = await context.CandidateDetails.Take(100).ToListAsync();
            return candidateDetails;
        }
    }
}

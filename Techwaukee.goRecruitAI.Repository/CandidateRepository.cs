using Microsoft.EntityFrameworkCore;
using Techwaukee.goRecruitAI.Data;
using Techwaukee.goRecruitAI.Models;
using Techwaukee.goRecruitAI.Services;

namespace Techwaukee.goRecruitAI.Repository
{
    public class CandidateRepository : ICandidateService
    {
        private RecruitContext _context;

        public CandidateRepository(RecruitContext context)
        {
            this._context = context;
        }

        public async Task<IEnumerable<CandidateDetail>> GetCandidateDetails()
        {
            IEnumerable<CandidateDetail> candidateDetails = new List<CandidateDetail>();
            candidateDetails = await _context.CandidateDetails.Take(100).ToListAsync();
            return candidateDetails;
        }
    }
}
using Microsoft.EntityFrameworkCore;
using Techwaukee.goRecruitAI.Repository;
using Techwaukee.goRecruitAI.Services;

namespace recruIT_Current.Services
{
    public class CandidateJobMatchService : ICandidateJobMatchService
    {
        private readonly RecruitContext dbContext;

        public CandidateJobMatchService(RecruitContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<List<int>> GetUpdatedCandidateIds(DateTime startTime, DateTime endTime)
        {
            FormattableString sql = $@"SELECT CandidateId FROM CandidateDetails(nolock) WHERE (CreatedAt >= {startTime} AND CreatedAt < {endTime}) OR (UpdatedAt >= {startTime} AND UpdatedAt < {endTime})";
            return await dbContext.Database.SqlQuery<int>(sql).ToListAsync();
        }

        public async Task<List<string>> GetUpdatedJobCodes(DateTime startTime, DateTime endTime)
        {
            FormattableString sql = $@"SELECT JobCode FROM Job_Master_USA(nolock) WHERE (CreatedAt >= {startTime} AND CreatedAt < {endTime}) OR (UpdatedAt >= {startTime} AND UpdatedAt < {endTime})";
            return await dbContext.Database.SqlQuery<string>(sql).ToListAsync();
        }

        public async Task UpdateJobMatchOnCandidateChange(int candidateId)
        {
            await dbContext.Database.ExecuteSqlRawAsync("[dbo].[usp_UpdJobMatchOnCreateCandidate] @candidateId", new
            {
                candidateId
            }); 
        }

        public async Task UpdateJobMatchOnJobChange(string jobCode)
        {
            await dbContext.Database.ExecuteSqlRawAsync("[dbo].[usp_UpdJobMatchOnCreateJob] @jobCode", new
            {
                jobCode
            });
        }
    }
}

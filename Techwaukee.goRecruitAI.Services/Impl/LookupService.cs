using Microsoft.EntityFrameworkCore;
using Techwaukee.goRecruitAI.Repository;
using Techwaukee.goRecruitAI.Repository.Models;

namespace Techwaukee.goRecruitAI.Services.Impl
{
    public class LookupService : ILookupService
    {
        private readonly RecruitContext context;
        public LookupService(RecruitContext context)
        {
            this.context = context;
        }

        public async Task<List<CityMaster>> GetCities(int stateId)
        {
            var cities = await context.CityMasters.Where(x => x.StateId == stateId && x.Status == 1).ToListAsync();
            return cities;
        }

        public async Task<List<StateMaster>> GetStates(int countryid)
        {
            var states = await context.StateMasters.Where(x => x.CountryId == countryid && x.Status == "1").ToListAsync();
            return states;

        }
        public async Task<List<CandidateSourceMaster>> GetCandidateSource()
        {
            var sourceMaster = await context.CandidateSourceMasters.Where(x => x.Status == 1).ToListAsync();
            return sourceMaster;
        }
        public async Task<List<NoticeperiodMaster>> GetNoticePeriod()
        {
            var notice = await context.NoticeperiodMasters.Where(x => x.Status == 1).ToListAsync();
            return notice;
        }
        public async Task<List<VisaMaster>> GetVisaTypes()
        {
            var visas = await context.VisaMasters.Where(x => x.Status == 1).ToListAsync();
            return visas;
        }
        public async Task<List<YearMaster>> GetExperienceYears()
        {
            var years = await context.YearMasters.Where(x => x.IsActive == true).ToListAsync();
            return years;
        }
    }
}
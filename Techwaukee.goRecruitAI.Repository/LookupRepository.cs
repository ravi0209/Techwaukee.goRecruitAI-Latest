using Microsoft.EntityFrameworkCore;
using Techwaukee.goRecruitAI.Data;
using Techwaukee.goRecruitAI.Models;
using Techwaukee.goRecruitAI.Services;

namespace Techwaukee.goRecruitAI.Repository
{
    public class LookupRepository : ILookupService
    {
        private RecruitContext _context;

        public LookupRepository(RecruitContext context)
        {
            this._context = context;
        }

        public async Task<List<CityMaster>> GetCities(int stateId)
        {
            var cities = await _context.CityMasters.Where(x => x.StateId == stateId && x.Status == 1).ToListAsync();
            return cities;
        }

        public async Task<List<StateMaster>> GetStates(int countryid)
        {
            var states = await _context.StateMasters.Where(x => x.CountryId == countryid && x.Status == "1").ToListAsync();
            return states;
        }

        public async Task<List<CandidateSourceMaster>> GetCandidateSource()
        {
            var sourceMaster = await _context.CandidateSourceMasters.Where(x => x.Status == 1).ToListAsync();
            return sourceMaster;
        }

        public async Task<List<NoticeperiodMaster>> GetNoticePeriod()
        {
            var notice = await _context.NoticeperiodMasters.Where(x => x.Status == 1).ToListAsync();
            return notice;
        }

        public async Task<List<VisaMaster>> GetVisaTypes()
        {
            var visas = await _context.VisaMasters.Where(x => x.Status == 1).ToListAsync();
            return visas;
        }

        public async Task<List<YearMaster>> GetExperienceYears()
        {
            var years = await _context.YearMasters.Where(x => x.Status == 1).ToListAsync();
            return years;
        }
    }
}
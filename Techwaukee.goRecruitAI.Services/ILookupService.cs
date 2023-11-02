using Techwaukee.goRecruitAI.Models;

namespace Techwaukee.goRecruitAI.Services
{
    public interface ILookupService
    {
        Task<List<StateMaster>> GetStates(int countryid);

        Task<List<CityMaster>> GetCities(int stateId);

        Task<List<CandidateSourceMaster>> GetCandidateSource();

        Task<List<NoticeperiodMaster>> GetNoticePeriod();

        Task<List<VisaMaster>> GetVisaTypes();

        Task<List<YearMaster>> GetExperienceYears();
    }
}
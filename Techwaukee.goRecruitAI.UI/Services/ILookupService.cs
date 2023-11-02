using recruIT_CurrentModels.Models;

namespace recruIT_CurrentUI.Services
{
    public interface ILookupService
    {
        Task<List<StateMaster>> GetStates(int countryid);
        Task<List<CityMaster>> GetCities(int stateid);
        Task<List<CandidateSourceMaster>> GetCandidateSource();
        Task<List<NoticeperiodMaster>> GetAvailability();
        Task<List<VisaMaster>> GetVisaTypes();
        Task<List<YearMaster>> GetExperienceYears();
    }
}

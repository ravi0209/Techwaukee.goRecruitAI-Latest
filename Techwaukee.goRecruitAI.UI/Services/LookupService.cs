using recruIT_CurrentModels.Models;

namespace recruIT_CurrentUI.Services
{
    public class LookupService: ILookupService
    {
        private readonly HttpClient httpClient;

        public LookupService(HttpClient httpClient)
        {
            this.httpClient = httpClient;
        }
        public async Task<List<StateMaster>> GetStates(int countryid)
        {
            return await httpClient.GetFromJsonAsync<List<StateMaster>>($"states/{countryid}");
        }
        public async Task<List<CityMaster>> GetCities(int stateid)
        {
            return await httpClient.GetFromJsonAsync<List<CityMaster>>($"cities/{stateid}");
        }
        public async Task<List<CandidateSourceMaster>> GetCandidateSource()
        {
            return await httpClient.GetFromJsonAsync<List<CandidateSourceMaster>>($"candidatesource");
        }
        public async Task<List<NoticeperiodMaster>> GetAvailability()
        {
            return await httpClient.GetFromJsonAsync<List<NoticeperiodMaster>>($"availability");
        }
        public async Task<List<VisaMaster>> GetVisaTypes()
        {
            return await httpClient.GetFromJsonAsync<List<VisaMaster>>($"visatypes");
        }
        public async Task<List<YearMaster>> GetExperienceYears()
        {
            return await httpClient.GetFromJsonAsync<List<YearMaster>>($"experienceyears");
        }
    }
}

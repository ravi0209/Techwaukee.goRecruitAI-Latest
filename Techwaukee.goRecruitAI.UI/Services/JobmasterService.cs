using recruIT_CurrentModels;
using recruIT_CurrentModels.ViewModels;

namespace recruIT_CurrentUI.Services
{
    public class JobmasterService:IJobMaster
    {
        private readonly HttpClient httpClient;

        public JobmasterService(HttpClient httpClient)
        {
            this.httpClient = httpClient;
        }
        public async Task<IEnumerable<JobInfo>> GetJobDetails(string TabName)
        {
            return await httpClient.GetFromJsonAsync<JobInfo[]>("GetJobDetails/"+TabName);
        }

        public async Task<IEnumerable<Jobdetail>> GetJobInformation(string Jobcode)
        {
            return await httpClient.GetFromJsonAsync<Jobdetail[]>("GetJobInformation/" + Jobcode);
        }
    }
}

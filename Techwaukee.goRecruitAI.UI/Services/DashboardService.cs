using recruIT_CurrentModels.Models;
using recruIT_CurrentModels.ViewModels;

namespace recruIT_CurrentUI.Services
{
    public class DashboardService: IDashboardService
    {
        private readonly HttpClient httpClient;

        public DashboardService(HttpClient httpClient)
        {
            this.httpClient = httpClient;
        }
        public async Task<PerformanceChartData> GetPerformanceReportDetails(string userId, string filterBy)
        {
            return await httpClient.GetFromJsonAsync<PerformanceChartData>($"GetPerformanceReport?userId={userId}&filterBy={filterBy}");
        }
        public async Task<List<CandidateStatusCount>> GetCandidateStatusCountByRecruiterId(string recruiterId)
        {
            return await httpClient.GetFromJsonAsync<List<CandidateStatusCount>>($"GetCandidateStatusCount?recruiterId={recruiterId}");
        }

        public async Task<int> GetActiveJobsCountByRecruiterId(string recruiterId)
        {
            return await httpClient.GetFromJsonAsync<int>($"GetActiveJobsCount?recruiterId={recruiterId}");
        }

        public async Task<OverviewReportOfRecruiter> GetOverviewReportofRecruiter(string recruiterId)
        {
            return await httpClient.GetFromJsonAsync<OverviewReportOfRecruiter>($"GetOverviewReportofRecruiter?recruiterId={recruiterId}");
        }
    }
}

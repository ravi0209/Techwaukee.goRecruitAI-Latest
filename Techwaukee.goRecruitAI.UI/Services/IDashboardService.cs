using recruIT_CurrentModels.Models;
using recruIT_CurrentModels.ViewModels;

namespace recruIT_CurrentUI.Services
{
    public interface IDashboardService
    {
        Task<PerformanceChartData> GetPerformanceReportDetails(string userId, string filterBy);
        Task<List<CandidateStatusCount>> GetCandidateStatusCountByRecruiterId(string recruiterId);
        Task<int> GetActiveJobsCountByRecruiterId(string recruiterId);
        Task<OverviewReportOfRecruiter> GetOverviewReportofRecruiter(string recruiterId);
    }
}

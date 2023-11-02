using Techwaukee.goRecruitAI.ViewModels;

namespace Techwaukee.goRecruitAI.Services
{
    public interface IDashboardService
    {
        Task<PerformanceChartData> GetPerformanceReportDetails(string userId, string filterBy);

        Task<IEnumerable<CandidateStatusCount>> GetCandidateStatusCountByRecruiterId(string recruiterId);

        Task<int> GetActiveJobsCountByRecruiterId(string recruiterId, string Jobstatus = "");

        Task<OverviewReportOfRecruiter> GetOverviewReportofRecruiter(string recruiterId);
    }
}
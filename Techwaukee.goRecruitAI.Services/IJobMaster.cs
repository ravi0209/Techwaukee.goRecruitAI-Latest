using Techwaukee.goRecruitAI.ViewModels;

namespace Techwaukee.goRecruitAI.Services
{
    public interface IJobMaster
    {
        Task<IEnumerable<JobInfo>> GetJobDetails(string TabName);

        Task<IEnumerable<Jobdetail>> GetJobInformation(string Jobcode);
    }
}
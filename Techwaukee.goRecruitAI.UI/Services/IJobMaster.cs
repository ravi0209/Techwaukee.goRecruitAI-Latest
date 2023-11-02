using recruIT_CurrentModels.ViewModels;

namespace recruIT_CurrentUI.Services
{
    public interface IJobMaster
    {
        Task<IEnumerable<JobInfo>> GetJobDetails(string TabName);

        Task<IEnumerable<Jobdetail>> GetJobInformation(string Jobcode);
    }
}

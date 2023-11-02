using Microsoft.AspNetCore.Mvc;
using Techwaukee.goRecruitAI.Services;

namespace Techwaukee.goRecruitAI.UI.Controllers
{
    public class JobController : Controller
    {
        private IJobMaster jobRepo;

        public JobController(IJobMaster jobRepo)
        {
            this.jobRepo = jobRepo;
        }

        // GET: CandidateController
        public async Task<ActionResult> Index(string TabName)
        {
            ViewData["TabName"] = TabName;

            var jobList = await jobRepo.GetJobDetails(TabName);
            return View(jobList);
        }

        public async Task<ActionResult> InactiveIndex(string TabName)
        {
            ViewData["TabName"] = TabName;
            var jobList = await jobRepo.GetJobDetails(TabName);
            return View(jobList);
        }

        public async Task<ActionResult> OverallIndex(string TabName)
        {
            ViewData["TabName"] = TabName;
            var jobList = await jobRepo.GetJobDetails(TabName);
            return View(jobList);
        }

        public async Task<ActionResult> InterviewIndex(string TabName)
        {
            ViewData["TabName"] = TabName;
            var jobList = await jobRepo.GetJobDetails(TabName);
            return View(jobList);
        }

        public async Task<ActionResult> ClosureIndex(string TabName)
        {
            ViewData["TabName"] = TabName;
            var jobList = await jobRepo.GetJobDetails(TabName);
            return View(jobList);
        }

        public async Task<ActionResult> NotfilledIndex(string TabName)
        {
            ViewData["TabName"] = TabName;
            var jobList = await jobRepo.GetJobDetails(TabName);
            return View(jobList);
        }

        public async Task<ActionResult> JobViewIndex(string Jobcode)
        {
            var jobList = await jobRepo.GetJobInformation(Jobcode);
            return View(jobList);
        }
    }
}
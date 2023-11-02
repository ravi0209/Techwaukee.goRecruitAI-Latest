using Microsoft.AspNetCore.Mvc;
using System.Text;
using System.Text.Json;
using Techwaukee.goRecruitAI.Services;
using Techwaukee.goRecruitAI.ViewModels;

namespace Techwaukee.goRecruitAI.UI.Controllers
{
    public class DashboardController : Controller
    {
        private IDashboardService dashboardRepo;
        private UserDetail userDetail = new UserDetail();

        public DashboardController(IDashboardService dashboardRepo)
        {
            this.dashboardRepo = dashboardRepo;
            // this.userDetail = JsonSerializer.Deserialize<UserDetail>(HttpContext.Session.GetString("UserDetails"));
        }

        public IActionResult Index()
        {
            try
            {
                var userDetails = JsonSerializer.Deserialize<UserDetail>(HttpContext.Session.GetString("UserDetails"));
                //ViewBag.UserName = userDetails; //hardcoded value, it should be loggedIn user name
                return View();
            }
            catch (Exception ex)
            {
                return Json(new { status = "Failed", message = ex.Message });
            }
        }

        [HttpGet]
        public async Task<JsonResult> GetCandidateStatusCountByRecruiter(string recruiterId)
        {
            try
            {
                var dashboardData = await dashboardRepo.GetCandidateStatusCountByRecruiterId(recruiterId);
                var t = Json(dashboardData);
                return t;
            }
            catch (Exception ex)
            {
                return Json(new { status = "Failed", message = ex.Message });
            }
        }

        [HttpGet]
        public async Task<JsonResult> GetActiveJobsCountByRecruiter(string recruiterId)
        {
            try
            {
                var dashboardData = await dashboardRepo.GetActiveJobsCountByRecruiterId(recruiterId);
                var t = Json(dashboardData);
                return t;
            }
            catch (Exception ex)
            {
                return Json(new { status = "Failed", message = ex.Message });
            }
        }

        [HttpGet]
        public async Task<JsonResult> GetOverviewReportofRecruiter(string recruiterId)
        {
            try
            {
                var dashboardData = await dashboardRepo.GetOverviewReportofRecruiter(recruiterId);
                var t = Json(dashboardData);
                return t;
            }
            catch (Exception ex)
            {
                return Json(new { status = "Failed", message = ex.Message });
            }
        }

        [HttpGet]
        public async Task<JsonResult> GetPerformanceReportDetails(string userId, string filterBy)
        {
            try
            {
                var dashboardData = await dashboardRepo.GetPerformanceReportDetails(userId, filterBy);
                var t = Json(dashboardData);
                return t;
            }
            catch (Exception ex)
            {
                return Json(new { status = "Failed", message = ex.Message });
            }
        }
    }
}
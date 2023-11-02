using Microsoft.AspNetCore.Mvc;
using Techwaukee.goRecruitAI.Models;
using Techwaukee.goRecruitAI.Services;

namespace Techwaukee.goRecruitAI.UI.Controllers
{
    public class CandidateController : Controller
    {
        private ICandidateService candidateRepo;
        private readonly ILookupService lookupService;

        public CandidateController(ICandidateService candidateRepo, ILookupService lookupService)
        {
            this.candidateRepo = candidateRepo;
            this.lookupService = lookupService;
        }

        // GET: CandidateController
        public async Task<ActionResult> Index()
        {
            //TODO: Updated
            var candList = await candidateRepo.GetCandidateDetails();
            return View(candList);
        }

        // GET: CandidateController/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: CandidateController/Create
        public async Task<ActionResult> Create()
        {
            ViewBag.States = await lookupService.GetStates(10751);
            ViewBag.Cities = new List<CityMaster>();
            ViewBag.CandidateSource = await lookupService.GetCandidateSource();
            //ViewBag.Availability = await lookupService.GetAvailability();
            ViewBag.VisaTypes = await lookupService.GetVisaTypes();
            ViewBag.ExpYears = await lookupService.GetExperienceYears();
            return View();
        }

        // POST: CandidateController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: CandidateController/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: CandidateController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: CandidateController/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: CandidateController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}
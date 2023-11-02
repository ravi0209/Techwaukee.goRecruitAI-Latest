using Microsoft.EntityFrameworkCore;
using Techwaukee.goRecruitAI.Data;
using Techwaukee.goRecruitAI.Services;
using Techwaukee.goRecruitAI.Common;
using Techwaukee.goRecruitAI.ViewModels;

namespace Techwaukee.goRecruitAI.Repository
{
    public class DashboardRepository : IDashboardService
    {
        private RecruitContext _context;

        public DashboardRepository(RecruitContext context)
        {
            this._context = context;
        }

        public async Task<PerformanceChartData> GetPerformanceReportDetails(string userId, string filterBy)
        {
            try
            {
                PerformanceChartData objPerfChart = new PerformanceChartData();

                string[] statuses = {
                                        "SubmittedToBP",
                                        "SubmittedToEC",
                                        "Closure"
                                    };

                #region Dashboard - Yearly data month wise

                var yearlyData = await (from c in _context.CandidateJobs
                                        where c.SubmittedToBpDate.Value.Date >= DateTime.Now.AddMonths(-11).Date && c.SubmittedToBpDate.Value.Date <= DateTime.Now.Date && c.SubmittedToBpDate != null && c.CreatedBy == userId
                                        group c by new
                                        {
                                            c.SubmittedToBpDate.Value.Year,
                                            c.SubmittedToBpDate.Value.Month
                                        }
                                        into g
                                        select new
                                        {
                                            StatusName = "SubmittedToBP",
                                            Month = g.Key.Month,
                                            RecCount = g.Count()
                                        }).Union(
                    from c in _context.CandidateJobs
                    where c.SubmittedToEcDate.Value.Date >= DateTime.Now.AddMonths(-11).Date && c.SubmittedToEcDate.Value.Date <= DateTime.Now.Date && c.SubmittedToEcDate != null && c.CreatedBy == userId
                    group c by new
                    {
                        c.SubmittedToEcDate.Value.Year,
                        c.SubmittedToEcDate.Value.Month
                    }
                    into g
                    select new
                    {
                        StatusName = "SubmittedToEC",
                        Month = g.Key.Month,
                        RecCount = g.Count()
                    }).Union(
                    from c in _context.CandidateJobs
                    where c.OnboardedDate.Value.Date >= DateTime.Now.AddMonths(-11).Date && c.OnboardedDate.Value.Date <= DateTime.Now.Date && c.OnboardedDate != null && c.CreatedBy == userId && Convert.ToInt16(c.CandStatus) == 112
                    group c by new
                    {
                        c.OnboardedDate.Value.Year,
                        c.OnboardedDate.Value.Month
                    }
                    into g
                    select new
                    {
                        StatusName = "Closure",
                        Month = g.Key.Month,
                        RecCount = g.Count()
                    }).GroupBy(x => new
                    {
                        x.StatusName,
                        x.Month
                    })
                  .Select(g => new
                  {
                      StatusName = g.Key.StatusName,
                      Month = g.Key.Month,
                      RecCount = g.Sum(x => x.RecCount)
                  }).ToListAsync();

                List<OverviewByYearNew> lstOverviewByYearNew = new List<OverviewByYearNew>();
                List<OverviewByYear> OverviewByYear = new List<OverviewByYear>();

                foreach (var status in statuses)
                {
                    var months = MyUtilities.GetMonthsBetween(DateTime.Now.AddMonths(-11), DateTime.Now.Date);

                    foreach (var mData in months)
                    {
                        var data = yearlyData.Where(x => x.StatusName == status && x.Month == mData.Month).ToList();
                        lstOverviewByYearNew.Add(new OverviewByYearNew
                        {
                            MonthName = MyUtilities.GetMonthName(mData.Month).Substring(0, 3),
                            RecCount = data.Where(x => x.Month == mData.Month).Sum(x => x.RecCount),
                            StatusName = status,
                            Year = mData.Year
                        });
                    }
                }

                //var yearData = yearlyData.GroupBy(x => x.StatusName)
                //  .Select(g => new OverviewByYear
                //  {
                //      //StatusName = g.Select(x => x.StatusName).First(),
                //      Jan = g.Where(x => x.Month == 1).Sum(x => x.RecCount),
                //      Feb = g.Where(x => x.Month == 2).Sum(x => x.RecCount),
                //      Mar = g.Where(x => x.Month == 3).Sum(x => x.RecCount),
                //      Apr = g.Where(x => x.Month == 4).Sum(x => x.RecCount),
                //      May = g.Where(x => x.Month == 5).Sum(x => x.RecCount),
                //      Jun = g.Where(x => x.Month == 6).Sum(x => x.RecCount),
                //      Jul = g.Where(x => x.Month == 7).Sum(x => x.RecCount),
                //      Aug = g.Where(x => x.Month == 8).Sum(x => x.RecCount),
                //      Sep = g.Where(x => x.Month == 9).Sum(x => x.RecCount),
                //      Oct = g.Where(x => x.Month == 10).Sum(x => x.RecCount),
                //      Nov = g.Where(x => x.Month == 11).Sum(x => x.RecCount),
                //      Dec = g.Where(x => x.Month == 12).Sum(x => x.RecCount)
                //  }).ToList();

                #endregion Dashboard - Yearly data month wise

                #region Dashboard - Mothly data week wise

                //list of week ranges in current month
                List<OverviewByMonth> listWeekRanges = new List<OverviewByMonth>();

                //Find Previous 5th Monday
                //DateTime dayInMonth = DateTime.Now;
                //DayOfWeek dayToFind = DayOfWeek.Monday;

                //var startDate = Enumerable.Range(1, DateTime.DaysInMonth(dayInMonth.Year, dayInMonth.Month))
                //           .Select(day => new DateTime(dayInMonth.Year, dayInMonth.Month, day))
                //           .Where(day => day.DayOfWeek == dayToFind)
                //           .Skip(4)
                //           .FirstOrDefault();

                var startDate = MyUtilities.StartOfWeek(DateTime.Now.Date, DayOfWeek.Monday).AddDays(-28).Date;

                foreach (var status in statuses)
                {
                    listWeekRanges.AddRange(MyUtilities.GetAllWeekRangesOfGivenDateRange(startDate, DateTime.Now.Date).Select(sel => new OverviewByMonth
                    {
                        StatusName = status,
                        WeekRange = sel,
                        RecCount = 0
                    }));
                }

                var monthlyData = await (from c in _context.CandidateJobs
                                         where c.SubmittedToBpDate.Value.Date >= startDate && c.SubmittedToBpDate != null && c.CreatedBy == userId &&
                  c.SubmittedToBpDate.Value.Month == DateTime.Now.Month
                                         select new
                                         {
                                             StatusName = "SubmittedToBP",
                                             ChangedDate = c.SubmittedToBpDate.Value,
                                         }).Concat(
                  from c in _context.CandidateJobs
                  where c.SubmittedToEcDate.Value.Date >= startDate && c.SubmittedToEcDate != null && c.CreatedBy == userId &&
                  c.SubmittedToEcDate.Value.Month == DateTime.Now.Month
                  select new
                  {
                      StatusName = "SubmittedToEC",
                      ChangedDate = c.SubmittedToEcDate.Value,
                  }).Concat(
                  from c in _context.CandidateJobs
                  where c.OnboardedDate.Value.Date >= startDate && c.OnboardedDate != null && c.CreatedBy == userId &&
                  c.OnboardedDate.Value.Month == DateTime.Now.Month && Convert.ToInt16(c.CandStatus) == 112
                  select new
                  {
                      StatusName = "Closure",
                      ChangedDate = c.OnboardedDate.Value,
                  }).ToListAsync();

                var monthData = monthlyData
                  .GroupBy(t => new
                  {
                      t.StatusName,
                      DateRangeByWeek = MyUtilities.GetWeeKPeriod(t.ChangedDate)
                  })
                  .Select(g => new OverviewByMonth
                  {
                      StatusName = g.Key.StatusName,
                      WeekRange = g.Key.DateRangeByWeek,
                      RecCount = g.Count()
                  }).ToList();

                monthData = (from wr in listWeekRanges
                             join md in monthData on new
                             {
                                 wr.WeekRange,
                                 wr.StatusName
                             }
                  equals new
                  {
                      md.WeekRange,
                      md.StatusName
                  }
                  into a
                             from mrg in a.DefaultIfEmpty()
                             group mrg by new
                             {
                                 wr.StatusName,
                                 wr.WeekRange
                             }
                  into grp
                             select new OverviewByMonth
                             {
                                 StatusName = grp.Key.StatusName,
                                 WeekRange = grp.Key.WeekRange,
                                 RecCount = grp.Sum(rc => rc == null ? 0 : rc.RecCount)
                             }).ToList();

                OverviewByMonthData objOverviewByMonthData = new OverviewByMonthData
                {
                    WeekRange = monthData.Select(sel => sel.WeekRange).Distinct().ToArray<string>(),
                    SubmittedToBP = monthData.Where(wh => wh.StatusName == "SubmittedToBP").Select(sel => sel.RecCount).ToArray(),
                    SubmittedToEC = monthData.Where(wh => wh.StatusName == "SubmittedToEC").Select(sel => sel.RecCount).ToArray(),
                    Closed = monthData.Where(wh => wh.StatusName == "Closure").Select(sel => sel.RecCount).ToArray(),
                };

                #endregion Dashboard - Mothly data week wise

                #region Dashboard - Weekly data day wise

                //list of day and month name in current week
                List<OverviewByWeek> listDateRange = new List<OverviewByWeek>();

                foreach (var status in statuses)
                {
                    //TODO : Date hard coded, it should be DateTime.Now.Date
                    listDateRange.AddRange(MyUtilities.GetDayAndMonthNameOfWeekdays(DateTime.Now.Date).Select(sel => new OverviewByWeek
                    {
                        StatusName = status,
                        DateMonthName = sel,
                        RecCount = 0
                    }));
                }

                //Get current week start and end date
                //TODO : Date hard coded, it should be DateTime.Now.Date
                var dateRange = MyUtilities.GetCurrentWeekDates(DateTime.Now.Date);
                var fromDate = dateRange[0];
                var toDate = dateRange[1];

                var weeklyData = await (from c in _context.CandidateJobs
                                        where c.SubmittedToBpDate.Value.Year == DateTime.Now.Year && c.SubmittedToBpDate != null && c.CreatedBy == userId &&
                  c.SubmittedToBpDate.Value.Date >= fromDate && c.SubmittedToBpDate.Value.Date <= toDate
                                        select new
                                        {
                                            StatusName = "SubmittedToBP",
                                            ChangedDate = c.SubmittedToBpDate.Value,
                                        }).Concat(
                  from c in _context.CandidateJobs
                  where c.SubmittedToEcDate.Value.Year == DateTime.Now.Year && c.SubmittedToEcDate != null && c.CreatedBy == userId &&
                  c.SubmittedToEcDate.Value.Date >= fromDate && c.SubmittedToEcDate.Value.Date <= toDate
                  select new
                  {
                      StatusName = "SubmittedToEC",
                      ChangedDate = c.SubmittedToEcDate.Value,
                  }).Concat(
                  from c in _context.CandidateJobs
                  where c.OnboardedDate.Value.Year == DateTime.Now.Year && c.OnboardedDate != null && c.CreatedBy == userId &&
                  c.OnboardedDate.Value.Date >= fromDate && c.OnboardedDate.Value.Date <= toDate && Convert.ToInt16(c.CandStatus) == 112
                  select new
                  {
                      StatusName = "Closure",
                      ChangedDate = c.OnboardedDate.Value,
                  }).ToListAsync();

                var weekData = weeklyData
                  .GroupBy(t => new
                  {
                      t.StatusName,
                      DateMonthName = MyUtilities.GetDayAndMotntNameOfWeekday(t.ChangedDate)
                  })
                  .Select(g => new OverviewByWeek
                  {
                      StatusName = g.Key.StatusName,
                      DateMonthName = g.Key.DateMonthName,
                      RecCount = g.Count()
                  }).ToList();

                weekData = (from wr in listDateRange
                            join md in weekData on new
                            {
                                wr.DateMonthName,
                                wr.StatusName
                            }
                  equals new
                  {
                      md.DateMonthName,
                      md.StatusName
                  }
                  into a
                            from mrg in a.DefaultIfEmpty()
                            group mrg by new
                            {
                                wr.StatusName,
                                wr.DateMonthName
                            }
                  into grp
                            select new OverviewByWeek
                            {
                                StatusName = grp.Key.StatusName,
                                DateMonthName = grp.Key.DateMonthName,
                                RecCount = grp.Sum(rc => rc == null ? 0 : rc.RecCount)
                            }).ToList();

                OverviewByWeekData objOverviewByWeekData = new OverviewByWeekData
                {
                    DateMonthName = weekData.Select(sel => sel.DateMonthName).Distinct().ToArray<string>(),
                    SubmittedToBP = weekData.Where(wh => wh.StatusName == "SubmittedToBP").Select(sel => sel.RecCount).ToArray(),
                    SubmittedToEC = weekData.Where(wh => wh.StatusName == "SubmittedToEC").Select(sel => sel.RecCount).ToArray(),
                    Closed = weekData.Where(wh => wh.StatusName == "Closure").Select(sel => sel.RecCount).ToArray(),
                };

                #endregion Dashboard - Weekly data day wise

                objPerfChart.Yearly = lstOverviewByYearNew;
                objPerfChart.Monthly = objOverviewByMonthData;
                objPerfChart.Weekly = objOverviewByWeekData;

                return objPerfChart;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        //TODO:Filter  by Recruiter Id
        /// <summary>
        /// Get Recruitment Status count by Recruiter Id
        /// </summary>
        /// <param name="recruiterId"></param>
        /// <returns>List of Status with Count</returns>
        public async Task<IEnumerable<CandidateStatusCount>> GetCandidateStatusCountByRecruiterId(string recruiterId)
        {
            var statusCount = (from csm in _context.CandidateStatusMasters
                               join cj in _context.CandidateJobs on csm.CandidateStatusId.ToString() equals cj.CandStatus into joined
                               from f in joined.DefaultIfEmpty()
                               group f by new
                               {
                                   csm.CandidateStatusName,
                                   f.CandStatus,
                                   f.CreatedBy
                               }
                               into grp
                               where grp.Key.CreatedBy == recruiterId
                               orderby grp.Key.CandStatus
                               select new CandidateStatusCount
                               {
                                   StatusName = grp.Key.CandidateStatusName.ToString(),
                                   TotalCount = grp.Count()
                               }).ToListAsync();

            return await statusCount;
        }

        //TODO:JobStatus Hardcoded here.. it has to be convert as Enum
        public async Task<int> GetActiveJobsCountByRecruiterId(string recruiterId, string Jobstatus = "10200")
        {
            return await _context.JobMasterUsas.Where(wh => wh.AssignedTo.Contains(recruiterId) && wh.Jobstatus == "10200").CountAsync();
        }

        public async Task<OverviewReportOfRecruiter> GetOverviewReportofRecruiter(string recruiterId)
        {
            //CurrentUser details
            var currentUser = _context.Userprofilecreations.Where(wh => wh.TweId == recruiterId).FirstOrDefault();
            OverviewReportOfRecruiter objOverviewReportOfRecruiter = new OverviewReportOfRecruiter();
            var dateRanges = MyUtilities.GetDateRange(DateTime.Now);

            var Target = await _context.UserTargetMasters.Where(wh => wh.Tweid == recruiterId)
                .Select(sel => new TargetCount
                {
                    SubmissionDaily = sel.SubmissionDaily,
                    SubmissionWeekly = sel.SubmissionWeekly,
                    SubmissionMonthly = sel.SubmissionMonthly,
                    ClosureDaily = sel.ClosureDaily,
                    ClosureWeekly = sel.ClosureWeekly,
                    ClosureMonthly = sel.ClosureMonthly
                }).FirstOrDefaultAsync();

            var Archieved = await _context.CandidateJobs.Where(wh => wh.CreatedBy == recruiterId).ToListAsync();

            //TODO: Status codes are hard coded here
            //Candidate Closure Nofification
            var candClosureDetails = await (from cj in _context.CandidateJobs
                                            join cd in _context.CandidateDetails on cj.CandidateId equals cd.Candidateid
                                            where cj.CreatedBy == recruiterId && Convert.ToInt16(cj.CandStatus) == 112
                                            && cd.CreatedOn.Value.Date >= dateRanges.ThisMonthStart.Date && cd.CreatedOn.Value.Date <= dateRanges.ThisMonthEnd.Date
                                            select new CandidateClosureDetails { FullName = cd.Candidatename, FirstName = cd.Firstname, LastName = cd.Lastname, OnBoardDate = cj.OnboardedDate.Value.Date.ToShortDateString(), BonusDate = cj.OnboardedDate.Value.Date.AddMonths(3).ToShortDateString() }).ToListAsync();

            //TODO: given by shoud take from current user's manager details.
            var ManagerFeedback = await _context.TeamPerfomanceIndiaWeeklies.Where(wh => wh.Tweid == recruiterId && wh.FeedbackGivenby == currentUser.Reportingmanager).FirstOrDefaultAsync();

            AchievedCount objAchievedCount = new AchievedCount();

            objAchievedCount.AchievedYesterday = Archieved.Count(wh => Convert.ToInt16(wh.CandStatus) >= 108 && wh.CreatedOn.Value.Date == dateRanges.Today.Date.AddDays(-1));
            //TODO: Yesterday Logic to be discussed
            objAchievedCount.PendingSubmissionOfYesterday = Target.SubmissionDaily - objAchievedCount.AchievedYesterday;

            objAchievedCount.AchievedDaily = Archieved.Count(wh => Convert.ToInt16(wh.CandStatus) >= 108 && wh.CreatedOn.Value.Date == dateRanges.Today.Date);
            objAchievedCount.AchievedWeekly = Archieved.Count(wh => Convert.ToInt16(wh.CandStatus) >= 108 && wh.CreatedOn.Value.Date >= dateRanges.ThisWeekStart.Date && wh.CreatedOn.Value.Date <= dateRanges.ThisWeekEnd.Date);
            objAchievedCount.AchievedMonthly = Archieved.Count(wh => Convert.ToInt16(wh.CandStatus) >= 108 && wh.CreatedOn.Value.Date >= dateRanges.ThisMonthStart.Date && wh.CreatedOn.Value.Date <= dateRanges.ThisMonthEnd.Date);

            objOverviewReportOfRecruiter.TargetCount = Target;
            objOverviewReportOfRecruiter.AchievedCount = objAchievedCount;
            objOverviewReportOfRecruiter.TLRejectedCurrentMonth = Archieved.Count(wh => Convert.ToInt16(wh.CandStatus) >= 104 && wh.CreatedOn.Value.Date >= dateRanges.ThisMonthStart.Date && wh.CreatedOn.Value.Date <= dateRanges.ThisMonthEnd.Date);
            objOverviewReportOfRecruiter.CandidateClosureDetails = candClosureDetails;
            objOverviewReportOfRecruiter.ManagerFeedback = (ManagerFeedback != null) ? ManagerFeedback.Remarks : "";
            return objOverviewReportOfRecruiter;
        }
    }
}
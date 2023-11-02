namespace Techwaukee.goRecruitAI.ViewModels
{
    public class OverviewByYear
    {
        public int Jan { get; set; }
        public int Feb { get; set; }
        public int Mar { get; set; }
        public int Apr { get; set; }
        public int May { get; set; }
        public int Jun { get; set; }
        public int Jul { get; set; }
        public int Aug { get; set; }
        public int Sep { get; set; }
        public int Oct { get; set; }
        public int Nov { get; set; }
        public int Dec { get; set; }

        //public string StatusName { get; set; }
        //public string MonthName { get; set; }
        //public int Year { get; set; }
        //public int RecCount { get; set; }
    }

    public class OverviewByYearNew
    {
        public string StatusName { get; set; }
        public string MonthName { get; set; }
        public int Year { get; set; }
        public int RecCount { get; set; }
    }

    public class OverviewByMonthData
    {
        public string[] WeekRange { get; set; }
        public int[] SubmittedToBP { get; set; }
        public int[] SubmittedToEC { get; set; }
        public int[] Closed { get; set; }
    }

    public class OverviewByWeekData
    {
        public string[] DateMonthName { get; set; }
        public int[] SubmittedToBP { get; set; }
        public int[] SubmittedToEC { get; set; }
        public int[] Closed { get; set; }
    }

    public class OverviewByMonth
    {
        public string? StatusName { get; set; }
        public string? WeekRange { get; set; }
        public int RecCount { get; set; }
    }

    public class OverviewByWeek
    {
        public string? StatusName { get; set; }
        public string? DateMonthName { get; set; }
        public int RecCount { get; set; }
    }

    public class PerformanceChartData
    {
        public OverviewByMonthData Monthly { get; set; }
        public OverviewByWeekData Weekly { get; set; }
        public List<OverviewByYearNew> Yearly { get; set; }
    }

    public class CandidateStatusCount
    {
        public string? StatusName { get; set; }
        public int TotalCount { get; set; }
    }

    public class CandidateClosureDetails
    {
        public string FullName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string OnBoardDate { get; set; }
        public string BonusDate { get; set; }
    }
}
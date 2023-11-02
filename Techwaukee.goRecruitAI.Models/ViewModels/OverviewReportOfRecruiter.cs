namespace Techwaukee.goRecruitAI.ViewModels
{
    public class OverviewReportOfRecruiter
    {
        public TargetCount? TargetCount { get; set; }
        public AchievedCount? AchievedCount { get; set; }
        public int TLRejectedCurrentMonth { get; set; }
        public string? ManagerFeedback { get; set; }
        public List<CandidateClosureDetails> CandidateClosureDetails { get; set; }
    }

    public class TargetCount
    {
        public int? SubmissionDaily { get; set; }
        public int? SubmissionWeekly { get; set; }
        public int? SubmissionMonthly { get; set; }
        public int? ClosureDaily { get; set; }
        public int? ClosureWeekly { get; set; }
        public int? ClosureMonthly { get; set; }
    }

    public class AchievedCount
    {
        public int? AchievedYesterday { get; set; }
        public int? PendingSubmissionOfYesterday { get; set; }
        public int? AchievedDaily { get; set; }
        public int? AchievedWeekly { get; set; }
        public int? AchievedMonthly { get; set; }
    }
}
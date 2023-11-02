namespace Techwaukee.goRecruitAI.Models;

public partial class UserTargetMaster
{
    public int UserTargetId { get; set; }

    public string? Tweid { get; set; }

    public int? SubmissiontoTlDaily { get; set; }

    public int? SubmissionDaily { get; set; }

    public int? SubmissiontoBpDaily { get; set; }

    public int? ClosureDaily { get; set; }

    public int? VendorDaily { get; set; }

    public int? SubmissionMonthly { get; set; }

    public int? SubmissiontoTlMonthly { get; set; }

    public int? SubmissiontoBpMonthly { get; set; }

    public int? ClosureMonthly { get; set; }

    public int? VendorMonthly { get; set; }

    public int? SubmissionWeekly { get; set; }

    public int? SubmissiontoTlWeekly { get; set; }

    public int? SubmissiontoBpWeekly { get; set; }

    public int? ClosureWeekly { get; set; }

    public int? VendorWeekly { get; set; }

    public int? OnboardMonthly { get; set; }

    public int? ScoreValueTlDaily { get; set; }

    public int? ScoreValueTlWeekly { get; set; }

    public int? ScoreValueBpWeekly { get; set; }

    public int? ScoreValueTlMonthly { get; set; }

    public int? ScoreValueBpMonthly { get; set; }

    public int? ScoreValueEcMonthly { get; set; }

    public int? ScoreValueClMonthly { get; set; }

    public int? ScoreValueOnMonthly { get; set; }

    public int? ScoreExcellent { get; set; }
}
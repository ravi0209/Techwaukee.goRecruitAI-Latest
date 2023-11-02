namespace Techwaukee.goRecruitAI.Models;

public partial class TargetMaster
{
    public int TargetId { get; set; }

    public int? RoleType { get; set; }

    public int? LevelType { get; set; }

    public int? RegionType { get; set; }

    public int? SubmissiontoTlDaily { get; set; }

    public int? SubmissionDaily { get; set; }

    public int? SubmissiontoBpDaily { get; set; }

    public int? ClosureDaily { get; set; }

    public int? VendorDaily { get; set; }

    public string? SubmissionMonthly { get; set; }

    public string? SubmissiontoTlMonthly { get; set; }

    public string? SubmissiontoBpMonthly { get; set; }

    public string? ClosureMonthly { get; set; }

    public string? VendorMonthly { get; set; }

    public string? SubmissionWeekly { get; set; }

    public string? SubmissiontoTlWeekly { get; set; }

    public string? SubmissiontoBpWeekly { get; set; }

    public string? ClosureWeekly { get; set; }

    public string? VendorWeekly { get; set; }
}
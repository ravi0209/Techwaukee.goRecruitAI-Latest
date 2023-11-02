namespace Techwaukee.goRecruitAI.Models;

public partial class NewJobTable
{
    public int NewJobTableId { get; set; }

    public string? Jobcode { get; set; }

    public string? SkillCalculation { get; set; }

    public int? TotalMatchingCandidates { get; set; }

    public DateTime? CreatedOn { get; set; }
}
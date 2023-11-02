namespace Techwaukee.goRecruitAI.Models;

public partial class AssessmentQuestionMaster
{
    public int Questionid { get; set; }

    public int AssQuestionHeadingid { get; set; }

    public string? Question { get; set; }

    public int? Answer { get; set; }

    public string? Mark { get; set; }

    public int? Region { get; set; }

    public int? Status { get; set; }
}
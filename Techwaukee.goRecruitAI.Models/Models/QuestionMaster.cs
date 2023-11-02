namespace Techwaukee.goRecruitAI.Models;

public partial class QuestionMaster
{
    public int Questionid { get; set; }

    public int QuestionHeadingid { get; set; }

    public string? Question { get; set; }

    public int? Answer { get; set; }

    public int? Mark { get; set; }

    public int? Status { get; set; }
}
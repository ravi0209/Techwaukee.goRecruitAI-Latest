namespace Techwaukee.goRecruitAI.Models;

public partial class GenuinityCheck1
{
    public int GenuinityCheckId { get; set; }

    public int? Candidateid { get; set; }

    public int? QuestionHeadingid { get; set; }

    public int? Questionid { get; set; }

    public int? Answer { get; set; }

    public string? Comments { get; set; }
}
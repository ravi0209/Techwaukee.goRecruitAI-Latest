namespace Techwaukee.goRecruitAI.Models;

public partial class AssessmentCheckIndium
{
    public int AssessmentCheckId { get; set; }

    public int? Candidateid { get; set; }

    public int? QuestionHeadingid { get; set; }

    public int? Questionid { get; set; }

    public int? Answer { get; set; }
}
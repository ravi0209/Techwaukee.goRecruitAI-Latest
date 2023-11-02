namespace Techwaukee.goRecruitAI.Models;

public partial class AssessmentCheckRatingIndium
{
    public int AssessmentCheckRatingId { get; set; }

    public int? Candidateid { get; set; }

    public string? LinkedIn1rating { get; set; }

    public string? LinkedIn2rating { get; set; }

    public string? Overallsystemrating { get; set; }

    public string? Overallrecruiterrating { get; set; }

    public string? Remarks { get; set; }
}
namespace Techwaukee.goRecruitAI.Models;

public partial class GenuinityCheckRatingIndium
{
    public int GenuinityCheckRatingId { get; set; }

    public int? Candidateid { get; set; }

    public string? Screeningrating1 { get; set; }

    public string? Screeningrating2 { get; set; }

    public string? Overallsystemrating { get; set; }

    public string? Overallrecruiterrating { get; set; }

    public string? Remarks { get; set; }
}
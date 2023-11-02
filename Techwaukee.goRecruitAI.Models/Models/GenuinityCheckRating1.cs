namespace Techwaukee.goRecruitAI.Models;

public partial class GenuinityCheckRating1
{
    public int GenuinityCheckRatingId { get; set; }

    public int? Candidateid { get; set; }

    public string? LinkedInrating { get; set; }

    public string? Visarating { get; set; }

    public string? Educationrating { get; set; }

    public string? Overallsystemrating { get; set; }

    public string? Overallrecruiterrating { get; set; }

    public string? Remarks { get; set; }
}
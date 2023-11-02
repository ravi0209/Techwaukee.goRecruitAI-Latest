namespace Techwaukee.goRecruitAI.Models;

public partial class CandidateSubmissiondetailsB1
{
    public int CandidatedetailsBsid { get; set; }

    public int? Candidateid { get; set; }

    public string? VisaStatus { get; set; }

    public DateTime? VisaStartDate { get; set; }

    public DateTime? VisaEndDate { get; set; }

    public string? MaxSubmissionRate { get; set; }

    public string? MinSubmissionRate { get; set; }

    public string? AssignTo { get; set; }

    public DateTime? CreatedOn { get; set; }

    public string? CreatedBy { get; set; }

    public string? CandBsStatus { get; set; }

    public string? CandidateRemark { get; set; }

    public string? RecruiterRating { get; set; }

    public string? Jobcode { get; set; }

    public DateTime? AvailableDate { get; set; }

    public string? CandidateTitle { get; set; }
}
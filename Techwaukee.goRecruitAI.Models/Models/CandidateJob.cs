namespace Techwaukee.goRecruitAI.Models;

public partial class CandidateJob
{
    public int CandidateJobId { get; set; }

    public int CandidateId { get; set; }

    public string Jobcode { get; set; } = null!;

    public string CreatedBy { get; set; } = null!;

    public DateTime? CreatedOn { get; set; }

    public string? CandidateRemark { get; set; }

    public string? RecruiterRating { get; set; }

    public string? CandStatus { get; set; }

    public string? UpdatedBy { get; set; }

    public DateTime? UpdatedOn { get; set; }

    public string? CreatedTime { get; set; }

    public string? UpdatedTime { get; set; }

    public string? Remarkupdby { get; set; }

    public DateTime? NotsubmittedDate { get; set; }

    public DateTime? DraftDate { get; set; }

    public DateTime? PipelineDate { get; set; }

    public DateTime? SubmitToTlDate { get; set; }

    public DateTime? TlRejectedDate { get; set; }

    public DateTime? SubmittedToBpDate { get; set; }

    public DateTime? BpRejectedDate { get; set; }

    public DateTime? SubmittedToEcDate { get; set; }

    public DateTime? EcRejectedDate { get; set; }

    public DateTime? ClosureDate { get; set; }

    public DateTime? BpInterviewDate { get; set; }

    public DateTime? EcInterviewDate { get; set; }

    public DateTime? OnboardedDate { get; set; }

    public DateTime? NotOnboardedDate { get; set; }

    public string? SubmitToRecDate { get; set; }
}
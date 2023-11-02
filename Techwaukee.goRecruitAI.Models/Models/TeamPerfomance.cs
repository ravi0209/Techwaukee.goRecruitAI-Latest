namespace Techwaukee.goRecruitAI.Models;

public partial class TeamPerfomance
{
    public int Teamperfomanceid { get; set; }

    public int? CandidateTarget { get; set; }

    public int? CandidateAchieved { get; set; }

    public string? CandidateRemarks { get; set; }

    public int? VendorTarget { get; set; }

    public int? VendorAchieved { get; set; }

    public string? VendorRemarks { get; set; }

    public int? SubmissionTarget { get; set; }

    public int? SubmissionAchieved { get; set; }

    public string? SubmittionRemarks { get; set; }

    public int? TlapprovalTarger { get; set; }

    public int? TlapprovalAchieved { get; set; }

    public string? TlapprovalRemarks { get; set; }

    public int? BpapprovalTarget { get; set; }

    public int? BpapprovalAchieved { get; set; }

    public string? BpapprovalRemarks { get; set; }

    public int? EcapprovalTarget { get; set; }

    public int? EcapprovalAchieved { get; set; }

    public string? EcapprovalRemarks { get; set; }

    public string? OverAllRating { get; set; }

    public string? Remarks { get; set; }

    public string? Tweid { get; set; }

    public string? Weekinfo { get; set; }

    public string? FeedbackGivenby { get; set; }

    public DateTime? FeedbackGivenon { get; set; }

    public string? FeedbackUpdatedby { get; set; }

    public DateTime? FeedbackUpdatedon { get; set; }
}
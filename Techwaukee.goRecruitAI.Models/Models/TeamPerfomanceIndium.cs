namespace Techwaukee.goRecruitAI.Models;

public partial class TeamPerfomanceIndium
{
    public int Teamperfomanceid { get; set; }

    public int? SubmissionTarget { get; set; }

    public int? SubmissionAchieved { get; set; }

    public string? SubmissionPercentage { get; set; }

    public string? SubmissionRemarks { get; set; }

    public int? TlapprovalTarget { get; set; }

    public int? TlapprovalAchieved { get; set; }

    public string? Tlpercentage { get; set; }

    public string? TlapprovalRemarks { get; set; }

    public int? BpapprovalTarget { get; set; }

    public int? BpapprovalAchieved { get; set; }

    public string? Bppercentage { get; set; }

    public string? BpapprovalRemarks { get; set; }

    public string? OverAllRating { get; set; }

    public string? Remarks { get; set; }

    public string? Tweid { get; set; }

    public string? Weekinfo { get; set; }

    public string? FeedbackGivenby { get; set; }

    public DateTime? FeedbackGivenon { get; set; }

    public string? FeedbackUpdatedby { get; set; }

    public DateTime? FeedbackUpdatedon { get; set; }
}
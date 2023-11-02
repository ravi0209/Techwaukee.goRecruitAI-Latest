namespace Techwaukee.goRecruitAI.Models;

public partial class TeamPerfomanceIndiaWeekly
{
    public int Teamperfomanceid { get; set; }

    public string? OverAllRating { get; set; }

    public string? Remarks { get; set; }

    public string? Tweid { get; set; }

    public string? Weekinfo { get; set; }

    public string? FeedbackGivenby { get; set; }

    public DateTime? FeedbackGivenon { get; set; }

    public string? FeedbackUpdatedby { get; set; }

    public DateTime? FeedbackUpdatedon { get; set; }

    public int? OverAllValue { get; set; }

    public int? OverAllSystemValue { get; set; }
}
namespace Techwaukee.goRecruitAI.Models;

public partial class ScoreMaster
{
    public int ScoreId { get; set; }

    public string? ScoreCategory { get; set; }

    public string? ScoreType { get; set; }

    public int? ScoreValue { get; set; }

    public int? Status { get; set; }
}
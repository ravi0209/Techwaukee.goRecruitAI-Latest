namespace Techwaukee.goRecruitAI.Models;

public partial class JobMatchSkillPercentage
{
    public int JobMatchSkillId { get; set; }

    public string? Jobcode { get; set; }

    public int? Candidateid { get; set; }

    public int? Priskillmatchingpercentage { get; set; }

    public int? Secskillmatchingpercentage { get; set; }

    public int? Totalyrspercentage { get; set; }

    public int? Linkedinpercentage { get; set; }

    public int? Overallmatchingpercentage { get; set; }
}
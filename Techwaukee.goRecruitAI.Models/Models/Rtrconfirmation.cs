namespace Techwaukee.goRecruitAI.Models;

public partial class Rtrconfirmation
{
    public int Rtrconfirmationid { get; set; }

    public string? Candidateemaildid { get; set; }

    public string? Employeremaildid { get; set; }

    public string? Jobcode { get; set; }

    public string? Rtremailstatus { get; set; }

    public DateTime? Mailsenton { get; set; }

    public string? Senttime { get; set; }
}
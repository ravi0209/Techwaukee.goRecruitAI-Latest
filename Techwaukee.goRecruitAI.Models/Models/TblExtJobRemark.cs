namespace Techwaukee.goRecruitAI.Models;

public partial class TblExtJobRemark
{
    public int TblJobRemarksIndiaId { get; set; }

    public string? Jobcode { get; set; }

    public string? Remarks { get; set; }

    public string? RemGivenby { get; set; }

    public DateTime? RemGivenon { get; set; }

    public string? RemGiventime { get; set; }
}
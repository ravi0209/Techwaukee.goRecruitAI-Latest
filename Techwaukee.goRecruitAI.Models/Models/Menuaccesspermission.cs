namespace Techwaukee.goRecruitAI.Models;

public partial class Menuaccesspermission
{
    public int Menuaccessid { get; set; }

    public int? Roleid { get; set; }

    public int? Regionid { get; set; }

    public int? JobAccess { get; set; }

    public int? JobCreation { get; set; }

    public int? JobEdit { get; set; }

    public int? JobView { get; set; }

    public int? JobFeedback { get; set; }

    public int? CandidateAccess { get; set; }

    public int? CandidateCreation { get; set; }

    public int? CandidateEdit { get; set; }

    public int? CandidateView { get; set; }

    public int? VendorAccess { get; set; }

    public int? VendorCreation { get; set; }

    public int? VendorEdit { get; set; }

    public int? VendorView { get; set; }

    public int? Status { get; set; }
}
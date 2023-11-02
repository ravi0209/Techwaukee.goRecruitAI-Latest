namespace Techwaukee.goRecruitAI.ViewModels
{
    public class JobInfo
    {
        public string Jobcode { get; set; } = null!;

        public string? JobTitle { get; set; }

        public string? Duration { get; set; }

        public string? EmplType { get; set; }

        public string? Location { get; set; }

        public string? City { get; set; }

        public string? State { get; set; }

        public string? Country { get; set; }

        public string? Clientname { get; set; }

        public string? Contactname { get; set; }

        public string? Description { get; set; }

        public string? AssignedTo { get; set; }

        public string? Prioritylevel { get; set; }

        public int? Prioritylevelid { get; set; }

        public string? Jobstatus { get; set; }

        public string? WorkType1 { get; set; }

        public string? Rate1 { get; set; }

        public string? Currency1 { get; set; }

        public string? WorkType2 { get; set; }

        public string? Rate2 { get; set; }

        public string? Currency2 { get; set; }

        public string? Skill { get; set; }

        public DateTime? Jobopendate { get; set; }

        public DateTime? Jobclosedate { get; set; }

        public string? OpenComments { get; set; }

        public string? CloseComments { get; set; }

        public string? Jobimage { get; set; }

        public string? CreatedBy { get; set; }

        public DateTime? CreatedOn { get; set; }

        public string? LastUpdatedBy { get; set; }

        public DateTime? LastUpdatedOn { get; set; }

        public string? CreatedTime { get; set; }

        public string? UpdatedTime { get; set; }

        public string? PublishWeb { get; set; }

        public int JobMasterId { get; set; }

        public int? ImageFolderpath { get; set; }

        public int? Experience { get; set; }

        public string? Durationtype { get; set; }

        public int? ClosedBy { get; set; }

        public int? Noofopening { get; set; }

        public string? AssignedToVendor { get; set; }

        public string? AssignedToVendorContact { get; set; }

        public string? Primaryrecruitercontact { get; set; }

        public string? Externaljobcode { get; set; }

        public int? TotalNoofyrs { get; set; }

        public string? Jobopendatevalue { get; set; }

        public List<CandOnboarddetails>? Jobonboarddatevalue { get; set; }

        public int? subcount { get; set; }

        public List<Submissioncount>? Submissioncount { get; set; }

        public List<RemarksInfo>? remarksInfo { get; set; }

        public List<Jobcount>? jobcounts { get; set; }

        public List<Skill>? JobPrimarySkill { get; set; }
        public List<Skill>? JobSecondarySkill { get; set; }
    }

    public class RemarksInfo
    {
        public string? Remarksgivenby { get; set; }

        public string? Remarksgivenon { get; set; }

        public string? Remarksgiventime { get; set; }

        public string? Remarksinfo { get; set; }

        public string? JobCode { get; set; }
    }

    public class Submissioncount
    {
        public string? CandStatusName { get; set; }
        public int CandStatusId { get; set; }
        public int TotalCount { get; set; }

        public string? JobCode { get; set; }
    }

    public class Jobcount
    {
        public string? JobStatusName { get; set; }
        public int TotalCount { get; set; }
    }

    public class CandOnboarddetails
    {
        public string? OnboardDate { get; set; }
        public string? Jobcode { get; set; }
    }

    public class Skill
    {
        public string? JobSkillID { get; set; }
        public string? Jobcode { get; set; }
        public string? JobSkillName { get; set; }
        public string? JobYrsofExp { get; set; }
    }

    //public class Submissioncount
    //{
    //    public int Submission_TLcount { get; set; }
    //    public int Submission_BPcount { get; set; }
    //    public int Submission_ECcount { get; set; }
    //    public int Rejection_count { get; set; }
    //    public int Applied_count { get; set; }
    //}
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Techwaukee.goRecruitAI.Models
{
    public class Jobdetail
    {
        public string? Jobcode { get; set; }
        public string? JobTitle { get; set; }
        public string? Duration { get; set; }
        public string DurationType { get; set; }

        public string? EmplType { get; set; }
        public string? Location { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public string? Country { get; set; }
        public string? ClientName { get; set; }
        public string? Contactname { get; set; }
        public string? ContactnameID { get; set; }
        public string? Description { get; set; }
        public string? AssignedTo { get; set; }
        public string? PriorityLevel { get; set; }
        public string? Jobstatus { get; set; }

        public double? Rate1 { get; set; }
        public string? WorkType1 { get; set; }
        public string? Currency1 { get; set; }
        public double? Rate2 { get; set; }
        public string? WorkType2 { get; set; }
        public string? Currency2 { get; set; }

        public string? Jobopendate { get; set; }

        public string? Created_By { get; set; }
        public string? Created_Time { get; set; }
        public List<Skill>? JobPrimarySkill { get; set; }
        public List<Skill>? JobSecondarySkill { get; set; }
        public List<CandidateInfoDetails>? JobCandidateDetails { get; set; }
        public List<Jobcount> lstCandcounts { get; set; }


        //public string Skill { get; set; }

        //public string Jobclosedate { get; set; }
        //public string OpenComments { get; set; }
        //public string CloseComments { get; set; }
        //public string Jobimage { get; set; }
        //public string Created_By { get; set; }
        //public string Created_On { get; set; }
        //public string Created_Time { get; set; }
        //public string Updated_By { get; set; }
        //public string Updated_By_ID { get; set; }
        //public string Updated_On { get; set; }
        //public string Updated_Time { get; set; }
        //public string Publish_Web { get; set; }
        //public string Mode { get; set; }
        //public string Remarks { get; set; }
        public List<RemarksInfo> lstRemarks { get; set; }
        //public string Experience { get; set; }

        //public string Closedby { get; set; }
        //public string AssignedToVendor { get; set; }
        //public string AssignedToVendorContact { get; set; }
        //public string Primaryrecruitercontact { get; set; }
        //public string PrimaryrecruiterID { get; set; }
        //public string Noofopening { get; set; }

        ////Bench Sales
        //public string Contactperson { get; set; }
        //public string Emailid { get; set; }
        //public string ContactNo { get; set; }
        //public string Company_Name { get; set; }
        //public string Company_NameID { get; set; }
        //public string Linkedin { get; set; }
        //public string Website { get; set; }
        //public string CustomerJobID { get; set; }
        //public string submissionRate { get; set; }
        //public string Created_by { get; set; }
        //public string Portal_Name { get; set; }
        //public string Job_URL { get; set; }
        //public string Portal_Company_Name { get; set; }
        //public string Portal_Company_NameID { get; set; }
        //public List<Jobcode> lstRemarksBS { get; set; }
        //public List<Jobcode> lstExternaljobDetailsBS { get; set; }
        //public string candid { get; set; }
        //public string FutureDate { get; set; }
        //public string FutureDateComments { get; set; }
        //public string projectExtDate { get; set; }
        //public string projectExtComments { get; set; }
        //public string Newjobcode { get; set; }
        ////Vishnu V 06 Dec 2022
        //public List<Jobcode> interviewdetail { get; set; }
        //public string candcommentinterviewid { get; set; }
        //public string candidateid { get; set; }
        //public string InterviewId { get; set; }
        //public string InterviewType { get; set; }
        //public string InterviewerName { get; set; }
        //public string Interviewdate { get; set; }
        //public string Interviewtime { get; set; }
        //public string Interviewerzone { get; set; }
        //public string InterviewStatus { get; set; }
        //public string IntSchdate { get; set; }
        //public string IntNoSchdate { get; set; }
        //public string Intcomgivenby { get; set; }
        //public string Intcomgivenon { get; set; }
        //public string Intcomgiventime { get; set; }
        //public string Intupdategivenby { get; set; }
        //public string Intupdategivenon { get; set; }
        //public string Intupdategiventime { get; set; }
        //public string FeedbackType { get; set; }
        //public string MgrComments { get; set; }
        //public string Mgrcomgivenby { get; set; }
        //public string Mgrcomgivenon { get; set; }
        //public string Mgrcomgiventime { get; set; }
        //public string Mgrupdategivenby { get; set; }
        //public string Mgrupdategivenon { get; set; }
        //public string Mgrupdategiventime { get; set; }
        //public string MgrAppdate { get; set; }
        //public string MgrRejdate { get; set; }
        //public string MgrHolddate { get; set; }
        //public string FeedbackStatus { get; set; }
        //public string Portal_Contact_Name { get; set; }
        //public string Portal_Contact_NameID { get; set; }
        //public string Portal_Contact_Email { get; set; }
        //public string Portal_Contact_Phone { get; set; }
        //public string BSCreated_By { get; set; }
        //public string TLRating { get; set; }
        //public string Externaljobcode { get; set; }
        ////public List<candidatelist> lstJob { get; set; }
        //public string CandidateName { get; set; }
        //public string candidateemailid { get; set; }
        //public string candidatemobno { get; set; }
        //public string Submitted_by { get; set; }
        //public string PortalName { get; set; }
        //public string ClientCompany { get; set; }
        //public List<Skill> lstPrimarySkill { get; set; }
        //public List<Skill> lstSecondarySkill { get; set; }
        //public string TotalyrsofExp { get; set; }
        //public string Added_cand { get; set; }
        //public string draft_cand { get; set; }
        //public string Applied_Cand { get; set; }
        //public string Rejected { get; set; }
        //public string Closure { get; set; }
        //public string Interview { get; set; }

        //public int TotNoyrs { get; set; }
        //public int TotPriNoyrs { get; set; }
        //public int TotSecNoyrs { get; set; }
        //public string StateID { get; set; }
        //public string CityID { get; set; }
        //public string BenchCand { get; set; }
        //public string VendorCand { get; set; }


    }

    public class Employees
    {
        public string? Name { get; set; }

        public string? TWE_ID { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Techwaukee.goRecruitAI.Models
{
    public class CandidateInfoDetails
    {
        public int Candidateid { get; set; }

        public string? Candidateemailid { get; set; }

        public string? Candidatemobileno { get; set; }

        public string? Candidatename { get; set; }

        public string? CurrentLocation { get; set; }

        public string? VisaStatus { get; set; }

        public string? YearsofExp { get; set; }

        public double? RatePerHr { get; set; }

        public string? Type { get; set; }

        public string? Ratecoverage { get; set; }

        public string? Relocate { get; set; }

        public string? SkillsandCertif { get; set; }

        public string? LinkedinUrl { get; set; }

        public string? NoticePeriod { get; set; }

        public string? Availableforinterview { get; set; }

        public string? Employerid { get; set; }

        public string? SubmittedTo { get; set; }

        public string? CreatedBy { get; set; }

        public string? CreatedOn { get; set; }

        public string? CreatedTime { get; set; }

        public string? LastUpdatedBy { get; set; }

        public DateTime? LastUpdatedOn { get; set; }

        public string? UpdatedTime { get; set; }

        public string? Additionalskill { get; set; }

        public string? PrimarySkill { get; set; }

        public string? Certification { get; set; }

        public string? AcknowledgementContent { get; set; }


        public string? Firstname { get; set; }

        public string? Lastname { get; set; }

        public string? Sourcedfrom { get; set; }

        public string? Referralname { get; set; }

        public string? Vendorname { get; set; }

        public string? Portalname { get; set; }

        public string? Additionalprimaryskill { get; set; }

        public string? Additionalcertification { get; set; }

        public string? Title { get; set; }

        public int? BsStatus { get; set; }

        public int? Country { get; set; }

        public string? State { get; set; }

        public string? City { get; set; }

        public string? Jobcode { get; set; }

        public string? JobTitle { get; set; }

        public string? JobType { get; set; }

        public string? JobLocation { get; set; }

        public string? Priority { get; set; }
        public string? CandStatus { get; set; }

        public string? Duration { get; set; }

        public string? DurationType { get; set; }

        public string? Client { get; set; }
        public List<Skill>? JobPrimarySkill { get; set; }
        public List<Skill>? JobSecondarySkill { get; set; }

        public string? DateInterview { get; set; }
        public string? TimeInterview { get; set; }

        public List<CandOnboarddetails>? Jobonboarddatevalue { get; set; }
        public string AssessmentRating { get; set; }

        public string? AssessmentRemarks { get; set; }

        public string? ResumeName { get; set; }

        public int? OverallSkillrating { get; set; }

        public List<Jobcount>? Candcounts { get; set; }

        public int? JobRate { get; set; }


    }

    public class AssessmentDetails
    {
        public int Candidateid { get; set; }

        public int AssessmentRating { get; set; }
    }
}

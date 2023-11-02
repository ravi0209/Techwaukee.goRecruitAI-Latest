using System.Xml.Linq;
using Techwaukee.goRecruitAI.Models;
using Techwaukee.goRecruitAI.Repository;
using Techwaukee.goRecruitAI.Repository.Models;

namespace Techwaukee.goRecruitAI.Services.Impl
{
    public class JobMasterService : IJobMasterService
    {
        private readonly RecruitContext dbContext;

        public JobMasterService(RecruitContext dbContext)
        {
            this.dbContext = dbContext;
        }

        #region Public Methods

        public async Task<IEnumerable<JobInfo>> GetJobDetails(string tabName)
        {
           
                IEnumerable<JobInfo> jobDetails = new List<JobInfo>();

                if (tabName == "Active")
                {
                    return GetActiveJobDetails();
                }
                else if (tabName == "Inactive")
                {
                    return GetInactiveJobDetails();
                }
                else if (tabName == "Overall")
                {
                    return GetOverallJobDetails();
                }
                else if (tabName == "Interview")
                {
                    return GetInterviewJobDetails();
                }
                else if (tabName == "Closure")
                {
                    return GetClosureJobDetails();
                }
                else if (tabName == "Notfilled")
                {
                    return GetNotfilledJobDetails();
                }
                else
                {
                    return jobDetails;
                }
            
        }

        public async Task<IEnumerable<CandidateInfoDetails>> GetJobCandidateInformation(string jobcode, string tabName)
        {

            List<CandidateInfoDetails> candidateDetails = new List<CandidateInfoDetails>();

            var priSkill = (from Can in dbContext.CandidateDetails
                            join canski in dbContext.CandidateJobSkillUsas on Can.CandidateId equals Convert.ToInt32(canski.CandidateId)
                            join ski in dbContext.SkillMasters on Convert.ToInt32(canski.Skill) equals ski.SkillId
                            join yer in dbContext.YearMasters on canski.YearsHaving equals yer.YearId
                           
                            select new Skill
                            {
                                JobSkillID = canski.SkillId.ToString(),
                                JobSkillName = ski.Name,
                                JobYrsofExp = yer.Year,
                                Jobcode = Can.CandidateId.ToString()

                            }).ToList();

            //var secSkill = (from Can in dbContext.CandidateDetails
            //                join canski in dbContext.CandidateJobSkillUsas on Can.CandidateId equals Convert.ToInt32(canski.CandidateId)
            //                join ski in dbContext.SkillMasters on Convert.ToInt32(canski.Skill) equals ski.SkillId
            //                join yer in dbContext.YearMasters on Convert.ToInt32(canski.YrsofExp) equals yer.YearMasterId

            //                select new Skill
            //                {
            //                    JobSkillID = canski.CandidateJobSkillId.ToString(),
            //                    JobSkillName = ski.SkillName,
            //                    JobYrsofExp = yer.YearMasterName,
            //                    Jobcode = Can.CandidateId.ToString()
            //                }).ToList();



            if (tabName == "Inprogress")
            {
                try
                {
                    candidateDetails = (from Can in dbContext.CandidateDetails
                                        join Canjob in dbContext.CandidateJobs on Convert.ToInt32(Can.CandidateId) equals Canjob.CandidateId
                                        join job in dbContext.JobMasterUsas on Canjob.Jobcode equals job.Jobcode
                                        join typ in dbContext.TypeMasters on Convert.ToInt32(Can.Type) equals typ.TypeId
                                        join candsta in dbContext.CandidateStatusMasters on Convert.ToInt32(Canjob.CandStatus) equals candsta.CandidateStatusId
                                        join canpro in dbContext.Candproofdetails on Can.CandidateId equals Convert.ToInt32(canpro.Candidateid)
                                        where canpro.Documenttype == "Resume"
                                        //join cou in _context.CountryMasters on Convert.ToInt32(Can.Country) equals cou.CountryId
                                        //into coutemp
                                        //from cou1 in coutemp.DefaultIfEmpty()
                                        join vis in dbContext.VisaMasters on Convert.ToInt32(Can.VisaStatus) equals vis.VisaId
                                        into vistemp
                                        from vis1 in vistemp.DefaultIfEmpty()
                                        join userpr in dbContext.Userprofilecreations on Can.CreatedBy equals userpr.TweId
                                        join sta in dbContext.StateMasters on Can.State equals sta.StateId
                                        into statemp
                                        from sta1 in statemp.DefaultIfEmpty()
                                        join cit in dbContext.CityMasters on Can.City equals cit.CityId
                                        into cittemp
                                        from cit1 in cittemp.DefaultIfEmpty()
                                        join canass in dbContext.AssessmentCheckRatings on Can.CandidateId equals canass.Candidateid
                                        into canasstemp
                                        from canass1 in canasstemp.DefaultIfEmpty()
                                        where (Canjob.CandStatus == "103" || Canjob.CandStatus == "105" || Canjob.CandStatus == "107") && job.Jobcode == jobcode

                                        select new CandidateInfoDetails
                                        {
                                            Candidateid = Can.CandidateId,
                                            Candidatename = Can.Name,
                                            Candidateemailid = Can.Email,
                                            Candidatemobileno = Can.MobileNo,
                                            LinkedinUrl = Can.LinkedinUrl,
                                            RatePerHr = Can.RatePerHr,
                                            CurrentLocation = Can.CurrentLocation == "" ? sta1.StateName + "," + cit1.CityName : Can.CurrentLocation,
                                            Type = typ.TypeName,
                                            VisaStatus = vis1.VisaName,
                                            YearsofExp = Can.YearsOfExp,
                                            //City = cit1.CityName,
                                            //State = sta1.StateName,
                                            CandStatus = candsta.CandidateStatusName,
                                            CreatedOn = Convert.ToDateTime(Can.CreatedAt).ToString("dd MMM yyyy"),
                                            CreatedBy = userpr.Firstname + " " + userpr.Initials,
                                            AssessmentRating = canass1.Overallrecruiterrating,
                                            AssessmentRemarks = canass1.Remarks,
                                            ResumeName = canpro.Idfilename,
                                            OverallSkillrating = 0,
                                            JobPrimarySkill = GetCandidateSkillInfo(Can.CandidateId.ToString(), priSkill),
                                            //JobSecondarySkill = GetCandidateSkillInfo(Can.CandidateId.ToString(), secSkill)

                                        }).ToList();



                }
                catch (Exception ex) { }
            }

            else if (tabName == "Rejected")
            {
                try
                {
                    candidateDetails = (from Can in dbContext.CandidateDetails
                                        join Canjob in dbContext.CandidateJobs on Convert.ToInt32(Can.CandidateId) equals Canjob.CandidateId
                                        join job in dbContext.JobMasterUsas on Canjob.Jobcode equals job.Jobcode
                                        join typ in dbContext.TypeMasters on Convert.ToInt32(Can.Type) equals typ.TypeId
                                        join candsta in dbContext.CandidateStatusMasters on Convert.ToInt32(Canjob.CandStatus) equals candsta.CandidateStatusId
                                        join canpro in dbContext.Candproofdetails on Can.CandidateId equals Convert.ToInt32(canpro.Candidateid)
                                        where canpro.Documenttype == "Resume"
                                        //join cou in _context.CountryMasters on Convert.ToInt32(Can.Country) equals cou.CountryId
                                        //into coutemp
                                        //from cou1 in coutemp.DefaultIfEmpty()
                                        join vis in dbContext.VisaMasters on Convert.ToInt32(Can.VisaStatus) equals vis.VisaId
                                        into vistemp
                                        from vis1 in vistemp.DefaultIfEmpty()
                                        join userpr in dbContext.Userprofilecreations on Can.CreatedBy equals userpr.TweId
                                        join sta in dbContext.StateMasters on Can.State equals sta.StateId
                                        into statemp
                                        from sta1 in statemp.DefaultIfEmpty()
                                        join cit in dbContext.CityMasters on Can.City equals cit.CityId
                                        into cittemp
                                        from cit1 in cittemp.DefaultIfEmpty()
                                        join canass in dbContext.AssessmentCheckRatings on Can.CandidateId equals canass.Candidateid
                                        into canasstemp
                                        from canass1 in canasstemp.DefaultIfEmpty()
                                        where (Canjob.CandStatus == "96" || Canjob.CandStatus == "100" || Canjob.CandStatus == "104" || Canjob.CandStatus == "106" || Canjob.CandStatus == "108") && job.Jobcode == jobcode

                                        select new CandidateInfoDetails
                                        {
                                            Candidateid = Can.CandidateId,
                                            Candidatename = Can.Name,
                                            Candidateemailid = Can.Email,
                                            Candidatemobileno = Can.MobileNo,
                                            LinkedinUrl = Can.LinkedinUrl,
                                            RatePerHr = Can.RatePerHr,
                                            CurrentLocation = Can.CurrentLocation == "" ? sta1.StateName + "," + cit1.CityName : Can.CurrentLocation,
                                            Type = typ.TypeName,
                                            VisaStatus = vis1.VisaName,
                                            YearsofExp = Can.YearsOfExp,
                                            //City = cit1.CityName,
                                            //State = sta1.StateName,
                                            CandStatus = candsta.CandidateStatusName,
                                            CreatedOn = Convert.ToDateTime(Can.CreatedAt).ToString("dd MMM yyyy"),
                                            CreatedBy = userpr.Firstname + " " + userpr.Initials,
                                            AssessmentRating = canass1.Overallrecruiterrating,
                                            AssessmentRemarks = canass1.Remarks,
                                            ResumeName = canpro.Idfilename,
                                            OverallSkillrating = 0,
                                            JobPrimarySkill = GetCandidateSkillInfo(Can.CandidateId.ToString(), priSkill),
                                            //JobSecondarySkill = GetCandidateSkillInfo(Can.CandidateId.ToString(), secSkill)

                                        }).Distinct().ToList();



                }
                catch (Exception ex) { }
            }
            else if (tabName == "Interview")
            {
                try
                {
                    candidateDetails = (from Can in dbContext.CandidateDetails
                                        join Canjob in dbContext.CandidateJobs on Convert.ToInt32(Can.CandidateId) equals Canjob.CandidateId
                                        join job in dbContext.JobMasterUsas on Canjob.Jobcode equals job.Jobcode
                                        join typ in dbContext.TypeMasters on Convert.ToInt32(Can.Type) equals typ.TypeId
                                        join candsta in dbContext.CandidateStatusMasters on Convert.ToInt32(Canjob.CandStatus) equals candsta.CandidateStatusId
                                        join canpro in dbContext.Candproofdetails on Can.CandidateId equals Convert.ToInt32(canpro.Candidateid)
                                        where canpro.Documenttype == "Resume"
                                        //join cou in _context.CountryMasters on Convert.ToInt32(Can.Country) equals cou.CountryId
                                        //into coutemp
                                        //from cou1 in coutemp.DefaultIfEmpty()
                                        join vis in dbContext.VisaMasters on Convert.ToInt32(Can.VisaStatus) equals vis.VisaId
                                        into vistemp
                                        from vis1 in vistemp.DefaultIfEmpty()
                                        join userpr in dbContext.Userprofilecreations on Can.CreatedBy equals userpr.TweId
                                        join sta in dbContext.StateMasters on Can.State equals sta.StateId
                                        into statemp
                                        from sta1 in statemp.DefaultIfEmpty()
                                        join cit in dbContext.CityMasters on Can.City equals cit.CityId
                                        into cittemp
                                        from cit1 in cittemp.DefaultIfEmpty()
                                        join canass in dbContext.AssessmentCheckRatings on Can.CandidateId equals canass.Candidateid
                                        into canasstemp
                                        from canass1 in canasstemp.DefaultIfEmpty()
                                        where (Canjob.CandStatus == "111" || Canjob.CandStatus == "110") && job.Jobcode == jobcode

                                        select new CandidateInfoDetails
                                        {
                                            Candidateid = Can.CandidateId,
                                            Candidatename = Can.Name,
                                            Candidateemailid = Can.Email,
                                            Candidatemobileno = Can.MobileNo,
                                            LinkedinUrl = Can.LinkedinUrl,
                                            RatePerHr = Can.RatePerHr,
                                            CurrentLocation = Can.CurrentLocation == "" ? sta1.StateName + "," + cit1.CityName : Can.CurrentLocation,
                                            Type = typ.TypeName,
                                            VisaStatus = vis1.VisaName,
                                            YearsofExp = Can.YearsOfExp,
                                            //City = cit1.CityName,
                                            //State = sta1.StateName,
                                            CandStatus = candsta.CandidateStatusName,
                                            CreatedOn = Convert.ToDateTime(Can.CreatedAt).ToString("dd MMM yyyy"),
                                            CreatedBy = userpr.Firstname + " " + userpr.Initials,
                                            AssessmentRating = canass1.Overallrecruiterrating,
                                            AssessmentRemarks = canass1.Remarks,
                                            ResumeName = canpro.Idfilename,
                                            OverallSkillrating = 0,
                                            JobPrimarySkill = GetCandidateSkillInfo(Can.CandidateId.ToString(), priSkill),
                                            //JobSecondarySkill = GetCandidateSkillInfo(Can.CandidateId.ToString(), secSkill)

                                        }).ToList();



                }
                catch (Exception ex) { }
            }

            else if (tabName == "Closure")
            {
                try
                {
                    candidateDetails = (from Can in dbContext.CandidateDetails
                                        join Canjob in dbContext.CandidateJobs on Convert.ToInt32(Can.CandidateId) equals Canjob.CandidateId
                                        join job in dbContext.JobMasterUsas on Canjob.Jobcode equals job.Jobcode
                                        join typ in dbContext.TypeMasters on Convert.ToInt32(Can.Type) equals typ.TypeId
                                        join candsta in dbContext.CandidateStatusMasters on Convert.ToInt32(Canjob.CandStatus) equals candsta.CandidateStatusId
                                        join canpro in dbContext.Candproofdetails on Can.CandidateId equals Convert.ToInt32(canpro.Candidateid)
                                        where canpro.Documenttype == "Resume"
                                        //join cou in _context.CountryMasters on Convert.ToInt32(Can.Country) equals cou.CountryId
                                        //into coutemp
                                        //from cou1 in coutemp.DefaultIfEmpty()
                                        join vis in dbContext.VisaMasters on Convert.ToInt32(Can.VisaStatus) equals vis.VisaId
                                        into vistemp
                                        from vis1 in vistemp.DefaultIfEmpty()
                                        join userpr in dbContext.Userprofilecreations on Can.CreatedBy equals userpr.TweId
                                        join sta in dbContext.StateMasters on Can.State equals sta.StateId
                                        into statemp
                                        from sta1 in statemp.DefaultIfEmpty()
                                        join cit in dbContext.CityMasters on Can.City equals cit.CityId
                                        into cittemp
                                        from cit1 in cittemp.DefaultIfEmpty()
                                        join canass in dbContext.AssessmentCheckRatings on Can.CandidateId equals canass.Candidateid
                                        into canasstemp
                                        from canass1 in canasstemp.DefaultIfEmpty()
                                        where (Canjob.CandStatus == "109" || Canjob.CandStatus == "112") && job.Jobcode == jobcode

                                        select new CandidateInfoDetails
                                        {
                                            Candidateid = Can.CandidateId,
                                            Candidatename = Can.Name,
                                            Candidateemailid = Can.Email,
                                            Candidatemobileno = Can.MobileNo,
                                            LinkedinUrl = Can.LinkedinUrl,
                                            RatePerHr = Can.RatePerHr,
                                            CurrentLocation = Can.CurrentLocation == "" ? sta1.StateName + "," + cit1.CityName : Can.CurrentLocation,
                                            Type = typ.TypeName,
                                            VisaStatus = vis1.VisaName,
                                            YearsofExp = Can.YearsOfExp,
                                            //City = cit1.CityName,
                                            //State = sta1.StateName,
                                            CandStatus = candsta.CandidateStatusName,
                                            CreatedOn = Convert.ToDateTime(Can.CreatedAt).ToString("dd MMM yyyy"),
                                            CreatedBy = userpr.Firstname + " " + userpr.Initials,
                                            AssessmentRating = canass1.Overallrecruiterrating,
                                            AssessmentRemarks = canass1.Remarks,
                                            ResumeName = canpro.Idfilename,
                                            OverallSkillrating = 0,
                                            JobPrimarySkill = GetCandidateSkillInfo(Can.CandidateId.ToString(), priSkill),
                                            //JobSecondarySkill = GetCandidateSkillInfo(Can.CandidateId.ToString(), secSkill)

                                        }).ToList();



                }
                catch (Exception ex) { }
            }

            else if (tabName == "Draft")
            {
                try
                {
                    candidateDetails = (from Can in dbContext.CandidateDetails
                                        join Canjob in dbContext.CandidateJobs on Convert.ToInt32(Can.CandidateId) equals Canjob.CandidateId
                                        join job in dbContext.JobMasterUsas on Canjob.Jobcode equals job.Jobcode
                                        join typ in dbContext.TypeMasters on Convert.ToInt32(Can.Type) equals typ.TypeId
                                        join candsta in dbContext.CandidateStatusMasters on Convert.ToInt32(Canjob.CandStatus) equals candsta.CandidateStatusId
                                        join canpro in dbContext.Candproofdetails on Can.CandidateId equals Convert.ToInt32(canpro.Candidateid)
                                        where canpro.Documenttype == "Resume"
                                        //join cou in _context.CountryMasters on Convert.ToInt32(Can.Country) equals cou.CountryId
                                        //into coutemp
                                        //from cou1 in coutemp.DefaultIfEmpty()
                                        join vis in dbContext.VisaMasters on Convert.ToInt32(Can.VisaStatus) equals vis.VisaId
                                        into vistemp
                                        from vis1 in vistemp.DefaultIfEmpty()
                                        join userpr in dbContext.Userprofilecreations on Can.CreatedBy equals userpr.TweId
                                        join sta in dbContext.StateMasters on Can.State equals sta.StateId
                                        into statemp
                                        from sta1 in statemp.DefaultIfEmpty()
                                        join cit in dbContext.CityMasters on Can.City equals cit.CityId
                                        into cittemp
                                        from cit1 in cittemp.DefaultIfEmpty()
                                        join canass in dbContext.AssessmentCheckRatings on Can.CandidateId equals canass.Candidateid
                                        into canasstemp
                                        from canass1 in canasstemp.DefaultIfEmpty()
                                        where (Canjob.CandStatus == "101") && job.Jobcode == jobcode

                                        select new CandidateInfoDetails
                                        {
                                            Candidateid = Can.CandidateId,
                                            Candidatename = Can.Name,
                                            Candidateemailid = Can.Email,
                                            Candidatemobileno = Can.MobileNo,
                                            LinkedinUrl = Can.LinkedinUrl,
                                            RatePerHr = Can.RatePerHr,
                                            CurrentLocation = Can.CurrentLocation == "" ? sta1.StateName + "," + cit1.CityName : Can.CurrentLocation,
                                            Type = typ.TypeName,
                                            VisaStatus = vis1.VisaName,
                                            YearsofExp = Can.YearsOfExp,
                                            //City = cit1.CityName,
                                            //State = sta1.StateName,
                                            CandStatus = candsta.CandidateStatusName,
                                            CreatedOn = Convert.ToDateTime(Can.CreatedAt).ToString("dd MMM yyyy"),
                                            CreatedBy = userpr.Firstname + " " + userpr.Initials,
                                            AssessmentRating = canass1.Overallrecruiterrating,
                                            AssessmentRemarks = canass1.Remarks,
                                            ResumeName = canpro.Idfilename,
                                            OverallSkillrating = 0,
                                            JobPrimarySkill = GetCandidateSkillInfo(Can.CandidateId.ToString(), priSkill),
                                            //JobSecondarySkill = GetCandidateSkillInfo(Can.CandidateId.ToString(), secSkill)

                                        }).ToList();



                }
                catch (Exception ex) { }
            }

            else if (tabName == "Applied Candidate")
            {
                try
                {
                    candidateDetails = (from Can in dbContext.CandidateDetails
                                        join Canjob in dbContext.CandidateJobs on Convert.ToInt32(Can.CandidateId) equals Canjob.CandidateId
                                        join job in dbContext.JobMasterUsas on Canjob.Jobcode equals job.Jobcode
                                        join typ in dbContext.TypeMasters on Convert.ToInt32(Can.Type) equals typ.TypeId
                                        join candsta in dbContext.CandidateStatusMasters on Convert.ToInt32(Canjob.CandStatus) equals candsta.CandidateStatusId
                                        join canpro in dbContext.Candproofdetails on Can.CandidateId equals Convert.ToInt32(canpro.Candidateid)
                                        where canpro.Documenttype == "Resume"
                                        join vis in dbContext.VisaMasters on Convert.ToInt32(Can.VisaStatus) equals vis.VisaId
                                        into vistemp
                                        from vis1 in vistemp.DefaultIfEmpty()
                                        join userpr in dbContext.Userprofilecreations on Can.CreatedBy equals userpr.TweId
                                        join sta in dbContext.StateMasters on Can.State equals sta.StateId
                                        into statemp
                                        from sta1 in statemp.DefaultIfEmpty()
                                        join cit in dbContext.CityMasters on Can.City equals cit.CityId
                                        into cittemp
                                        from cit1 in cittemp.DefaultIfEmpty()                                        
                                        where Canjob.CandStatus == "101" && job.Jobcode == jobcode && Canjob.CreatedBy == "TWEU0007"

                                        select new CandidateInfoDetails
                                        {
                                            Candidateid = Can.CandidateId,
                                            Candidatename = Can.Name,
                                            Candidateemailid = Can.Email,
                                            Candidatemobileno = Can.MobileNo,
                                            LinkedinUrl = Can.LinkedinUrl,
                                            RatePerHr = Can.RatePerHr,
                                            CurrentLocation = Can.CurrentLocation == "" ? sta1.StateName + "," + cit1.CityName : Can.CurrentLocation,
                                            Type = typ.TypeName,
                                            VisaStatus = vis1.VisaName,
                                            YearsofExp = Can.YearsOfExp,
                                            //City = cit1.CityName,
                                            //State = sta1.StateName,
                                            CandStatus = candsta.CandidateStatusName,
                                            CreatedOn = Convert.ToDateTime(Can.CreatedAt).ToString("dd MMM yyyy"),
                                            CreatedBy = userpr.Firstname + " " + userpr.Initials,
                                            //AssessmentRating = canass1.Overallrecruiterrating,
                                            //AssessmentRemarks = canass1.Remarks,
                                            ResumeName = canpro.Idfilename,
                                            OverallSkillrating = 0,
                                            JobPrimarySkill = GetCandidateSkillInfo(Can.CandidateId.ToString(), priSkill),
                                            //JobSecondarySkill = GetCandidateSkillInfo(Can.CandidateId.ToString(), secSkill)

                                        }).ToList();



                }
                catch (Exception ex) { }
            }

            else if (tabName == "Bench")
            {
                try
                {
                    candidateDetails=(from can in dbContext.CandidateDetails
                                      join canjob in dbContext.CandidateJobs on can.CandidateId equals canjob.CandidateId
                                      join empl in dbContext.EmployerDetails on Convert.ToInt32(can.EmployerId) equals empl.Employerid into emplGroup
                                      from empl in emplGroup.DefaultIfEmpty()
                                      join empc in dbContext.EmployerContactPeople on empl.Employerid equals Convert.ToInt32(empc.VendorId) into empcGroup
                                      from empc in empcGroup.DefaultIfEmpty()
                                      join up in dbContext.Userprofilecreations on canjob.CreatedBy equals up.TweId
                                      join up1 in dbContext.Userprofilecreations on canjob.UpdatedBy equals up1.TweId into upGroup
                                      from up1 in upGroup.DefaultIfEmpty()
                                      join typ in dbContext.TypeMasters on Convert.ToInt32(can.Type) equals typ.TypeId
                                      join sup in dbContext.SupplierContactPersonIndia on can.CreatedBy equals sup.Userid into supGroup
                                      from sup in supGroup.DefaultIfEmpty()
                                      join csm in dbContext.CandidateSourceMasters on Convert.ToInt32(can.SourcedFrom) equals csm.CandidateSourceId into csmGroup
                                      from csm in csmGroup.DefaultIfEmpty()
                                      join vm in dbContext.VisaMasters on Convert.ToInt32(can.VisaStatus) equals vm.VisaId into vmGroup
                                      from vm in vmGroup.DefaultIfEmpty()
                                      join acr in dbContext.AssessmentCheckRatings on can.CandidateId equals acr.Candidateid into acrGroup
                                      from acr in acrGroup.DefaultIfEmpty()
                                      join cms in dbContext.CandComments on can.CandidateId equals Convert.ToInt32(cms.Candidateid) into cmsGroup
                                      from cms in cmsGroup.DefaultIfEmpty()
                                      join cou in dbContext.CountryMasters on can.Country equals cou.CountryId into couGroup
                                      from cou in couGroup.DefaultIfEmpty()
                                      join stat in dbContext.StateMasters on can.State equals stat.StateId into sta1
                                      from stat in sta1.DefaultIfEmpty()
                                      join cit in dbContext.CityMasters on can.City equals cit.CityId into cit1
                                      from cit in cit1.DefaultIfEmpty()
                                      join vis in dbContext.VisaMasters on Convert.ToInt32(can.VisaStatus) equals vis.VisaId
                                      into vistemp
                                      from vis1 in vistemp.DefaultIfEmpty()
                                      join canpro in dbContext.Candproofdetails on can.CandidateId equals Convert.ToInt32(canpro.Candidateid)
                                      join csbs in dbContext.CandidateSubmissiondetailsBs on can.CandidateId equals csbs.Candidateid into csbsGroup
                                      from csbs in csbsGroup.DefaultIfEmpty()
                                      where can.BsStatus == 99 && canjob.CandStatus == "112" && !dbContext.CandidateDetails
                                                                                                  .Where(c => c.BsStatus == 99 && canjob.Jobcode == jobcode && canpro.Documenttype == "Resume")
                                                                                                  .Select(c => c.CandidateId)
                                                                                                  .Contains(can.CandidateId)




                                      select new CandidateInfoDetails
                                      {
                                          Candidateid = can.CandidateId,
                                          Candidatename = can.Name,
                                          Candidateemailid = can.Email,
                                          Candidatemobileno = can.MobileNo,
                                          LinkedinUrl = can.LinkedinUrl,
                                          RatePerHr = can.RatePerHr,
                                          CurrentLocation = can.CurrentLocation == "" ? stat.StateName + "," + cit.CityName : can.CurrentLocation,
                                          Type = typ.TypeName,
                                          VisaStatus = vis1.VisaName,
                                          YearsofExp = can.YearsOfExp,
                                          //City = cit1.CityName,
                                          //State = sta1.StateName,
                                          //CandStatus = candsta.CandidateStatusName,
                                          CreatedOn = Convert.ToDateTime(can.CreatedAt).ToString("dd MMM yyyy"),
                                          CreatedBy = up.Firstname + " " + up.Initials,
                                          AssessmentRating = acr.Overallrecruiterrating,
                                          AssessmentRemarks = acr.Remarks,
                                          ResumeName = canpro.Idfilename,
                                          OverallSkillrating = 0,
                                          JobPrimarySkill = GetCandidateSkillInfo(can.CandidateId.ToString(), priSkill),
                                          //JobSecondarySkill = GetCandidateSkillInfo(can.CandidateId.ToString(), secSkill)

                                      }).ToList();

                    //select new
                    //                  {
                    //                      can.CandidateId,
                    //                      CandidateEmailId = "",
                    //                      can.CandidateMobileNo,
                    //                      can.CandidateName,
                    //                      can.RatePerHr,
                    //                      TypeName = typ.TypeName,
                    //                      empc.MailId,
                    //                      empc.ContactPerson,
                    //                      EmployerCorporationName = "",
                    //                      Cand_Status = "",
                    //                      Submitted_To = "",
                    //                      Created_By = canjob.UpdatedBy == null ? (up.FirstName + " " + up.Initials) : (up1.FirstName + " " + up1.Initials),
                    //                      Created_On = can.CreatedOn.ToString("dd MMM yyyy"), // Change the format as needed
                    //                      can.LinkedInURL,
                    //                      CreatedTime = "", // You need to specify the correct property for CreatedTime
                    //                      CandidateStatus = "",
                    //                      CandidateSourceName = csm != null ? csm.CandidateSourceName : "",
                    //                      can.YearsOfExp,
                    //                      CurrentLocation = string.IsNullOrEmpty(can.CurrentLocation) ? (cit.CityName + ", " + stat.StateName) : can.CurrentLocation,
                    //                      VisaName = vm != null ? vm.VisaName : "",
                    //                      can.OverallRecruiterRating,
                    //                      AvailableDate = can.AvailableDate.HasValue ? can.AvailableDate.Value.ToString("dd MMM yyyy") : "",
                    //                      ACRRemarks = acr != null ? acr.Remarks : ""
                    //                  }).ToList(); 




                    //candidateDetails = (from Can in dbContext.CandidateDetails
                    //                    join Canjob in dbContext.CandidateJobs on Convert.ToInt32(Can.CandidateId) equals Canjob.CandidateId
                    //                    join job in dbContext.JobMasterUsas on Canjob.Jobcode equals job.Jobcode
                    //                    join typ in dbContext.TypeMasters on Convert.ToInt32(Can.Type) equals typ.TypeId
                    //                    join candsta in dbContext.CandidateStatusMasters on Convert.ToInt32(Canjob.CandStatus) equals candsta.CandidateStatusId
                    //                    join canpro in dbContext.Candproofdetails on Can.CandidateId equals Convert.ToInt32(canpro.Candidateid)
                    //                    where canpro.Documenttype == "Resume"
                    //                    //join cou in _context.CountryMasters on Convert.ToInt32(Can.Country) equals cou.CountryId
                    //                    //into coutemp
                    //                    //from cou1 in coutemp.DefaultIfEmpty()
                    //                    join vis in dbContext.VisaMasters on Convert.ToInt32(Can.VisaStatus) equals vis.VisaId
                    //                    into vistemp
                    //                    from vis1 in vistemp.DefaultIfEmpty()
                    //                    join userpr in dbContext.Userprofilecreations on Can.CreatedBy equals userpr.TweId
                    //                    join sta in dbContext.StateMasters on Can.State equals sta.StateId
                    //                    into statemp
                    //                    from sta1 in statemp.DefaultIfEmpty()
                    //                    join cit in dbContext.CityMasters on Can.City equals cit.CityId
                    //                    into cittemp
                    //                    from cit1 in cittemp.DefaultIfEmpty()
                    //                    join canass in dbContext.AssessmentCheckRatings on Can.CandidateId equals canass.Candidateid
                    //                    into canasstemp
                    //                    from canass1 in canasstemp.DefaultIfEmpty()
                    //                    where (Canjob.CandStatus == "103" || Canjob.CandStatus == "105" || Canjob.CandStatus == "107") && job.Jobcode == jobcode

                    //                    select new CandidateInfoDetails
                    //                    {
                    //                        Candidateid = Can.CandidateId,
                    //                        Candidatename = Can.Name,
                    //                        Candidateemailid = Can.Email,
                    //                        Candidatemobileno = Can.MobileNo,
                    //                        LinkedinUrl = Can.LinkedinUrl,
                    //                        RatePerHr = Can.RatePerHr,
                    //                        CurrentLocation = Can.CurrentLocation == "" ? sta1.StateName + "," + cit1.CityName : Can.CurrentLocation,
                    //                        Type = typ.TypeName,
                    //                        VisaStatus = vis1.VisaName,
                    //                        YearsofExp = Can.YearsOfExp,
                    //                        //City = cit1.CityName,
                    //                        //State = sta1.StateName,
                    //                        CandStatus = candsta.CandidateStatusName,
                    //                        CreatedOn = Convert.ToDateTime(Can.CreatedAt).ToString("dd MMM yyyy"),
                    //                        CreatedBy = userpr.Firstname + " " + userpr.Initials,
                    //                        AssessmentRating = canass1.Overallrecruiterrating,
                    //                        AssessmentRemarks = canass1.Remarks,
                    //                        ResumeName = canpro.Idfilename,
                    //                        OverallSkillrating = 0,
                    //                        JobPrimarySkill = GetCandidateSkillInfo(Can.CandidateId.ToString(), priSkill),
                    //                        JobSecondarySkill = GetCandidateSkillInfo(Can.CandidateId.ToString(), secSkill)

                    //                    }).ToList();



                }
                catch (Exception ex) { }
            }

            return candidateDetails;

        }

        public async Task<IEnumerable<Jobdetail>> GetJobInformation(string Jobcode)
        {

            IEnumerable<Jobdetail> jobDetails = new List<Jobdetail>();


            jobDetails = (from job in dbContext.JobMasterUsas

                          join empl in dbContext.EmploymentTypeMasters on Convert.ToInt32(job.EmplType) equals empl.EmpTypeId
                          join loc in dbContext.LocationMasters on Convert.ToInt32(job.Location) equals loc.LocationId
                          join stat in dbContext.JobstatusMasters on Convert.ToInt32(job.Jobstatus) equals stat.JobstatusId
                          join cli in dbContext.ClientMasters on Convert.ToInt32(job.ClientName) equals cli.ClientId
                          join clicon in dbContext.ClientContactPeople on Convert.ToInt32(job.ContactName) equals clicon.ClientContactId
                          join pri in dbContext.PriorityMasters on Convert.ToInt32(job.PriorityLevel) equals pri.PriorityId
                          join cou in dbContext.CountryMasters on Convert.ToInt32(job.Country) equals cou.CountryId
                          join cur1 in dbContext.CurrencyMasters on Convert.ToInt32(job.Currency1) equals cur1.CurrencyId
                          join cur2 in dbContext.CurrencyMasters on Convert.ToInt32(job.Currency2) equals cur2.CurrencyId
                          into curtemp
                          from cur11 in curtemp.DefaultIfEmpty()
                          join sta in dbContext.StateMasters on Convert.ToInt32(job.State) equals sta.StateId
                          into statemp
                          from sta1 in statemp.DefaultIfEmpty()
                          join cit in dbContext.CityMasters on Convert.ToInt32(job.City) equals cit.CityId
                          into cittemp
                          from cit1 in cittemp.DefaultIfEmpty()
                          join typ in dbContext.TypeMasters on Convert.ToInt32(job.WorkType1) equals typ.TypeId
                          into typtemp
                          from typ1 in typtemp.DefaultIfEmpty()
                          join typ11 in dbContext.TypeMasters on Convert.ToInt32(job.WorkType2) equals typ11.TypeId
                          into typtemp1
                          from typ2 in typtemp1.DefaultIfEmpty()
                          join durtype in dbContext.DurationtypeMasters on job.DurationType equals durtype.Durationtypeid
                          into durtemp
                          from durtype1 in durtemp.DefaultIfEmpty()
                          join usp in dbContext.Userprofilecreations on job.CreatedBy equals usp.TweId
                          join usp1 in dbContext.Userprofilecreations on job.UpdatedBy equals usp1.TweId
                          into usptemp
                          from usp2 in usptemp.DefaultIfEmpty()
                          join sup in dbContext.SupplierDetailsIndia on Convert.ToInt32(job.AssignedToVendor) equals sup.Supplierid
                          into suptemp
                          from sup1 in suptemp.DefaultIfEmpty()
                          join supcon in dbContext.SupplierContactPersonIndia on job.AssignedToVendorContact equals supcon.Userid
                          into supcontemp
                          from supcon1 in supcontemp.DefaultIfEmpty()
                          join usp11 in dbContext.Userprofilecreations on job.PrimaryRecruiterContact equals usp11.TweId
                          into usptemp1
                          from usp21 in usptemp1.DefaultIfEmpty()
                          where job.Jobcode.Contains(Jobcode)

                          select new Jobdetail
                          {
                              Jobcode = job.Jobcode,
                              JobTitle = job.JobTitle,
                              Duration = job.Duration,
                              DurationType = durtype1.DurationType,
                              EmplType = empl.EmpTypeName,
                              Location = loc.LocationName,
                              State = sta1.StateName,
                              City = cit1.CityName,
                              Country = cou.CountryName,
                              Rate1 = job.Rate1,
                              WorkType1 = typ1.TypeName,
                              Rate2 = job.Rate2,
                              WorkType2 = typ2.TypeName,
                              PriorityLevel  = pri.PriorityName,
                              Jobopendate = Convert.ToDateTime(job.JobOpenDate).ToString("dd MMM yyyy"),
                              ClientName = cli.ClientDisplayName,
                              Contactname = clicon.ContactPerson,
                              Jobstatus = stat.JobstatusName,
                              Created_By = usp.Firstname,
                              Created_Time = job.CreatedAt.ToShortTimeString(),
                              AssignedTo = job.AssignedTo,
                              Description = job.Description,


                          }).ToList();

            jobDetails = GetAssignedTo(jobDetails.ToList());
            jobDetails = GetRemarks(jobDetails.ToList());
            jobDetails = GetSkillInfo(jobDetails.ToList());
            jobDetails = GetCandidateInfo(jobDetails.ToList());

            return jobDetails;


        }

        #endregion

        #region Private Methods

        private static List<Submissioncount> Getsubmissioncount(string jobcode, List<Submissioncount> candidateStatus)
        {
            var statusCount = candidateStatus.Where(wh => wh.JobCode == jobcode && (wh.CandStatusId == 103 || wh.CandStatusId == 105 || wh.CandStatusId == 107))
                .GroupBy(status => new { status.CandStatusName, status.CandStatusId })
                .OrderBy(cs => cs.Key.CandStatusName)
                .Select(grouping => new Submissioncount
                {
                    CandStatusName = grouping.Key.CandStatusName,
                    TotalCount = grouping.Count(),
                    CandStatusId = grouping.Key.CandStatusId,
                    JobCode = jobcode,
                }).ToList();


            //var statuscount = (from status in candidatestatus.where (wh => wh.jobcode == jobcode && (wh.candstatusid == 103 || wh.candstatusid == 105 || wh.candstatusid == 107)
            //                   )
            //                   group status by new { status.candstatusname, status.candstatusid } into grouping

            //                   orderby grouping.key.candstatusname
            //                   select new submissioncount
            //                   {
            //                       candstatusname = grouping.key.candstatusname,
            //                       totalcount = grouping.count(),
            //                       candstatusid = grouping.key.candstatusid,
            //                       jobcode = jobcode,
            //                   }).tolist();

            return statusCount;
        }

        private static List<Submissioncount> GetInterviewcandidatecount(string jobcode, List<Submissioncount> candidateStatus)
        {


            var statusCount = (from status in candidateStatus.Where(wh => wh.JobCode == jobcode && (wh.CandStatusId == 110 || wh.CandStatusId == 111))
                               group status by new { status.CandStatusName, status.CandStatusId } into grouping

                               orderby grouping.Key.CandStatusName
                               select new Submissioncount
                               {
                                   CandStatusName = grouping.Key.CandStatusName,
                                   TotalCount = grouping.Count(),
                                   CandStatusId = grouping.Key.CandStatusId,
                                   JobCode = jobcode,
                               }).ToList();

            return statusCount;
        }

        private static List<Submissioncount> GetClosurecandidatecount(string jobcode, List<Submissioncount> candidateStatus)
        {


            var statusCount = (from status in candidateStatus.Where(wh => wh.JobCode == jobcode && (wh.CandStatusId == 109 || wh.CandStatusId == 112))
                               group status by new { status.CandStatusName, status.CandStatusId } into grouping

                               orderby grouping.Key.CandStatusName
                               select new Submissioncount
                               {
                                   CandStatusName = grouping.Key.CandStatusName,
                                   TotalCount = grouping.Count(),
                                   CandStatusId = grouping.Key.CandStatusId,
                                   JobCode = jobcode,
                               }).ToList();

            return statusCount;
        }

        private static List<RemarksInfo> GetRemarksInfo(string jobcode, List<RemarksInfo> remarks)
        {

            var remarksInfo = (from tbl in remarks.Where(wh => wh.JobCode == jobcode)
                                   //group tbl by new {tbl.Remarksinfo, tbl.Remarksgivenby,tbl.Remarksgivenon } into grouping
                               orderby tbl.Remarksgivenon descending, tbl.Remarksgiventime descending
                               select new RemarksInfo

                               {
                                   Remarksgivenby = tbl.Remarksgivenby,
                                   Remarksinfo = tbl.Remarksinfo
                               }).Take(1).ToList();

            return remarksInfo;
        }

        private static List<Skill> GetPrimaryskillInfo(string jobcode, List<Skill> lstSkills)
        {

            var priSkillInfo = (from tbl in lstSkills.Where(wh => wh.Jobcode == jobcode)

                                select new Skill

                                {
                                    JobSkillID = tbl.JobSkillID,
                                    JobSkillName = tbl.JobSkillName,
                                    JobYrsofExp = tbl.JobYrsofExp
                                }).ToList();

            return priSkillInfo;
        }

        private static List<Skill> GetSecondaryskillInfo(string jobcode, List<Skill> lstSkills)
        {
            var priSkillInfo = (from tbl in lstSkills.Where(wh => wh.Jobcode == jobcode)

                                select new Skill

                                {
                                    JobSkillID = tbl.JobSkillID,
                                    JobSkillName = tbl.JobSkillName,
                                    JobYrsofExp = tbl.JobYrsofExp
                                }).ToList();

            return priSkillInfo;
        }

        private static List<Skill> GetCandidateSkillInfo(string candidateid, List<Skill> lstSkills)
        {

            var priSkillInfo = (from tbl in lstSkills.Where(wh => wh.Jobcode == candidateid)

                                select new Skill

                                {
                                    JobSkillID = tbl.JobSkillID,
                                    JobSkillName = tbl.JobSkillName,
                                    JobYrsofExp = tbl.JobYrsofExp
                                }).ToList();

            return priSkillInfo;
        }

        private static List<AssessmentDetails> GetCandidateAssessmentInfo(string candidateid, List<AssessmentDetails> lstAssessment)
        {


            var AssInfo = (from tbl in lstAssessment.Where(wh => wh.Candidateid == Convert.ToInt32(candidateid))

                           select new AssessmentDetails
                           {
                               AssessmentRating = tbl.AssessmentRating
                           }).ToList();

            return AssInfo;
        }

     
        private static List<Jobcount> GetJobCount(List<JobInfo> joblist)
        {
            List<Jobcount> jobcountDetails = new List<Jobcount>();

            jobcountDetails = (from status in joblist
                               group status by new { status.Jobstatus } into grouping
                               orderby grouping.Key.Jobstatus
                               select new Jobcount
                               {
                                   JobStatusName = grouping.Key.Jobstatus,
                                   TotalCount = grouping.Count(),
                               }).ToList();


            return jobcountDetails;



        }

        private static List<CandOnboarddetails> GetOnboarddate(string jobcode, List<CandOnboarddetails> candOnboard)
        {

            var onboarddetails = (from status in candOnboard.Where(wh => wh.Jobcode == jobcode)
                                  group status by new { status.OnboardDate } into grouping

                                  orderby grouping.Key.OnboardDate
                                  select new CandOnboarddetails
                                  {
                                      OnboardDate = grouping.Key.OnboardDate,
                                  }).ToList();

            return onboarddetails;
        }

        private List<Jobdetail> GetAssignedTo(List<Jobdetail> lstJobdetails)
        {
            List<Employees> jobassigntoDetails = new List<Employees>();
            string empName = "";

            //if (lstJobdetails[0].AssignedTo != null)
            if (lstJobdetails.FirstOrDefault()?.AssignedTo != null)
            {
                var tweIds = (lstJobdetails.FirstOrDefault()?.AssignedTo?.Trim() ?? string.Empty).Split(',', StringSplitOptions.RemoveEmptyEntries);
                jobassigntoDetails = dbContext.Userprofilecreations
                                     .Where(e => tweIds.Contains(e.TweId))
                                     .Select(up => new Employees
                                     {
                                         Name = up.Firstname,
                                         TWE_ID = up.TweId
                                     }).ToList();
            }

            lstJobdetails[0].AssignedTo = string.Join(", ", jobassigntoDetails.Select(j => j.Name));

            return lstJobdetails;
        }

        private List<Jobcount> GetJobCountDetails()
        {
            List<JobInfo> jobDetails = new List<JobInfo>();
            try
            {
                //jobcountDetails = (from job in _context.JobMasterUsas
                //                   where job.Jobcode == "10200" && (job.CreatedBy.Contains("%" + TWEID + "%") || job.AssignedTo.Contains("%" + TWEID + "%"))

                jobDetails = (from job in dbContext.JobMasterUsas
                              join stat in dbContext.JobstatusMasters on Convert.ToInt32(job.Jobstatus) equals stat.JobstatusId


                              select new JobInfo
                              {
                                  Jobstatus = stat.JobstatusName,
                                  Jobcode = job.Jobcode,
                              }).ToList();


            }
            catch (Exception ex)
            {

            }

            List<Jobcount> jobcount = new List<Jobcount>();

            jobcount = GetJobCount(jobDetails);

            List<Jobcount> jobcountdetails = new List<Jobcount>();


            int inactivecount = 0;
            int activecount = 0;

            for (int i = 0; i < jobcount.Count; i++)
            {
                if (jobcount[i].JobStatusName == "Open")
                {
                    activecount = jobcount[i].TotalCount;
                }
                else if (jobcount[i].JobStatusName == "Close")
                {

                    inactivecount += jobcount[i].TotalCount;
                }
                else if (jobcount[i].JobStatusName == "Hold")
                {

                    inactivecount += jobcount[i].TotalCount;
                }


            }

            jobcount.Clear();

            Jobcount j1 = new Jobcount();
            j1.JobStatusName = "Active Jobs";
            j1.TotalCount = activecount;
            jobcountdetails.Add(j1);

            /************/

            var priSkill = (from job in dbContext.JobMasterUsas
                            join jobski in dbContext.JobSkillUsas on job.Jobcode equals jobski.JobCode
                            join ski in dbContext.SkillMasters on Convert.ToInt32(jobski.SkillId) equals ski.SkillId
                            join yer in dbContext.YearMasters on Convert.ToInt32(jobski.YearsRequired) equals yer.YearId

                            select new Skill
                            {
                                JobSkillID = jobski.SkillId.ToString(),
                                JobSkillName = ski.Name,
                                JobYrsofExp = yer.Year,
                                Jobcode = job.Jobcode


                            }).ToList();


            var subjoblist = (from job in dbContext.JobMasterUsas
                              join canjob in dbContext.CandidateJobs on job.Jobcode equals canjob.Jobcode
                              where job.Jobstatus == 10200 && Convert.ToInt32(canjob.CandStatus) >= 103
                              select new JobInfo
                              {
                                  Jobcode = job.Jobcode
                              }).Distinct().ToList();

            var openjoblist = (from job in dbContext.JobMasterUsas
                               where job.Jobstatus == 10200
                               select new JobInfo
                               {
                                   Jobcode = job.Jobcode
                               }).ToList();

            string nonsubJob = "";
            int nonsubCount = 0;

            for (int i = 0; i < openjoblist.Count; i++)
            {

                for (int j = 0; j < subjoblist.Count; j++)
                {
                    if (openjoblist[i].Jobcode == subjoblist[j].Jobcode)
                    {
                        nonsubCount++;
                        nonsubJob += "'" + subjoblist[j].Jobcode + "',";
                    }


                }
            }

            int noSub = openjoblist.Count - nonsubCount;
            if (nonsubJob.Length != 0)
            {
                nonsubJob = nonsubJob.Substring(0, nonsubJob.Length - 1);
            }

            List<JobInfo> lstnoSubJob = new List<JobInfo>();
            lstnoSubJob = openjoblist;

            for (int y = 0; y < subjoblist.Count; y++)
            {
                for (int x = 0; x < lstnoSubJob.Count; x++)
                {
                    if (subjoblist[y].Jobcode == lstnoSubJob[x].Jobcode)
                    {
                        lstnoSubJob.RemoveAt(x);
                    }

                }

            }

            Jobcount j6 = new Jobcount();
            j6.JobStatusName = "Notfilled Jobs";
            j6.TotalCount = lstnoSubJob.Count;
            jobcountdetails.Add(j6);

            /********************/

            jobDetails = (from job in dbContext.JobMasterUsas
                          join canjob in dbContext.CandidateJobs on job.Jobcode equals canjob.Jobcode
                          join can in dbContext.CandidateDetails on canjob.CandidateId equals can.CandidateId
                          where job.Jobstatus == 10200 && (canjob.CandStatus == "110" || canjob.CandStatus == "111")


                          select new JobInfo
                          {
                              Jobstatus = "Interview",
                              Jobcode = job.Jobcode,
                          }).ToList();

            jobcount.Clear();

            if (jobDetails.Count > 0)
            {
                jobcount = GetJobCount(jobDetails);

                Jobcount j3 = new Jobcount();
                j3.JobStatusName = "Interview Jobs";
                j3.TotalCount = jobcount[0].TotalCount;
                jobcountdetails.Add(j3);

            }
            else
            {
                jobcount = GetJobCount(jobDetails);

                Jobcount j3 = new Jobcount();
                j3.JobStatusName = "Interview Jobs";
                j3.TotalCount = jobDetails.Count;
                jobcountdetails.Add(j3);

            }

            jobDetails = (from job in dbContext.JobMasterUsas
                          join canjob in dbContext.CandidateJobs on job.Jobcode equals canjob.Jobcode
                          join can in dbContext.CandidateDetails on canjob.CandidateId equals can.CandidateId
                          where (canjob.CandStatus == "109" || canjob.CandStatus == "112")


                          select new JobInfo
                          {
                              Jobstatus = "Closure",
                              Jobcode = job.Jobcode,
                          }).Distinct().ToList();

            jobcount.Clear();
            jobcount = GetJobCount(jobDetails);

            Jobcount j4 = new Jobcount();
            j4.JobStatusName = "Closure Jobs";
            j4.TotalCount = jobcount[0].TotalCount;
            jobcountdetails.Add(j4);


            Jobcount j2 = new Jobcount();
            j2.JobStatusName = "Inactive Jobs";
            j2.TotalCount = inactivecount;
            jobcountdetails.Add(j2);

            jobDetails = (from job in dbContext.JobMasterUsas

                          select new JobInfo
                          {
                              Jobstatus = "Overall",
                              Jobcode = job.Jobcode,
                          }).ToList();


            Jobcount j5 = new Jobcount();
            j5.JobStatusName = "Overall Jobs";
            j5.TotalCount = jobDetails.Count;
            jobcountdetails.Add(j5);

            return jobcountdetails;

        }

        private List<Jobdetail> GetRemarks(List<Jobdetail> lstJobdetails)
        {
            List<RemarksInfo> jobremarksDetails = new List<RemarksInfo>();

            jobremarksDetails = (from rem in dbContext.TblJobRemarks
                                 where rem.Jobcode == lstJobdetails[0].Jobcode
                                 orderby rem.RemGivenon descending

                                 select new RemarksInfo
                                 {
                                     Remarksinfo = rem.Remarks,
                                     Remarksgivenby = rem.RemGivenby,

                                 }).ToList();



            for (int i = 0; i < jobremarksDetails.Count; i++)
            {

                var jobremarksDetails1 = (from up in dbContext.Userprofilecreations.Where(wh => wh.TweId == jobremarksDetails[i].Remarksgivenby)

                                          select new Employees
                                          {
                                              Name = up.Firstname,
                                              TWE_ID = up.TweId,
                                          }).ToList();

                jobremarksDetails[i].Remarksgivenby = jobremarksDetails1[0].Name;
            }




            lstJobdetails[0].lstRemarks = jobremarksDetails.Take(1).ToList();


            return lstJobdetails;
        }

        private List<Jobdetail> GetSkillInfo(List<Jobdetail> lstJobdetails)
        {
            List<Skill> jobpriskillDetails = new List<Skill>();

            jobpriskillDetails = (from job in dbContext.JobMasterUsas
                                  join jobski in dbContext.JobSkillUsas on job.Jobcode equals jobski.JobCode
                                  join ski in dbContext.SkillMasters on Convert.ToInt32(jobski.SkillId) equals ski.SkillId
                                  join yer in dbContext.YearMasters on Convert.ToInt32(jobski.YearsRequired) equals yer.YearId
                                  where job.Jobcode == lstJobdetails[0].Jobcode && jobski.SkillType=="P"


                                  select new Skill
                                  {
                                      JobSkillID = jobski.SkillId.ToString(),
                                      JobSkillName = ski.Name,
                                      JobYrsofExp = yer.Year,
                                      Jobcode = job.Jobcode
                                  }).ToList();


            List<Skill> jobsecskillDetails = new List<Skill>();

            jobsecskillDetails = (from job in dbContext.JobMasterUsas
                                  join jobski in dbContext.JobSkillUsas on job.Jobcode equals jobski.JobCode
                                  join ski in dbContext.SkillMasters on Convert.ToInt32(jobski.SkillId) equals ski.SkillId
                                  join yer in dbContext.YearMasters on Convert.ToInt32(jobski.YearsRequired) equals yer.YearId
                                  where job.Jobcode == lstJobdetails[0].Jobcode && jobski.SkillType == "S"


                                  select new Skill
                                  {
                                      JobSkillID = jobski.SkillId.ToString(),
                                      JobSkillName = ski.Name,
                                      JobYrsofExp = yer.Year,
                                      Jobcode = job.Jobcode
                                  }).ToList();


            lstJobdetails[0].JobPrimarySkill = jobpriskillDetails.ToList();
            lstJobdetails[0].JobSecondarySkill = jobsecskillDetails.ToList();

            return lstJobdetails;
        }

        private List<Jobdetail> GetCandidateInfo(List<Jobdetail> lstJobdetails)
        {

            List<CandidateInfoDetails> candidateDetails = new List<CandidateInfoDetails>();

            lstJobdetails[0].lstCandcounts = GetCandidateCountDetails(lstJobdetails[0].Jobcode);


            var priSkill = (from Can in dbContext.CandidateDetails
                            join canski in dbContext.CandidateJobSkillUsas on Can.CandidateId equals Convert.ToInt32(canski.CandidateId)
                            join ski in dbContext.SkillMasters on Convert.ToInt32(canski.Skill) equals ski.SkillId
                            join yer in dbContext.YearMasters on Convert.ToInt32(canski.YearsHaving) equals yer.YearId

                            select new Skill
                            {
                                JobSkillID = canski.SkillId.ToString(),
                                JobSkillName = ski.Name,
                                JobYrsofExp = yer.Year,
                                Jobcode = Can.CandidateId.ToString()

                            }).ToList();

            //var secSkill = (from Can in dbContext.CandidateDetails
            //                join canski in dbContext.CandidateJobSecSkillUsas on Can.CandidateId equals Convert.ToInt32(canski.CandidateId)
            //                join ski in dbContext.SkillMasters on Convert.ToInt32(canski.SkillName) equals ski.SkillId
            //                join yer in dbContext.YearMasters on Convert.ToInt32(canski.YrsofExp) equals yer.YearMasterId

            //                select new Skill
            //                {
            //                    JobSkillID = canski.CandidateJobSkillId.ToString(),
            //                    JobSkillName = ski.SkillName,
            //                    JobYrsofExp = yer.YearMasterName,
            //                    Jobcode = Can.CandidateId.ToString()
            //                }).ToList();


            try
            {

                candidateDetails = (from Can in dbContext.CandidateDetails
                                    join Canjob in dbContext.CandidateJobs on Convert.ToInt32(Can.CandidateId) equals Canjob.CandidateId
                                    join job in dbContext.JobMasterUsas on Canjob.Jobcode equals job.Jobcode
                                    join typ in dbContext.TypeMasters on Convert.ToInt32(Can.Type) equals typ.TypeId
                                    join candsta in dbContext.CandidateStatusMasters on Convert.ToInt32(Canjob.CandStatus) equals candsta.CandidateStatusId
                                    join canpro in dbContext.Candproofdetails on Can.CandidateId equals Convert.ToInt32(canpro.Candidateid)
                                    where canpro.Documenttype == "Resume"
                                    //join cou in _context.CountryMasters on Convert.ToInt32(Can.Country) equals cou.CountryId
                                    //into coutemp
                                    //from cou1 in coutemp.DefaultIfEmpty()
                                    join vis in dbContext.VisaMasters on Convert.ToInt32(Can.VisaStatus) equals vis.VisaId
                                    into vistemp
                                    from vis1 in vistemp.DefaultIfEmpty()
                                    join userpr in dbContext.Userprofilecreations on Can.CreatedBy equals userpr.TweId
                                    join sta in dbContext.StateMasters on Can.State equals sta.StateId
                                    into statemp
                                    from sta1 in statemp.DefaultIfEmpty()
                                    join cit in dbContext.CityMasters on Can.City equals cit.CityId
                                    into cittemp
                                    from cit1 in cittemp.DefaultIfEmpty()
                                    join canass in dbContext.AssessmentCheckRatings on Can.CandidateId equals canass.Candidateid
                                    into canasstemp
                                    from canass1 in canasstemp.DefaultIfEmpty()



                                    where (Canjob.CandStatus == "103" || Canjob.CandStatus == "105" || Canjob.CandStatus == "107") && job.Jobcode == lstJobdetails[0].Jobcode
                                    select new CandidateInfoDetails
                                    {
                                        Candidateid = Can.CandidateId,
                                        Candidatename = Can.Name,
                                        Candidateemailid = Can.Email,
                                        Candidatemobileno = Can.MobileNo,
                                        LinkedinUrl = Can.LinkedinUrl,
                                        RatePerHr = Can.RatePerHr,
                                        CurrentLocation = Can.CurrentLocation == "" ? sta1.StateName + "," + cit1.CityName : Can.CurrentLocation,
                                        Type = typ.TypeName,
                                        VisaStatus = vis1.VisaName,
                                        YearsofExp = Can.YearsOfExp,
                                        //City = cit1.CityName,
                                        //State = sta1.StateName,
                                        CandStatus = candsta.CandidateStatusName,
                                        CreatedOn = Convert.ToDateTime(Can.CreatedAt).ToString("dd MMM yyyy"),
                                        CreatedBy = userpr.Firstname + " " + userpr.Initials,
                                        AssessmentRating = canass1.Overallrecruiterrating,
                                        AssessmentRemarks = canass1.Remarks,
                                        ResumeName = canpro.Idfilename,
                                        JobPrimarySkill = GetCandidateSkillInfo(Can.CandidateId.ToString(), priSkill),
                                        //JobSecondarySkill = GetCandidateSkillInfo(Can.CandidateId.ToString(), secSkill)

                                    }).ToList();


                lstJobdetails[0].JobCandidateDetails = candidateDetails;
            }
            catch (Exception ex) { }

            return lstJobdetails;

        }

        private List<Jobcount> GetCandidateCountDetails(string jobcode)
        {
            List<JobInfo> jobDetails = new List<JobInfo>();
            try
            {
                //jobcountDetails = (from job in _context.JobMasterUsas
                //                   where job.Jobcode == "10200" && (job.CreatedBy.Contains("%" + TWEID + "%") || job.AssignedTo.Contains("%" + TWEID + "%"))

                jobDetails = (from Can in dbContext.CandidateDetails
                              join Canjob in dbContext.CandidateJobs on Convert.ToInt32(Can.CandidateId) equals Canjob.CandidateId
                              join job in dbContext.JobMasterUsas on Canjob.Jobcode equals job.Jobcode
                              where (Canjob.CandStatus == "103" || Canjob.CandStatus == "105" || Canjob.CandStatus == "107") && job.Jobcode == jobcode

                              select new JobInfo
                              {
                                  Jobstatus = Canjob.CandStatus,
                                  Jobcode = Convert.ToString(Can.CandidateId),
                              }).ToList();


            }
            catch (Exception ex)
            {

            }


            List<Jobcount> jobcountdetails = new List<Jobcount>();

            Jobcount j1 = new Jobcount();
            j1.JobStatusName = "Inprogress";
            j1.TotalCount = jobDetails.Count;
            jobcountdetails.Add(j1);


            jobDetails = (from job in dbContext.JobMasterUsas
                          join canjob in dbContext.CandidateJobs on job.Jobcode equals canjob.Jobcode
                          join can in dbContext.CandidateDetails on canjob.CandidateId equals can.CandidateId
                          where job.Jobcode == jobcode && (canjob.CandStatus == "110" || canjob.CandStatus == "111")


                          select new JobInfo
                          {
                              Jobstatus = "Interview",
                              Jobcode = job.Jobcode,
                          }).ToList();




            Jobcount j3 = new Jobcount();
            j3.JobStatusName = "Interview";
            j3.TotalCount = jobDetails.Count;
            jobcountdetails.Add(j3);

            jobDetails = (from job in dbContext.JobMasterUsas
                          join canjob in dbContext.CandidateJobs on job.Jobcode equals canjob.Jobcode
                          join can in dbContext.CandidateDetails on canjob.CandidateId equals can.CandidateId
                          where job.Jobcode == jobcode && (canjob.CandStatus == "109" || canjob.CandStatus == "112")

                          select new JobInfo
                          {
                              Jobstatus = "Closure",
                              Jobcode = Convert.ToString(can.CandidateId),
                          }).ToList();

            Jobcount j4 = new Jobcount();
            j4.JobStatusName = "Closure";
            j4.TotalCount = jobDetails.Count;
            jobcountdetails.Add(j4);

            jobDetails = (from job in dbContext.JobMasterUsas
                          join canjob in dbContext.CandidateJobs on job.Jobcode equals canjob.Jobcode
                          join can in dbContext.CandidateDetails on canjob.CandidateId equals can.CandidateId
                          where canjob.CandStatus == "101" && canjob.CreatedBy != "TWEU0007" && job.Jobcode == jobcode


                          select new JobInfo
                          {
                              Jobstatus = "Draft",
                              Jobcode = Convert.ToString(can.CandidateId),
                          }).Distinct().ToList();

            Jobcount j5 = new Jobcount();
            j5.JobStatusName = "Draft";
            j5.TotalCount = jobDetails.Count;
            jobcountdetails.Add(j5);

            jobDetails = (from job in dbContext.JobMasterUsas
                          join canjob in dbContext.CandidateJobs on job.Jobcode equals canjob.Jobcode
                          join can in dbContext.CandidateDetails on canjob.CandidateId equals can.CandidateId
                          where (canjob.CandStatus == "96" || canjob.CandStatus == "100" || canjob.CandStatus == "104" || canjob.CandStatus == "106" || canjob.CandStatus == "108") && job.Jobcode == jobcode


                          select new JobInfo
                          {
                              Jobstatus = "Rejected",
                              Jobcode = Convert.ToString(can.CandidateId),
                          }).Distinct().ToList();

            Jobcount j6 = new Jobcount();
            j6.JobStatusName = "Rejected";
            j6.TotalCount = jobDetails.Count;
            jobcountdetails.Add(j6);


            var query = from can in dbContext.CandidateDetails
                        join canjob in dbContext.CandidateJobs on can.CandidateId equals canjob.CandidateId into canjobGroup
                        from canjob in canjobGroup.DefaultIfEmpty()
                        where can.BsStatus == 99 && canjob.CandStatus == "112" &&
                              can.CandidateId != dbContext.CandidateDetails
                                                        .Where(cand => dbContext.CandidateSubmissiondetailsBs
                                                            .Any(csd => csd.Candidateid == cand.CandidateId)
                                                            && dbContext.CandidateJobs
                                                                      .Any(job => job.CandidateId == cand.CandidateId
                                                                                  && job.Jobcode == jobcode
                                                                         )
                                )
                                .Select(cand => cand.CandidateId)
                                .Distinct()
                                .FirstOrDefault()
                        select can.CandidateId;

            int benchCandidateCount = query.Distinct().Count();

            Jobcount j7 = new Jobcount();
            j7.JobStatusName = "Bench";
            j7.TotalCount = benchCandidateCount;
            jobcountdetails.Add(j7);


            jobDetails = (from job in dbContext.JobMasterUsas
                          join canjob in dbContext.CandidateJobs on job.Jobcode equals canjob.Jobcode
                          join can in dbContext.CandidateDetails on canjob.CandidateId equals can.CandidateId
                          where canjob.CreatedBy.Contains("TWUV") && job.Jobcode == jobcode


                          select new JobInfo
                          {
                              Jobstatus = "Vendor",
                              Jobcode = job.Jobcode,
                          }).Distinct().ToList();

            Jobcount j8 = new Jobcount();
            j8.JobStatusName = "Vendor";
            j8.TotalCount = jobDetails.Count;
            jobcountdetails.Add(j8);

            jobDetails = (from job in dbContext.JobMasterUsas
                          join canjob in dbContext.CandidateJobs on job.Jobcode equals canjob.Jobcode
                          join can in dbContext.CandidateDetails on canjob.CandidateId equals can.CandidateId
                          where canjob.CandStatus == "101" && canjob.CreatedBy == "TWEU0007" && job.Jobcode == jobcode


                          select new JobInfo
                          {
                              Jobstatus = "Applied",
                              Jobcode = job.Jobcode,
                          }).Distinct().ToList();

            Jobcount j9 = new Jobcount();
            j9.JobStatusName = "Applied";
            j9.TotalCount = jobDetails.Count;
            jobcountdetails.Add(j9);

            Jobcount j10 = new Jobcount();
            j10.JobStatusName = "Matching";
            j10.TotalCount = 0;
            jobcountdetails.Add(j10);


            
            return jobcountdetails;
        }

        private IEnumerable<JobInfo> GetActiveJobDetails()
        {
            IEnumerable<JobInfo> jobDetails = new List<JobInfo>();
            List<Jobcount> jobDetails11 = GetJobCountDetails();

            var candStatus = GetCandidateSubmissionCount("Active");

            var priSkill = GetJobPrimarySkill();

            var secSkill = GetJobSecondarySkill();

            try
            {

                jobDetails = (from job in dbContext.JobMasterUsas
                              join loc in dbContext.LocationMasters on Convert.ToInt32(job.Location) equals loc.LocationId
                              join empl in dbContext.EmploymentTypeMasters on Convert.ToInt32(job.EmplType) equals empl.EmpTypeId
                              join stat in dbContext.JobstatusMasters on Convert.ToInt32(job.Jobstatus) equals stat.JobstatusId
                              join cli in dbContext.ClientMasters on Convert.ToInt32(job.ClientName) equals cli.ClientId
                              join pri in dbContext.PriorityMasters on Convert.ToInt32(job.PriorityLevel) equals pri.PriorityId
                              join cou in dbContext.CountryMasters on Convert.ToInt32(job.Country) equals cou.CountryId
                              join sta in dbContext.StateMasters on Convert.ToInt32(job.State) equals sta.StateId
                              into statemp
                              from sta1 in statemp.DefaultIfEmpty()
                              join cit in dbContext.CityMasters on Convert.ToInt32(job.City) equals cit.CityId
                              into cittemp
                              from cit1 in cittemp.DefaultIfEmpty()
                              join typ in dbContext.TypeMasters on Convert.ToInt32(job.WorkType1) equals typ.TypeId
                              into typtemp
                              from typ1 in typtemp.DefaultIfEmpty()
                              join durtype in dbContext.DurationtypeMasters on job.DurationType equals durtype.Durationtypeid
                              into durtemp
                              from durtype1 in durtemp.DefaultIfEmpty()
                              where job.Jobstatus == 10200
                              orderby job.PriorityLevel, job.CreatedAt descending

                              select new JobInfo
                              {
                                  Jobcode = job.Jobcode,
                                  JobTitle = job.JobTitle,
                                  Duration = job.Duration,
                                  DurationType = durtype1.DurationType,
                                  EmplType = empl.EmpTypeName,
                                  Location = loc.LocationName,
                                  State = sta1.StateName,
                                  City = cit1.CityName,
                                  Country = cou.CountryName,
                                  Rate1 = job.Rate1,
                                  WorkType1 = typ1.TypeName,
                                  PriorityLevel = pri.PriorityName,
                                  Prioritylevelid = pri.PriorityId,
                                  CreatedTime = job.CreatedAt.ToShortTimeString(),
                                  Jobopendatevalue = Convert.ToDateTime(job.CreatedAt).ToString("dd MMM yyyy"),
                                  ClientName = cli.ClientDisplayName,
                                  Submissioncount = Getsubmissioncount(job.Jobcode, candStatus),
                                  JobPrimarySkill = GetPrimaryskillInfo(job.Jobcode, priSkill),
                                  JobSecondarySkill = GetSecondaryskillInfo(job.Jobcode, secSkill),
                                  jobcounts = jobDetails11,

                              }).ToList();

            }
            catch (Exception ex) { }

            jobDetails = jobDetails.OrderBy(x => x.Prioritylevelid).ThenBy(x => x.Submissioncount.Count).ThenBy(x => x.Jobopendatevalue).ToList();
            return jobDetails;
        }

        private IEnumerable<JobInfo> GetInactiveJobDetails()
        {
            var jobDetails = new List<JobInfo>();
            List<Jobcount> jobDetails11 = GetJobCountDetails();

            var candStatus = GetCandidateSubmissionCount("Inactive");

            var remarksInfo = (from tbl in dbContext.TblJobRemarks
                               join usp in dbContext.Userprofilecreations on tbl.RemGivenby equals usp.TweId
                               orderby tbl.RemGivenon descending, tbl.RemGiventime descending

                               select new RemarksInfo
                               {
                                   Remarksgivenby = usp.Firstname,
                                   Remarksinfo = tbl.Remarks,
                                   Remarksgivenon = Convert.ToDateTime(tbl.RemGivenon).ToString("dd MMM yyyy"),
                                   Remarksgiventime = tbl.RemGiventime,
                                   JobCode = tbl.Jobcode
                               }).ToList();


            jobDetails = (from job in dbContext.JobMasterUsas
                          join loc in dbContext.LocationMasters on Convert.ToInt32(job.Location) equals loc.LocationId
                          join empl in dbContext.EmploymentTypeMasters on Convert.ToInt32(job.EmplType) equals empl.EmpTypeId
                          join stat in dbContext.JobstatusMasters on Convert.ToInt32(job.Jobstatus) equals stat.JobstatusId
                          join cli in dbContext.ClientMasters on Convert.ToInt32(job.ClientName) equals cli.ClientId
                          join pri in dbContext.PriorityMasters on Convert.ToInt32(job.PriorityLevel) equals pri.PriorityId
                          join cou in dbContext.CountryMasters on Convert.ToInt32(job.Country) equals cou.CountryId
                          join sta in dbContext.StateMasters on Convert.ToInt32(job.State) equals sta.StateId
                          into statemp
                          from sta1 in statemp.DefaultIfEmpty()
                          join cit in dbContext.CityMasters on Convert.ToInt32(job.City) equals cit.CityId
                          into cittemp
                          from cit1 in cittemp.DefaultIfEmpty()
                          join typ in dbContext.TypeMasters on Convert.ToInt32(job.WorkType1) equals typ.TypeId
                          into typtemp
                          from typ1 in typtemp.DefaultIfEmpty()
                          join durtype in dbContext.DurationtypeMasters on job.DurationType equals durtype.Durationtypeid
                          into durtemp
                          from durtype1 in durtemp.DefaultIfEmpty()
                          where job.Jobstatus != 10200
                          orderby job.JobOpenDate descending


                          select new JobInfo
                          {
                              Jobcode = job.Jobcode,
                              JobTitle = job.JobTitle,
                              Duration = job.Duration,
                              DurationType = durtype1.DurationType,
                              EmplType = empl.EmpTypeName,
                              Location = loc.LocationName,
                              State = sta1.StateName,
                              City = cit1.CityName,
                              Rate1 = job.Rate1,
                              WorkType1 = typ1.TypeName,
                              PriorityLevel = pri.PriorityName,
                              Jobopendatevalue = Convert.ToDateTime(job.JobOpenDate).ToString("dd MMM yyyy"),
                              ClientName = cli.ClientDisplayName,
                              Jobstatus = stat.JobstatusName,
                              Submissioncount = Getsubmissioncount(job.Jobcode, candStatus),
                              remarksInfo = GetRemarksInfo(job.Jobcode, remarksInfo),
                              jobcounts = jobDetails11,

                          }).ToList();
            return jobDetails;
        }

        private IEnumerable<JobInfo> GetOverallJobDetails()
        {

            var jobDetails = new List<JobInfo>();
            List<Jobcount> jobDetails11 = GetJobCountDetails();

            var candStatus = GetCandidateSubmissionCount("Overall");

            var remarksInfo = (from tbl in dbContext.TblJobRemarks
                               join usp in dbContext.Userprofilecreations on tbl.RemGivenby equals usp.TweId
                               orderby tbl.RemGivenon descending, tbl.RemGiventime descending

                               select new RemarksInfo
                               {
                                   Remarksgivenby = usp.Firstname,
                                   Remarksinfo = tbl.Remarks,
                                   Remarksgivenon = Convert.ToDateTime(tbl.RemGivenon).ToString("dd MMM yyyy"),
                                   Remarksgiventime = tbl.RemGiventime,
                                   JobCode = tbl.Jobcode
                               }).ToList();


            jobDetails = (from job in dbContext.JobMasterUsas
                          join loc in dbContext.LocationMasters on Convert.ToInt32(job.Location) equals loc.LocationId
                          join empl in dbContext.EmploymentTypeMasters on Convert.ToInt32(job.EmplType) equals empl.EmpTypeId
                          join stat in dbContext.JobstatusMasters on Convert.ToInt32(job.Jobstatus) equals stat.JobstatusId
                          join cli in dbContext.ClientMasters on Convert.ToInt32(job.ClientName) equals cli.ClientId
                          join pri in dbContext.PriorityMasters on Convert.ToInt32(job.PriorityLevel) equals pri.PriorityId
                          join cou in dbContext.CountryMasters on Convert.ToInt32(job.Country) equals cou.CountryId
                          join sta in dbContext.StateMasters on Convert.ToInt32(job.State) equals sta.StateId
                          into statemp
                          from sta1 in statemp.DefaultIfEmpty()
                          join cit in dbContext.CityMasters on Convert.ToInt32(job.City) equals cit.CityId
                          into cittemp
                          from cit1 in cittemp.DefaultIfEmpty()
                          join typ in dbContext.TypeMasters on Convert.ToInt32(job.WorkType1) equals typ.TypeId
                          into typtemp
                          from typ1 in typtemp.DefaultIfEmpty()
                          join durtype in dbContext.DurationtypeMasters on job.DurationType equals durtype.Durationtypeid
                          into durtemp
                          from durtype1 in durtemp.DefaultIfEmpty()
                          orderby job.CreatedAt descending

                          select new JobInfo
                          {
                              Jobcode = job.Jobcode,
                              JobTitle = job.JobTitle,
                              Duration = job.Duration,
                              DurationType = durtype1.DurationType,
                              EmplType = empl.EmpTypeName,
                              Location = loc.LocationName,
                              Country = cou.CountryName,
                              State = sta1.StateName,
                              City = cit1.CityName,
                              Rate1 = job.Rate1,
                              WorkType1 = typ1.TypeName,
                              PriorityLevel = pri.PriorityName,
                              Jobopendatevalue = Convert.ToDateTime(job.JobOpenDate).ToString("dd MMM yyyy"),
                              ClientName = cli.ClientDisplayName,
                              Jobstatus = stat.JobstatusName,
                              Submissioncount = Getsubmissioncount(job.Jobcode, candStatus),
                              remarksInfo = GetRemarksInfo(job.Jobcode, remarksInfo),
                              jobcounts = jobDetails11,
                          }).ToList();
            return jobDetails;
        }

        private IEnumerable<JobInfo> GetInterviewJobDetails()
        {
            var jobDetails = new List<JobInfo>();
            List<Jobcount> jobDetails11 = GetJobCountDetails();

            var candStatus = GetCandidateSubmissionCount("Interview");

            var priSkill = GetJobPrimarySkill();

            var secSkill = GetJobSecondarySkill();

            jobDetails = (from job in dbContext.JobMasterUsas
                          join empl in dbContext.EmploymentTypeMasters on Convert.ToInt32(job.EmplType) equals empl.EmpTypeId
                          join loc in dbContext.LocationMasters on Convert.ToInt32(job.Location) equals loc.LocationId
                          join stat in dbContext.JobstatusMasters on Convert.ToInt32(job.Jobstatus) equals stat.JobstatusId
                          join pri in dbContext.PriorityMasters on Convert.ToInt32(job.PriorityLevel) equals pri.PriorityId
                          join cli in dbContext.ClientMasters on Convert.ToInt32(job.ClientName) equals cli.ClientId
                          join canjob in dbContext.CandidateJobs on job.Jobcode equals canjob.Jobcode
                          join can in dbContext.CandidateDetails on canjob.CandidateId equals can.CandidateId
                          join cou in dbContext.CountryMasters on Convert.ToInt32(job.Country) equals cou.CountryId
                          join sta in dbContext.StateMasters on Convert.ToInt32(job.State) equals sta.StateId
                          into statemp
                          from sta1 in statemp.DefaultIfEmpty()
                          join cit in dbContext.CityMasters on Convert.ToInt32(job.City) equals cit.CityId
                          into cittemp
                          from cit1 in cittemp.DefaultIfEmpty()
                          join typ in dbContext.TypeMasters on Convert.ToInt32(job.WorkType1) equals typ.TypeId
                          into typtemp
                          from typ1 in typtemp.DefaultIfEmpty()
                          join durtype in dbContext.DurationtypeMasters on job.DurationType equals durtype.Durationtypeid
                          into durtemp
                          from durtype1 in durtemp.DefaultIfEmpty()
                          where job.Jobstatus == 10200 && (canjob.CandStatus == "110" || canjob.CandStatus == "111")
                          orderby job.CreatedAt descending

                          select new JobInfo
                          {
                              Jobcode = job.Jobcode,
                              JobTitle = job.JobTitle,
                              Duration = job.Duration,
                              DurationType = durtype1.DurationType,
                              EmplType = empl.EmpTypeName,
                              Location = loc.LocationName,
                              Country = cou.CountryName,
                              State = sta1.StateName,
                              City = cit1.CityName,
                              Rate1 = job.Rate1,
                              WorkType1 = typ1.TypeName,
                              PriorityLevel = pri.PriorityName,
                              Jobopendatevalue = Convert.ToDateTime(job.JobOpenDate).ToString("dd MMM yyyy"),
                              ClientName = cli.ClientDisplayName,
                              Submissioncount = GetInterviewcandidatecount(job.Jobcode, candStatus),
                              JobPrimarySkill = GetPrimaryskillInfo(job.Jobcode, priSkill),
                              JobSecondarySkill = GetPrimaryskillInfo(job.Jobcode, secSkill),
                              jobcounts = jobDetails11,

                          }).ToList();

            return jobDetails;
        }

        private IEnumerable<JobInfo> GetClosureJobDetails()
        {
            var jobDetails = new List<JobInfo>();
            List<Jobcount> jobDetails11 = GetJobCountDetails();

            var candStatus = GetCandidateSubmissionCount("Closure");

            var onBoarded = (from canjob in dbContext.CandidateJobs
                             join cancomm in dbContext.CandComments on
                             new
                             {
                                 Key1 = canjob.CandidateId,
                                 Key2 = canjob.Jobcode

                             }
                              equals
                              new
                              {

                                  Key1 = Convert.ToInt32(cancomm.Candidateid),
                                  Key2 = cancomm.Jobcode
                              }

                            into result
                             from r in result.DefaultIfEmpty()
                             where canjob.CandStatus == "112"
                             select new CandOnboarddetails
                             {
                                 OnboardDate = Convert.ToDateTime(canjob.OnboardedDate).ToString("dd MMM yyyy"),
                                 Jobcode = canjob.Jobcode,
                             }).ToList();


            jobDetails = (List<JobInfo>)(from job in dbContext.JobMasterUsas
                                         join empl in dbContext.EmploymentTypeMasters on Convert.ToInt32(job.EmplType) equals empl.EmpTypeId
                                         join loc in dbContext.LocationMasters on Convert.ToInt32(job.Location) equals loc.LocationId
                                         join stat in dbContext.JobstatusMasters on Convert.ToInt32(job.Jobstatus) equals stat.JobstatusId
                                         join pri in dbContext.PriorityMasters on Convert.ToInt32(job.PriorityLevel) equals pri.PriorityId
                                         join cli in dbContext.ClientMasters on Convert.ToInt32(job.ClientName) equals cli.ClientId
                                         join canjob in dbContext.CandidateJobs on job.Jobcode equals canjob.Jobcode
                                         join can in dbContext.CandidateDetails on canjob.CandidateId equals can.CandidateId
                                         join cou in dbContext.CountryMasters on Convert.ToInt32(job.Country) equals cou.CountryId
                                         join sta in dbContext.StateMasters on Convert.ToInt32(job.State) equals sta.StateId
                                         into statemp
                                         from sta1 in statemp.DefaultIfEmpty()
                                         join cit in dbContext.CityMasters on Convert.ToInt32(job.City) equals cit.CityId
                                         into cittemp
                                         from cit1 in cittemp.DefaultIfEmpty()
                                         join typ in dbContext.TypeMasters on Convert.ToInt32(job.WorkType1) equals typ.TypeId
                                         into typtemp
                                         from typ1 in typtemp.DefaultIfEmpty()
                                         join durtype in dbContext.DurationtypeMasters on job.DurationType equals durtype.Durationtypeid
                                         into durtemp
                                         from durtype1 in durtemp.DefaultIfEmpty()
                                         where (canjob.CandStatus == "109" || canjob.CandStatus == "112")
                                         orderby job.CreatedAt descending, job.CreatedAt descending

                                         select new JobInfo
                                         {
                                             Jobcode = job.Jobcode,
                                             JobTitle = job.JobTitle,
                                             Duration = job.Duration,
                                             DurationType = durtype1.DurationType,
                                             EmplType = empl.EmpTypeName,
                                             Location = loc.LocationName,
                                             Country = cou.CountryName,
                                             State = sta1.StateName,
                                             City = cit1.CityName,
                                             Rate1 = job.Rate1,
                                             WorkType1 = typ1.TypeName,
                                             PriorityLevel = pri.PriorityName,
                                             Jobopendate = job.JobOpenDate,
                                             Jobopendatevalue = Convert.ToDateTime(job.JobOpenDate).ToString("dd MMM yyyy"),
                                             Jobonboarddatevalue = GetOnboarddate(job.Jobcode, onBoarded),
                                             ClientName = cli.ClientDisplayName,
                                             Submissioncount = GetClosurecandidatecount(job.Jobcode, candStatus),
                                             jobcounts = jobDetails11,
                                         }).Distinct().ToList().OrderByDescending(m => m.Jobopendate);

            return jobDetails;
        }

        private IEnumerable<JobInfo> GetNotfilledJobDetails()
        {
            var jobDetails = new List<JobInfo>();

            List<Jobcount> jobDetails11 = GetJobCountDetails();

            var priSkill = GetJobPrimarySkill();

            var secSkill = GetJobSecondarySkill();


            var subjoblist = (from job in dbContext.JobMasterUsas
                              join canjob in dbContext.CandidateJobs on job.Jobcode equals canjob.Jobcode
                              where job.Jobstatus == 10200 && Convert.ToInt32(canjob.CandStatus) >= 103
                              select new JobInfo
                              {
                                  Jobcode = job.Jobcode
                              }).Distinct().ToList();

            var openjoblist = (from job in dbContext.JobMasterUsas
                               where job.Jobstatus == 10200
                               select new JobInfo
                               {
                                   Jobcode = job.Jobcode
                               }).ToList();

            string nonsubJob = "";
            int nonsubCount = 0;

            for (int i = 0; i < openjoblist.Count; i++)
            {

                for (int j = 0; j < subjoblist.Count; j++)
                {
                    if (openjoblist[i].Jobcode == subjoblist[j].Jobcode)
                    {
                        nonsubCount++;
                        nonsubJob += "'" + subjoblist[j].Jobcode + "',";
                    }


                }
            }

            int noSub = openjoblist.Count - nonsubCount;
            if (nonsubJob.Length != 0)
            {
                nonsubJob = nonsubJob.Substring(0, nonsubJob.Length - 1);
            }

            List<JobInfo> lstnoSubJob = new List<JobInfo>();
            lstnoSubJob = openjoblist;

            for (int y = 0; y < subjoblist.Count; y++)
            {
                for (int x = 0; x < lstnoSubJob.Count; x++)
                {
                    if (subjoblist[y].Jobcode == lstnoSubJob[x].Jobcode)
                    {
                        lstnoSubJob.RemoveAt(x);
                    }

                }

            }

            string nosubJobcode = "";

            for (int i = 0; i < lstnoSubJob.Count; i++)
            {
                nosubJobcode += "'" + lstnoSubJob[i].Jobcode + "',";
            }


            if (nosubJobcode.Length != 0)
            {
                nosubJobcode = nosubJobcode.Substring(0, nosubJobcode.Length - 1);
            }

           
            jobDetails = (from job in dbContext.JobMasterUsas
                              join empl in dbContext.EmploymentTypeMasters on Convert.ToInt32(job.EmplType) equals empl.EmpTypeId
                              join loc in dbContext.LocationMasters on Convert.ToInt32(job.Location) equals loc.LocationId
                              join stat in dbContext.JobstatusMasters on Convert.ToInt32(job.Jobstatus) equals stat.JobstatusId
                              join pri in dbContext.PriorityMasters on Convert.ToInt32(job.PriorityLevel) equals pri.PriorityId
                              join cli in dbContext.ClientMasters on Convert.ToInt32(job.ClientName) equals cli.ClientId
                              //join canjob in _context.CandidateJobs on job.Jobcode equals canjob.Jobcode
                              //join can in _context.CandidateDetails on canjob.CandidateId equals can.CandidateId
                              join cou in dbContext.CountryMasters on Convert.ToInt32(job.Country) equals cou.CountryId
                              join sta in dbContext.StateMasters on Convert.ToInt32(job.State) equals sta.StateId
                              into statemp
                              from sta1 in statemp.DefaultIfEmpty()
                              join cit in dbContext.CityMasters on Convert.ToInt32(job.City) equals cit.CityId
                              into cittemp
                              from cit1 in cittemp.DefaultIfEmpty()
                              join typ in dbContext.TypeMasters on Convert.ToInt32(job.WorkType1) equals typ.TypeId
                              into typtemp
                              from typ1 in typtemp.DefaultIfEmpty()
                              join durtype in dbContext.DurationtypeMasters on job.DurationType equals durtype.Durationtypeid
                              into durtemp
                              from durtype1 in durtemp.DefaultIfEmpty()
                                  //where job.Jobcode.Contains(nosubJobcode) 
                              orderby job.CreatedAt descending, job.CreatedAt descending

                              select new JobInfo
                              {
                                  Jobcode = job.Jobcode,
                                  JobTitle = job.JobTitle,
                                  Duration = job.Duration,
                                  DurationType = durtype1.DurationType,
                                  EmplType = empl.EmpTypeName,
                                  Location = loc.LocationName,
                                  Country = cou.CountryName,
                                  State = sta1.StateName,
                                  City = cit1.CityName,
                                  Rate1 = job.Rate1,
                                  WorkType1 = typ1.TypeName,
                                  PriorityLevel = pri.PriorityName,
                                  Jobopendatevalue = Convert.ToDateTime(job.JobOpenDate).ToString("dd MMM yyyy"),
                                  Jobopendate = job.JobOpenDate,
                                  CreatedTime = job.CreatedAt.ToShortTimeString(),
                                  ClientName = cli.ClientDisplayName,
                                  JobPrimarySkill = GetPrimaryskillInfo(job.Jobcode, priSkill),
                                  JobSecondarySkill = GetPrimaryskillInfo(job.Jobcode, secSkill),
                                  jobcounts = jobDetails11,
                              }).Where(e => nosubJobcode.Contains(e.Jobcode)).Distinct().OrderByDescending(e => e.Jobopendate).ThenByDescending(e => e.CreatedTime).ToList();
               
        
                return jobDetails;
        }


        private List<Submissioncount> GetCandidateSubmissionCount(string Tabname)
        {
            var candStatus = new List<Submissioncount>();

            if (Tabname == "Active")
            {

                candStatus = (from csm in dbContext.CandidateStatusMasters
                              join cj in dbContext.CandidateJobs on csm.CandidateStatusId.ToString() equals cj.CandStatus into joined
                              from f in joined.DefaultIfEmpty()
                              where csm.CandidateStatusId >= 103

                              select new Submissioncount
                              {
                                  CandStatusName = csm.CandidateStatusName,
                                  CandStatusId = csm.CandidateStatusId,
                                  JobCode = f.Jobcode,
                              }).ToList();
                //}).Where(m => m.CandStatusId >= 103).ToList();

            }
            else if (Tabname == "Inactive" || Tabname == "Overall" || Tabname == "Interview"|| Tabname == "Closure")
            {
                candStatus = (from csm in dbContext.CandidateStatusMasters
                              join cj in dbContext.CandidateJobs on csm.CandidateStatusId.ToString() equals cj.CandStatus into joined
                              from f in joined.DefaultIfEmpty()

                              select new Submissioncount
                              {
                                  CandStatusName = csm.CandidateStatusName,
                                  CandStatusId = csm.CandidateStatusId,
                                  JobCode = f.Jobcode,
                              }).ToList();
            }



            return candStatus;

        }

        private List<Skill> GetJobPrimarySkill()
        {
            var priSkill = (from job in dbContext.JobMasterUsas
                            join jobski in dbContext.JobSkillUsas on job.Jobcode equals jobski.JobCode
                            join ski in dbContext.SkillMasters on Convert.ToInt32(jobski.SkillId) equals ski.SkillId
                            join yer in dbContext.YearMasters on Convert.ToInt32(jobski.YearsRequired) equals yer.YearId

                            select new Skill
                            {
                                JobSkillID = jobski.SkillId.ToString(),
                                JobSkillName = ski.Name,
                                JobYrsofExp = yer.Year,
                                Jobcode = job.Jobcode
                            }).ToList();

            return priSkill;

        }

        private List<Skill> GetJobSecondarySkill()
        {
           var secSkill = (from job in dbContext.JobMasterUsas
                        join jobski in dbContext.JobSkillUsas on job.Jobcode equals jobski.JobCode
                        join ski in dbContext.SkillMasters on Convert.ToInt32(jobski.SkillId) equals ski.SkillId
                        join yer in dbContext.YearMasters on Convert.ToInt32(jobski.YearsRequired) equals yer.YearId
                        where jobski.SkillType=="S"


                        select new Skill
                        {
                            JobSkillID = jobski.SkillId.ToString(),
                            JobSkillName = ski.Name,
                            JobYrsofExp = yer.Year,
                            Jobcode = job.Jobcode
                        }).ToList();

            return secSkill;
        }

        #endregion
    }
}

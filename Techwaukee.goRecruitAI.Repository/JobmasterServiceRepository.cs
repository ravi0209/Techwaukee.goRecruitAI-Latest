using Microsoft.EntityFrameworkCore;
using Techwaukee.goRecruitAI.Data;
using Techwaukee.goRecruitAI.Services;
using Techwaukee.goRecruitAI.ViewModels;

namespace Techwaukee.goRecruitAI.Repository
{
    public class JobmasterServiceRepository : IJobMaster
    {
        private RecruitContext _context;

        public JobmasterServiceRepository(RecruitContext context)
        {
            this._context = context;
        }

        public async Task<IEnumerable<JobInfo>> GetJobDetails(string TabName)
        {
            try
            {
                IEnumerable<JobInfo> jobDetails = new List<JobInfo>();

                //jobDetails = from d in _context.JobMasterUsas
                //                     join dr in _context.StateMasters on d.State equals dr.StateId

                //                     select new JobMasterUsa
                //                     {
                //                         Jobcode = d.Jobcode,
                //                         JobTitle = d.JobTitle,
                //                         Duration = d.Duration
                //                     };

                //jobDetails = await _context.JobMasterUsas.Take(100).ToListAsync();

                if (TabName == "Active")
                {
                    List<Jobcount> jobDetails11 = GetJobCountDetails();

                    var candStatus = await (from csm in _context.CandidateStatusMasters
                                            join cj in _context.CandidateJobs on csm.CandidateStatusId.ToString() equals cj.CandStatus into joined
                                            from f in joined.DefaultIfEmpty()

                                            select new Submissioncount
                                            {
                                                CandStatusName = csm.CandidateStatusName,
                                                CandStatusId = csm.CandidateStatusId,
                                                JobCode = f.Jobcode,
                                            }).Where(m => m.CandStatusId >= 103).ToListAsync();

                    var priSkill = await (from job in _context.JobMasterUsas
                                          join jobski in _context.JobPrimarySkillUsas on job.Jobcode equals jobski.Jobcode
                                          join ski in _context.SkillMasters on Convert.ToInt32(jobski.JobSkillName) equals ski.SkillId
                                          join yer in _context.YearMasters on Convert.ToInt32(jobski.JobYrsofExp) equals yer.YearMasterId

                                          select new Skill
                                          {
                                              JobSkillID = jobski.JobSkillId.ToString(),
                                              JobSkillName = ski.SkillName,
                                              JobYrsofExp = yer.YearMasterName,
                                              Jobcode = job.Jobcode
                                          }).ToListAsync();

                    var secSkill = await (from job in _context.JobMasterUsas
                                          join jobski in _context.JobSecondarySkillUsas on job.Jobcode equals jobski.Jobcode
                                          join ski in _context.SkillMasters on Convert.ToInt32(jobski.JobSkillName) equals ski.SkillId
                                          join yer in _context.YearMasters on Convert.ToInt32(jobski.JobYrsofExp) equals yer.YearMasterId

                                          select new Skill
                                          {
                                              JobSkillID = jobski.JobSkillId.ToString(),
                                              JobSkillName = ski.SkillName,
                                              JobYrsofExp = yer.YearMasterName,
                                              Jobcode = job.Jobcode
                                          }).ToListAsync();

                    try
                    {
                        jobDetails = await (from job in _context.JobMasterUsas
                                            join loc in _context.LocationMasters on Convert.ToInt32(job.Location) equals loc.LocationId
                                            join empl in _context.EmploymentTypeMasters on Convert.ToInt32(job.EmplType) equals empl.EmpTypeId
                                            join stat in _context.JobstatusMasters on Convert.ToInt32(job.Jobstatus) equals stat.JobstatusId
                                            join cli in _context.ClientMasters on Convert.ToInt32(job.Clientname) equals cli.ClientId
                                            join pri in _context.PriorityMasters on Convert.ToInt32(job.Prioritylevel) equals pri.PriorityId
                                            join cou in _context.CountryMasters on Convert.ToInt32(job.Country) equals cou.CountryId
                                            join sta in _context.StateMasters on Convert.ToInt32(job.State) equals sta.StateId
                                            into statemp
                                            from sta1 in statemp.DefaultIfEmpty()
                                            join cit in _context.CityMasters on Convert.ToInt32(job.City) equals cit.CityId
                                            into cittemp
                                            from cit1 in cittemp.DefaultIfEmpty()
                                            join typ in _context.TypeMasters on Convert.ToInt32(job.WorkType1) equals typ.TypeId
                                            into typtemp
                                            from typ1 in typtemp.DefaultIfEmpty()
                                            join durtype in _context.DurationtypeMasters on job.Durationtype equals durtype.Durationtypeid
                                            into durtemp
                                            from durtype1 in durtemp.DefaultIfEmpty()
                                            where job.Jobstatus == "10200"
                                            orderby job.Prioritylevel, job.CreatedOn descending

                                            select new JobInfo
                                            {
                                                Jobcode = job.Jobcode,
                                                JobTitle = job.JobTitle,
                                                Duration = job.Duration,
                                                Durationtype = durtype1.DurationType,
                                                EmplType = empl.EmpTypeName,
                                                Location = loc.LocationName,
                                                State = sta1.StateName,
                                                City = cit1.CityName,
                                                Country = cou.CountryName,
                                                Rate1 = job.Rate1,
                                                WorkType1 = typ1.TypeName,
                                                Prioritylevel = pri.PriorityName,
                                                Prioritylevelid = pri.PriorityId,
                                                CreatedTime = job.CreatedTime,
                                                Jobopendatevalue = Convert.ToDateTime(job.CreatedOn).ToString("dd MMM yyyy"),
                                                Clientname = cli.ClientDisplayName,
                                                Submissioncount = getsubmissioncount(job.Jobcode, candStatus),
                                                JobPrimarySkill = GetPrimaryskillInfo(job.Jobcode, priSkill),
                                                JobSecondarySkill = GetSecondaryskillInfo(job.Jobcode, secSkill),
                                                jobcounts = jobDetails11,
                                            }).ToListAsync();
                    }
                    catch (Exception ex) { }

                    jobDetails = jobDetails.OrderBy(x => x.Prioritylevelid).ThenBy(x => x.Submissioncount.Count).ThenBy(x => x.Jobopendatevalue).ToList();
                }
                else if (TabName == "Inactive")
                {
                    List<Jobcount> jobDetails11 = GetJobCountDetails();

                    var candStatus = await (from csm in _context.CandidateStatusMasters
                                            join cj in _context.CandidateJobs on csm.CandidateStatusId.ToString() equals cj.CandStatus into joined
                                            from f in joined.DefaultIfEmpty()

                                            select new Submissioncount
                                            {
                                                CandStatusName = csm.CandidateStatusName,
                                                CandStatusId = csm.CandidateStatusId,
                                                JobCode = f.Jobcode,
                                            }).ToListAsync();

                    var remarksInfo = (from tbl in _context.TblJobRemarks
                                       join usp in _context.Userprofilecreations on tbl.RemGivenby equals usp.TweId
                                       orderby tbl.RemGivenon descending, tbl.RemGiventime descending

                                       select new RemarksInfo

                                       {
                                           Remarksgivenby = usp.Firstname,
                                           Remarksinfo = tbl.Remarks,
                                           Remarksgivenon = Convert.ToDateTime(tbl.RemGivenon).ToString("dd MMM yyyy"),
                                           Remarksgiventime = tbl.RemGiventime,
                                           JobCode = tbl.Jobcode
                                       }).ToList();

                    jobDetails = (from job in _context.JobMasterUsas
                                  join loc in _context.LocationMasters on Convert.ToInt32(job.Location) equals loc.LocationId
                                  join empl in _context.EmploymentTypeMasters on Convert.ToInt32(job.EmplType) equals empl.EmpTypeId
                                  join stat in _context.JobstatusMasters on Convert.ToInt32(job.Jobstatus) equals stat.JobstatusId
                                  join cli in _context.ClientMasters on Convert.ToInt32(job.Clientname) equals cli.ClientId
                                  join pri in _context.PriorityMasters on Convert.ToInt32(job.Prioritylevel) equals pri.PriorityId
                                  join cou in _context.CountryMasters on Convert.ToInt32(job.Country) equals cou.CountryId
                                  join sta in _context.StateMasters on Convert.ToInt32(job.State) equals sta.StateId
                                  into statemp
                                  from sta1 in statemp.DefaultIfEmpty()
                                  join cit in _context.CityMasters on Convert.ToInt32(job.City) equals cit.CityId
                                  into cittemp
                                  from cit1 in cittemp.DefaultIfEmpty()
                                  join typ in _context.TypeMasters on Convert.ToInt32(job.WorkType1) equals typ.TypeId
                                  into typtemp
                                  from typ1 in typtemp.DefaultIfEmpty()
                                  join durtype in _context.DurationtypeMasters on job.Durationtype equals durtype.Durationtypeid
                                  into durtemp
                                  from durtype1 in durtemp.DefaultIfEmpty()
                                  where job.Jobstatus != "10200"
                                  orderby job.Jobopendate descending

                                  select new JobInfo
                                  {
                                      Jobcode = job.Jobcode,
                                      JobTitle = job.JobTitle,
                                      Duration = job.Duration,
                                      Durationtype = durtype1.DurationType,
                                      EmplType = empl.EmpTypeName,
                                      Location = loc.LocationName,
                                      State = sta1.StateName,
                                      City = cit1.CityName,
                                      Rate1 = job.Rate1,
                                      WorkType1 = typ1.TypeName,
                                      Prioritylevel = pri.PriorityName,
                                      Jobopendatevalue = Convert.ToDateTime(job.Jobopendate).ToString("dd MMM yyyy"),
                                      Clientname = cli.ClientDisplayName,
                                      Jobstatus = stat.JobstatusName,
                                      Submissioncount = getsubmissioncount(job.Jobcode, candStatus),
                                      remarksInfo = GetRemarksInfo(job.Jobcode, remarksInfo),
                                      jobcounts = jobDetails11,
                                  }).ToList();
                }
                else if (TabName == "Overall")
                {
                    List<Jobcount> jobDetails11 = GetJobCountDetails();

                    var candStatus = await (from csm in _context.CandidateStatusMasters
                                            join cj in _context.CandidateJobs on csm.CandidateStatusId.ToString() equals cj.CandStatus into joined
                                            from f in joined.DefaultIfEmpty()

                                            select new Submissioncount
                                            {
                                                CandStatusName = csm.CandidateStatusName,
                                                CandStatusId = csm.CandidateStatusId,
                                                JobCode = f.Jobcode,
                                            }).ToListAsync();

                    var remarksInfo = (from tbl in _context.TblJobRemarks
                                       join usp in _context.Userprofilecreations on tbl.RemGivenby equals usp.TweId
                                       orderby tbl.RemGivenon descending, tbl.RemGiventime descending

                                       select new RemarksInfo

                                       {
                                           Remarksgivenby = usp.Firstname,
                                           Remarksinfo = tbl.Remarks,
                                           Remarksgivenon = Convert.ToDateTime(tbl.RemGivenon).ToString("dd MMM yyyy"),
                                           Remarksgiventime = tbl.RemGiventime,
                                           JobCode = tbl.Jobcode
                                       }).ToList();

                    jobDetails = (from job in _context.JobMasterUsas
                                  join loc in _context.LocationMasters on Convert.ToInt32(job.Location) equals loc.LocationId
                                  join empl in _context.EmploymentTypeMasters on Convert.ToInt32(job.EmplType) equals empl.EmpTypeId
                                  join stat in _context.JobstatusMasters on Convert.ToInt32(job.Jobstatus) equals stat.JobstatusId
                                  join cli in _context.ClientMasters on Convert.ToInt32(job.Clientname) equals cli.ClientId
                                  join pri in _context.PriorityMasters on Convert.ToInt32(job.Prioritylevel) equals pri.PriorityId
                                  join cou in _context.CountryMasters on Convert.ToInt32(job.Country) equals cou.CountryId
                                  join sta in _context.StateMasters on Convert.ToInt32(job.State) equals sta.StateId
                                  into statemp
                                  from sta1 in statemp.DefaultIfEmpty()
                                  join cit in _context.CityMasters on Convert.ToInt32(job.City) equals cit.CityId
                                  into cittemp
                                  from cit1 in cittemp.DefaultIfEmpty()
                                  join typ in _context.TypeMasters on Convert.ToInt32(job.WorkType1) equals typ.TypeId
                                  into typtemp
                                  from typ1 in typtemp.DefaultIfEmpty()
                                  join durtype in _context.DurationtypeMasters on job.Durationtype equals durtype.Durationtypeid
                                  into durtemp
                                  from durtype1 in durtemp.DefaultIfEmpty()
                                  orderby job.CreatedOn descending

                                  select new JobInfo
                                  {
                                      Jobcode = job.Jobcode,
                                      JobTitle = job.JobTitle,
                                      Duration = job.Duration,
                                      Durationtype = durtype1.DurationType,
                                      EmplType = empl.EmpTypeName,
                                      Location = loc.LocationName,
                                      Country = cou.CountryName,
                                      State = sta1.StateName,
                                      City = cit1.CityName,
                                      Rate1 = job.Rate1,
                                      WorkType1 = typ1.TypeName,
                                      Prioritylevel = pri.PriorityName,
                                      Jobopendatevalue = Convert.ToDateTime(job.Jobopendate).ToString("dd MMM yyyy"),
                                      Clientname = cli.ClientDisplayName,
                                      Jobstatus = stat.JobstatusName,
                                      Submissioncount = getsubmissioncount(job.Jobcode, candStatus),
                                      remarksInfo = GetRemarksInfo(job.Jobcode, remarksInfo),
                                      jobcounts = jobDetails11,
                                  }).ToList();
                }
                else if (TabName == "Interview")
                {
                    List<Jobcount> jobDetails11 = GetJobCountDetails();

                    var candStatus = await (from csm in _context.CandidateStatusMasters
                                            join cj in _context.CandidateJobs on csm.CandidateStatusId.ToString() equals cj.CandStatus into joined
                                            from f in joined.DefaultIfEmpty()

                                            select new Submissioncount
                                            {
                                                CandStatusName = csm.CandidateStatusName,
                                                CandStatusId = csm.CandidateStatusId,
                                                JobCode = f.Jobcode,
                                            }).ToListAsync();

                    var priSkill = await (from job in _context.JobMasterUsas
                                          join jobski in _context.JobPrimarySkillUsas on job.Jobcode equals jobski.Jobcode
                                          join ski in _context.SkillMasters on Convert.ToInt32(jobski.JobSkillName) equals ski.SkillId
                                          join yer in _context.YearMasters on Convert.ToInt32(jobski.JobYrsofExp) equals yer.YearMasterId

                                          select new Skill
                                          {
                                              JobSkillID = jobski.JobSkillId.ToString(),
                                              JobSkillName = ski.SkillName,
                                              JobYrsofExp = yer.YearMasterName,
                                              Jobcode = job.Jobcode
                                          }).ToListAsync();

                    jobDetails = (from job in _context.JobMasterUsas
                                  join empl in _context.EmploymentTypeMasters on Convert.ToInt32(job.EmplType) equals empl.EmpTypeId
                                  join loc in _context.LocationMasters on Convert.ToInt32(job.Location) equals loc.LocationId
                                  join stat in _context.JobstatusMasters on Convert.ToInt32(job.Jobstatus) equals stat.JobstatusId
                                  join pri in _context.PriorityMasters on Convert.ToInt32(job.Prioritylevel) equals pri.PriorityId
                                  join cli in _context.ClientMasters on Convert.ToInt32(job.Clientname) equals cli.ClientId
                                  join canjob in _context.CandidateJobs on job.Jobcode equals canjob.Jobcode
                                  join can in _context.CandidateDetails on canjob.CandidateId equals can.Candidateid
                                  join cou in _context.CountryMasters on Convert.ToInt32(job.Country) equals cou.CountryId
                                  join sta in _context.StateMasters on Convert.ToInt32(job.State) equals sta.StateId
                                  into statemp
                                  from sta1 in statemp.DefaultIfEmpty()
                                  join cit in _context.CityMasters on Convert.ToInt32(job.City) equals cit.CityId
                                  into cittemp
                                  from cit1 in cittemp.DefaultIfEmpty()
                                  join typ in _context.TypeMasters on Convert.ToInt32(job.WorkType1) equals typ.TypeId
                                  into typtemp
                                  from typ1 in typtemp.DefaultIfEmpty()
                                  join durtype in _context.DurationtypeMasters on job.Durationtype equals durtype.Durationtypeid
                                  into durtemp
                                  from durtype1 in durtemp.DefaultIfEmpty()
                                  where job.Jobstatus == "10200" && (canjob.CandStatus == "110" || canjob.CandStatus == "111")
                                  orderby job.CreatedOn descending

                                  select new JobInfo
                                  {
                                      Jobcode = job.Jobcode,
                                      JobTitle = job.JobTitle,
                                      Duration = job.Duration,
                                      Durationtype = durtype1.DurationType,
                                      EmplType = empl.EmpTypeName,
                                      Location = loc.LocationName,
                                      Country = cou.CountryName,
                                      State = sta1.StateName,
                                      City = cit1.CityName,
                                      Rate1 = job.Rate1,
                                      WorkType1 = typ1.TypeName,
                                      Prioritylevel = pri.PriorityName,
                                      Jobopendatevalue = Convert.ToDateTime(job.Jobopendate).ToString("dd MMM yyyy"),
                                      Clientname = cli.ClientDisplayName,
                                      Submissioncount = getInterviewcandidatecount(job.Jobcode, candStatus),
                                      JobPrimarySkill = GetPrimaryskillInfo(job.Jobcode, priSkill),
                                      jobcounts = jobDetails11,
                                  }).ToList();
                }
                else if (TabName == "Closure")
                {
                    List<Jobcount> jobDetails11 = GetJobCountDetails();

                    var candStatus = await (from csm in _context.CandidateStatusMasters
                                            join cj in _context.CandidateJobs on csm.CandidateStatusId.ToString() equals cj.CandStatus into joined
                                            from f in joined.DefaultIfEmpty()

                                            select new Submissioncount
                                            {
                                                CandStatusName = csm.CandidateStatusName,
                                                CandStatusId = csm.CandidateStatusId,
                                                JobCode = f.Jobcode,
                                            }).ToListAsync();

                    var onBoarded = await (from canjob in _context.CandidateJobs
                                           join cancomm in _context.CandComments on
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
                                           }).ToListAsync();

                    jobDetails = (from job in _context.JobMasterUsas
                                  join empl in _context.EmploymentTypeMasters on Convert.ToInt32(job.EmplType) equals empl.EmpTypeId
                                  join loc in _context.LocationMasters on Convert.ToInt32(job.Location) equals loc.LocationId
                                  join stat in _context.JobstatusMasters on Convert.ToInt32(job.Jobstatus) equals stat.JobstatusId
                                  join pri in _context.PriorityMasters on Convert.ToInt32(job.Prioritylevel) equals pri.PriorityId
                                  join cli in _context.ClientMasters on Convert.ToInt32(job.Clientname) equals cli.ClientId
                                  join canjob in _context.CandidateJobs on job.Jobcode equals canjob.Jobcode
                                  join can in _context.CandidateDetails on canjob.CandidateId equals can.Candidateid
                                  join cou in _context.CountryMasters on Convert.ToInt32(job.Country) equals cou.CountryId
                                  join sta in _context.StateMasters on Convert.ToInt32(job.State) equals sta.StateId
                                  into statemp
                                  from sta1 in statemp.DefaultIfEmpty()
                                  join cit in _context.CityMasters on Convert.ToInt32(job.City) equals cit.CityId
                                  into cittemp
                                  from cit1 in cittemp.DefaultIfEmpty()
                                  join typ in _context.TypeMasters on Convert.ToInt32(job.WorkType1) equals typ.TypeId
                                  into typtemp
                                  from typ1 in typtemp.DefaultIfEmpty()
                                  join durtype in _context.DurationtypeMasters on job.Durationtype equals durtype.Durationtypeid
                                  into durtemp
                                  from durtype1 in durtemp.DefaultIfEmpty()
                                  where (canjob.CandStatus == "109" || canjob.CandStatus == "112")
                                  orderby job.CreatedOn descending, job.CreatedTime descending

                                  select new JobInfo
                                  {
                                      Jobcode = job.Jobcode,
                                      JobTitle = job.JobTitle,
                                      Duration = job.Duration,
                                      Durationtype = durtype1.DurationType,
                                      EmplType = empl.EmpTypeName,
                                      Location = loc.LocationName,
                                      Country = cou.CountryName,
                                      State = sta1.StateName,
                                      City = cit1.CityName,
                                      Rate1 = job.Rate1,
                                      WorkType1 = typ1.TypeName,
                                      Prioritylevel = pri.PriorityName,
                                      Jobopendate = job.Jobopendate,
                                      Jobopendatevalue = Convert.ToDateTime(job.Jobopendate).ToString("dd MMM yyyy"),
                                      Jobonboarddatevalue = getOnboarddate(job.Jobcode, onBoarded),
                                      Clientname = cli.ClientDisplayName,
                                      Submissioncount = getClosurecandidatecount(job.Jobcode, candStatus),
                                      jobcounts = jobDetails11,
                                  }).Distinct().ToList().OrderByDescending(m => m.Jobopendate);
                    //}).Distinct().ToList().OrderByDescending(m=>m.Jobopendate).ThenByDescending(n=>n.Jobonboarddatevalue.OrderByDescending(k=>k.OnboardDate!=null));
                }
                else if (TabName == "Notfilled")
                {
                    List<Jobcount> jobDetails11 = GetJobCountDetails();

                    var priSkill = await (from job in _context.JobMasterUsas
                                          join jobski in _context.JobPrimarySkillUsas on job.Jobcode equals jobski.Jobcode
                                          join ski in _context.SkillMasters on Convert.ToInt32(jobski.JobSkillName) equals ski.SkillId
                                          join yer in _context.YearMasters on Convert.ToInt32(jobski.JobYrsofExp) equals yer.YearMasterId

                                          select new Skill
                                          {
                                              JobSkillID = jobski.JobSkillId.ToString(),
                                              JobSkillName = ski.SkillName,
                                              JobYrsofExp = yer.YearMasterName,
                                              Jobcode = job.Jobcode
                                          }).ToListAsync();

                    var subjoblist = await (from job in _context.JobMasterUsas
                                            join canjob in _context.CandidateJobs on job.Jobcode equals canjob.Jobcode
                                            where job.Jobstatus == "10200" && Convert.ToInt32(canjob.CandStatus) >= 103
                                            select new JobInfo
                                            {
                                                Jobcode = job.Jobcode
                                            }).Distinct().ToListAsync();

                    var openjoblist = await (from job in _context.JobMasterUsas
                                             where job.Jobstatus == "10200"
                                             select new JobInfo
                                             {
                                                 Jobcode = job.Jobcode
                                             }).ToListAsync();

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

                    try
                    {
                        jobDetails = (from job in _context.JobMasterUsas
                                      join empl in _context.EmploymentTypeMasters on Convert.ToInt32(job.EmplType) equals empl.EmpTypeId
                                      join loc in _context.LocationMasters on Convert.ToInt32(job.Location) equals loc.LocationId
                                      join stat in _context.JobstatusMasters on Convert.ToInt32(job.Jobstatus) equals stat.JobstatusId
                                      join pri in _context.PriorityMasters on Convert.ToInt32(job.Prioritylevel) equals pri.PriorityId
                                      join cli in _context.ClientMasters on Convert.ToInt32(job.Clientname) equals cli.ClientId
                                      //join canjob in _context.CandidateJobs on job.Jobcode equals canjob.Jobcode
                                      //join can in _context.CandidateDetails on canjob.CandidateId equals can.Candidateid
                                      join cou in _context.CountryMasters on Convert.ToInt32(job.Country) equals cou.CountryId
                                      join sta in _context.StateMasters on Convert.ToInt32(job.State) equals sta.StateId
                                      into statemp
                                      from sta1 in statemp.DefaultIfEmpty()
                                      join cit in _context.CityMasters on Convert.ToInt32(job.City) equals cit.CityId
                                      into cittemp
                                      from cit1 in cittemp.DefaultIfEmpty()
                                      join typ in _context.TypeMasters on Convert.ToInt32(job.WorkType1) equals typ.TypeId
                                      into typtemp
                                      from typ1 in typtemp.DefaultIfEmpty()
                                      join durtype in _context.DurationtypeMasters on job.Durationtype equals durtype.Durationtypeid
                                      into durtemp
                                      from durtype1 in durtemp.DefaultIfEmpty()
                                          //where job.Jobcode.Contains(nosubJobcode)
                                      orderby job.CreatedOn descending, job.CreatedTime descending

                                      select new JobInfo
                                      {
                                          Jobcode = job.Jobcode,
                                          JobTitle = job.JobTitle,
                                          Duration = job.Duration,
                                          Durationtype = durtype1.DurationType,
                                          EmplType = empl.EmpTypeName,
                                          Location = loc.LocationName,
                                          Country = cou.CountryName,
                                          State = sta1.StateName,
                                          City = cit1.CityName,
                                          Rate1 = job.Rate1,
                                          WorkType1 = typ1.TypeName,
                                          Prioritylevel = pri.PriorityName,
                                          Jobopendatevalue = Convert.ToDateTime(job.Jobopendate).ToString("dd MMM yyyy"),
                                          Jobopendate = job.Jobopendate,
                                          CreatedTime = job.CreatedTime,
                                          Clientname = cli.ClientDisplayName,
                                          JobPrimarySkill = GetPrimaryskillInfo(job.Jobcode, priSkill),
                                          jobcounts = jobDetails11,
                                      }).Where(e => nosubJobcode.Contains(e.Jobcode)).Distinct().OrderByDescending(e => e.Jobopendate).ThenByDescending(e => e.CreatedTime).ToList();
                        //}).ToList();
                    }
                    catch (Exception ex) { }
                }

                return jobDetails;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public static List<Submissioncount> getsubmissioncount(string Jobcode, List<Submissioncount> candidateStatus)
        {
            var statusCount = (from status in candidateStatus.Where(wh => wh.JobCode == Jobcode && wh.CandStatusId >= 103
                               )
                               group status by new { status.CandStatusName, status.CandStatusId } into grouping

                               orderby grouping.Key.CandStatusName
                               select new Submissioncount
                               {
                                   CandStatusName = grouping.Key.CandStatusName,
                                   TotalCount = grouping.Count(),
                                   CandStatusId = grouping.Key.CandStatusId,
                                   JobCode = Jobcode,
                               }).ToList();

            return statusCount;
        }

        public static List<Submissioncount> getInterviewcandidatecount(string Jobcode, List<Submissioncount> candidateStatus)
        {
            var statusCount = (from status in candidateStatus.Where(wh => wh.JobCode == Jobcode && (wh.CandStatusId == 110 || wh.CandStatusId == 111))
                               group status by new { status.CandStatusName, status.CandStatusId } into grouping

                               orderby grouping.Key.CandStatusName
                               select new Submissioncount
                               {
                                   CandStatusName = grouping.Key.CandStatusName,
                                   TotalCount = grouping.Count(),
                                   CandStatusId = grouping.Key.CandStatusId,
                                   JobCode = Jobcode,
                               }).ToList();

            return statusCount;
        }

        public static List<Submissioncount> getClosurecandidatecount(string Jobcode, List<Submissioncount> candidateStatus)
        {
            var statusCount = (from status in candidateStatus.Where(wh => wh.JobCode == Jobcode && (wh.CandStatusId == 109 || wh.CandStatusId == 112))
                               group status by new { status.CandStatusName, status.CandStatusId } into grouping

                               orderby grouping.Key.CandStatusName
                               select new Submissioncount
                               {
                                   CandStatusName = grouping.Key.CandStatusName,
                                   TotalCount = grouping.Count(),
                                   CandStatusId = grouping.Key.CandStatusId,
                                   JobCode = Jobcode,
                               }).ToList();

            return statusCount;
        }

        public static List<RemarksInfo> GetRemarksInfo(string Jobcode, List<RemarksInfo> remarks)
        {
            var remarksInfo = (from tbl in remarks.Where(wh => wh.JobCode == Jobcode)
                                   //group tbl by new {tbl.Remarksinfo, tbl.Remarksgivenby,tbl.Remarksgivenon } into grouping
                               orderby tbl.Remarksgivenon descending, tbl.Remarksgiventime descending
                               select new RemarksInfo

                               {
                                   Remarksgivenby = tbl.Remarksgivenby,
                                   Remarksinfo = tbl.Remarksinfo
                               }).Take(1).ToList();

            return remarksInfo;
        }

        public static List<Skill> GetPrimaryskillInfo(string Jobcode, List<Skill> lstSkills)
        {
            var priSkillInfo = (from tbl in lstSkills.Where(wh => wh.Jobcode == Jobcode)

                                select new Skill

                                {
                                    JobSkillID = tbl.JobSkillID,
                                    JobSkillName = tbl.JobSkillName,
                                    JobYrsofExp = tbl.JobYrsofExp
                                }).ToList();

            return priSkillInfo;
        }

        public static List<Skill> GetSecondaryskillInfo(string Jobcode, List<Skill> lstSkills)
        {
            var priSkillInfo = (from tbl in lstSkills.Where(wh => wh.Jobcode == Jobcode)

                                select new Skill

                                {
                                    JobSkillID = tbl.JobSkillID,
                                    JobSkillName = tbl.JobSkillName,
                                    JobYrsofExp = tbl.JobYrsofExp
                                }).ToList();

            return priSkillInfo;
        }

        public List<Jobcount> GetJobCountDetails()
        {
            List<JobMasterUsa> jobDetails = new List<JobMasterUsa>();
            try
            {
                //jobcountDetails = (from job in _context.JobMasterUsas
                //                   where job.Jobcode == "10200" && (job.CreatedBy.Contains("%" + TWEID + "%") || job.AssignedTo.Contains("%" + TWEID + "%"))

                jobDetails = (from job in _context.JobMasterUsas
                              join stat in _context.JobstatusMasters on Convert.ToInt32(job.Jobstatus) equals stat.JobstatusId

                              select new JobMasterUsa
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

            var priSkill = (from job in _context.JobMasterUsas
                            join jobski in _context.JobPrimarySkillUsas on job.Jobcode equals jobski.Jobcode
                            join ski in _context.SkillMasters on Convert.ToInt32(jobski.JobSkillName) equals ski.SkillId
                            join yer in _context.YearMasters on Convert.ToInt32(jobski.JobYrsofExp) equals yer.YearMasterId

                            select new Skill
                            {
                                JobSkillID = jobski.JobSkillId.ToString(),
                                JobSkillName = ski.SkillName,
                                JobYrsofExp = yer.YearMasterName,
                                Jobcode = job.Jobcode
                            }).ToList();

            var subjoblist = (from job in _context.JobMasterUsas
                              join canjob in _context.CandidateJobs on job.Jobcode equals canjob.Jobcode
                              where job.Jobstatus == "10200" && Convert.ToInt32(canjob.CandStatus) >= 103
                              select new JobInfo
                              {
                                  Jobcode = job.Jobcode
                              }).Distinct().ToList();

            var openjoblist = (from job in _context.JobMasterUsas
                               where job.Jobstatus == "10200"
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

            jobDetails = (from job in _context.JobMasterUsas
                          join canjob in _context.CandidateJobs on job.Jobcode equals canjob.Jobcode
                          join can in _context.CandidateDetails on canjob.CandidateId equals can.Candidateid
                          where job.Jobstatus == "10200" && (canjob.CandStatus == "110" || canjob.CandStatus == "111")

                          select new JobMasterUsa
                          {
                              Jobstatus = "Interview",
                              Jobcode = job.Jobcode,
                          }).ToList();

            jobcount.Clear();
            jobcount = GetJobCount(jobDetails);

            Jobcount j3 = new Jobcount();
            j3.JobStatusName = "Interview Jobs";
            j3.TotalCount = jobcount[0].TotalCount;
            jobcountdetails.Add(j3);

            jobDetails = (from job in _context.JobMasterUsas
                          join canjob in _context.CandidateJobs on job.Jobcode equals canjob.Jobcode
                          join can in _context.CandidateDetails on canjob.CandidateId equals can.Candidateid
                          where (canjob.CandStatus == "109" || canjob.CandStatus == "112")

                          select new JobMasterUsa
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

            jobDetails = (from job in _context.JobMasterUsas

                          select new JobMasterUsa
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

        public static List<Jobcount> GetJobCount(List<JobMasterUsa> joblist)
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

        public static List<CandOnboarddetails> getOnboarddate(string Jobcode, List<CandOnboarddetails> candOnboard)
        {
            var onboarddetails = (from status in candOnboard.Where(wh => wh.Jobcode == Jobcode)
                                  group status by new { status.OnboardDate } into grouping

                                  orderby grouping.Key.OnboardDate
                                  select new CandOnboarddetails
                                  {
                                      OnboardDate = grouping.Key.OnboardDate,
                                  }).ToList();

            return onboarddetails;
        }

        public async Task<IEnumerable<Jobdetail>> GetJobInformation(string Jobcode)
        {
            IEnumerable<Jobdetail> jobDetails = new List<Jobdetail>();

            jobDetails = await (from job in _context.JobMasterUsas

                                join empl in _context.EmploymentTypeMasters on Convert.ToInt32(job.EmplType) equals empl.EmpTypeId
                                join loc in _context.LocationMasters on Convert.ToInt32(job.Location) equals loc.LocationId
                                join stat in _context.JobstatusMasters on Convert.ToInt32(job.Jobstatus) equals stat.JobstatusId
                                join cli in _context.ClientMasters on Convert.ToInt32(job.Clientname) equals cli.ClientId
                                join clicon in _context.ClientContactPeople on Convert.ToInt32(job.Contactname) equals clicon.ClientContactId
                                join pri in _context.PriorityMasters on Convert.ToInt32(job.Prioritylevel) equals pri.PriorityId
                                join cou in _context.CountryMasters on Convert.ToInt32(job.Country) equals cou.CountryId
                                join cur1 in _context.CurrencyMasters on Convert.ToInt32(job.Currency1) equals cur1.CurrencyId
                                join cur2 in _context.CurrencyMasters on Convert.ToInt32(job.Currency2) equals cur2.CurrencyId
                                into curtemp
                                from cur11 in curtemp.DefaultIfEmpty()
                                join sta in _context.StateMasters on Convert.ToInt32(job.State) equals sta.StateId
                                into statemp
                                from sta1 in statemp.DefaultIfEmpty()
                                join cit in _context.CityMasters on Convert.ToInt32(job.City) equals cit.CityId
                                into cittemp
                                from cit1 in cittemp.DefaultIfEmpty()
                                join typ in _context.TypeMasters on Convert.ToInt32(job.WorkType1) equals typ.TypeId
                                into typtemp
                                from typ1 in typtemp.DefaultIfEmpty()
                                join typ11 in _context.TypeMasters on Convert.ToInt32(job.WorkType2) equals typ11.TypeId
                                into typtemp1
                                from typ2 in typtemp1.DefaultIfEmpty()
                                join durtype in _context.DurationtypeMasters on job.Durationtype equals durtype.Durationtypeid
                                into durtemp
                                from durtype1 in durtemp.DefaultIfEmpty()
                                join usp in _context.Userprofilecreations on job.CreatedBy equals usp.TweId
                                join usp1 in _context.Userprofilecreations on job.LastUpdatedBy equals usp1.TweId
                                into usptemp
                                from usp2 in usptemp.DefaultIfEmpty()
                                join sup in _context.SupplierDetailsIndia on Convert.ToInt32(job.AssignedToVendor) equals sup.Supplierid
                                into suptemp
                                from sup1 in suptemp.DefaultIfEmpty()
                                join supcon in _context.SupplierContactPersonIndia on job.AssignedToVendorContact equals supcon.Userid
                                into supcontemp
                                from supcon1 in supcontemp.DefaultIfEmpty()
                                join usp11 in _context.Userprofilecreations on job.Primaryrecruitercontact equals usp11.TweId
                                into usptemp1
                                from usp21 in usptemp1.DefaultIfEmpty()
                                where job.Jobcode.Contains(Jobcode)

                                select new Jobdetail
                                {
                                    Jobcode = job.Jobcode,
                                    JobTitle = job.JobTitle,
                                    Duration = job.Duration,
                                    Durationtype = durtype1.DurationType,
                                    EmplType = empl.EmpTypeName,
                                    Location = loc.LocationName,
                                    State = sta1.StateName,
                                    City = cit1.CityName,
                                    Country = cou.CountryName,
                                    Rate1 = job.Rate1,
                                    WorkType1 = typ1.TypeName,
                                    Rate2 = job.Rate2,
                                    WorkType2 = typ2.TypeName,
                                    Prioritylevel = pri.PriorityName,
                                    Jobopendate = Convert.ToDateTime(job.Jobopendate).ToString("dd MMM yyyy"),
                                    Clientname = cli.ClientDisplayName,
                                    Contactname = clicon.ContactPerson,
                                    Jobstatus = stat.JobstatusName,
                                    Created_By = usp.Firstname,
                                    Created_Time = job.CreatedTime,
                                    AssignedTo = job.AssignedTo,
                                    Description = job.Description,
                                }).ToListAsync();

            jobDetails = GetAssignedTo(jobDetails.ToList());
            jobDetails = GetRemarks(jobDetails.ToList());
            jobDetails = GetSkillInfo(jobDetails.ToList());

            return jobDetails;
        }

        public List<Jobdetail> GetAssignedTo(List<Jobdetail> lstJobdetails)
        {
            List<Employees> jobassigntoDetails = new List<Employees>();
            string empName = "";

            if (lstJobdetails[0].AssignedTo != null)
            {
                string TWE_id = "";
                if (lstJobdetails[0].AssignedTo.Contains(','))
                {
                    string[] strEmp = lstJobdetails[0].AssignedTo.Split(',');

                    for (int i = 0; i < strEmp.Length; i++)
                    {
                        TWE_id += strEmp[i] + ",";
                    }

                    if (TWE_id != "")
                    {
                        TWE_id = TWE_id.Substring(0, TWE_id.TrimEnd().Length - 1);
                    }
                }
                else
                {
                    TWE_id = lstJobdetails[0].AssignedTo;
                }

                jobassigntoDetails = (from up in _context.Userprofilecreations

                                      select new Employees
                                      {
                                          Name = up.Firstname,
                                          TWE_ID = up.TweId
                                      }).Where(e => TWE_id.Contains(e.TWE_ID)).ToList();
            }

            lstJobdetails[0].AssignedTo = "";

            for (int i = 0; i < jobassigntoDetails.Count; i++)
            {
                lstJobdetails[0].AssignedTo += jobassigntoDetails[i].Name + ", ";
            }

            if (lstJobdetails[0].AssignedTo != "")
            {
                lstJobdetails[0].AssignedTo = lstJobdetails[0].AssignedTo.Substring(0, lstJobdetails[0].AssignedTo.TrimEnd().Length - 1);
            }

            return lstJobdetails;
        }

        public List<Jobdetail> GetRemarks(List<Jobdetail> lstJobdetails)
        {
            List<RemarksInfo> jobremarksDetails = new List<RemarksInfo>();

            jobremarksDetails = (from rem in _context.TblJobRemarks
                                 where rem.Jobcode == lstJobdetails[0].Jobcode
                                 orderby rem.RemGivenon descending

                                 select new RemarksInfo
                                 {
                                     Remarksinfo = rem.Remarks,
                                     Remarksgivenby = rem.RemGivenby,
                                 }).ToList();

            for (int i = 0; i < jobremarksDetails.Count; i++)
            {
                var jobremarksDetails1 = (from up in _context.Userprofilecreations.Where(wh => wh.TweId == jobremarksDetails[i].Remarksgivenby)

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

        public List<Jobdetail> GetSkillInfo(List<Jobdetail> lstJobdetails)
        {
            List<Skill> jobpriskillDetails = new List<Skill>();

            jobpriskillDetails = (from job in _context.JobMasterUsas
                                  join jobski in _context.JobPrimarySkillUsas on job.Jobcode equals jobski.Jobcode
                                  join ski in _context.SkillMasters on Convert.ToInt32(jobski.JobSkillName) equals ski.SkillId
                                  join yer in _context.YearMasters on Convert.ToInt32(jobski.JobYrsofExp) equals yer.YearMasterId
                                  where job.Jobcode == lstJobdetails[0].Jobcode

                                  select new Skill
                                  {
                                      JobSkillID = jobski.JobSkillId.ToString(),
                                      JobSkillName = ski.SkillName,
                                      JobYrsofExp = yer.YearMasterName,
                                      Jobcode = job.Jobcode
                                  }).ToList();

            List<Skill> jobsecskillDetails = new List<Skill>();

            jobsecskillDetails = (from job in _context.JobMasterUsas
                                  join jobski in _context.JobSecondarySkillUsas on job.Jobcode equals jobski.Jobcode
                                  join ski in _context.SkillMasters on Convert.ToInt32(jobski.JobSkillName) equals ski.SkillId
                                  join yer in _context.YearMasters on Convert.ToInt32(jobski.JobYrsofExp) equals yer.YearMasterId
                                  where job.Jobcode == lstJobdetails[0].Jobcode

                                  select new Skill
                                  {
                                      JobSkillID = jobski.JobSkillId.ToString(),
                                      JobSkillName = ski.SkillName,
                                      JobYrsofExp = yer.YearMasterName,
                                      Jobcode = job.Jobcode
                                  }).ToList();

            lstJobdetails[0].JobPrimarySkill = jobpriskillDetails.ToList();
            lstJobdetails[0].JobSecondarySkill = jobsecskillDetails.ToList();

            return lstJobdetails;
        }
    }
}
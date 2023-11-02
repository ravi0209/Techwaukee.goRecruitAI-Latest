using Microsoft.EntityFrameworkCore;
using Techwaukee.goRecruitAI.Models;

namespace Techwaukee.goRecruitAI.Data
{
    public partial class RecruitContext : DbContext
    {
        public RecruitContext(DbContextOptions<RecruitContext> options)
      : base(options)
        {
        }

        public virtual DbSet<AnswerMaster> AnswerMasters { get; set; }

        public virtual DbSet<AssessmentCheck> AssessmentChecks { get; set; }

        public virtual DbSet<AssessmentCheckIndium> AssessmentCheckIndia { get; set; }

        public virtual DbSet<AssessmentCheckRating> AssessmentCheckRatings { get; set; }

        public virtual DbSet<AssessmentCheckRatingIndium> AssessmentCheckRatingIndia { get; set; }

        public virtual DbSet<AssessmentQuestionHeadingMaster> AssessmentQuestionHeadingMasters { get; set; }

        public virtual DbSet<AssessmentQuestionMaster> AssessmentQuestionMasters { get; set; }

        public virtual DbSet<BenchRecruiting> BenchRecruitings { get; set; }

        public virtual DbSet<CandComment> CandComments { get; set; }

        public virtual DbSet<CandCommentsIndInternalBasicDet> CandCommentsIndInternalBasicDets { get; set; }

        public virtual DbSet<CandCommentsIndInternalInterviewDet> CandCommentsIndInternalInterviewDets { get; set; }

        public virtual DbSet<CandCommentsIndium> CandCommentsIndia { get; set; }

        public virtual DbSet<CandCommentsInternalInterviewDetB> CandCommentsInternalInterviewDetBs { get; set; }

        public virtual DbSet<CandCommentsUsainternalBasicDet> CandCommentsUsainternalBasicDets { get; set; }

        public virtual DbSet<CandCommentsUsainternalInterviewDet> CandCommentsUsainternalInterviewDets { get; set; }

        public virtual DbSet<CandidateDetail> CandidateDetails { get; set; }

        public virtual DbSet<CandidateDetailsB> CandidateDetailsBs { get; set; }

        public virtual DbSet<CandidateDetailsIndium> CandidateDetailsIndia { get; set; }

        public virtual DbSet<CandidateJob> CandidateJobs { get; set; }

        public virtual DbSet<CandidateJobIndium> CandidateJobIndia { get; set; }

        public virtual DbSet<CandidateJobPriSkillInd> CandidateJobPriSkillInds { get; set; }

        public virtual DbSet<CandidateJobPriSkillUsa> CandidateJobPriSkillUsas { get; set; }

        public virtual DbSet<CandidateJobSecSkillInd> CandidateJobSecSkillInds { get; set; }

        public virtual DbSet<CandidateJobSecSkillUsa> CandidateJobSecSkillUsas { get; set; }

        public virtual DbSet<CandidateSourceMaster> CandidateSourceMasters { get; set; }

        public virtual DbSet<CandidateSourceMaster1> CandidateSourceMasters1 { get; set; }

        public virtual DbSet<CandidateStatusMaster> CandidateStatusMasters { get; set; }

        public virtual DbSet<CandidateSubmissiondetailsB> CandidateSubmissiondetailsBs { get; set; }

        public virtual DbSet<CandidateSubmissiondetailsB1> CandidateSubmissiondetailsBs1 { get; set; }

        public virtual DbSet<CandidateTitleMaster> CandidateTitleMasters { get; set; }

        public virtual DbSet<CandidatejobB> CandidatejobBs { get; set; }

        public virtual DbSet<CandidatejobB1> CandidatejobBs1 { get; set; }

        public virtual DbSet<Candproofdetail> Candproofdetails { get; set; }

        public virtual DbSet<CandproofdetailsIndium> CandproofdetailsIndia { get; set; }

        public virtual DbSet<CertificationMaster> CertificationMasters { get; set; }

        public virtual DbSet<CitizenshipMaster> CitizenshipMasters { get; set; }

        public virtual DbSet<City> Cities { get; set; }

        public virtual DbSet<CityMaster> CityMasters { get; set; }

        public virtual DbSet<ClientContactPerson> ClientContactPeople { get; set; }

        public virtual DbSet<ClientMaster> ClientMasters { get; set; }

        public virtual DbSet<ClosedbyMaster> ClosedbyMasters { get; set; }

        public virtual DbSet<ContactTable> ContactTables { get; set; }

        public virtual DbSet<Country> Countries { get; set; }

        public virtual DbSet<CountryMaster> CountryMasters { get; set; }

        public virtual DbSet<CurrencyMaster> CurrencyMasters { get; set; }

        public virtual DbSet<DesignationMaster> DesignationMasters { get; set; }

        public virtual DbSet<DurationtypeMaster> DurationtypeMasters { get; set; }

        public virtual DbSet<DurationtypeMaster1> DurationtypeMasters1 { get; set; }

        public virtual DbSet<EmployerContactPerson> EmployerContactPeople { get; set; }

        public virtual DbSet<EmployerContactPersonIndium> EmployerContactPersonIndia { get; set; }

        public virtual DbSet<EmployerDetail> EmployerDetails { get; set; }

        public virtual DbSet<EmployerDetailsIndium> EmployerDetailsIndia { get; set; }

        public virtual DbSet<EmploymentTypeMaster> EmploymentTypeMasters { get; set; }

        public virtual DbSet<ExperienceMaster> ExperienceMasters { get; set; }

        public virtual DbSet<ExternalJobCandidateUsa> ExternalJobCandidateUsas { get; set; }

        public virtual DbSet<ExternalJobCandidateUsa1> ExternalJobCandidateUsas1 { get; set; }

        public virtual DbSet<ExternalJobMasterUsa> ExternalJobMasterUsas { get; set; }

        public virtual DbSet<GenderMaster> GenderMasters { get; set; }

        public virtual DbSet<GenuinityCheck> GenuinityChecks { get; set; }

        public virtual DbSet<GenuinityCheck1> GenuinityChecks1 { get; set; }

        public virtual DbSet<GenuinityCheckIndium> GenuinityCheckIndia { get; set; }

        public virtual DbSet<GenuinityCheckRating> GenuinityCheckRatings { get; set; }

        public virtual DbSet<GenuinityCheckRating1> GenuinityCheckRatings1 { get; set; }

        public virtual DbSet<GenuinityCheckRatingIndium> GenuinityCheckRatingIndia { get; set; }

        public virtual DbSet<ImageMaster> ImageMasters { get; set; }

        public virtual DbSet<JobMasterInd> JobMasterInds { get; set; }

        public virtual DbSet<JobMasterUsa> JobMasterUsas { get; set; }

        public virtual DbSet<JobMatchSkillPercentage> JobMatchSkillPercentages { get; set; }

        public virtual DbSet<JobPortalMaster> JobPortalMasters { get; set; }

        public virtual DbSet<JobPrimarySkillInd> JobPrimarySkillInds { get; set; }

        public virtual DbSet<JobPrimarySkillUsa> JobPrimarySkillUsas { get; set; }

        public virtual DbSet<JobSecondarySkillInd> JobSecondarySkillInds { get; set; }

        public virtual DbSet<JobSecondarySkillUsa> JobSecondarySkillUsas { get; set; }

        public virtual DbSet<JobstatusMaster> JobstatusMasters { get; set; }

        public virtual DbSet<LanguageMaster> LanguageMasters { get; set; }

        public virtual DbSet<LevelMaster> LevelMasters { get; set; }

        public virtual DbSet<LocationMaster> LocationMasters { get; set; }

        public virtual DbSet<MailidMaster> MailidMasters { get; set; }

        public virtual DbSet<Menuaccess> Menuaccesses { get; set; }

        public virtual DbSet<Menuaccesspermission> Menuaccesspermissions { get; set; }

        public virtual DbSet<NewJobTable> NewJobTables { get; set; }

        public virtual DbSet<NoticeperiodMaster> NoticeperiodMasters { get; set; }

        public virtual DbSet<PortalMaster> PortalMasters { get; set; }

        public virtual DbSet<PrimarySkillMaster> PrimarySkillMasters { get; set; }

        public virtual DbSet<PrimarySkillMaster1> PrimarySkillMasters1 { get; set; }

        public virtual DbSet<PriorityMaster> PriorityMasters { get; set; }

        public virtual DbSet<QuestionHeadingMaster> QuestionHeadingMasters { get; set; }

        public virtual DbSet<QuestionMaster> QuestionMasters { get; set; }

        public virtual DbSet<RateTypeMaster> RateTypeMasters { get; set; }

        public virtual DbSet<RecruiterEmailId> RecruiterEmailIds { get; set; }

        public virtual DbSet<RegionMaster> RegionMasters { get; set; }

        public virtual DbSet<RemarksMaster> RemarksMasters { get; set; }

        public virtual DbSet<RoleMaster> RoleMasters { get; set; }

        public virtual DbSet<Rtrconfirmation> Rtrconfirmations { get; set; }

        public virtual DbSet<RtrconfirmationIndium> RtrconfirmationIndia { get; set; }

        public virtual DbSet<ScoreMaster> ScoreMasters { get; set; }

        public virtual DbSet<SkillMaster> SkillMasters { get; set; }

        public virtual DbSet<SpecializationMaster> SpecializationMasters { get; set; }

        public virtual DbSet<State> States { get; set; }

        public virtual DbSet<StateMaster> StateMasters { get; set; }

        public virtual DbSet<StateMaster1> StateMasters1 { get; set; }

        public virtual DbSet<StatusMaster> StatusMasters { get; set; }

        public virtual DbSet<SupplierContactPersonIndium> SupplierContactPersonIndia { get; set; }

        public virtual DbSet<SupplierDetailsIndium> SupplierDetailsIndia { get; set; }

        public virtual DbSet<TargetMaster> TargetMasters { get; set; }

        public virtual DbSet<TargetMasterInd> TargetMasterInds { get; set; }

        public virtual DbSet<TargetMasterUsa> TargetMasterUsas { get; set; }

        public virtual DbSet<TblExtJobRemark> TblExtJobRemarks { get; set; }

        public virtual DbSet<TblExtJobRemark1> TblExtJobRemarks1 { get; set; }

        public virtual DbSet<TblJobCommentsIndium> TblJobCommentsIndia { get; set; }

        public virtual DbSet<TblJobCommentsU> TblJobCommentsUs { get; set; }

        public virtual DbSet<TblJobRemark> TblJobRemarks { get; set; }

        public virtual DbSet<TblJobRemarksIndium> TblJobRemarksIndia { get; set; }

        public virtual DbSet<TeamPerfomance> TeamPerfomances { get; set; }

        public virtual DbSet<TeamPerfomanceIndiaMonthly> TeamPerfomanceIndiaMonthlies { get; set; }

        public virtual DbSet<TeamPerfomanceIndiaWeekly> TeamPerfomanceIndiaWeeklies { get; set; }

        public virtual DbSet<TeamPerfomanceIndium> TeamPerfomanceIndia { get; set; }

        public virtual DbSet<TeamPerfomanceMonthly> TeamPerfomanceMonthlies { get; set; }

        public virtual DbSet<TeamPerfomanceWeekly> TeamPerfomanceWeeklies { get; set; }

        public virtual DbSet<ThirdPartyClientContactPerson> ThirdPartyClientContactPeople { get; set; }

        public virtual DbSet<ThirdPartyClientMaster> ThirdPartyClientMasters { get; set; }

        public virtual DbSet<TimezoneMaster> TimezoneMasters { get; set; }

        public virtual DbSet<TypeMaster> TypeMasters { get; set; }

        public virtual DbSet<UserAccessPower> UserAccessPowers { get; set; }

        public virtual DbSet<UserTargetMaster> UserTargetMasters { get; set; }

        public virtual DbSet<Usermenuacess> Usermenuacesses { get; set; }

        public virtual DbSet<Userprofile> Userprofiles { get; set; }

        public virtual DbSet<Userprofilecreation> Userprofilecreations { get; set; }

        public virtual DbSet<VendorContactPerson> VendorContactPeople { get; set; }

        public virtual DbSet<VendorMast> VendorMasts { get; set; }

        public virtual DbSet<VisaMaster> VisaMasters { get; set; }

        public virtual DbSet<YearMaster> YearMasters { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("gorecruitai_testuser");

            modelBuilder.Entity<AnswerMaster>(entity =>
            {
                entity.HasKey(e => e.Answerid).HasName("PK_Answer");

                entity.ToTable("Answer_Master", "dbo");

                entity.Property(e => e.Answervalue).HasMaxLength(50);
            });

            modelBuilder.Entity<AssessmentCheck>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("AssessmentCheck", "dbo");

                entity.Property(e => e.AssessmentCheckId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("AssessmentCheckID");
                entity.Property(e => e.Candidateid).HasColumnName("candidateid");
            });

            modelBuilder.Entity<AssessmentCheckIndium>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("AssessmentCheckIndia", "dbo");

                entity.Property(e => e.AssessmentCheckId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("AssessmentCheckID");
                entity.Property(e => e.Candidateid).HasColumnName("candidateid");
            });

            modelBuilder.Entity<AssessmentCheckRating>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("AssessmentCheckRating", "dbo");

                entity.Property(e => e.AssessmentCheckRatingId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("AssessmentCheckRatingID");
                entity.Property(e => e.Candidateid).HasColumnName("candidateid");
                entity.Property(e => e.LinkedIn1rating).HasMaxLength(50);
                entity.Property(e => e.LinkedIn2rating).HasMaxLength(50);
                entity.Property(e => e.LinkedIn3rating).HasMaxLength(50);
                entity.Property(e => e.LinkedIn4rating).HasMaxLength(50);
                entity.Property(e => e.Overallrecruiterrating).HasMaxLength(50);
                entity.Property(e => e.Overallsystemrating).HasMaxLength(50);
            });

            modelBuilder.Entity<AssessmentCheckRatingIndium>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("AssessmentCheckRatingIndia", "dbo");

                entity.Property(e => e.AssessmentCheckRatingId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("AssessmentCheckRatingID");
                entity.Property(e => e.Candidateid).HasColumnName("candidateid");
                entity.Property(e => e.LinkedIn1rating).HasMaxLength(50);
                entity.Property(e => e.LinkedIn2rating).HasMaxLength(50);
                entity.Property(e => e.Overallrecruiterrating).HasMaxLength(50);
                entity.Property(e => e.Overallsystemrating).HasMaxLength(50);
            });

            modelBuilder.Entity<AssessmentQuestionHeadingMaster>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("AssessmentQuestionHeading_Master", "dbo");

                entity.Property(e => e.QuestionHeadingid).ValueGeneratedOnAdd();
                entity.Property(e => e.QuestionHeadingname).HasMaxLength(100);
            });

            modelBuilder.Entity<AssessmentQuestionMaster>(entity =>
            {
                entity.HasKey(e => e.Questionid).HasName("PK_AssQuestion");

                entity.ToTable("Assessment_Question_Master", "dbo");

                entity.Property(e => e.Mark).HasMaxLength(50);
            });

            modelBuilder.Entity<BenchRecruiting>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("BenchRecruiting", "Admin_186551_orange");

                entity.Property(e => e.BenchRecruitingId).ValueGeneratedOnAdd();
                entity.Property(e => e.RecrutierName).HasMaxLength(100);
                entity.Property(e => e.TweId)
                    .HasMaxLength(100)
                    .HasColumnName("TWE_ID");
            });

            modelBuilder.Entity<CandComment>(entity =>
            {
                entity.HasKey(e => e.Candcommentid).HasName("PK__candComm__09DEE9069BFE810E");

                entity.ToTable("candComments", "dbo");

                entity.Property(e => e.Candcommentid).HasColumnName("candcommentid");
                entity.Property(e => e.Bpcomgivenby)
                    .HasMaxLength(50)
                    .HasColumnName("BPcomgivenby");
                entity.Property(e => e.Bpcomgivenon)
                    .HasColumnType("date")
                    .HasColumnName("BPcomgivenon");
                entity.Property(e => e.Bpcomgiventime)
                    .HasMaxLength(50)
                    .HasColumnName("BPcomgiventime");
                entity.Property(e => e.Bpcomments).HasColumnName("BPComments");
                entity.Property(e => e.Bpicomgivenby)
                    .HasMaxLength(50)
                    .HasColumnName("BPIcomgivenby");
                entity.Property(e => e.Bpicomgivenon)
                    .HasColumnType("date")
                    .HasColumnName("BPIcomgivenon");
                entity.Property(e => e.Bpicomgiventime)
                    .HasMaxLength(50)
                    .HasColumnName("BPIcomgiventime");
                entity.Property(e => e.BpiinterviewerName)
                    .HasMaxLength(50)
                    .HasColumnName("BPIInterviewerName");
                entity.Property(e => e.Bpiinterviewerzone)
                    .HasMaxLength(50)
                    .HasColumnName("BPIInterviewerzone");
                entity.Property(e => e.Bpistartdate)
                    .HasColumnType("date")
                    .HasColumnName("BPIstartdate");
                entity.Property(e => e.Bpitime)
                    .HasMaxLength(50)
                    .HasColumnName("BPItime");
                entity.Property(e => e.Bpiupdategivenby)
                    .HasMaxLength(50)
                    .HasColumnName("BPIupdategivenby");
                entity.Property(e => e.Bpiupdategivenon)
                    .HasColumnType("date")
                    .HasColumnName("BPIupdategivenon");
                entity.Property(e => e.Bpiupdategiventime)
                    .HasMaxLength(50)
                    .HasColumnName("BPIupdategiventime");
                entity.Property(e => e.Bpupdategivenby)
                    .HasMaxLength(50)
                    .HasColumnName("BPupdategivenby");
                entity.Property(e => e.Bpupdategivenon)
                    .HasColumnType("date")
                    .HasColumnName("BPupdategivenon");
                entity.Property(e => e.Bpupdategiventime)
                    .HasMaxLength(50)
                    .HasColumnName("BPupdategiventime");
                entity.Property(e => e.Candidateid)
                    .HasMaxLength(50)
                    .HasColumnName("candidateid");
                entity.Property(e => e.Eccomgivenby)
                    .HasMaxLength(50)
                    .HasColumnName("ECcomgivenby");
                entity.Property(e => e.Eccomgivenon)
                    .HasColumnType("date")
                    .HasColumnName("ECcomgivenon");
                entity.Property(e => e.Eccomgiventime)
                    .HasMaxLength(50)
                    .HasColumnName("ECcomgiventime");
                entity.Property(e => e.Eccomments).HasColumnName("ECComments");
                entity.Property(e => e.Ecicomgivenby)
                    .HasMaxLength(50)
                    .HasColumnName("ECIcomgivenby");
                entity.Property(e => e.Ecicomgivenon)
                    .HasColumnType("date")
                    .HasColumnName("ECIcomgivenon");
                entity.Property(e => e.Ecicomgiventime)
                    .HasMaxLength(50)
                    .HasColumnName("ECIcomgiventime");
                entity.Property(e => e.Eciiinterviewerzone)
                    .HasMaxLength(50)
                    .HasColumnName("ECIIInterviewerzone");
                entity.Property(e => e.EciinterviewerName)
                    .HasMaxLength(50)
                    .HasColumnName("ECIInterviewerName");
                entity.Property(e => e.Ecistartdate)
                    .HasColumnType("date")
                    .HasColumnName("ECIstartdate");
                entity.Property(e => e.Ecitime)
                    .HasMaxLength(50)
                    .HasColumnName("ECItime");
                entity.Property(e => e.Eciupdategivenby)
                    .HasMaxLength(50)
                    .HasColumnName("ECIupdategivenby");
                entity.Property(e => e.Eciupdategivenon)
                    .HasColumnType("date")
                    .HasColumnName("ECIupdategivenon");
                entity.Property(e => e.Eciupdategiventime)
                    .HasMaxLength(50)
                    .HasColumnName("ECIupdategiventime");
                entity.Property(e => e.Ecupdategivenby)
                    .HasMaxLength(50)
                    .HasColumnName("ECupdategivenby");
                entity.Property(e => e.Ecupdategivenon)
                    .HasColumnType("date")
                    .HasColumnName("ECupdategivenon");
                entity.Property(e => e.Ecupdategiventime)
                    .HasMaxLength(50)
                    .HasColumnName("ECupdategiventime");
                entity.Property(e => e.FutureDate).HasColumnType("date");
                entity.Property(e => e.Jobcode)
                    .HasMaxLength(50)
                    .HasColumnName("jobcode");
                entity.Property(e => e.OnboardDate).HasColumnType("date");
                entity.Property(e => e.OnboardEndDate).HasColumnType("date");
                entity.Property(e => e.OnboardRate).HasMaxLength(50);
                entity.Property(e => e.OnboardRateCategory).HasMaxLength(50);
                entity.Property(e => e.OnboardRateType).HasMaxLength(50);
                entity.Property(e => e.Onboardcomgivenby).HasMaxLength(50);
                entity.Property(e => e.Onboardcomgivenon).HasColumnType("date");
                entity.Property(e => e.Onboardcomgiventime).HasMaxLength(50);
                entity.Property(e => e.Onboardcomupdategivenby).HasMaxLength(50);
                entity.Property(e => e.Onboardcomupdatenon).HasColumnType("date");
                entity.Property(e => e.Onboardcomupdatetime).HasMaxLength(50);
                entity.Property(e => e.PriRecComgivenby).HasMaxLength(50);
                entity.Property(e => e.PriRecComgivenon).HasColumnType("date");
                entity.Property(e => e.PriRecComgiventime).HasMaxLength(50);
                entity.Property(e => e.PriRecRating).HasMaxLength(50);
                entity.Property(e => e.PriRecUpdategivenby).HasMaxLength(50);
                entity.Property(e => e.PriRecUpdategivenon).HasColumnType("date");
                entity.Property(e => e.PriRecUpdategiventime).HasMaxLength(50);
                entity.Property(e => e.Tlcomgivenby)
                    .HasMaxLength(50)
                    .HasColumnName("TLcomgivenby");
                entity.Property(e => e.Tlcomgivenon)
                    .HasColumnType("date")
                    .HasColumnName("TLcomgivenon");
                entity.Property(e => e.Tlcomgiventime)
                    .HasMaxLength(50)
                    .HasColumnName("TLcomgiventime");
                entity.Property(e => e.Tlcomments).HasColumnName("TLComments");
                entity.Property(e => e.Tlrating)
                    .HasMaxLength(10)
                    .IsFixedLength()
                    .HasColumnName("TLRating");
                entity.Property(e => e.Tlupdategivenby)
                    .HasMaxLength(50)
                    .HasColumnName("TLupdategivenby");
                entity.Property(e => e.Tlupdategivenon)
                    .HasColumnType("date")
                    .HasColumnName("TLupdategivenon");
                entity.Property(e => e.Tlupdategiventime)
                    .HasMaxLength(50)
                    .HasColumnName("TLupdategiventime");
            });

            modelBuilder.Entity<CandCommentsIndInternalBasicDet>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("candCommentsIndInternalBasicDet", "dbo");

                entity.Property(e => e.Candcommentbasicid)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("candcommentbasicid");
                entity.Property(e => e.CandidateStatus).HasMaxLength(50);
                entity.Property(e => e.Candidateid)
                    .HasMaxLength(50)
                    .HasColumnName("candidateid");
                entity.Property(e => e.Jobcode).HasMaxLength(50);
                entity.Property(e => e.OfferAppdate).HasColumnType("date");
                entity.Property(e => e.OfferHolddate).HasColumnType("date");
                entity.Property(e => e.OfferRejdate).HasColumnType("date");
                entity.Property(e => e.Offercomgivenby).HasMaxLength(50);
                entity.Property(e => e.Offercomgivenon).HasColumnType("date");
                entity.Property(e => e.Offercomgiventime).HasMaxLength(50);
                entity.Property(e => e.Offerupdategivenby).HasMaxLength(50);
                entity.Property(e => e.Offerupdategivenon).HasColumnType("date");
                entity.Property(e => e.Offerupdategiventime).HasMaxLength(50);
                entity.Property(e => e.OnboardDate).HasColumnType("date");
                entity.Property(e => e.OnboardRate).HasMaxLength(50);
                entity.Property(e => e.OnboardRateType).HasMaxLength(50);
                entity.Property(e => e.Onboardcomgivenby).HasMaxLength(50);
                entity.Property(e => e.Onboardcomgivenon).HasColumnType("date");
                entity.Property(e => e.Onboardcomgiventime).HasMaxLength(50);
                entity.Property(e => e.Onboardcomupdategivenby).HasMaxLength(50);
                entity.Property(e => e.Onboardcomupdatenon).HasColumnType("date");
                entity.Property(e => e.Onboardcomupdatetime).HasMaxLength(50);
                entity.Property(e => e.PriRecComgivenby).HasMaxLength(50);
                entity.Property(e => e.PriRecComgivenon).HasColumnType("date");
                entity.Property(e => e.PriRecComgiventime).HasMaxLength(50);
                entity.Property(e => e.PriRecRating).HasMaxLength(50);
                entity.Property(e => e.PriRecUpdategivenby).HasMaxLength(50);
                entity.Property(e => e.PriRecUpdategivenon).HasColumnType("date");
                entity.Property(e => e.PriRecUpdategiventime).HasMaxLength(50);
                entity.Property(e => e.PrjEnddate).HasMaxLength(100);
                entity.Property(e => e.Startdate).HasColumnType("date");
                entity.Property(e => e.Tlappdate)
                    .HasColumnType("date")
                    .HasColumnName("TLAppdate");
                entity.Property(e => e.Tlcomgivenby)
                    .HasMaxLength(50)
                    .HasColumnName("TLcomgivenby");
                entity.Property(e => e.Tlcomgivenon)
                    .HasColumnType("date")
                    .HasColumnName("TLcomgivenon");
                entity.Property(e => e.Tlcomgiventime)
                    .HasMaxLength(50)
                    .HasColumnName("TLcomgiventime");
                entity.Property(e => e.Tlcomments).HasColumnName("TLComments");
                entity.Property(e => e.Tlrating)
                    .HasMaxLength(10)
                    .IsFixedLength()
                    .HasColumnName("TLRating");
                entity.Property(e => e.Tlrejdate)
                    .HasColumnType("date")
                    .HasColumnName("TLRejdate");
                entity.Property(e => e.Tlupdategivenby)
                    .HasMaxLength(50)
                    .HasColumnName("TLupdategivenby");
                entity.Property(e => e.Tlupdategivenon)
                    .HasColumnType("date")
                    .HasColumnName("TLupdategivenon");
                entity.Property(e => e.Tlupdategiventime)
                    .HasMaxLength(50)
                    .HasColumnName("TLupdategiventime");
            });

            modelBuilder.Entity<CandCommentsIndInternalInterviewDet>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("candCommentsIndInternalInterviewDet", "dbo");

                entity.Property(e => e.Candcommentinterviewid)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("candcommentinterviewid");
                entity.Property(e => e.Candidateid)
                    .HasMaxLength(50)
                    .HasColumnName("candidateid");
                entity.Property(e => e.FeedbackType).HasMaxLength(50);
                entity.Property(e => e.IntSchdate).HasColumnType("date");
                entity.Property(e => e.Intcomgivenby).HasMaxLength(50);
                entity.Property(e => e.Intcomgivenon).HasColumnType("date");
                entity.Property(e => e.Intcomgiventime).HasMaxLength(50);
                entity.Property(e => e.InterviewStatus).HasMaxLength(50);
                entity.Property(e => e.InterviewType).HasMaxLength(50);
                entity.Property(e => e.Interviewdate).HasColumnType("date");
                entity.Property(e => e.InterviewerName).HasMaxLength(50);
                entity.Property(e => e.Interviewerzone).HasMaxLength(50);
                entity.Property(e => e.Interviewtime).HasMaxLength(50);
                entity.Property(e => e.Intupdategivenby).HasMaxLength(50);
                entity.Property(e => e.Intupdategivenon).HasColumnType("date");
                entity.Property(e => e.Intupdategiventime).HasMaxLength(50);
                entity.Property(e => e.Jobcode).HasMaxLength(50);
                entity.Property(e => e.MgrAppdate).HasColumnType("date");
                entity.Property(e => e.MgrRejdate).HasColumnType("date");
                entity.Property(e => e.Mgrcomgivenby).HasMaxLength(50);
                entity.Property(e => e.Mgrcomgivenon).HasColumnType("date");
                entity.Property(e => e.Mgrcomgiventime).HasMaxLength(50);
                entity.Property(e => e.Mgrupdategivenby).HasMaxLength(50);
                entity.Property(e => e.Mgrupdategivenon).HasColumnType("date");
                entity.Property(e => e.Mgrupdategiventime).HasMaxLength(50);
            });

            modelBuilder.Entity<CandCommentsIndium>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("candCommentsIndia", "dbo");

                entity.Property(e => e.Bpcomgivenby)
                    .HasMaxLength(50)
                    .HasColumnName("BPcomgivenby");
                entity.Property(e => e.Bpcomgivenon)
                    .HasColumnType("date")
                    .HasColumnName("BPcomgivenon");
                entity.Property(e => e.Bpcomgiventime)
                    .HasMaxLength(50)
                    .HasColumnName("BPcomgiventime");
                entity.Property(e => e.Bpcomments).HasColumnName("BPComments");
                entity.Property(e => e.Bpicomgivenby)
                    .HasMaxLength(50)
                    .HasColumnName("BPIcomgivenby");
                entity.Property(e => e.Bpicomgivenon)
                    .HasColumnType("date")
                    .HasColumnName("BPIcomgivenon");
                entity.Property(e => e.Bpicomgiventime)
                    .HasMaxLength(50)
                    .HasColumnName("BPIcomgiventime");
                entity.Property(e => e.BpiinterviewerName)
                    .HasMaxLength(50)
                    .HasColumnName("BPIInterviewerName");
                entity.Property(e => e.Bpistartdate)
                    .HasColumnType("date")
                    .HasColumnName("BPIstartdate");
                entity.Property(e => e.Bpitime)
                    .HasMaxLength(50)
                    .HasColumnName("BPItime");
                entity.Property(e => e.Bpiupdategivenby)
                    .HasMaxLength(50)
                    .HasColumnName("BPIupdategivenby");
                entity.Property(e => e.Bpiupdategivenon)
                    .HasColumnType("date")
                    .HasColumnName("BPIupdategivenon");
                entity.Property(e => e.Bpiupdategiventime)
                    .HasMaxLength(50)
                    .HasColumnName("BPIupdategiventime");
                entity.Property(e => e.Bpupdategivenby)
                    .HasMaxLength(50)
                    .HasColumnName("BPupdategivenby");
                entity.Property(e => e.Bpupdategivenon)
                    .HasColumnType("date")
                    .HasColumnName("BPupdategivenon");
                entity.Property(e => e.Bpupdategiventime)
                    .HasMaxLength(50)
                    .HasColumnName("BPupdategiventime");
                entity.Property(e => e.Candcommentid)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("candcommentid");
                entity.Property(e => e.Candidateid)
                    .HasMaxLength(50)
                    .HasColumnName("candidateid");
                entity.Property(e => e.Eccomgivenby)
                    .HasMaxLength(50)
                    .HasColumnName("ECcomgivenby");
                entity.Property(e => e.Eccomgivenon)
                    .HasColumnType("date")
                    .HasColumnName("ECcomgivenon");
                entity.Property(e => e.Eccomgiventime)
                    .HasMaxLength(50)
                    .HasColumnName("ECcomgiventime");
                entity.Property(e => e.Eccomments).HasColumnName("ECComments");
                entity.Property(e => e.Ecicomgivenby)
                    .HasMaxLength(50)
                    .HasColumnName("ECIcomgivenby");
                entity.Property(e => e.Ecicomgivenon)
                    .HasColumnType("date")
                    .HasColumnName("ECIcomgivenon");
                entity.Property(e => e.Ecicomgiventime)
                    .HasMaxLength(50)
                    .HasColumnName("ECIcomgiventime");
                entity.Property(e => e.EciinterviewerName)
                    .HasMaxLength(50)
                    .HasColumnName("ECIInterviewerName");
                entity.Property(e => e.Ecistartdate)
                    .HasColumnType("date")
                    .HasColumnName("ECIstartdate");
                entity.Property(e => e.Ecitime)
                    .HasMaxLength(50)
                    .HasColumnName("ECItime");
                entity.Property(e => e.Eciupdategivenby)
                    .HasMaxLength(50)
                    .HasColumnName("ECIupdategivenby");
                entity.Property(e => e.Eciupdategivenon)
                    .HasColumnType("date")
                    .HasColumnName("ECIupdategivenon");
                entity.Property(e => e.Eciupdategiventime)
                    .HasMaxLength(50)
                    .HasColumnName("ECIupdategiventime");
                entity.Property(e => e.Ecstatus).HasColumnName("ECstatus");
                entity.Property(e => e.Ecupdategivenby)
                    .HasMaxLength(50)
                    .HasColumnName("ECupdategivenby");
                entity.Property(e => e.Ecupdategivenon)
                    .HasColumnType("date")
                    .HasColumnName("ECupdategivenon");
                entity.Property(e => e.Ecupdategiventime)
                    .HasMaxLength(50)
                    .HasColumnName("ECupdategiventime");
                entity.Property(e => e.Jobcode)
                    .HasMaxLength(50)
                    .HasColumnName("jobcode");
                entity.Property(e => e.OnboardDate).HasColumnType("date");
                entity.Property(e => e.OnboardRate).HasMaxLength(50);
                entity.Property(e => e.OnboardRateCategory).HasMaxLength(50);
                entity.Property(e => e.OnboardRateType).HasMaxLength(50);
                entity.Property(e => e.Onboardcomgivenby).HasMaxLength(50);
                entity.Property(e => e.Onboardcomgivenon).HasColumnType("date");
                entity.Property(e => e.Onboardcomgiventime).HasMaxLength(50);
                entity.Property(e => e.Onboardcomupdategivenby).HasMaxLength(50);
                entity.Property(e => e.Onboardcomupdatenon).HasColumnType("date");
                entity.Property(e => e.Onboardcomupdatetime).HasMaxLength(50);
                entity.Property(e => e.PriRecComgivenby).HasMaxLength(50);
                entity.Property(e => e.PriRecComgivenon).HasColumnType("date");
                entity.Property(e => e.PriRecComgiventime).HasMaxLength(50);
                entity.Property(e => e.PriRecRating).HasMaxLength(50);
                entity.Property(e => e.PriRecUpdategivenby).HasMaxLength(50);
                entity.Property(e => e.PriRecUpdategivenon).HasColumnType("date");
                entity.Property(e => e.PriRecUpdategiventime).HasMaxLength(50);
                entity.Property(e => e.Tlcomgivenby)
                    .HasMaxLength(50)
                    .HasColumnName("TLcomgivenby");
                entity.Property(e => e.Tlcomgivenon)
                    .HasColumnType("date")
                    .HasColumnName("TLcomgivenon");
                entity.Property(e => e.Tlcomgiventime)
                    .HasMaxLength(50)
                    .HasColumnName("TLcomgiventime");
                entity.Property(e => e.Tlcomments).HasColumnName("TLComments");
                entity.Property(e => e.Tlrating)
                    .HasMaxLength(10)
                    .IsFixedLength()
                    .HasColumnName("TLRating");
                entity.Property(e => e.Tlupdategivenby)
                    .HasMaxLength(50)
                    .HasColumnName("TLupdategivenby");
                entity.Property(e => e.Tlupdategivenon)
                    .HasColumnType("date")
                    .HasColumnName("TLupdategivenon");
                entity.Property(e => e.Tlupdategiventime)
                    .HasMaxLength(50)
                    .HasColumnName("TLupdategiventime");
            });

            modelBuilder.Entity<CandCommentsInternalInterviewDetB>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("candCommentsInternalInterviewDetBS", "dbo");

                entity.Property(e => e.Candcommentinterviewid)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("candcommentinterviewid");
                entity.Property(e => e.Candidateid)
                    .HasMaxLength(50)
                    .HasColumnName("candidateid");
                entity.Property(e => e.FeedbackStatus).HasMaxLength(100);
                entity.Property(e => e.FeedbackType).HasMaxLength(50);
                entity.Property(e => e.IntSchdate).HasColumnType("date");
                entity.Property(e => e.Intcomgivenby).HasMaxLength(50);
                entity.Property(e => e.Intcomgivenon).HasColumnType("date");
                entity.Property(e => e.Intcomgiventime).HasMaxLength(50);
                entity.Property(e => e.InterviewStatus).HasMaxLength(50);
                entity.Property(e => e.Interviewdate).HasColumnType("date");
                entity.Property(e => e.InterviewerName).HasMaxLength(50);
                entity.Property(e => e.Interviewerzone).HasMaxLength(50);
                entity.Property(e => e.Interviewtime).HasMaxLength(50);
                entity.Property(e => e.Intupdategivenby).HasMaxLength(50);
                entity.Property(e => e.Intupdategivenon).HasColumnType("date");
                entity.Property(e => e.Intupdategiventime).HasMaxLength(50);
                entity.Property(e => e.Jobcode).HasMaxLength(50);
                entity.Property(e => e.MgrAppdate).HasColumnType("date");
                entity.Property(e => e.MgrRejdate).HasColumnType("date");
                entity.Property(e => e.Mgrcomgivenby).HasMaxLength(50);
                entity.Property(e => e.Mgrcomgivenon).HasColumnType("date");
                entity.Property(e => e.Mgrcomgiventime).HasMaxLength(50);
                entity.Property(e => e.Mgrupdategivenby).HasMaxLength(50);
                entity.Property(e => e.Mgrupdategivenon).HasColumnType("date");
                entity.Property(e => e.Mgrupdategiventime).HasMaxLength(50);
            });

            modelBuilder.Entity<CandCommentsUsainternalBasicDet>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("candCommentsUSAInternalBasicDet", "dbo");

                entity.Property(e => e.Candcommentbasicid)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("candcommentbasicid");
                entity.Property(e => e.CandidateStatus).HasMaxLength(50);
                entity.Property(e => e.Candidateid)
                    .HasMaxLength(50)
                    .HasColumnName("candidateid");
                entity.Property(e => e.Jobcode).HasMaxLength(50);
                entity.Property(e => e.OfferAppdate).HasColumnType("date");
                entity.Property(e => e.OfferHolddate).HasColumnType("date");
                entity.Property(e => e.OfferRejdate).HasColumnType("date");
                entity.Property(e => e.Offercomgivenby).HasMaxLength(50);
                entity.Property(e => e.Offercomgivenon).HasColumnType("date");
                entity.Property(e => e.Offercomgiventime).HasMaxLength(50);
                entity.Property(e => e.Offerupdategivenby).HasMaxLength(50);
                entity.Property(e => e.Offerupdategivenon).HasColumnType("date");
                entity.Property(e => e.Offerupdategiventime).HasMaxLength(50);
                entity.Property(e => e.PriRecComgivenby).HasMaxLength(100);
                entity.Property(e => e.PriRecComgivenon).HasColumnType("date");
                entity.Property(e => e.PriRecComgiventime).HasMaxLength(100);
                entity.Property(e => e.PriRecRating).HasMaxLength(100);
                entity.Property(e => e.PriRecUpdategivenby).HasMaxLength(100);
                entity.Property(e => e.PriRecUpdategivenon).HasColumnType("date");
                entity.Property(e => e.PriRecUpdategiventime).HasMaxLength(100);
                entity.Property(e => e.PrjEnddate).HasMaxLength(100);
                entity.Property(e => e.Startdate).HasColumnType("date");
                entity.Property(e => e.Tlappdate)
                    .HasColumnType("date")
                    .HasColumnName("TLAppdate");
                entity.Property(e => e.Tlcomgivenby)
                    .HasMaxLength(50)
                    .HasColumnName("TLcomgivenby");
                entity.Property(e => e.Tlcomgivenon)
                    .HasColumnType("date")
                    .HasColumnName("TLcomgivenon");
                entity.Property(e => e.Tlcomgiventime)
                    .HasMaxLength(50)
                    .HasColumnName("TLcomgiventime");
                entity.Property(e => e.Tlcomments).HasColumnName("TLComments");
                entity.Property(e => e.Tlrating)
                    .HasMaxLength(10)
                    .IsFixedLength()
                    .HasColumnName("TLRating");
                entity.Property(e => e.Tlrejdate)
                    .HasColumnType("date")
                    .HasColumnName("TLRejdate");
                entity.Property(e => e.Tlupdategivenby)
                    .HasMaxLength(50)
                    .HasColumnName("TLupdategivenby");
                entity.Property(e => e.Tlupdategivenon)
                    .HasColumnType("date")
                    .HasColumnName("TLupdategivenon");
                entity.Property(e => e.Tlupdategiventime)
                    .HasMaxLength(50)
                    .HasColumnName("TLupdategiventime");
            });

            modelBuilder.Entity<CandCommentsUsainternalInterviewDet>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("candCommentsUSAInternalInterviewDet", "dbo");

                entity.Property(e => e.Candcommentinterviewid)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("candcommentinterviewid");
                entity.Property(e => e.Candidateid)
                    .HasMaxLength(50)
                    .HasColumnName("candidateid");
                entity.Property(e => e.FeedbackType).HasMaxLength(50);
                entity.Property(e => e.IntSchdate).HasColumnType("date");
                entity.Property(e => e.Intcomgivenby).HasMaxLength(50);
                entity.Property(e => e.Intcomgivenon).HasColumnType("date");
                entity.Property(e => e.Intcomgiventime).HasMaxLength(50);
                entity.Property(e => e.InterviewStatus).HasMaxLength(50);
                entity.Property(e => e.InterviewType).HasMaxLength(50);
                entity.Property(e => e.Interviewdate).HasColumnType("date");
                entity.Property(e => e.InterviewerName).HasMaxLength(50);
                entity.Property(e => e.Interviewerzone).HasMaxLength(50);
                entity.Property(e => e.Interviewtime).HasMaxLength(50);
                entity.Property(e => e.Intupdategivenby).HasMaxLength(50);
                entity.Property(e => e.Intupdategivenon).HasColumnType("date");
                entity.Property(e => e.Intupdategiventime).HasMaxLength(50);
                entity.Property(e => e.Jobcode).HasMaxLength(50);
                entity.Property(e => e.MgrAppdate).HasColumnType("date");
                entity.Property(e => e.MgrRejdate).HasColumnType("date");
                entity.Property(e => e.Mgrcomgivenby).HasMaxLength(50);
                entity.Property(e => e.Mgrcomgivenon).HasColumnType("date");
                entity.Property(e => e.Mgrcomgiventime).HasMaxLength(50);
                entity.Property(e => e.Mgrupdategivenby).HasMaxLength(50);
                entity.Property(e => e.Mgrupdategivenon).HasColumnType("date");
                entity.Property(e => e.Mgrupdategiventime).HasMaxLength(50);
            });

            modelBuilder.Entity<CandidateDetail>(entity =>
            {
                entity.HasKey(e => e.Candidateid).HasName("PK__Candidat__7434A8AC6DAEE5C8");

                entity.ToTable("CandidateDetails", "dbo");

                entity.Property(e => e.Candidateid).HasColumnName("candidateid");
                entity.Property(e => e.AcknowledgementContent).HasColumnName("Acknowledgement_content");
                entity.Property(e => e.Additionalcertification).HasColumnName("additionalcertification");
                entity.Property(e => e.Additionalprimaryskill).HasColumnName("additionalprimaryskill");
                entity.Property(e => e.Additionalskill).HasColumnName("additionalskill");
                entity.Property(e => e.Availableforinterview).HasColumnName("availableforinterview");
                entity.Property(e => e.BsStatus).HasColumnName("BS_Status");
                entity.Property(e => e.Candidateemailid)
                    .HasMaxLength(100)
                    .HasColumnName("candidateemailid");
                entity.Property(e => e.Candidatemobileno)
                    .HasMaxLength(100)
                    .HasColumnName("candidatemobileno");
                entity.Property(e => e.Candidatename)
                    .HasMaxLength(100)
                    .HasColumnName("candidatename");
                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(100)
                    .HasColumnName("Created_By");
                entity.Property(e => e.CreatedOn)
                    .HasColumnType("date")
                    .HasColumnName("Created_On");
                entity.Property(e => e.CreatedTime).HasMaxLength(50);
                entity.Property(e => e.CurrentLocation)
                    .HasMaxLength(400)
                    .HasColumnName("currentLocation");
                entity.Property(e => e.Employerid)
                    .HasMaxLength(50)
                    .HasColumnName("employerid");
                entity.Property(e => e.Firstname).HasMaxLength(200);
                entity.Property(e => e.LastUpdatedBy)
                    .HasMaxLength(100)
                    .HasColumnName("Last_Updated_By");
                entity.Property(e => e.LastUpdatedOn)
                    .HasColumnType("date")
                    .HasColumnName("Last_Updated_On");
                entity.Property(e => e.Lastname).HasMaxLength(200);
                entity.Property(e => e.LinkedinUrl).HasColumnName("linkedinURL");
                entity.Property(e => e.NoticePeriod)
                    .HasMaxLength(50)
                    .HasColumnName("noticePeriod");
                entity.Property(e => e.Portalname).HasMaxLength(200);
                entity.Property(e => e.RatePerHr)
                    .HasMaxLength(20)
                    .HasColumnName("ratePerHr");
                entity.Property(e => e.Ratecoverage)
                    .HasMaxLength(20)
                    .HasColumnName("ratecoverage");
                entity.Property(e => e.Referralname).HasMaxLength(200);
                entity.Property(e => e.Relocate)
                    .HasMaxLength(20)
                    .HasColumnName("relocate");
                entity.Property(e => e.SkillsandCertif).HasColumnName("skillsandCertif");
                entity.Property(e => e.Sourcedfrom).HasMaxLength(200);
                entity.Property(e => e.SubmittedTo)
                    .HasMaxLength(100)
                    .HasColumnName("Submitted_To");
                entity.Property(e => e.Title).HasMaxLength(100);
                entity.Property(e => e.Type)
                    .HasMaxLength(20)
                    .HasColumnName("type");
                entity.Property(e => e.UpdatedTime).HasMaxLength(50);
                entity.Property(e => e.Vendorname).HasMaxLength(200);
                entity.Property(e => e.VisaStatus).HasMaxLength(100);
                entity.Property(e => e.YearsofExp).HasMaxLength(100);
            });

            modelBuilder.Entity<CandidateDetailsB>(entity =>
            {
                entity.HasKey(e => e.Candidateid).HasName("PK__Candidat__7434A8AC73C03EAB");

                entity.ToTable("CandidateDetailsBS", "dbo");

                entity.Property(e => e.Candidateid).HasColumnName("candidateid");
                entity.Property(e => e.Additionalskill).HasColumnName("additionalskill");
                entity.Property(e => e.Availableforinterview).HasColumnName("availableforinterview");
                entity.Property(e => e.Candidateemailid)
                    .HasMaxLength(100)
                    .HasColumnName("candidateemailid");
                entity.Property(e => e.Candidatemobileno)
                    .HasMaxLength(100)
                    .HasColumnName("candidatemobileno");
                entity.Property(e => e.Candidatename)
                    .HasMaxLength(100)
                    .HasColumnName("candidatename");
                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(100)
                    .HasColumnName("Created_By");
                entity.Property(e => e.CreatedOn)
                    .HasColumnType("date")
                    .HasColumnName("Created_On");
                entity.Property(e => e.CreatedTime).HasMaxLength(50);
                entity.Property(e => e.CurrentLocation)
                    .HasMaxLength(400)
                    .HasColumnName("currentLocation");
                entity.Property(e => e.Employerid)
                    .HasMaxLength(50)
                    .HasColumnName("employerid");
                entity.Property(e => e.LastUpdatedBy)
                    .HasMaxLength(100)
                    .HasColumnName("Last_Updated_By");
                entity.Property(e => e.LastUpdatedOn)
                    .HasColumnType("date")
                    .HasColumnName("Last_Updated_On");
                entity.Property(e => e.LinkedinUrl).HasColumnName("linkedinURL");
                entity.Property(e => e.NoticePeriod)
                    .HasMaxLength(50)
                    .HasColumnName("noticePeriod");
                entity.Property(e => e.RatePerHr)
                    .HasMaxLength(20)
                    .HasColumnName("ratePerHr");
                entity.Property(e => e.Ratecoverage)
                    .HasMaxLength(20)
                    .HasColumnName("ratecoverage");
                entity.Property(e => e.Relocate)
                    .HasMaxLength(20)
                    .HasColumnName("relocate");
                entity.Property(e => e.SkillsandCertif).HasColumnName("skillsandCertif");
                entity.Property(e => e.SubmittedTo)
                    .HasMaxLength(100)
                    .HasColumnName("Submitted_To");
                entity.Property(e => e.Type)
                    .HasMaxLength(20)
                    .HasColumnName("type");
                entity.Property(e => e.UpdatedTime).HasMaxLength(50);
                entity.Property(e => e.VisaStatus).HasMaxLength(100);
                entity.Property(e => e.YearsofExp).HasMaxLength(100);
            });

            modelBuilder.Entity<CandidateDetailsIndium>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("CandidateDetailsIndia", "dbo");

                entity.Property(e => e.AcknowledgementContent).HasColumnName("Acknowledgement_content");
                entity.Property(e => e.Additionalcertification).HasColumnName("additionalcertification");
                entity.Property(e => e.Additionalprimaryskill).HasColumnName("additionalprimaryskill");
                entity.Property(e => e.Additionalskill).HasColumnName("additionalskill");
                entity.Property(e => e.Availableforinterview)
                    .HasMaxLength(200)
                    .HasColumnName("availableforinterview");
                entity.Property(e => e.Candidateemailid)
                    .HasMaxLength(100)
                    .HasColumnName("candidateemailid");
                entity.Property(e => e.Candidateid)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("candidateid");
                entity.Property(e => e.Candidatemobileno)
                    .HasMaxLength(100)
                    .HasColumnName("candidatemobileno");
                entity.Property(e => e.Candidatename)
                    .HasMaxLength(100)
                    .HasColumnName("candidatename");
                entity.Property(e => e.Certification).HasMaxLength(300);
                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(100)
                    .HasColumnName("Created_By");
                entity.Property(e => e.CreatedOn)
                    .HasColumnType("date")
                    .HasColumnName("Created_On");
                entity.Property(e => e.CreatedTime).HasMaxLength(50);
                entity.Property(e => e.Currcompany)
                    .HasMaxLength(200)
                    .HasColumnName("currcompany");
                entity.Property(e => e.CurrentLocation)
                    .HasMaxLength(100)
                    .HasColumnName("currentLocation");
                entity.Property(e => e.Employerid)
                    .HasMaxLength(50)
                    .HasColumnName("employerid");
                entity.Property(e => e.Enddate)
                    .HasMaxLength(50)
                    .HasColumnName("enddate");
                entity.Property(e => e.Firstname).HasMaxLength(200);
                entity.Property(e => e.LastUpdatedBy)
                    .HasMaxLength(100)
                    .HasColumnName("Last_Updated_By");
                entity.Property(e => e.LastUpdatedOn)
                    .HasColumnType("date")
                    .HasColumnName("Last_Updated_On");
                entity.Property(e => e.Lastname).HasMaxLength(200);
                entity.Property(e => e.LinkedinUrl)
                    .HasMaxLength(255)
                    .HasColumnName("linkedinURL");
                entity.Property(e => e.NoticePeriod)
                    .HasMaxLength(50)
                    .HasColumnName("noticePeriod");
                entity.Property(e => e.Portalname).HasMaxLength(200);
                entity.Property(e => e.Primaryskill).HasMaxLength(300);
                entity.Property(e => e.RateperHr)
                    .HasMaxLength(50)
                    .HasColumnName("rateperHr");
                entity.Property(e => e.Referralname).HasMaxLength(200);
                entity.Property(e => e.SkillsandCertif).HasColumnName("skillsandCertif");
                entity.Property(e => e.Sourcedfrom).HasMaxLength(200);
                entity.Property(e => e.Startdate)
                    .HasMaxLength(50)
                    .HasColumnName("startdate");
                entity.Property(e => e.SubmittedTo)
                    .HasMaxLength(100)
                    .HasColumnName("Submitted_To");
                entity.Property(e => e.Title).HasMaxLength(100);
                entity.Property(e => e.TotYearsofExp).HasMaxLength(50);
                entity.Property(e => e.Type)
                    .HasMaxLength(50)
                    .HasColumnName("type");
                entity.Property(e => e.UpdatedTime).HasMaxLength(50);
                entity.Property(e => e.Vendorname).HasMaxLength(200);
                entity.Property(e => e.YearsofExp).HasMaxLength(50);
            });

            modelBuilder.Entity<CandidateJob>(entity =>
            {
                entity.HasKey(e => e.CandidateJobId).HasName("PK__Candidat__FE0C454016DE3047");

                entity.ToTable("CandidateJob", "dbo");

                entity.Property(e => e.BpInterviewDate)
                    .HasColumnType("date")
                    .HasColumnName("BP_Interview_date");
                entity.Property(e => e.BpRejectedDate)
                    .HasColumnType("date")
                    .HasColumnName("BP_Rejected_date");
                entity.Property(e => e.CandStatus)
                    .HasMaxLength(50)
                    .HasColumnName("Cand_Status");
                entity.Property(e => e.CandidateRemark).HasColumnName("candidateRemark");
                entity.Property(e => e.ClosureDate)
                    .HasColumnType("date")
                    .HasColumnName("Closure_date");
                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(100)
                    .HasColumnName("Created_By");
                entity.Property(e => e.CreatedOn)
                    .HasColumnType("date")
                    .HasColumnName("Created_On");
                entity.Property(e => e.CreatedTime)
                    .HasMaxLength(50)
                    .HasColumnName("Created_time");
                entity.Property(e => e.DraftDate)
                    .HasColumnType("date")
                    .HasColumnName("Draft_date");
                entity.Property(e => e.EcInterviewDate)
                    .HasColumnType("date")
                    .HasColumnName("EC_Interview_date");
                entity.Property(e => e.EcRejectedDate)
                    .HasColumnType("date")
                    .HasColumnName("EC_Rejected_date");
                entity.Property(e => e.Jobcode).HasMaxLength(100);
                entity.Property(e => e.NotOnboardedDate)
                    .HasColumnType("date")
                    .HasColumnName("Not_Onboarded_date");
                entity.Property(e => e.NotsubmittedDate)
                    .HasColumnType("date")
                    .HasColumnName("Notsubmitted_date");
                entity.Property(e => e.OnboardedDate)
                    .HasColumnType("date")
                    .HasColumnName("Onboarded_date");
                entity.Property(e => e.PipelineDate)
                    .HasColumnType("date")
                    .HasColumnName("Pipeline_date");
                entity.Property(e => e.RecruiterRating)
                    .HasMaxLength(10)
                    .IsFixedLength();
                entity.Property(e => e.Remarkupdby).HasMaxLength(100);
                entity.Property(e => e.SubmitToRecDate)
                    .HasMaxLength(100)
                    .HasColumnName("Submit_to_Rec_date");
                entity.Property(e => e.SubmitToTlDate)
                    .HasColumnType("date")
                    .HasColumnName("Submit_to_TL_date");
                entity.Property(e => e.SubmittedToBpDate)
                    .HasColumnType("date")
                    .HasColumnName("Submitted_to_BP_date");
                entity.Property(e => e.SubmittedToEcDate)
                    .HasColumnType("date")
                    .HasColumnName("Submitted_to_EC_date");
                entity.Property(e => e.TlRejectedDate)
                    .HasColumnType("date")
                    .HasColumnName("TL_Rejected_date");
                entity.Property(e => e.UpdatedBy)
                    .HasMaxLength(50)
                    .HasColumnName("Updated_By");
                entity.Property(e => e.UpdatedOn)
                    .HasColumnType("date")
                    .HasColumnName("Updated_On");
                entity.Property(e => e.UpdatedTime)
                    .HasMaxLength(50)
                    .HasColumnName("Updated_time");
            });

            modelBuilder.Entity<CandidateJobIndium>(entity =>
            {
                entity.HasKey(e => e.CandidateJobId).HasName("PK__Candidat__FE0C4540521DE594");

                entity.ToTable("CandidateJobIndia", "dbo");

                entity.Property(e => e.BpInterviewDate)
                    .HasColumnType("date")
                    .HasColumnName("BP_Interview_date");
                entity.Property(e => e.BpRejectedDate)
                    .HasColumnType("date")
                    .HasColumnName("BP_Rejected_date");
                entity.Property(e => e.CandStatus)
                    .HasMaxLength(50)
                    .HasColumnName("Cand_Status");
                entity.Property(e => e.CandidateRemark).HasColumnName("candidateRemark");
                entity.Property(e => e.ClosureDate)
                    .HasColumnType("date")
                    .HasColumnName("Closure_date");
                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(100)
                    .HasColumnName("Created_By");
                entity.Property(e => e.CreatedOn)
                    .HasColumnType("date")
                    .HasColumnName("Created_On");
                entity.Property(e => e.CreatedTime)
                    .HasMaxLength(50)
                    .HasColumnName("Created_time");
                entity.Property(e => e.DraftDate)
                    .HasColumnType("date")
                    .HasColumnName("Draft_date");
                entity.Property(e => e.EcInterviewDate)
                    .HasColumnType("date")
                    .HasColumnName("EC_Interview_date");
                entity.Property(e => e.EcRejectedDate)
                    .HasColumnType("date")
                    .HasColumnName("EC_Rejected_date");
                entity.Property(e => e.Jobcode).HasMaxLength(100);
                entity.Property(e => e.NotOnboardedDate)
                    .HasColumnType("date")
                    .HasColumnName("Not_Onboarded_date");
                entity.Property(e => e.NotsubmittedDate)
                    .HasColumnType("date")
                    .HasColumnName("Notsubmitted_date");
                entity.Property(e => e.OnboardedDate)
                    .HasColumnType("date")
                    .HasColumnName("Onboarded_date");
                entity.Property(e => e.PipelineDate)
                    .HasColumnType("date")
                    .HasColumnName("Pipeline_date");
                entity.Property(e => e.RecRejectedDate)
                    .HasColumnType("date")
                    .HasColumnName("Rec_Rejected_date");
                entity.Property(e => e.RecruiterRating)
                    .HasMaxLength(10)
                    .IsFixedLength();
                entity.Property(e => e.Remarkupdby).HasMaxLength(100);
                entity.Property(e => e.SubmitToRecDate)
                    .HasColumnType("date")
                    .HasColumnName("Submit_to_Rec_date");
                entity.Property(e => e.SubmitToTlDate)
                    .HasColumnType("date")
                    .HasColumnName("Submit_to_TL_date");
                entity.Property(e => e.SubmittedToBpDate)
                    .HasColumnType("date")
                    .HasColumnName("Submitted_to_BP_date");
                entity.Property(e => e.SubmittedToEcDate)
                    .HasColumnType("date")
                    .HasColumnName("Submitted_to_EC_date");
                entity.Property(e => e.TlRejectedDate)
                    .HasColumnType("date")
                    .HasColumnName("TL_Rejected_date");
                entity.Property(e => e.UpdatedBy)
                    .HasMaxLength(50)
                    .HasColumnName("Updated_By");
                entity.Property(e => e.UpdatedOn)
                    .HasColumnType("date")
                    .HasColumnName("Updated_On");
                entity.Property(e => e.UpdatedTime)
                    .HasMaxLength(50)
                    .HasColumnName("Updated_time");
            });

            modelBuilder.Entity<CandidateJobPriSkillInd>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("Candidate_Job_PriSkill_IND", "dbo");

                entity.Property(e => e.CandidateId).HasMaxLength(100);
                entity.Property(e => e.CandidateJobSkillId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("CandidateJobSkillID");
                entity.Property(e => e.Jobcode).HasMaxLength(100);
                entity.Property(e => e.YrsofExp).HasMaxLength(100);
            });

            modelBuilder.Entity<CandidateJobPriSkillUsa>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("Candidate_Job_PriSkill_USA", "dbo");

                entity.Property(e => e.CandidateId).HasMaxLength(100);
                entity.Property(e => e.CandidateJobSkillId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("CandidateJobSkillID");
                entity.Property(e => e.Jobcode).HasMaxLength(100);
                entity.Property(e => e.YrsofExp).HasMaxLength(100);
            });

            modelBuilder.Entity<CandidateJobSecSkillInd>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("Candidate_Job_SecSkill_IND", "dbo");

                entity.Property(e => e.CandidateId).HasMaxLength(100);
                entity.Property(e => e.CandidateJobSkillId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("CandidateJobSkillID");
                entity.Property(e => e.Jobcode).HasMaxLength(100);
                entity.Property(e => e.YrsofExp).HasMaxLength(100);
            });

            modelBuilder.Entity<CandidateJobSecSkillUsa>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("Candidate_Job_SecSkill_USA", "dbo");

                entity.Property(e => e.CandidateId).HasMaxLength(100);
                entity.Property(e => e.CandidateJobSkillId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("CandidateJobSkillID");
                entity.Property(e => e.Jobcode).HasMaxLength(100);
                entity.Property(e => e.YrsofExp).HasMaxLength(100);
            });

            modelBuilder.Entity<CandidateSourceMaster>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("CandidateSource_Master", "Admin_186551_orange");

                entity.Property(e => e.CandidateSourceId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("CandidateSourceID");
                entity.Property(e => e.CandidateSourceName).HasMaxLength(100);
            });

            modelBuilder.Entity<CandidateSourceMaster1>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("CandidateSource_Master", "dbo");

                entity.Property(e => e.CandidateSourceId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("CandidateSourceID");
                entity.Property(e => e.CandidateSourceName).HasMaxLength(100);
            });

            modelBuilder.Entity<CandidateStatusMaster>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("CandidateStatus_Master", "dbo");

                entity.Property(e => e.CandidateStatusId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("CandidateStatusID");
                entity.Property(e => e.CandidateStatusName).HasMaxLength(100);
            });

            modelBuilder.Entity<CandidateSubmissiondetailsB>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("CandidateSubmissiondetailsBS", "Admin_186551_orange");

                entity.Property(e => e.AssignTo).HasMaxLength(250);
                entity.Property(e => e.AvailableDate).HasColumnType("date");
                entity.Property(e => e.CandBsStatus)
                    .HasMaxLength(100)
                    .HasColumnName("CandBS_status");
                entity.Property(e => e.CandidateRemark).HasColumnName("candidateRemark");
                entity.Property(e => e.CandidateTitle).HasMaxLength(100);
                entity.Property(e => e.CandidatedetailsBsid)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("CandidatedetailsBSID");
                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(100)
                    .HasColumnName("Created_by");
                entity.Property(e => e.CreatedOn)
                    .HasColumnType("date")
                    .HasColumnName("Created_on");
                entity.Property(e => e.Jobcode)
                    .HasMaxLength(100)
                    .HasColumnName("jobcode");
                entity.Property(e => e.MaxSubmissionRate).HasMaxLength(100);
                entity.Property(e => e.MinSubmissionRate).HasMaxLength(100);
                entity.Property(e => e.RecruiterRating).HasMaxLength(50);
                entity.Property(e => e.VisaEndDate).HasColumnType("date");
                entity.Property(e => e.VisaStartDate).HasColumnType("date");
                entity.Property(e => e.VisaStatus).HasMaxLength(200);
            });

            modelBuilder.Entity<CandidateSubmissiondetailsB1>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("CandidateSubmissiondetailsBS", "dbo");

                entity.Property(e => e.AssignTo).HasMaxLength(250);
                entity.Property(e => e.AvailableDate).HasColumnType("date");
                entity.Property(e => e.CandBsStatus)
                    .HasMaxLength(100)
                    .HasColumnName("CandBS_status");
                entity.Property(e => e.CandidateRemark).HasColumnName("candidateRemark");
                entity.Property(e => e.CandidateTitle).HasMaxLength(100);
                entity.Property(e => e.CandidatedetailsBsid)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("CandidatedetailsBSID");
                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(100)
                    .HasColumnName("Created_by");
                entity.Property(e => e.CreatedOn)
                    .HasColumnType("date")
                    .HasColumnName("Created_on");
                entity.Property(e => e.Jobcode)
                    .HasMaxLength(100)
                    .HasColumnName("jobcode");
                entity.Property(e => e.MaxSubmissionRate).HasMaxLength(100);
                entity.Property(e => e.MinSubmissionRate).HasMaxLength(100);
                entity.Property(e => e.RecruiterRating).HasMaxLength(50);
                entity.Property(e => e.VisaEndDate).HasColumnType("date");
                entity.Property(e => e.VisaStartDate).HasColumnType("date");
                entity.Property(e => e.VisaStatus).HasMaxLength(200);
            });

            modelBuilder.Entity<CandidateTitleMaster>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("CandidateTitle_Master", "dbo");

                entity.Property(e => e.CandidateTitleId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("CandidateTitleID");
                entity.Property(e => e.CandidateTitleName).HasMaxLength(100);
            });

            modelBuilder.Entity<CandidatejobB>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("CandidatejobBS", "Admin_186551_orange");

                entity.Property(e => e.BsRemarks).HasColumnName("BS_Remarks");
                entity.Property(e => e.BscreatedTime)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("BSCreatedTime");
                entity.Property(e => e.Bscreatedby)
                    .HasMaxLength(100)
                    .HasColumnName("BSCreatedby");
                entity.Property(e => e.Bscreatedon)
                    .HasMaxLength(100)
                    .HasColumnName("BSCreatedon");
                entity.Property(e => e.CandidatejobBsid)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("CandidatejobBSID");
                entity.Property(e => e.Jobcode).HasMaxLength(100);
                entity.Property(e => e.Tlrating)
                    .HasMaxLength(50)
                    .HasColumnName("TLRating");
            });

            modelBuilder.Entity<CandidatejobB1>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("CandidatejobBS", "dbo");

                entity.Property(e => e.BsRemarks).HasColumnName("BS_Remarks");
                entity.Property(e => e.BscreatedTime)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("BSCreatedTime");
                entity.Property(e => e.Bscreatedby)
                    .HasMaxLength(100)
                    .HasColumnName("BSCreatedby");
                entity.Property(e => e.Bscreatedon)
                    .HasMaxLength(100)
                    .HasColumnName("BSCreatedon");
                entity.Property(e => e.CandidatejobBsid)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("CandidatejobBSID");
                entity.Property(e => e.Jobcode).HasMaxLength(100);
                entity.Property(e => e.Tlrating)
                    .HasMaxLength(50)
                    .HasColumnName("TLRating");
            });

            modelBuilder.Entity<Candproofdetail>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("candproofdetails", "dbo");

                entity.Property(e => e.Candidateid)
                    .HasMaxLength(50)
                    .HasColumnName("candidateid");
                entity.Property(e => e.Candproofid)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("candproofid");
                entity.Property(e => e.Documenttype)
                    .HasMaxLength(100)
                    .HasColumnName("documenttype");
                entity.Property(e => e.IdNo)
                    .HasMaxLength(100)
                    .HasColumnName("idNo");
                entity.Property(e => e.Idfilename)
                    .HasMaxLength(100)
                    .HasColumnName("idfilename");
            });

            modelBuilder.Entity<CandproofdetailsIndium>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("candproofdetailsIndia", "dbo");

                entity.Property(e => e.Candidateid)
                    .HasMaxLength(50)
                    .HasColumnName("candidateid");
                entity.Property(e => e.Candproofid)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("candproofid");
                entity.Property(e => e.Documenttype)
                    .HasMaxLength(100)
                    .HasColumnName("documenttype");
                entity.Property(e => e.IdNo)
                    .HasMaxLength(100)
                    .HasColumnName("idNo");
                entity.Property(e => e.Idfilename)
                    .HasMaxLength(100)
                    .HasColumnName("idfilename");
            });

            modelBuilder.Entity<CertificationMaster>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("Certification_Master", "dbo");

                entity.Property(e => e.CertificationId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("CertificationID");
                entity.Property(e => e.CertificationName)
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<CitizenshipMaster>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("Citizenship_Master", "dbo");

                entity.Property(e => e.CitizenshipId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("CitizenshipID");
                entity.Property(e => e.CitizenshipName).HasMaxLength(100);
            });

            modelBuilder.Entity<City>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK__cities__3213E83F525528DA");

                entity.ToTable("cities", "dbo");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("id");
                entity.Property(e => e.Name)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("name");
                entity.Property(e => e.StateId).HasColumnName("state_id");
            });

            modelBuilder.Entity<CityMaster>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("City_Master", "dbo");

                entity.Property(e => e.CityId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("CityID");
                entity.Property(e => e.CityName).HasMaxLength(50);
                entity.Property(e => e.StateId).HasColumnName("StateID");
            });

            modelBuilder.Entity<ClientContactPerson>(entity =>
            {
                entity.HasKey(e => e.ClientContactId).HasName("PK_Client_Contact");

                entity.ToTable("Client_Contact_Person", "dbo");

                entity.Property(e => e.ClientContactId).HasColumnName("ClientContactID");
                entity.Property(e => e.ClientConStatus).HasMaxLength(50);
                entity.Property(e => e.ClientId)
                    .HasMaxLength(50)
                    .HasColumnName("ClientID");
                entity.Property(e => e.ContactNo).HasMaxLength(200);
                entity.Property(e => e.ContactPerson).HasMaxLength(100);
                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .HasColumnName("Created_By");
                entity.Property(e => e.CreatedOn)
                    .HasColumnType("date")
                    .HasColumnName("Created_On");
                entity.Property(e => e.Designation).HasMaxLength(100);
                entity.Property(e => e.IndContactNo).HasMaxLength(100);
                entity.Property(e => e.LinkedinUrl)
                    .HasMaxLength(200)
                    .HasColumnName("LinkedinURL");
                entity.Property(e => e.MailId).HasMaxLength(100);
                entity.Property(e => e.Updatedby).HasMaxLength(100);
                entity.Property(e => e.Updatedon).HasColumnType("date");
                entity.Property(e => e.UsacontactNo)
                    .HasMaxLength(100)
                    .HasColumnName("USAContactNo");
            });

            modelBuilder.Entity<ClientMaster>(entity =>
            {
                entity.HasKey(e => e.ClientId).HasName("PK_Client");

                entity.ToTable("ClientMaster", "dbo");

                entity.Property(e => e.ClientId).HasColumnName("ClientID");
                entity.Property(e => e.Additionalinfo).HasColumnName("additionalinfo");
                entity.Property(e => e.Address).HasColumnName("address");
                entity.Property(e => e.Chartcolor)
                    .HasMaxLength(50)
                    .HasColumnName("chartcolor");
                entity.Property(e => e.City)
                    .HasMaxLength(150)
                    .HasColumnName("city");
                entity.Property(e => e.ClientDisplayName).HasMaxLength(100);
                entity.Property(e => e.ClientSpecialization).HasColumnName("Client_Specialization");
                entity.Property(e => e.Clienttype).HasColumnName("clienttype");
                entity.Property(e => e.CompanyLinkedin)
                    .HasMaxLength(100)
                    .HasColumnName("Company_Linkedin");
                entity.Property(e => e.CompanyWebsite)
                    .HasMaxLength(100)
                    .HasColumnName("Company_Website");
                entity.Property(e => e.Country)
                    .HasMaxLength(100)
                    .HasColumnName("country");
                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .HasColumnName("Created_By");
                entity.Property(e => e.CreatedOn)
                    .HasColumnType("date")
                    .HasColumnName("Created_On");
                entity.Property(e => e.Placeofsupply).HasMaxLength(100);
                entity.Property(e => e.Status).HasMaxLength(50);
                entity.Property(e => e.Updatedby)
                    .HasMaxLength(200)
                    .HasColumnName("updatedby");
                entity.Property(e => e.Updatedon)
                    .HasColumnType("date")
                    .HasColumnName("updatedon");
            });

            modelBuilder.Entity<ClosedbyMaster>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("Closedby_master", "dbo");

                entity.Property(e => e.ClosedbyType).HasMaxLength(100);
                entity.Property(e => e.Closedbyid).ValueGeneratedOnAdd();
            });

            modelBuilder.Entity<ContactTable>(entity =>
            {
                entity.HasKey(e => e.ContactTableId).HasName("PK__ContactT__1B5ED3E80366F5D8");

                entity.ToTable("ContactTable", "dbo");

                entity.Property(e => e.ContactTableId).HasColumnName("ContactTableID");
                entity.Property(e => e.Contactno).HasMaxLength(100);
                entity.Property(e => e.EmailId).HasMaxLength(200);
                entity.Property(e => e.Firstname).HasMaxLength(100);
                entity.Property(e => e.Lastname).HasMaxLength(100);
            });

            modelBuilder.Entity<Country>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK__countrie__3213E83FFCB81072");

                entity.ToTable("countries", "dbo");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("id");
                entity.Property(e => e.Name)
                    .HasMaxLength(150)
                    .IsUnicode(false)
                    .HasColumnName("name");
                entity.Property(e => e.Phonecode).HasColumnName("phonecode");
                entity.Property(e => e.Shortname)
                    .HasMaxLength(3)
                    .IsUnicode(false)
                    .HasColumnName("shortname");
            });

            modelBuilder.Entity<CountryMaster>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("Country_Master", "dbo");

                entity.Property(e => e.CountryId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("CountryID");
                entity.Property(e => e.CountryName).HasMaxLength(50);
            });

            modelBuilder.Entity<CurrencyMaster>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("Currency_Master", "dbo");

                entity.Property(e => e.CurrencyId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("CurrencyID");
                entity.Property(e => e.CurrencyName).HasMaxLength(200);
                entity.Property(e => e.CurrencySymbol).HasMaxLength(200);
            });

            modelBuilder.Entity<DesignationMaster>(entity =>
            {
                entity.HasKey(e => e.Designationid).HasName("PK_designation");

                entity.ToTable("Designation_Master", "dbo");

                entity.Property(e => e.Designationname).HasMaxLength(50);
            });

            modelBuilder.Entity<DurationtypeMaster>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("Durationtype_master", "Admin_186551_orange");

                entity.Property(e => e.DurationType)
                    .HasMaxLength(100)
                    .HasColumnName("Duration_Type");
                entity.Property(e => e.Durationtypeid).ValueGeneratedOnAdd();
            });

            modelBuilder.Entity<DurationtypeMaster1>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("Durationtype_master", "dbo");

                entity.Property(e => e.DurationType)
                    .HasMaxLength(200)
                    .HasColumnName("Duration_Type");
                entity.Property(e => e.Durationtypeid).ValueGeneratedOnAdd();
            });

            modelBuilder.Entity<EmployerContactPerson>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("EmployerContactPerson", "dbo");

                entity.Property(e => e.ContactNo).HasMaxLength(50);
                entity.Property(e => e.ContactPerson).HasMaxLength(200);
                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(200)
                    .HasColumnName("Created_By");
                entity.Property(e => e.CreatedOn)
                    .HasColumnType("date")
                    .HasColumnName("Created_On");
                entity.Property(e => e.Designation).HasMaxLength(100);
                entity.Property(e => e.MailId).HasMaxLength(200);
                entity.Property(e => e.VenConStatus).HasMaxLength(50);
                entity.Property(e => e.VendorContactId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("VendorContactID");
                entity.Property(e => e.VendorId)
                    .HasMaxLength(50)
                    .HasColumnName("VendorID");
            });

            modelBuilder.Entity<EmployerContactPersonIndium>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("EmployerContactPersonIndia", "dbo");

                entity.Property(e => e.ContactNo).HasMaxLength(50);
                entity.Property(e => e.ContactPerson).HasMaxLength(200);
                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(200)
                    .HasColumnName("Created_By");
                entity.Property(e => e.CreatedOn)
                    .HasColumnType("date")
                    .HasColumnName("Created_On");
                entity.Property(e => e.Designation).HasMaxLength(100);
                entity.Property(e => e.MailId).HasMaxLength(200);
                entity.Property(e => e.VenConStatus).HasMaxLength(50);
                entity.Property(e => e.VendorContactId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("VendorContactID");
                entity.Property(e => e.VendorId)
                    .HasMaxLength(50)
                    .HasColumnName("VendorID");
            });

            modelBuilder.Entity<EmployerDetail>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("EmployerDetails", "dbo");

                entity.Property(e => e.Address).HasColumnName("address");
                entity.Property(e => e.City)
                    .HasMaxLength(150)
                    .HasColumnName("city");
                entity.Property(e => e.Country)
                    .HasMaxLength(100)
                    .HasColumnName("country");
                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .HasColumnName("Created_By");
                entity.Property(e => e.CreatedOn)
                    .HasColumnType("date")
                    .HasColumnName("Created_On");
                entity.Property(e => e.Employeradditionalinfo).HasColumnName("employeradditionalinfo");
                entity.Property(e => e.Employercorporationaname)
                    .HasMaxLength(250)
                    .HasColumnName("employercorporationaname");
                entity.Property(e => e.Employeremailid)
                    .HasMaxLength(100)
                    .HasColumnName("employeremailid");
                entity.Property(e => e.Employerid)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("employerid");
                entity.Property(e => e.Employermobileno)
                    .HasMaxLength(100)
                    .HasColumnName("employermobileno");
                entity.Property(e => e.Employername)
                    .HasMaxLength(200)
                    .HasColumnName("employername");
                entity.Property(e => e.Employerspecialization).HasColumnName("employerspecialization");
                entity.Property(e => e.Linkedin)
                    .HasMaxLength(100)
                    .HasColumnName("linkedin");
                entity.Property(e => e.Status).HasMaxLength(20);
                entity.Property(e => e.UpdatedBy)
                    .HasMaxLength(50)
                    .HasColumnName("Updated_By");
                entity.Property(e => e.UpdatedOn)
                    .HasColumnType("date")
                    .HasColumnName("Updated_On");
                entity.Property(e => e.Updatedby1)
                    .HasMaxLength(200)
                    .HasColumnName("updatedby");
                entity.Property(e => e.Updatedon1)
                    .HasColumnType("date")
                    .HasColumnName("updatedon");
                entity.Property(e => e.Vendortype).HasColumnName("vendortype");
                entity.Property(e => e.Website)
                    .HasMaxLength(200)
                    .HasColumnName("website");
            });

            modelBuilder.Entity<EmployerDetailsIndium>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("EmployerDetailsIndia", "dbo");

                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .HasColumnName("Created_By");
                entity.Property(e => e.CreatedOn)
                    .HasColumnType("date")
                    .HasColumnName("Created_On");
                entity.Property(e => e.Employeradditionalinfo).HasColumnName("employeradditionalinfo");
                entity.Property(e => e.Employercorporationaname)
                    .HasMaxLength(250)
                    .HasColumnName("employercorporationaname");
                entity.Property(e => e.Employeremailid)
                    .HasMaxLength(100)
                    .HasColumnName("employeremailid");
                entity.Property(e => e.Employerid)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("employerid");
                entity.Property(e => e.Employermobileno)
                    .HasMaxLength(100)
                    .HasColumnName("employermobileno");
                entity.Property(e => e.Employername)
                    .HasMaxLength(200)
                    .HasColumnName("employername");
                entity.Property(e => e.Employerspecialization).HasColumnName("employerspecialization");
                entity.Property(e => e.Status).HasMaxLength(50);
                entity.Property(e => e.UpdatedBy)
                    .HasMaxLength(50)
                    .HasColumnName("Updated_By");
                entity.Property(e => e.UpdatedOn)
                    .HasColumnType("date")
                    .HasColumnName("Updated_On");
            });

            modelBuilder.Entity<EmploymentTypeMaster>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("EmploymentType_Master", "dbo");

                entity.Property(e => e.EmpTypeId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("EmpTypeID");
                entity.Property(e => e.EmpTypeName).HasMaxLength(200);
            });

            modelBuilder.Entity<ExperienceMaster>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("Experience_Master", "dbo");

                entity.Property(e => e.ExperienceId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("ExperienceID");
                entity.Property(e => e.ExperienceName).HasMaxLength(150);
            });

            modelBuilder.Entity<ExternalJobCandidateUsa>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("ExternalJob_Candidate_USA", "Admin_186551_orange");

                entity.Property(e => e.CandjobSubRate)
                    .HasMaxLength(50)
                    .HasColumnName("Candjob_subRate");
                entity.Property(e => e.ExternalJobCandidateUsaid)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("ExternalJob_Candidate_USAID");
                entity.Property(e => e.Jobcode).HasMaxLength(50);
                entity.Property(e => e.RtrComfirmation)
                    .HasMaxLength(50)
                    .HasColumnName("Rtr_Comfirmation");
                entity.Property(e => e.SubmittedBy)
                    .HasMaxLength(100)
                    .HasColumnName("Submitted_By");
                entity.Property(e => e.SubmittedOn)
                    .HasColumnType("date")
                    .HasColumnName("Submitted_On");
                entity.Property(e => e.UpdatedBy)
                    .HasMaxLength(100)
                    .HasColumnName("Updated_by");
            });

            modelBuilder.Entity<ExternalJobCandidateUsa1>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("ExternalJob_Candidate_USA", "dbo");

                entity.Property(e => e.CandjobSubRate)
                    .HasMaxLength(50)
                    .HasColumnName("Candjob_subRate");
                entity.Property(e => e.ExternalJobCandidateUsaid)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("ExternalJob_Candidate_USAID");
                entity.Property(e => e.Jobcode).HasMaxLength(50);
                entity.Property(e => e.RtrComfirmation)
                    .HasMaxLength(50)
                    .HasColumnName("Rtr_Comfirmation");
                entity.Property(e => e.SubmittedBy)
                    .HasMaxLength(100)
                    .HasColumnName("Submitted_By");
                entity.Property(e => e.SubmittedOn)
                    .HasColumnType("date")
                    .HasColumnName("Submitted_On");
                entity.Property(e => e.UpdatedBy)
                    .HasMaxLength(100)
                    .HasColumnName("Updated_by");
            });

            modelBuilder.Entity<ExternalJobMasterUsa>(entity =>
            {
                entity.HasKey(e => e.Jobcode).HasName("PK__External__BAF2961B48968B90");

                entity.ToTable("ExternalJob_Master_USA", "dbo");

                entity.Property(e => e.Jobcode).HasMaxLength(100);
                entity.Property(e => e.AssignTo).HasMaxLength(100);
                entity.Property(e => e.CandidateId)
                    .HasMaxLength(250)
                    .HasColumnName("CandidateID");
                entity.Property(e => e.City).HasMaxLength(150);
                entity.Property(e => e.CompanyName)
                    .HasMaxLength(100)
                    .HasColumnName("Company_Name");
                entity.Property(e => e.ContactName)
                    .HasMaxLength(100)
                    .HasColumnName("Contact_Name");
                entity.Property(e => e.ContactNo)
                    .HasMaxLength(100)
                    .HasColumnName("Contact_No");
                entity.Property(e => e.ContactPerson)
                    .HasMaxLength(100)
                    .HasColumnName("Contact_Person");
                entity.Property(e => e.Country).HasMaxLength(150);
                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(100)
                    .HasColumnName("Created_By");
                entity.Property(e => e.CreatedOn)
                    .HasColumnType("date")
                    .HasColumnName("Created_On");
                entity.Property(e => e.CreatedTime)
                    .HasMaxLength(100)
                    .HasColumnName("Created_Time");
                entity.Property(e => e.CustomerJobId)
                    .HasMaxLength(100)
                    .HasColumnName("CustomerJobID");
                entity.Property(e => e.Duration).HasMaxLength(150);
                entity.Property(e => e.EmailId)
                    .HasMaxLength(100)
                    .HasColumnName("Email_ID");
                entity.Property(e => e.EmplType).HasMaxLength(100);
                entity.Property(e => e.ExternalJobMasterId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("ExternalJob_MasterID");
                entity.Property(e => e.ExternalJobstatus).HasMaxLength(100);
                entity.Property(e => e.JobSource)
                    .HasMaxLength(100)
                    .IsUnicode(false);
                entity.Property(e => e.JobUrl).HasColumnName("Job_URL");
                entity.Property(e => e.LastUpdatedBy)
                    .HasMaxLength(100)
                    .HasColumnName("Last_Updated_By");
                entity.Property(e => e.LastUpdatedOn)
                    .HasColumnType("date")
                    .HasColumnName("Last_Updated_On");
                entity.Property(e => e.Linkedin).HasMaxLength(100);
                entity.Property(e => e.Location).HasMaxLength(150);
                entity.Property(e => e.PortalCompanyName)
                    .HasMaxLength(100)
                    .HasColumnName("Portal_Company_Name");
                entity.Property(e => e.PortalContactEmail)
                    .HasMaxLength(200)
                    .HasColumnName("Portal_Contact_Email");
                entity.Property(e => e.PortalContactName)
                    .HasMaxLength(100)
                    .HasColumnName("Portal_Contact_Name");
                entity.Property(e => e.PortalContactPhone)
                    .HasMaxLength(100)
                    .HasColumnName("Portal_Contact_Phone");
                entity.Property(e => e.PortalName)
                    .HasMaxLength(100)
                    .HasColumnName("Portal_Name");
                entity.Property(e => e.Prioritylevel).HasMaxLength(100);
                entity.Property(e => e.State).HasMaxLength(150);
                entity.Property(e => e.SubmissionRate).HasMaxLength(100);
                entity.Property(e => e.SubmissionRateType).HasMaxLength(100);
                entity.Property(e => e.UpdatedTime)
                    .HasMaxLength(100)
                    .HasColumnName("Updated_Time");
                entity.Property(e => e.Vendor).HasMaxLength(100);
                entity.Property(e => e.Website).HasMaxLength(100);
            });

            modelBuilder.Entity<GenderMaster>(entity =>
            {
                entity.HasKey(e => e.Genderid).HasName("PK_gender");

                entity.ToTable("Gender_Master", "dbo");

                entity.Property(e => e.Gendername).HasMaxLength(50);
            });

            modelBuilder.Entity<GenuinityCheck>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("GenuinityCheck", "Admin_186551_orange");

                entity.Property(e => e.Candidateid).HasColumnName("candidateid");
                entity.Property(e => e.GenuinityCheckId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("GenuinityCheckID");
            });

            modelBuilder.Entity<GenuinityCheck1>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("GenuinityCheck", "dbo");

                entity.Property(e => e.Candidateid).HasColumnName("candidateid");
                entity.Property(e => e.GenuinityCheckId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("GenuinityCheckID");
            });

            modelBuilder.Entity<GenuinityCheckIndium>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("GenuinityCheckIndia", "dbo");

                entity.Property(e => e.Candidateid).HasColumnName("candidateid");
                entity.Property(e => e.GenuinityCheckId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("GenuinityCheckID");
            });

            modelBuilder.Entity<GenuinityCheckRating>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("GenuinityCheckRating", "Admin_186551_orange");

                entity.Property(e => e.Candidateid).HasColumnName("candidateid");
                entity.Property(e => e.Educationrating).HasMaxLength(50);
                entity.Property(e => e.GenuinityCheckRatingId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("GenuinityCheckRatingID");
                entity.Property(e => e.LinkedInrating).HasMaxLength(50);
                entity.Property(e => e.Overallrecruiterrating).HasMaxLength(50);
                entity.Property(e => e.Overallsystemrating).HasMaxLength(50);
                entity.Property(e => e.Visarating).HasMaxLength(50);
            });

            modelBuilder.Entity<GenuinityCheckRating1>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("GenuinityCheckRating", "dbo");

                entity.Property(e => e.Candidateid).HasColumnName("candidateid");
                entity.Property(e => e.Educationrating).HasMaxLength(50);
                entity.Property(e => e.GenuinityCheckRatingId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("GenuinityCheckRatingID");
                entity.Property(e => e.LinkedInrating).HasMaxLength(50);
                entity.Property(e => e.Overallrecruiterrating).HasMaxLength(50);
                entity.Property(e => e.Overallsystemrating).HasMaxLength(50);
                entity.Property(e => e.Visarating).HasMaxLength(50);
            });

            modelBuilder.Entity<GenuinityCheckRatingIndium>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("GenuinityCheckRatingIndia", "dbo");

                entity.Property(e => e.Candidateid).HasColumnName("candidateid");
                entity.Property(e => e.GenuinityCheckRatingId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("GenuinityCheckRatingID");
                entity.Property(e => e.Overallrecruiterrating).HasMaxLength(50);
                entity.Property(e => e.Overallsystemrating).HasMaxLength(50);
                entity.Property(e => e.Screeningrating1).HasMaxLength(50);
                entity.Property(e => e.Screeningrating2).HasMaxLength(50);
            });

            modelBuilder.Entity<ImageMaster>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("Image_Master", "dbo");

                entity.Property(e => e.ImageId)
                    .HasMaxLength(50)
                    .HasColumnName("ImageID");
                entity.Property(e => e.ImageUrl).HasColumnName("ImageURL");
                entity.Property(e => e.TechnologyName).HasMaxLength(100);
            });

            modelBuilder.Entity<JobMasterInd>(entity =>
            {
                entity.HasKey(e => e.Jobcode).HasName("PK__Job_Mast__BAF2961BBE6427DA");

                entity.ToTable("Job_Master_IND", "dbo");

                entity.Property(e => e.Jobcode).HasMaxLength(50);
                entity.Property(e => e.AssignedTo).HasColumnName("Assigned_To");
                entity.Property(e => e.AssignedToVendor).HasColumnName("Assigned_To_Vendor");
                entity.Property(e => e.AssignedToVendorContact).HasColumnName("Assigned_To_VendorContact");
                entity.Property(e => e.Clientname).HasMaxLength(50);
                entity.Property(e => e.Contactname).HasMaxLength(50);
                entity.Property(e => e.Country).HasMaxLength(150);
                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .HasColumnName("Created_By");
                entity.Property(e => e.CreatedOn)
                    .HasColumnType("date")
                    .HasColumnName("Created_On");
                entity.Property(e => e.CreatedTime)
                    .HasMaxLength(50)
                    .HasColumnName("Created_Time");
                entity.Property(e => e.Currency).HasMaxLength(50);
                entity.Property(e => e.Duration).HasMaxLength(150);
                entity.Property(e => e.EmplType).HasMaxLength(50);
                entity.Property(e => e.JobMasterId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("Job_MasterID");
                entity.Property(e => e.Jobclosedate).HasColumnType("date");
                entity.Property(e => e.Jobopendate).HasColumnType("date");
                entity.Property(e => e.Jobstatus).HasMaxLength(50);
                entity.Property(e => e.LastUpdatedBy)
                    .HasMaxLength(50)
                    .HasColumnName("Last_Updated_By");
                entity.Property(e => e.LastUpdatedOn)
                    .HasColumnType("date")
                    .HasColumnName("Last_Updated_On");
                entity.Property(e => e.Location).HasMaxLength(150);
                entity.Property(e => e.Maxrate).HasMaxLength(50);
                entity.Property(e => e.Minrate).HasMaxLength(50);
                entity.Property(e => e.Noofopening).HasMaxLength(150);
                entity.Property(e => e.Primaryrecruitercontact).HasMaxLength(100);
                entity.Property(e => e.Prioritylevel).HasMaxLength(50);
                entity.Property(e => e.PublishWeb)
                    .HasMaxLength(50)
                    .HasColumnName("Publish_Web");
                entity.Property(e => e.Ratetype).HasMaxLength(50);
                entity.Property(e => e.ShiftTiming).HasMaxLength(150);
                entity.Property(e => e.Startdate).HasMaxLength(150);
                entity.Property(e => e.TurnAroundtime).HasMaxLength(150);
                entity.Property(e => e.UpdatedTime)
                    .HasMaxLength(50)
                    .HasColumnName("Updated_Time");
                entity.Property(e => e.VenJobClosedate)
                    .HasColumnType("date")
                    .HasColumnName("Ven_Job_Closedate");
                entity.Property(e => e.VenJobOpendate)
                    .HasColumnType("date")
                    .HasColumnName("Ven_Job_Opendate");
            });

            modelBuilder.Entity<JobMasterUsa>(entity =>
            {
                entity.HasKey(e => e.Jobcode).HasName("PK__Job_Mast__BAF2961BF3A39FB9");

                entity.ToTable("Job_Master_USA", "dbo");

                entity.Property(e => e.Jobcode).HasMaxLength(50);
                entity.Property(e => e.AssignedTo).HasColumnName("Assigned_To");
                entity.Property(e => e.AssignedToVendor).HasColumnName("Assigned_To_Vendor");
                entity.Property(e => e.AssignedToVendorContact).HasColumnName("Assigned_To_VendorContact");
                entity.Property(e => e.City).HasMaxLength(150);
                entity.Property(e => e.Clientname).HasMaxLength(50);
                entity.Property(e => e.Contactname).HasMaxLength(50);
                entity.Property(e => e.Country).HasMaxLength(150);
                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .HasColumnName("Created_By");
                entity.Property(e => e.CreatedOn)
                    .HasColumnType("date")
                    .HasColumnName("Created_On");
                entity.Property(e => e.CreatedTime)
                    .HasMaxLength(50)
                    .HasColumnName("Created_Time");
                entity.Property(e => e.Currency1).HasMaxLength(50);
                entity.Property(e => e.Currency2).HasMaxLength(50);
                entity.Property(e => e.Duration).HasMaxLength(150);
                entity.Property(e => e.EmplType).HasMaxLength(50);
                entity.Property(e => e.Externaljobcode).HasMaxLength(100);
                entity.Property(e => e.JobMasterId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("Job_MasterID");
                entity.Property(e => e.Jobclosedate).HasColumnType("date");
                entity.Property(e => e.Jobopendate).HasColumnType("date");
                entity.Property(e => e.Jobstatus).HasMaxLength(50);
                entity.Property(e => e.LastUpdatedBy)
                    .HasMaxLength(50)
                    .HasColumnName("Last_Updated_By");
                entity.Property(e => e.LastUpdatedOn)
                    .HasColumnType("date")
                    .HasColumnName("Last_Updated_On");
                entity.Property(e => e.Location).HasMaxLength(150);
                entity.Property(e => e.Primaryrecruitercontact).HasMaxLength(100);
                entity.Property(e => e.Prioritylevel).HasMaxLength(50);
                entity.Property(e => e.PublishWeb)
                    .HasMaxLength(50)
                    .HasColumnName("Publish_Web");
                entity.Property(e => e.Rate1).HasMaxLength(50);
                entity.Property(e => e.Rate2).HasMaxLength(50);
                entity.Property(e => e.State).HasMaxLength(150);
                entity.Property(e => e.UpdatedTime)
                    .HasMaxLength(50)
                    .HasColumnName("Updated_Time");
                entity.Property(e => e.WorkType1).HasMaxLength(50);
                entity.Property(e => e.WorkType2).HasMaxLength(50);
            });

            modelBuilder.Entity<JobMatchSkillPercentage>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("JobMatchSkillPercentage", "Admin_186551_orange");

                entity.Property(e => e.JobMatchSkillId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("JobMatchSkillID");
                entity.Property(e => e.Jobcode).HasMaxLength(50);
            });

            modelBuilder.Entity<JobPortalMaster>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("JobPortal_Master", "dbo");

                entity.Property(e => e.PortalId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("PortalID");
                entity.Property(e => e.PortalName).HasMaxLength(100);
            });

            modelBuilder.Entity<JobPrimarySkillInd>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("Job_Primary_Skill_IND", "dbo");

                entity.Property(e => e.JobSkillId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("JobSkillID");
                entity.Property(e => e.JobYrsofExp).HasMaxLength(100);
                entity.Property(e => e.Jobcode).HasMaxLength(100);
            });

            modelBuilder.Entity<JobPrimarySkillUsa>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("Job_Primary_Skill_USA", "dbo");

                entity.Property(e => e.JobSkillId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("JobSkillID");
                entity.Property(e => e.JobYrsofExp).HasMaxLength(100);
                entity.Property(e => e.Jobcode).HasMaxLength(100);
                entity.Property(e => e.Status).HasColumnName("status");
            });

            modelBuilder.Entity<JobSecondarySkillInd>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("Job_Secondary_Skill_IND", "dbo");

                entity.Property(e => e.JobSkillId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("JobSkillID");
                entity.Property(e => e.JobYrsofExp).HasMaxLength(100);
                entity.Property(e => e.Jobcode).HasMaxLength(100);
            });

            modelBuilder.Entity<JobSecondarySkillUsa>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("Job_Secondary_Skill_USA", "dbo");

                entity.Property(e => e.JobSkillId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("JobSkillID");
                entity.Property(e => e.JobYrsofExp).HasMaxLength(100);
                entity.Property(e => e.Jobcode).HasMaxLength(100);
                entity.Property(e => e.Status).HasColumnName("status");
            });

            modelBuilder.Entity<JobstatusMaster>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("Jobstatus_Master", "dbo");

                entity.Property(e => e.JobstatusId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("JobstatusID");
                entity.Property(e => e.JobstatusName).HasMaxLength(200);
            });

            modelBuilder.Entity<LanguageMaster>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("Language_Master", "dbo");

                entity.Property(e => e.LanguageId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("LanguageID");
                entity.Property(e => e.Languagename).HasMaxLength(100);
            });

            modelBuilder.Entity<LevelMaster>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("Level_Master", "dbo");

                entity.Property(e => e.Levelid).ValueGeneratedOnAdd();
                entity.Property(e => e.Levelname).HasMaxLength(100);
            });

            modelBuilder.Entity<LocationMaster>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("Location_Master", "dbo");

                entity.Property(e => e.LocationId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("LocationID");
                entity.Property(e => e.LocationName).HasMaxLength(200);
            });

            modelBuilder.Entity<MailidMaster>(entity =>
            {
                entity.HasKey(e => e.MailmstrId).HasName("PK__Mailid_M__5282CE1264DFBB99");

                entity.ToTable("Mailid_Master", "dbo");

                entity.Property(e => e.MailmstrId).HasColumnName("mailmstr_id");
                entity.Property(e => e.MailId)
                    .HasMaxLength(50)
                    .HasColumnName("mail_id");
                entity.Property(e => e.MailKey)
                    .HasMaxLength(50)
                    .HasColumnName("mail_key");
            });

            modelBuilder.Entity<Menuaccess>(entity =>
            {
                entity.HasKey(e => e.Menuid).HasName("PK_menuacess");

                entity.ToTable("Menuaccess", "dbo");

                entity.Property(e => e.Menuid).HasColumnName("menuid");
                entity.Property(e => e.Menuname)
                    .HasMaxLength(50)
                    .HasColumnName("menuname");
                entity.Property(e => e.Menustatus).HasColumnName("menustatus");
            });

            modelBuilder.Entity<Menuaccesspermission>(entity =>
            {
                entity.HasKey(e => e.Menuaccessid);

                entity.ToTable("Menuaccesspermission", "dbo");

                entity.Property(e => e.Menuaccessid).HasColumnName("menuaccessid");
                entity.Property(e => e.CandidateAccess).HasColumnName("candidateAccess");
                entity.Property(e => e.CandidateCreation).HasColumnName("candidateCreation");
                entity.Property(e => e.CandidateEdit).HasColumnName("candidateEdit");
                entity.Property(e => e.CandidateView).HasColumnName("candidateView");
                entity.Property(e => e.JobAccess).HasColumnName("jobAccess");
                entity.Property(e => e.JobCreation).HasColumnName("jobCreation");
                entity.Property(e => e.JobEdit).HasColumnName("jobEdit");
                entity.Property(e => e.JobFeedback).HasColumnName("jobFeedback");
                entity.Property(e => e.JobView).HasColumnName("jobView");
                entity.Property(e => e.Regionid).HasColumnName("regionid");
                entity.Property(e => e.Roleid).HasColumnName("roleid");
                entity.Property(e => e.VendorAccess).HasColumnName("vendorAccess");
                entity.Property(e => e.VendorCreation).HasColumnName("vendorCreation");
                entity.Property(e => e.VendorEdit).HasColumnName("vendorEdit");
                entity.Property(e => e.VendorView).HasColumnName("vendorView");
            });

            modelBuilder.Entity<NewJobTable>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("NewJobTable", "Admin_186551_orange");

                entity.Property(e => e.CreatedOn)
                    .HasColumnType("date")
                    .HasColumnName("Created_On");
                entity.Property(e => e.Jobcode).HasMaxLength(50);
                entity.Property(e => e.NewJobTableId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("NewJobTableID");
                entity.Property(e => e.SkillCalculation).HasMaxLength(50);
            });

            modelBuilder.Entity<NoticeperiodMaster>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("Noticeperiod_Master", "dbo");

                entity.Property(e => e.NoticeId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("NoticeID");
                entity.Property(e => e.PeriodTime).HasMaxLength(100);
            });

            modelBuilder.Entity<PortalMaster>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("Portal_Master", "dbo");

                entity.Property(e => e.PortalMasterId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("Portal_MasterID");
                entity.Property(e => e.PortalName).HasMaxLength(100);
            });

            modelBuilder.Entity<PrimarySkillMaster>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("Primary_skill_Master", "Admin_186551_orange");

                entity.Property(e => e.PrimarySkillId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("PrimarySkillID");
                entity.Property(e => e.PrimarySkillName)
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<PrimarySkillMaster1>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("Primary_skill_Master", "dbo");

                entity.Property(e => e.PrimarySkillId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("PrimarySkillID");
                entity.Property(e => e.PrimarySkillName)
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<PriorityMaster>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("Priority_Master", "dbo");

                entity.Property(e => e.PriorityId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("PriorityID");
                entity.Property(e => e.PriorityName).HasMaxLength(100);
            });

            modelBuilder.Entity<QuestionHeadingMaster>(entity =>
            {
                entity.HasKey(e => e.QuestionHeadingid).HasName("PK_QuestionHeading");

                entity.ToTable("QuestionHeading_Master", "dbo");

                entity.Property(e => e.QuestionHeadingname).HasMaxLength(100);
            });

            modelBuilder.Entity<QuestionMaster>(entity =>
            {
                entity.HasKey(e => e.Questionid).HasName("PK_Question");

                entity.ToTable("Question_Master", "dbo");
            });

            modelBuilder.Entity<RateTypeMaster>(entity =>
            {
                entity.HasKey(e => e.TypeId).HasName("PK__RateType__516F0395ECAC7D0D");

                entity.ToTable("RateType_Master", "dbo");

                entity.Property(e => e.TypeId).HasColumnName("TypeID");
                entity.Property(e => e.TypeName).HasMaxLength(50);
            });

            modelBuilder.Entity<RecruiterEmailId>(entity =>
            {
                entity.HasKey(e => e.RecruiterEmailIdId).HasName("PK__Recruite__AB4F81948F55FD46");

                entity.ToTable("RecruiterEmailID", "dbo");

                entity.Property(e => e.RecruiterEmailIdId).HasColumnName("RecruiterEmailID_ID");
                entity.Property(e => e.Contactno).HasMaxLength(100);
                entity.Property(e => e.EmailId).HasMaxLength(200);
                entity.Property(e => e.Firstname).HasMaxLength(100);
                entity.Property(e => e.Lastname).HasMaxLength(100);
                entity.Property(e => e.Region).HasMaxLength(50);
            });

            modelBuilder.Entity<RegionMaster>(entity =>
            {
                entity.HasKey(e => e.Regionid).HasName("PK_Region");

                entity.ToTable("Region_Master", "dbo");

                entity.Property(e => e.Regionname).HasMaxLength(50);
            });

            modelBuilder.Entity<RemarksMaster>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("Remarks_Master", "dbo");

                entity.Property(e => e.RemarksId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("RemarksID");
                entity.Property(e => e.RemarksName).HasMaxLength(200);
            });

            modelBuilder.Entity<RoleMaster>(entity =>
            {
                entity.HasKey(e => e.Roleid).HasName("PK_role");

                entity.ToTable("RoleMaster", "dbo");

                entity.Property(e => e.Rolename).HasMaxLength(50);
            });

            modelBuilder.Entity<Rtrconfirmation>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("RTRConfirmation", "dbo");

                entity.Property(e => e.Candidateemaildid)
                    .HasMaxLength(200)
                    .HasColumnName("candidateemaildid");
                entity.Property(e => e.Employeremaildid)
                    .HasMaxLength(200)
                    .HasColumnName("employeremaildid");
                entity.Property(e => e.Jobcode)
                    .HasMaxLength(50)
                    .HasColumnName("jobcode");
                entity.Property(e => e.Mailsenton)
                    .HasColumnType("date")
                    .HasColumnName("mailsenton");
                entity.Property(e => e.Rtrconfirmationid)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("RTRConfirmationid");
                entity.Property(e => e.Rtremailstatus)
                    .HasMaxLength(50)
                    .HasColumnName("RTRemailstatus");
                entity.Property(e => e.Senttime)
                    .HasMaxLength(50)
                    .HasColumnName("senttime");
            });

            modelBuilder.Entity<RtrconfirmationIndium>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("RTRConfirmationIndia", "dbo");

                entity.Property(e => e.Candidateemaildid)
                    .HasMaxLength(200)
                    .HasColumnName("candidateemaildid");
                entity.Property(e => e.Employeremaildid)
                    .HasMaxLength(200)
                    .HasColumnName("employeremaildid");
                entity.Property(e => e.Jobcode)
                    .HasMaxLength(50)
                    .HasColumnName("jobcode");
                entity.Property(e => e.Mailsenton)
                    .HasColumnType("date")
                    .HasColumnName("mailsenton");
                entity.Property(e => e.Rtrconfirmationid)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("RTRConfirmationid");
                entity.Property(e => e.Rtremailstatus)
                    .HasMaxLength(50)
                    .HasColumnName("RTRemailstatus");
                entity.Property(e => e.Senttime)
                    .HasMaxLength(50)
                    .HasColumnName("senttime");
            });

            modelBuilder.Entity<ScoreMaster>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("Score_master", "dbo");

                entity.Property(e => e.ScoreCategory)
                    .HasMaxLength(100)
                    .HasColumnName("Score_Category");
                entity.Property(e => e.ScoreId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("Score_Id");
                entity.Property(e => e.ScoreType)
                    .HasMaxLength(100)
                    .HasColumnName("Score_Type");
                entity.Property(e => e.ScoreValue).HasColumnName("Score_value");
            });

            modelBuilder.Entity<SkillMaster>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("Skill_Master", "dbo");

                entity.Property(e => e.SkillId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("SkillID");
                entity.Property(e => e.SkillName).HasMaxLength(200);
            });

            modelBuilder.Entity<SpecializationMaster>(entity =>
            {
                entity.HasKey(e => e.SpecilaizationId).HasName("PK_SpecilaizationID");

                entity.ToTable("Specialization_Master", "dbo");

                entity.Property(e => e.SpecilaizationId).HasColumnName("SpecilaizationID");
                entity.Property(e => e.SpecilaizationName).HasMaxLength(100);
            });

            modelBuilder.Entity<State>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK__states__3213E83FD9DF680D");

                entity.ToTable("states", "dbo");

                entity.Property(e => e.Id)
                    .ValueGeneratedNever()
                    .HasColumnName("id");
                entity.Property(e => e.CountryId)
                    .HasDefaultValueSql("('1')")
                    .HasColumnName("country_id");
                entity.Property(e => e.Name)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .HasColumnName("name");
            });

            modelBuilder.Entity<StateMaster>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("State_Master", "Admin_186551_orange");

                entity.Property(e => e.CountryId).HasColumnName("CountryID");
                entity.Property(e => e.StateId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("StateID");
                entity.Property(e => e.StateName).HasMaxLength(100);
                entity.Property(e => e.Status).HasMaxLength(100);
            });

            modelBuilder.Entity<StateMaster1>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("State_Master", "dbo");

                entity.Property(e => e.CountryId).HasColumnName("CountryID");
                entity.Property(e => e.StateId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("StateID");
                entity.Property(e => e.StateName).HasMaxLength(100);
                entity.Property(e => e.Status).HasMaxLength(100);
            });

            modelBuilder.Entity<StatusMaster>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("Status_Master", "dbo");

                entity.Property(e => e.StatusId).HasColumnName("statusID");
                entity.Property(e => e.Statusname)
                    .HasMaxLength(100)
                    .HasColumnName("statusname");
            });

            modelBuilder.Entity<SupplierContactPersonIndium>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("SupplierContactPersonIndia", "dbo");

                entity.Property(e => e.Accountpassword)
                    .HasMaxLength(100)
                    .HasColumnName("accountpassword");
                entity.Property(e => e.CandidateAccess).HasColumnName("candidateAccess");
                entity.Property(e => e.CandidateCreation).HasColumnName("candidateCreation");
                entity.Property(e => e.CandidateEdit).HasColumnName("candidateEdit");
                entity.Property(e => e.CandidateView).HasColumnName("candidateView");
                entity.Property(e => e.ContactNo).HasMaxLength(100);
                entity.Property(e => e.ContactPerson).HasMaxLength(100);
                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .HasColumnName("Created_By");
                entity.Property(e => e.CreatedOn)
                    .HasColumnType("date")
                    .HasColumnName("Created_On");
                entity.Property(e => e.Dashboardaccess).HasColumnName("dashboardaccess");
                entity.Property(e => e.Designation).HasMaxLength(100);
                entity.Property(e => e.JobFeedback).HasColumnName("jobFeedback");
                entity.Property(e => e.JobView).HasColumnName("jobView");
                entity.Property(e => e.Jobaccess).HasColumnName("jobaccess");
                entity.Property(e => e.MailId).HasMaxLength(100);
                entity.Property(e => e.ReportAccess).HasColumnName("reportAccess");
                entity.Property(e => e.SupConStatus).HasMaxLength(50);
                entity.Property(e => e.SupplierContactId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("SupplierContactID");
                entity.Property(e => e.SupplierId)
                    .HasMaxLength(50)
                    .HasColumnName("SupplierID");
                entity.Property(e => e.Userid).HasMaxLength(100);
            });

            modelBuilder.Entity<SupplierDetailsIndium>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("SupplierDetailsIndia", "dbo");

                entity.Property(e => e.Accholdername)
                    .HasMaxLength(250)
                    .HasColumnName("accholdername");
                entity.Property(e => e.Accountno)
                    .HasMaxLength(100)
                    .HasColumnName("accountno");
                entity.Property(e => e.Bankname)
                    .HasMaxLength(100)
                    .HasColumnName("bankname");
                entity.Property(e => e.Branchname)
                    .HasMaxLength(100)
                    .HasColumnName("branchname");
                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .HasColumnName("Created_By");
                entity.Property(e => e.CreatedOn)
                    .HasColumnType("date")
                    .HasColumnName("Created_On");
                entity.Property(e => e.Ifsccode)
                    .HasMaxLength(100)
                    .HasColumnName("ifsccode");
                entity.Property(e => e.Remarks)
                    .HasMaxLength(250)
                    .HasColumnName("remarks");
                entity.Property(e => e.Status).HasMaxLength(50);
                entity.Property(e => e.Supplieraddress).HasColumnName("supplieraddress");
                entity.Property(e => e.Suppliercity)
                    .HasMaxLength(100)
                    .HasColumnName("suppliercity");
                entity.Property(e => e.Suppliercountry)
                    .HasMaxLength(100)
                    .HasColumnName("suppliercountry");
                entity.Property(e => e.Supplierid)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("supplierid");
                entity.Property(e => e.Supplierlinkedin)
                    .HasMaxLength(100)
                    .HasColumnName("supplierlinkedin");
                entity.Property(e => e.Suppliername)
                    .HasMaxLength(200)
                    .HasColumnName("suppliername");
                entity.Property(e => e.Supplierspecialization)
                    .HasMaxLength(250)
                    .HasColumnName("supplierspecialization");
                entity.Property(e => e.Supplierwebsite)
                    .HasMaxLength(100)
                    .HasColumnName("supplierwebsite");
                entity.Property(e => e.UpdatedBy)
                    .HasMaxLength(50)
                    .HasColumnName("Updated_By");
                entity.Property(e => e.UpdatedOn)
                    .HasColumnType("date")
                    .HasColumnName("Updated_On");
            });

            modelBuilder.Entity<TargetMaster>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("TargetMaster", "dbo");

                entity.Property(e => e.ClosureDaily).HasColumnName("Closure_Daily");
                entity.Property(e => e.ClosureMonthly)
                    .HasMaxLength(100)
                    .HasColumnName("Closure_Monthly");
                entity.Property(e => e.ClosureWeekly)
                    .HasMaxLength(100)
                    .HasColumnName("Closure_Weekly");
                entity.Property(e => e.SubmissionDaily).HasColumnName("Submission_Daily");
                entity.Property(e => e.SubmissionMonthly)
                    .HasMaxLength(100)
                    .HasColumnName("Submission_Monthly");
                entity.Property(e => e.SubmissionWeekly)
                    .HasMaxLength(100)
                    .HasColumnName("Submission_Weekly");
                entity.Property(e => e.SubmissiontoBpDaily).HasColumnName("SubmissiontoBP_Daily");
                entity.Property(e => e.SubmissiontoBpMonthly)
                    .HasMaxLength(100)
                    .HasColumnName("SubmissiontoBP_Monthly");
                entity.Property(e => e.SubmissiontoBpWeekly)
                    .HasMaxLength(100)
                    .HasColumnName("SubmissiontoBP_Weekly");
                entity.Property(e => e.SubmissiontoTlDaily).HasColumnName("SubmissiontoTL_Daily");
                entity.Property(e => e.SubmissiontoTlMonthly)
                    .HasMaxLength(100)
                    .HasColumnName("SubmissiontoTL_Monthly");
                entity.Property(e => e.SubmissiontoTlWeekly)
                    .HasMaxLength(100)
                    .HasColumnName("SubmissiontoTL_Weekly");
                entity.Property(e => e.TargetId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("TargetID");
                entity.Property(e => e.VendorDaily).HasColumnName("Vendor_Daily");
                entity.Property(e => e.VendorMonthly)
                    .HasMaxLength(100)
                    .HasColumnName("Vendor_Monthly");
                entity.Property(e => e.VendorWeekly)
                    .HasMaxLength(100)
                    .HasColumnName("Vendor_Weekly");
            });

            modelBuilder.Entity<TargetMasterInd>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("TargetMaster_IND", "dbo");

                entity.Property(e => e.RoleType).HasMaxLength(50);
                entity.Property(e => e.TargetId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("TargetID");
                entity.Property(e => e.TargetType).HasMaxLength(50);
                entity.Property(e => e.TargetValue).HasMaxLength(50);
            });

            modelBuilder.Entity<TargetMasterUsa>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("TargetMaster_USA", "dbo");

                entity.Property(e => e.RoleType).HasMaxLength(50);
                entity.Property(e => e.TargetId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("TargetID");
                entity.Property(e => e.TargetType).HasMaxLength(50);
                entity.Property(e => e.TargetValue).HasMaxLength(50);
            });

            modelBuilder.Entity<TblExtJobRemark>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("TblExtJobRemarks", "Admin_186551_orange");

                entity.Property(e => e.Jobcode).HasMaxLength(100);
                entity.Property(e => e.RemGivenby)
                    .HasMaxLength(100)
                    .HasColumnName("rem_givenby");
                entity.Property(e => e.RemGivenon)
                    .HasColumnType("date")
                    .HasColumnName("rem_givenon");
                entity.Property(e => e.RemGiventime)
                    .HasMaxLength(50)
                    .HasColumnName("rem_giventime");
                entity.Property(e => e.TblJobRemarksIndiaId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("TblJobRemarksIndiaID");
            });

            modelBuilder.Entity<TblExtJobRemark1>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("TblExtJobRemarks", "dbo");

                entity.Property(e => e.Jobcode).HasMaxLength(100);
                entity.Property(e => e.RemGivenby)
                    .HasMaxLength(100)
                    .HasColumnName("rem_givenby");
                entity.Property(e => e.RemGivenon)
                    .HasColumnType("date")
                    .HasColumnName("rem_givenon");
                entity.Property(e => e.RemGiventime)
                    .HasMaxLength(50)
                    .HasColumnName("rem_giventime");
                entity.Property(e => e.TblJobRemarksIndiaId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("TblJobRemarksIndiaID");
            });

            modelBuilder.Entity<TblJobCommentsIndium>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("TblJobCommentsIndia", "dbo");

                entity.Property(e => e.Jobcode).HasMaxLength(100);
                entity.Property(e => e.RemGivenby)
                    .HasMaxLength(100)
                    .HasColumnName("rem_givenby");
                entity.Property(e => e.RemGivenon)
                    .HasColumnType("date")
                    .HasColumnName("rem_givenon");
                entity.Property(e => e.RemGiventime)
                    .HasMaxLength(50)
                    .HasColumnName("rem_giventime");
                entity.Property(e => e.TblJobcommentsIndiaId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("TblJobcommentsIndiaID");
            });

            modelBuilder.Entity<TblJobCommentsU>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("TblJobCommentsUS", "dbo");

                entity.Property(e => e.Jobcode).HasMaxLength(100);
                entity.Property(e => e.RemGivenby)
                    .HasMaxLength(100)
                    .HasColumnName("rem_givenby");
                entity.Property(e => e.RemGivenon)
                    .HasColumnType("date")
                    .HasColumnName("rem_givenon");
                entity.Property(e => e.RemGiventime)
                    .HasMaxLength(50)
                    .HasColumnName("rem_giventime");
                entity.Property(e => e.TblJobcommentsIndiaId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("TblJobcommentsIndiaID");
            });

            modelBuilder.Entity<TblJobRemark>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("TblJobRemarks", "dbo");

                entity.Property(e => e.Jobcode).HasMaxLength(100);
                entity.Property(e => e.RemGivenby)
                    .HasMaxLength(100)
                    .HasColumnName("rem_givenby");
                entity.Property(e => e.RemGivenon)
                    .HasColumnType("date")
                    .HasColumnName("rem_givenon");
                entity.Property(e => e.RemGiventime)
                    .HasMaxLength(50)
                    .HasColumnName("rem_giventime");
                entity.Property(e => e.TblJobRemarksIndiaId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("TblJobRemarksIndiaID");
            });

            modelBuilder.Entity<TblJobRemarksIndium>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("TblJobRemarksIndia", "dbo");

                entity.Property(e => e.Jobcode).HasMaxLength(100);
                entity.Property(e => e.RemGivenby)
                    .HasMaxLength(100)
                    .HasColumnName("rem_givenby");
                entity.Property(e => e.RemGivenon)
                    .HasColumnType("date")
                    .HasColumnName("rem_givenon");
                entity.Property(e => e.RemGiventime)
                    .HasMaxLength(50)
                    .HasColumnName("rem_giventime");
                entity.Property(e => e.TblJobRemarksIndiaId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("TblJobRemarksIndiaID");
            });

            modelBuilder.Entity<TeamPerfomance>(entity =>
            {
                entity.ToTable("TeamPerfomance", "dbo");

                entity.Property(e => e.BpapprovalAchieved).HasColumnName("BPApprovalAchieved");
                entity.Property(e => e.BpapprovalRemarks)
                    .HasMaxLength(30)
                    .HasColumnName("BPApprovalRemarks");
                entity.Property(e => e.BpapprovalTarget).HasColumnName("BPApprovalTarget");
                entity.Property(e => e.CandidateRemarks).HasMaxLength(30);
                entity.Property(e => e.EcapprovalAchieved).HasColumnName("ECApprovalAchieved");
                entity.Property(e => e.EcapprovalRemarks)
                    .HasMaxLength(30)
                    .HasColumnName("ECApprovalRemarks");
                entity.Property(e => e.EcapprovalTarget).HasColumnName("ECApprovalTarget");
                entity.Property(e => e.FeedbackGivenby)
                    .HasMaxLength(30)
                    .HasColumnName("Feedback_givenby");
                entity.Property(e => e.FeedbackGivenon)
                    .HasColumnType("date")
                    .HasColumnName("Feedback_givenon");
                entity.Property(e => e.FeedbackUpdatedby)
                    .HasMaxLength(30)
                    .HasColumnName("Feedback_updatedby");
                entity.Property(e => e.FeedbackUpdatedon)
                    .HasColumnType("date")
                    .HasColumnName("Feedback_updatedon");
                entity.Property(e => e.OverAllRating).HasMaxLength(30);
                entity.Property(e => e.Remarks).HasMaxLength(250);
                entity.Property(e => e.SubmittionRemarks).HasMaxLength(30);
                entity.Property(e => e.TlapprovalAchieved).HasColumnName("TLApprovalAchieved");
                entity.Property(e => e.TlapprovalRemarks)
                    .HasMaxLength(30)
                    .HasColumnName("TLApprovalRemarks");
                entity.Property(e => e.TlapprovalTarger).HasColumnName("TLApprovalTarger");
                entity.Property(e => e.Tweid)
                    .HasMaxLength(30)
                    .HasColumnName("TWEID");
                entity.Property(e => e.VendorRemarks).HasMaxLength(30);
                entity.Property(e => e.Weekinfo).HasMaxLength(200);
            });

            modelBuilder.Entity<TeamPerfomanceIndiaMonthly>(entity =>
            {
                entity.HasKey(e => e.Teamperfomanceid).HasName("PK_TeamPerfomanceIndiaMonth");

                entity.ToTable("TeamPerfomanceIndia_Monthly", "dbo");

                entity.Property(e => e.FeedbackGivenby)
                    .HasMaxLength(30)
                    .HasColumnName("Feedback_givenby");
                entity.Property(e => e.FeedbackGivenon)
                    .HasColumnType("date")
                    .HasColumnName("Feedback_givenon");
                entity.Property(e => e.FeedbackUpdatedby)
                    .HasMaxLength(30)
                    .HasColumnName("Feedback_updatedby");
                entity.Property(e => e.FeedbackUpdatedon)
                    .HasColumnType("date")
                    .HasColumnName("Feedback_updatedon");
                entity.Property(e => e.Monthinfo).HasMaxLength(300);
                entity.Property(e => e.OverAllRating).HasMaxLength(30);
                entity.Property(e => e.Remarks).HasMaxLength(250);
                entity.Property(e => e.Tweid)
                    .HasMaxLength(30)
                    .HasColumnName("TWEID");
            });

            modelBuilder.Entity<TeamPerfomanceIndiaWeekly>(entity =>
            {
                entity.HasKey(e => e.Teamperfomanceid).HasName("PK_TeamPerfomanceIndiaWeek");

                entity.ToTable("TeamPerfomanceIndia_Weekly", "dbo");

                entity.Property(e => e.FeedbackGivenby)
                    .HasMaxLength(30)
                    .HasColumnName("Feedback_givenby");
                entity.Property(e => e.FeedbackGivenon)
                    .HasColumnType("date")
                    .HasColumnName("Feedback_givenon");
                entity.Property(e => e.FeedbackUpdatedby)
                    .HasMaxLength(30)
                    .HasColumnName("Feedback_updatedby");
                entity.Property(e => e.FeedbackUpdatedon)
                    .HasColumnType("date")
                    .HasColumnName("Feedback_updatedon");
                entity.Property(e => e.OverAllRating).HasMaxLength(30);
                entity.Property(e => e.Remarks).HasMaxLength(250);
                entity.Property(e => e.Tweid)
                    .HasMaxLength(30)
                    .HasColumnName("TWEID");
                entity.Property(e => e.Weekinfo).HasMaxLength(200);
            });

            modelBuilder.Entity<TeamPerfomanceIndium>(entity =>
            {
                entity.HasKey(e => e.Teamperfomanceid).HasName("PK_TeamPerfomanceInd");

                entity.ToTable("TeamPerfomanceIndia", "dbo");

                entity.Property(e => e.BpapprovalAchieved).HasColumnName("BPApprovalAchieved");
                entity.Property(e => e.BpapprovalRemarks)
                    .HasMaxLength(30)
                    .HasColumnName("BPApprovalRemarks");
                entity.Property(e => e.BpapprovalTarget).HasColumnName("BPApprovalTarget");
                entity.Property(e => e.Bppercentage)
                    .HasMaxLength(30)
                    .HasColumnName("BPPercentage");
                entity.Property(e => e.FeedbackGivenby)
                    .HasMaxLength(30)
                    .HasColumnName("Feedback_givenby");
                entity.Property(e => e.FeedbackGivenon)
                    .HasColumnType("date")
                    .HasColumnName("Feedback_givenon");
                entity.Property(e => e.FeedbackUpdatedby)
                    .HasMaxLength(30)
                    .HasColumnName("Feedback_updatedby");
                entity.Property(e => e.FeedbackUpdatedon)
                    .HasColumnType("date")
                    .HasColumnName("Feedback_updatedon");
                entity.Property(e => e.OverAllRating).HasMaxLength(30);
                entity.Property(e => e.Remarks).HasMaxLength(250);
                entity.Property(e => e.SubmissionPercentage).HasMaxLength(30);
                entity.Property(e => e.SubmissionRemarks).HasMaxLength(30);
                entity.Property(e => e.TlapprovalAchieved).HasColumnName("TLApprovalAchieved");
                entity.Property(e => e.TlapprovalRemarks)
                    .HasMaxLength(30)
                    .HasColumnName("TLApprovalRemarks");
                entity.Property(e => e.TlapprovalTarget).HasColumnName("TLApprovalTarget");
                entity.Property(e => e.Tlpercentage)
                    .HasMaxLength(30)
                    .HasColumnName("TLPercentage");
                entity.Property(e => e.Tweid)
                    .HasMaxLength(30)
                    .HasColumnName("TWEID");
                entity.Property(e => e.Weekinfo).HasMaxLength(200);
            });

            modelBuilder.Entity<TeamPerfomanceMonthly>(entity =>
            {
                entity.HasKey(e => e.Teamperfomanceid).HasName("PK_TeamPerfomanceMonth");

                entity.ToTable("TeamPerfomance_Monthly", "dbo");

                entity.Property(e => e.FeedbackGivenby)
                    .HasMaxLength(30)
                    .HasColumnName("Feedback_givenby");
                entity.Property(e => e.FeedbackGivenon)
                    .HasColumnType("date")
                    .HasColumnName("Feedback_givenon");
                entity.Property(e => e.FeedbackUpdatedby)
                    .HasMaxLength(30)
                    .HasColumnName("Feedback_updatedby");
                entity.Property(e => e.FeedbackUpdatedon)
                    .HasColumnType("date")
                    .HasColumnName("Feedback_updatedon");
                entity.Property(e => e.Monthinfo).HasMaxLength(200);
                entity.Property(e => e.OverAllRating).HasMaxLength(30);
                entity.Property(e => e.Remarks).HasMaxLength(250);
                entity.Property(e => e.Tweid)
                    .HasMaxLength(30)
                    .HasColumnName("TWEID");
            });

            modelBuilder.Entity<TeamPerfomanceWeekly>(entity =>
            {
                entity.HasKey(e => e.Teamperfomanceid).HasName("PK_TeamPerfomanceWeek");

                entity.ToTable("TeamPerfomance_Weekly", "dbo");

                entity.Property(e => e.FeedbackGivenby)
                    .HasMaxLength(30)
                    .HasColumnName("Feedback_givenby");
                entity.Property(e => e.FeedbackGivenon)
                    .HasColumnType("date")
                    .HasColumnName("Feedback_givenon");
                entity.Property(e => e.FeedbackUpdatedby)
                    .HasMaxLength(30)
                    .HasColumnName("Feedback_updatedby");
                entity.Property(e => e.FeedbackUpdatedon)
                    .HasColumnType("date")
                    .HasColumnName("Feedback_updatedon");
                entity.Property(e => e.OverAllRating).HasMaxLength(30);
                entity.Property(e => e.OverAllValue).HasMaxLength(50);
                entity.Property(e => e.Remarks).HasMaxLength(250);
                entity.Property(e => e.Tweid)
                    .HasMaxLength(30)
                    .HasColumnName("TWEID");
                entity.Property(e => e.Weekinfo).HasMaxLength(200);
            });

            modelBuilder.Entity<ThirdPartyClientContactPerson>(entity =>
            {
                entity.HasKey(e => e.ClientContactId).HasName("PK_ThirdPartyClient_Contact");

                entity.ToTable("ThirdPartyClient_Contact_Person", "dbo");

                entity.Property(e => e.ClientContactId).HasColumnName("ClientContactID");
                entity.Property(e => e.ClientConStatus).HasMaxLength(50);
                entity.Property(e => e.ClientId)
                    .HasMaxLength(50)
                    .HasColumnName("ClientID");
                entity.Property(e => e.ContactNo).HasMaxLength(200);
                entity.Property(e => e.ContactPerson).HasMaxLength(100);
                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .HasColumnName("Created_By");
                entity.Property(e => e.CreatedOn)
                    .HasColumnType("date")
                    .HasColumnName("Created_On");
                entity.Property(e => e.Designation).HasMaxLength(100);
                entity.Property(e => e.IndContactNo).HasMaxLength(100);
                entity.Property(e => e.LinkedinUrl)
                    .HasMaxLength(200)
                    .HasColumnName("LinkedinURL");
                entity.Property(e => e.MailId).HasMaxLength(100);
                entity.Property(e => e.Updatedby).HasMaxLength(100);
                entity.Property(e => e.Updatedon).HasColumnType("date");
                entity.Property(e => e.UsacontactNo)
                    .HasMaxLength(100)
                    .HasColumnName("USAContactNo");
            });

            modelBuilder.Entity<ThirdPartyClientMaster>(entity =>
            {
                entity.HasKey(e => e.ClientId).HasName("PK_ThirdPartyClient");

                entity.ToTable("ThirdParty_ClientMaster", "dbo");

                entity.Property(e => e.ClientId).HasColumnName("ClientID");
                entity.Property(e => e.Additionalinfo).HasColumnName("additionalinfo");
                entity.Property(e => e.Address).HasColumnName("address");
                entity.Property(e => e.Chartcolor)
                    .HasMaxLength(50)
                    .HasColumnName("chartcolor");
                entity.Property(e => e.City)
                    .HasMaxLength(150)
                    .HasColumnName("city");
                entity.Property(e => e.ClientSpecialization).HasColumnName("Client_Specialization");
                entity.Property(e => e.Clienttype).HasColumnName("clienttype");
                entity.Property(e => e.CompanyLinkedin)
                    .HasMaxLength(100)
                    .HasColumnName("Company_Linkedin");
                entity.Property(e => e.CompanyWebsite)
                    .HasMaxLength(100)
                    .HasColumnName("Company_Website");
                entity.Property(e => e.Country)
                    .HasMaxLength(100)
                    .HasColumnName("country");
                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .HasColumnName("Created_By");
                entity.Property(e => e.CreatedOn)
                    .HasColumnType("date")
                    .HasColumnName("Created_On");
                entity.Property(e => e.Placeofsupply).HasMaxLength(100);
                entity.Property(e => e.Status).HasMaxLength(50);
                entity.Property(e => e.Updatedby)
                    .HasMaxLength(200)
                    .HasColumnName("updatedby");
                entity.Property(e => e.Updatedon)
                    .HasColumnType("date")
                    .HasColumnName("updatedon");
            });

            modelBuilder.Entity<TimezoneMaster>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("Timezone_master", "dbo");

                entity.Property(e => e.Timezoneid).ValueGeneratedOnAdd();
                entity.Property(e => e.Timezonename).HasMaxLength(50);
            });

            modelBuilder.Entity<TypeMaster>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("Type_Master", "dbo");

                entity.Property(e => e.TypeId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("TypeID");
                entity.Property(e => e.TypeName).HasMaxLength(50);
            });

            modelBuilder.Entity<UserAccessPower>(entity =>
            {
                entity.HasKey(e => e.AccessId);

                entity.ToTable("UserAccessPower", "dbo");

                entity.Property(e => e.AccessId).HasColumnName("accessId");
                entity.Property(e => e.CandidateAccess).HasColumnName("candidateAccess");
                entity.Property(e => e.CandidateCreation).HasColumnName("candidateCreation");
                entity.Property(e => e.CandidateEdit).HasColumnName("candidateEdit");
                entity.Property(e => e.CandidateView).HasColumnName("candidateView");
                entity.Property(e => e.JobCreation).HasColumnName("jobCreation");
                entity.Property(e => e.JobEdit).HasColumnName("jobEdit");
                entity.Property(e => e.JobFeedback).HasColumnName("jobFeedback");
                entity.Property(e => e.JobView).HasColumnName("jobView");
                entity.Property(e => e.Jobaccess).HasColumnName("jobaccess");
                entity.Property(e => e.UserId)
                    .HasMaxLength(15)
                    .HasColumnName("userId");
                entity.Property(e => e.VendorAccess).HasColumnName("vendorAccess");
                entity.Property(e => e.VendorCreation).HasColumnName("vendorCreation");
                entity.Property(e => e.VendorEdit).HasColumnName("vendorEdit");
                entity.Property(e => e.VendorView).HasColumnName("vendorView");
            });

            modelBuilder.Entity<UserTargetMaster>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("UserTargetMaster", "dbo");

                entity.Property(e => e.ClosureDaily).HasColumnName("Closure_Daily");
                entity.Property(e => e.ClosureMonthly).HasColumnName("Closure_Monthly");
                entity.Property(e => e.ClosureWeekly).HasColumnName("Closure_Weekly");
                entity.Property(e => e.OnboardMonthly).HasColumnName("Onboard_Monthly");
                entity.Property(e => e.ScoreExcellent).HasColumnName("Score_Excellent");
                entity.Property(e => e.ScoreValueBpMonthly).HasColumnName("Score_value_BP_Monthly");
                entity.Property(e => e.ScoreValueBpWeekly).HasColumnName("Score_value_BP_Weekly");
                entity.Property(e => e.ScoreValueClMonthly).HasColumnName("Score_value_CL_Monthly");
                entity.Property(e => e.ScoreValueEcMonthly).HasColumnName("Score_value_EC_Monthly");
                entity.Property(e => e.ScoreValueOnMonthly).HasColumnName("Score_value_ON_Monthly");
                entity.Property(e => e.ScoreValueTlDaily).HasColumnName("Score_value_TL_Daily");
                entity.Property(e => e.ScoreValueTlMonthly).HasColumnName("Score_value_TL_Monthly");
                entity.Property(e => e.ScoreValueTlWeekly).HasColumnName("Score_value_TL_Weekly");
                entity.Property(e => e.SubmissionDaily).HasColumnName("Submission_Daily");
                entity.Property(e => e.SubmissionMonthly).HasColumnName("Submission_Monthly");
                entity.Property(e => e.SubmissionWeekly).HasColumnName("Submission_Weekly");
                entity.Property(e => e.SubmissiontoBpDaily).HasColumnName("SubmissiontoBP_Daily");
                entity.Property(e => e.SubmissiontoBpMonthly).HasColumnName("SubmissiontoBP_Monthly");
                entity.Property(e => e.SubmissiontoBpWeekly).HasColumnName("SubmissiontoBP_Weekly");
                entity.Property(e => e.SubmissiontoTlDaily).HasColumnName("SubmissiontoTL_Daily");
                entity.Property(e => e.SubmissiontoTlMonthly).HasColumnName("SubmissiontoTL_Monthly");
                entity.Property(e => e.SubmissiontoTlWeekly).HasColumnName("SubmissiontoTL_Weekly");
                entity.Property(e => e.Tweid)
                    .HasMaxLength(100)
                    .HasColumnName("TWEID");
                entity.Property(e => e.UserTargetId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("UserTargetID");
                entity.Property(e => e.VendorDaily).HasColumnName("Vendor_Daily");
                entity.Property(e => e.VendorMonthly).HasColumnName("Vendor_Monthly");
                entity.Property(e => e.VendorWeekly).HasColumnName("Vendor_Weekly");
            });

            modelBuilder.Entity<Usermenuacess>(entity =>
            {
                entity.HasKey(e => e.Usermenuid);

                entity.ToTable("Usermenuacess", "dbo");

                entity.Property(e => e.Usermenuid).HasColumnName("usermenuid");
                entity.Property(e => e.Addprofile).HasColumnName("addprofile");
                entity.Property(e => e.Deleteprofile).HasColumnName("deleteprofile");
                entity.Property(e => e.Editprofile).HasColumnName("editprofile");
                entity.Property(e => e.Menutype).HasColumnName("menutype");
                entity.Property(e => e.Status).HasColumnName("status");
                entity.Property(e => e.Userid).HasColumnName("userid");
                entity.Property(e => e.Viewprofile).HasColumnName("viewprofile");
            });

            modelBuilder.Entity<Userprofile>(entity =>
            {
                entity.HasKey(e => e.UpUserid);

                entity.ToTable("Userprofile", "dbo");

                entity.Property(e => e.UpUserid).HasColumnName("UP_userid");
                entity.Property(e => e.TweId)
                    .HasMaxLength(50)
                    .HasColumnName("TWE_ID");
                entity.Property(e => e.UpCreatedon)
                    .HasColumnType("date")
                    .HasColumnName("UP_createdon");
                entity.Property(e => e.UpFirstName)
                    .HasMaxLength(50)
                    .HasColumnName("UP_firstName");
                entity.Property(e => e.UpLastName)
                    .HasMaxLength(50)
                    .HasColumnName("UP_lastName");
                entity.Property(e => e.UpMailid)
                    .HasMaxLength(255)
                    .HasColumnName("UP_mailid");
                entity.Property(e => e.UpMtDesignation).HasColumnName("UP_MT_designation");
                entity.Property(e => e.UpMtProfilestatus).HasColumnName("UP_MT_profilestatus");
                entity.Property(e => e.UpMtRegion).HasColumnName("UP_MT_region");
                entity.Property(e => e.UpMtRole).HasColumnName("UP_MT_Role");
                entity.Property(e => e.UpPassword).HasColumnName("UP_Password");
                entity.Property(e => e.UpReportingto)
                    .HasMaxLength(250)
                    .HasColumnName("UP_reportingto");
                entity.Property(e => e.UpUserName)
                    .HasMaxLength(100)
                    .HasColumnName("UP_userName");
            });

            modelBuilder.Entity<Userprofilecreation>(entity =>
            {
                entity.HasKey(e => e.Userid);

                entity.ToTable("Userprofilecreation", "dbo");

                entity.Property(e => e.Userid).HasColumnName("userid");
                entity.Property(e => e.Accountpassword)
                    .HasMaxLength(50)
                    .HasColumnName("accountpassword");
                entity.Property(e => e.Accountusername)
                    .HasMaxLength(50)
                    .HasColumnName("accountusername");
                entity.Property(e => e.Bpapproval).HasColumnName("BPApproval");
                entity.Property(e => e.CandidateAdding).HasColumnName("Candidate_adding");
                entity.Property(e => e.Chartcolor)
                    .HasMaxLength(50)
                    .HasColumnName("chartcolor");
                entity.Property(e => e.Confirmationemailid)
                    .HasMaxLength(250)
                    .HasColumnName("confirmationemailid");
                entity.Property(e => e.Designation)
                    .HasMaxLength(50)
                    .HasColumnName("designation");
                entity.Property(e => e.Dob)
                    .HasColumnType("date")
                    .HasColumnName("dob");
                entity.Property(e => e.Ecapproval).HasColumnName("ECApproval");
                entity.Property(e => e.Emailid)
                    .HasMaxLength(250)
                    .HasColumnName("emailid");
                entity.Property(e => e.Firstname)
                    .HasMaxLength(50)
                    .HasColumnName("firstname");
                entity.Property(e => e.Gender)
                    .HasMaxLength(10)
                    .HasColumnName("gender");
                entity.Property(e => e.Initials).HasMaxLength(100);
                entity.Property(e => e.Insertdate)
                    .HasColumnType("date")
                    .HasColumnName("insertdate");
                entity.Property(e => e.Language)
                    .HasMaxLength(50)
                    .HasColumnName("language");
                entity.Property(e => e.Lastname)
                    .HasMaxLength(50)
                    .HasColumnName("lastname");
                entity.Property(e => e.Level)
                    .HasMaxLength(50)
                    .HasColumnName("level");
                entity.Property(e => e.Location)
                    .HasMaxLength(50)
                    .HasColumnName("location");
                entity.Property(e => e.Monsterpsw)
                    .HasMaxLength(20)
                    .HasColumnName("monsterpsw");
                entity.Property(e => e.Monsterusername)
                    .HasMaxLength(250)
                    .HasColumnName("monsterusername");
                entity.Property(e => e.Phoneno)
                    .HasMaxLength(20)
                    .HasColumnName("phoneno");
                entity.Property(e => e.Profileimage).HasColumnName("profileimage");
                entity.Property(e => e.Region)
                    .HasMaxLength(20)
                    .HasColumnName("region");
                entity.Property(e => e.ReportingTl)
                    .HasMaxLength(50)
                    .HasColumnName("reportingTL");
                entity.Property(e => e.Reportingmanager)
                    .HasMaxLength(50)
                    .HasColumnName("reportingmanager");
                entity.Property(e => e.Role)
                    .HasMaxLength(50)
                    .HasColumnName("role");
                entity.Property(e => e.Status).HasColumnName("status");
                entity.Property(e => e.Textnow)
                    .HasMaxLength(20)
                    .HasColumnName("textnow");
                entity.Property(e => e.Tlapproval).HasColumnName("TLApproval");
                entity.Property(e => e.TweId)
                    .HasMaxLength(10)
                    .HasColumnName("TWE_ID");
                entity.Property(e => e.Updateddate)
                    .HasColumnType("date")
                    .HasColumnName("updateddate");
                entity.Property(e => e.VendorCreation).HasColumnName("Vendor_creation");
            });

            modelBuilder.Entity<VendorContactPerson>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("Vendor_Contact_Person", "dbo");

                entity.Property(e => e.ContactPerson).HasMaxLength(100);
                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .HasColumnName("Created_By");
                entity.Property(e => e.CreatedOn)
                    .HasColumnType("date")
                    .HasColumnName("Created_On");
                entity.Property(e => e.Designation).HasMaxLength(100);
                entity.Property(e => e.IndContactNo).HasMaxLength(100);
                entity.Property(e => e.LinkedinUrl)
                    .HasMaxLength(200)
                    .HasColumnName("LinkedinURL");
                entity.Property(e => e.MailId).HasMaxLength(100);
                entity.Property(e => e.UsacontactNo)
                    .HasMaxLength(100)
                    .HasColumnName("USAContactNo");
                entity.Property(e => e.VenConStatus).HasMaxLength(50);
                entity.Property(e => e.VendorContactId)
                    .HasMaxLength(50)
                    .HasColumnName("VendorContactID");
                entity.Property(e => e.VendorId)
                    .HasMaxLength(50)
                    .HasColumnName("VendorID");
            });

            modelBuilder.Entity<VendorMast>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("VendorMast", "dbo");

                entity.Property(e => e.CompanyLinkedin)
                    .HasMaxLength(100)
                    .HasColumnName("Company_Linkedin");
                entity.Property(e => e.CompanyWebsite)
                    .HasMaxLength(100)
                    .HasColumnName("Company_Website");
                entity.Property(e => e.CreatedBy)
                    .HasMaxLength(50)
                    .HasColumnName("Created_By");
                entity.Property(e => e.CreatedOn)
                    .HasColumnType("date")
                    .HasColumnName("Created_On");
                entity.Property(e => e.Placeofsupply).HasMaxLength(100);
                entity.Property(e => e.Status).HasMaxLength(50);
                entity.Property(e => e.VenSpecialization).HasColumnName("Ven_Specialization");
                entity.Property(e => e.VendorId)
                    .HasMaxLength(50)
                    .HasColumnName("VendorID");
            });

            modelBuilder.Entity<VisaMaster>(entity =>
            {
                entity.HasKey(e => e.VisaId).HasName("PK_VisaID");

                entity.ToTable("Visa_Master", "dbo");

                entity.Property(e => e.VisaId).HasColumnName("VisaID");
                entity.Property(e => e.VisaName).HasMaxLength(100);
            });

            modelBuilder.Entity<YearMaster>(entity =>
            {
                entity
                    .HasNoKey()
                    .ToTable("Year_Master", "dbo");

                entity.Property(e => e.YearMasterId)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("Year_Master_ID");
                entity.Property(e => e.YearMasterName)
                    .HasMaxLength(50)
                    .HasColumnName("Year_Master_Name");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
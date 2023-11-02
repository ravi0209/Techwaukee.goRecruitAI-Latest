using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Techwaukee.goRecruitAI.Common;
using Techwaukee.goRecruitAI.Repository;
using Techwaukee.goRecruitAI.Repository.Models;

namespace Techwaukee.goRecruitAI.Services.Impl
{
    public class ResumeService : IResumeService
    {
        private readonly RecruitContext context;
        public ResumeService(RecruitContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<TrainedName>> GetTrainedNames()
        {
            const string query = "SELECT [Name] FROM [dbo].[TrainedNames] WHERE [IsActive] = 1";
            using var connection = (SqlConnection)context.Database.GetDbConnection();
            if (connection.State != System.Data.ConnectionState.Open) connection.Open();
            var result = new HashSet<string>(StringComparer.InvariantCultureIgnoreCase);
            using var cmd = new SqlCommand(query, connection);
            using var dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                result.Add(dr.GetString(0));
            }
            return result.Select(x => new TrainedName { Name = x, IsActive = true });
        }

        public async Task<IEnumerable<TrainedSkill>> GetTrainedSkills()
        {
            return await context.TrainedSkills.Where(n => n.IsActive ?? false).AsNoTracking().ToListAsync();
        }

        public async Task<Resume> SaveResume(Resume resume, bool reInsertSkills = false, bool reInsertEducation = false)
        {
            try
            {
                var existingResume = context.Resumes.Where(r => r.PrimaryPhoneNumber == resume.PrimaryPhoneNumber && r.PrimaryEmailAddress == resume.PrimaryEmailAddress)
                    .Include(r => r.ResumeSkillsets)
                    .Include(r => r.ResumeEducations)
                    .FirstOrDefault();
                if (existingResume != null)
                {
                    existingResume.UpdatedBy = "UI_user";
                    existingResume.UpdatedOn = DateTime.Now;

                    if (reInsertSkills)
                    {
                        while (reInsertSkills && existingResume.ResumeSkillsets.Any())
                        {
                            existingResume.ResumeSkillsets.Remove(existingResume.ResumeSkillsets.First());
                        }
                        resume.ResumeSkillsets.ForEach(s => existingResume.ResumeSkillsets.Add(s));
                    }
                    else
                    {
                        foreach (var skillSet in resume.ResumeSkillsets)
                        {
                            var matchingSkill = existingResume.ResumeSkillsets.FirstOrDefault(s => s.Skill.Equals(skillSet.Skill, StringComparison.InvariantCultureIgnoreCase));
                            if (matchingSkill != null)
                            {
                                matchingSkill.Occurences = skillSet.Occurences;
                                if (skillSet.Years != null) matchingSkill.Years = skillSet.Years;
                                if (skillSet.Weightage != null) matchingSkill.Weightage = skillSet.Weightage;
                            }
                            else
                            {
                                existingResume.ResumeSkillsets.Add(skillSet);
                            }
                        }
                    }

                    if (reInsertEducation)
                    {
                        while (reInsertEducation && existingResume.ResumeEducations.Any())
                        {
                            existingResume.ResumeEducations.Remove(existingResume.ResumeEducations.First());
                        }
                        resume.ResumeEducations.ForEach(e => existingResume.ResumeEducations.Add(e));
                    }
                    else
                    {
                        foreach (var edu in resume.ResumeEducations)
                        {
                            var matchingEdu = existingResume.ResumeEducations.FirstOrDefault(s => s.Education.Equals(edu.Education, StringComparison.InvariantCultureIgnoreCase));
                            if (matchingEdu != null)
                            {
                                matchingEdu.Education = edu.Education;
                                if (edu.Institute != null) matchingEdu.Institute = edu.Institute;
                                if (edu.Score != null) matchingEdu.Score = edu.Score;
                                if (edu.StartYear != null) matchingEdu.StartYear = edu.StartYear;
                                if (edu.EndYear != null) matchingEdu.EndYear = edu.EndYear;
                            }
                            else
                            {
                                existingResume.ResumeEducations.Add(edu);
                            }
                        }
                    }
                    await context.SaveChangesAsync();
                    return resume;
                }
                else
                {
                    await context.Resumes.AddAsync(resume);
                    var id = await context.SaveChangesAsync();
                    resume.ResumeId = id;
                    return resume;
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }

    }
}

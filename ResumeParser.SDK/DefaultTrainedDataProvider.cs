using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace ResumeParser.SDK
{
    public class DefaultTrainedDataProvider : ITrainedDataProvider
    {
        private readonly string? connectionString;

        public DefaultTrainedDataProvider(IConfiguration configuration)
        {
            connectionString = configuration.GetConnectionString("AppDb");
            Names = GetTrainedNames();
            Skills = GetTrainedSkills();
        }

        public HashSet<string> Names { get; private set; }
        public HashSet<string> Skills { get; private set; }

        private HashSet<string> GetTrainedNames()
        {
            var names = new HashSet<string>();
            using var connection = new SqlConnection(connectionString);
            connection.Open();
            using var cmd = new SqlCommand("select Name from Names", connection);
            using var dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                names.Add(dr.GetString(0));
            }
            return names;
        }

        private HashSet<string> GetTrainedSkills()
        {
            var skills = new HashSet<string>();
            using var connection = new SqlConnection(connectionString);
            connection.Open();
            using var cmd = new SqlCommand("select Skill from Skills where IsActive=1 and len(Skill) > 1 and Category='IT'", connection);
            using var dr = cmd.ExecuteReader();
            while (dr.Read())
            {
                skills.Add(dr.GetString(0));
            }
            return skills;
        }
    }
}
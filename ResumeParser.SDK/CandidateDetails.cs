namespace ResumeParser.SDK
{
    public class CandidateDetails
    {
        public string? Name { get; set; }
        public List<string> PhoneNumbers { get; set; } = new List<string>();
        public List<string> EmailAddresses { get; set; } = new List<string>();
        public List<Skillset> Skillsets { get; set; } = new List<Skillset>();
        public List<string> Education { get; set; } = new List<string>();
    }

    public class Skillset
    {
        public string? Skill { get; set; }
        public int Years { get; set; }
        public int Occurences { get; set; }
        public float Weightage { get; set; }

        public override string ToString()
        {
            return $"Skill: {this.Skill}; Occurences: {this.Occurences}; Years: {this.Years};";
        }
    }
}
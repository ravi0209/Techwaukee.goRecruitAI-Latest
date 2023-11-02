namespace ResumeParser.SDK
{
    public class ParserValidationResult
    {
        public string FileName { get; set; }
        public bool NameFound { get; set; } = true;
        public bool PhoneFound { get; set; } = true;
        public bool EmailFound { get; set; } = true;
        public bool IsValid { get => NameFound && PhoneFound && EmailFound; }

        public override string ToString()
        {
            return $"{(string.IsNullOrEmpty(FileName) ? "File name is not set" : Path.GetFileNameWithoutExtension(FileName))} - {(NameFound ? string.Empty : "Name")} {(PhoneFound ? string.Empty : "Phone")} {(EmailFound ? string.Empty : "Email")}";
        }
    }
}
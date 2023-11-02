namespace ResumeParser.SDK
{
    public static class Extensions
    {
        public static ParserValidationResult Validate(this CandidateDetails candidateDetails, string filePath = null)
        {
            if (candidateDetails == null) { return new(); }
            return new ParserValidationResult
            {
                FileName = string.IsNullOrEmpty(filePath) ? "File path is not set" : Path.GetFileName(filePath),
                NameFound = !string.IsNullOrEmpty(candidateDetails.Name),
                PhoneFound = candidateDetails.PhoneNumbers?.Any() ?? false,
                EmailFound = candidateDetails.EmailAddresses?.Any() ?? false
            };
        }
    }
}
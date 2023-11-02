namespace ResumeParser.SDK
{
    public interface IExtractor
    {
        Task<CandidateDetails> ExtractDetails(string filePath);

        Task<CandidateDetails> ExtractDetails(Stream fileStream, FileType fileType);
    }
}
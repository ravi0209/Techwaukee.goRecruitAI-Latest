namespace ResumeParser.SDK
{
    public interface IFileReader
    {
        Task<string> ReadContents(string filePath);

        Task<string> ReadContents(Stream fileStream, FileType fileType);

        IFileReader GetReader(string filePath);
    }
}
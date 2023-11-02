namespace ResumeParser.SDK
{
    public class FileReader : IFileReader
    {
        public FileReader()
        { }

        public virtual async Task<string> ReadContents(string path)
        {
            return await GetReader(path).ReadContents(path);
        }

        public async Task<string> ReadContents(Stream stream, FileType fileType)
        {
            var tmpFile = Path.Combine(Path.GetTempPath(), $"{Guid.NewGuid()}.{fileType}");
            using var fs = new FileStream(tmpFile, FileMode.OpenOrCreate, FileAccess.ReadWrite);
            stream.CopyTo(fs);
            return await ReadContents(tmpFile);
        }

        public IFileReader GetReader(string filePath)
        {
            var ext = Path.GetExtension(filePath).ToLower().TrimStart('.');
            return ext switch
            {
                "pdf" => new PdfFileReader(),
                "doc" => new DocFileReader(),
                "docx" => new DocFileReader(),
                "htm" => new HtmlFileReader(),
                "html" => new HtmlFileReader(),
                _ => throw new InvalidDataException($"Unable to read .{ext} file"),
            };
        }
    }
}
using Spire.Doc;

namespace ResumeParser.SDK
{
    public class DocFileReader : FileReader
    {
        public override Task<string> ReadContents(string filePath)
        {
            //DocxToText dtt = new DocxToText(filePath);
            //var text = dtt.ExtractText();
            using var fs = new FileStream(filePath, FileMode.Open, FileAccess.Read);
            using var doc = new Document(fs);
            return Task.FromResult(doc.GetText());
        }
    }
}
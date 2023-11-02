using iTextSharp.text.pdf;
using iTextSharp.text.pdf.parser;
using System.Text;

namespace ResumeParser.SDK
{
    public class PdfFileReader : FileReader
    {
        public override async Task<string> ReadContents(string filePath)
        {
            return await Task.Run(() =>
            {
                var its = new LocationTextExtractionStrategy();
                using var reader = new PdfReader(filePath);
                var text = new StringBuilder();

                for (int i = 1; i <= reader.NumberOfPages; i++)
                {
                    var page = PdfTextExtractor.GetTextFromPage(reader, i, its);
                    var lines = page.Split('\n');
                    foreach (var line in lines)
                    {
                        text.AppendLine(line);
                    }
                }
                return text.ToString();
            }).ConfigureAwait(false);
        }
    }
}
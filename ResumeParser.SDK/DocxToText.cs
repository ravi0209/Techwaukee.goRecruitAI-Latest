using ICSharpCode.SharpZipLib.Zip;
using System.Text;
using System.Xml;
using ZipFile = ICSharpCode.SharpZipLib.Zip.ZipFile;

namespace ResumeParser.SDK
{
    [Obsolete]
    public class DocxToText
    {
        private const string ContentTypeNamespace =
            @"http://schemas.openxmlformats.org/package/2006/content-types";

        private const string WordprocessingMlNamespace =
            @"http://schemas.openxmlformats.org/wordprocessingml/2006/main";

        private const string DocumentXmlXPath =
            "/t:Types/t:Override[@ContentType=\"application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml\"]";

        private const string HeaderXmlXPath =
            "/t:Types/t:Override[@ContentType=\"application/vnd.openxmlformats-officedocument.wordprocessingml.header+xml\"]";

        private const string BodyXPath = "/w:document/w:body";

        private string docxFile = "";
        private string docxFileLocation = "";
        private string headerFileLocation = "";
        private ZipFile zip;

        public DocxToText(string fileName)
        {
            docxFile = fileName;
        }

        #region ExtractText()

        ///
        /// Extracts text from the Docx file.
        ///
        /// Extracted text.
        public string ExtractText()
        {
            if (string.IsNullOrEmpty(docxFile))
                throw new Exception("Input file not specified.");

            using (zip = new ZipFile(docxFile))
            {
                var content = new StringBuilder();

                // Usually it is "/word/document.xml"
                docxFileLocation = FindXmlLocation(DocumentXmlXPath)?.FirstOrDefault();

                if (string.IsNullOrEmpty(docxFileLocation))
                    throw new Exception("It is not a valid Docx file.");

                var header = GetHeader();
                if (!string.IsNullOrEmpty(header))
                {
                    content.AppendLine(header);
                }
                content.AppendLine(ReadXmlContent(docxFileLocation));

                return content.ToString();
            }
        }

        private string? GetHeader()
        {
            var headerFileLocations = FindXmlLocation(HeaderXmlXPath);
            var headers = new List<string>();

            foreach (var headerFile in headerFileLocations)
            {
                headers.Add(ReadXmlContent(headerFile));
            }
            return headers.OrderByDescending(h => h.Length).FirstOrDefault();
        }

        #endregion ExtractText()

        #region FindXmlLocation()

        ///
        /// Gets location of the "header1.xml" or "document.xml" zip entry.
        ///
        /// Location of the "header1.xml" or "document.xml".
        private List<string> FindXmlLocation(string xPath)
        {
            foreach (ZipEntry entry in zip)
            {
                // Find "[Content_Types].xml" zip entry

                if (string.Compare(entry.Name, "[Content_Types].xml", true) == 0)
                {
                    Stream contentTypes = zip.GetInputStream(entry);

                    XmlDocument xmlDoc = new XmlDocument();
                    xmlDoc.PreserveWhitespace = true;
                    xmlDoc.Load(contentTypes);
                    contentTypes.Close();

                    //Create an XmlNamespaceManager for resolving namespaces

                    XmlNamespaceManager nsmgr =
                        new XmlNamespaceManager(xmlDoc.NameTable);
                    nsmgr.AddNamespace("t", ContentTypeNamespace);

                    // Find location of "document.xml"

                    var nodes = xmlDoc.DocumentElement.SelectNodes(
                        xPath, nsmgr);

                    if (nodes != null)
                    {
                        return nodes.OfType<XmlElement>().Select(node =>
                        {
                            string location = node.GetAttribute("PartName");
                            return location.TrimStart(new char[] { '/' });
                        }).ToList();
                    }
                    break;
                }
            }
            return null;
        }

        #endregion FindXmlLocation()

        #region ReadXmlContent()

        ///
        /// Reads "xml" zip entry.
        ///
        /// Text containing in the document/header.
        private string ReadXmlContent(string xmlFileLocation)
        {
            StringBuilder sb = new StringBuilder();

            foreach (ZipEntry entry in zip)
            {
                if (string.Compare(entry.Name, xmlFileLocation, true) == 0)
                {
                    Stream documentXml = zip.GetInputStream(entry);

                    XmlDocument xmlDoc = new XmlDocument();
                    xmlDoc.PreserveWhitespace = true;
                    xmlDoc.Load(documentXml);
                    documentXml.Close();

                    XmlNamespaceManager nsmgr =
                        new XmlNamespaceManager(xmlDoc.NameTable);
                    nsmgr.AddNamespace("w", WordprocessingMlNamespace);

                    XmlNode node = Path.GetFileName(xmlFileLocation).Contains("header") ?
                        xmlDoc.DocumentElement :
                        xmlDoc.DocumentElement.SelectSingleNode(BodyXPath, nsmgr);

                    if (node == null)
                        return string.Empty;

                    sb.Append(ReadNode(node));

                    break;
                }
            }
            return sb.ToString();
        }

        #endregion ReadXmlContent()

        #region ReadNode()

        ///
        /// Reads content of the node and its nested childs.
        ///
        /// XmlNode.
        /// Text containing in the node.
        private string ReadNode(XmlNode node)
        {
            if (node == null || node.NodeType != XmlNodeType.Element)
                return string.Empty;

            StringBuilder sb = new StringBuilder();
            foreach (XmlNode child in node.ChildNodes)
            {
                if (child.NodeType != XmlNodeType.Element) continue;

                switch (child.LocalName)
                {
                    case "t":                           // Text
                        sb.Append(child.InnerText.TrimEnd());

                        string space =
                            ((XmlElement)child).GetAttribute("xml:space");
                        if (!string.IsNullOrEmpty(space) &&
                            space == "preserve")
                            sb.Append(' ');

                        break;

                    case "cr":                          // Carriage return
                    case "br":                          // Page break
                        sb.Append(Environment.NewLine);
                        break;

                    case "tab":                         // Tab
                        sb.Append("\t");
                        break;

                    case "p":                           // Paragraph
                        sb.Append(ReadNode(child));
                        sb.Append(Environment.NewLine);
                        sb.Append(Environment.NewLine);
                        break;

                    default:
                        sb.Append(ReadNode(child));
                        break;
                }
            }
            return sb.ToString();
        }

        #endregion ReadNode()
    }
}
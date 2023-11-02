using System.Text.RegularExpressions;

namespace ResumeParser.SDK
{
    public class Extractor : IExtractor
    {
        private readonly IFileReader fileReader;
        private readonly ITrainedDataProvider trainedData;
        private const string UrlPattern = "https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)";

        private static readonly string[] PhonePatterns = new[]
        {
            @"(\+\d{1,2})?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}",
            @"/(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/g"
        };

        private const string ExtremeMatchPhonePattern = "[0-9*#+()\\s/-]{9,20}";
        private const string EmailPattern = @"[-\w\.]+@([\w-]+\.)+[\w-]{2,}";

        private static readonly string[] EducationPatterns = new[]
        {
            @"(?i)(?:Bsc|\bB\.\w+|\bM\.\w+|\bPh\.D\.\w+|\bBachelor(?:'s)?|\bMaster(?:'s)?|\bPh\.D)\s(?:\w+\s)*\w+"
        };

        // Remove commonly used non-name words which probably can come up in first few lines
        private static readonly HashSet<string> nonNameWords = new() { "Name", "Phone", "Email", "Mobile", "Cell", "Office", "Home", "Personal", "Page" };

        public Extractor(IFileReader fileReader, ITrainedDataProvider trainedData)
        {
            this.trainedData = trainedData;
            this.fileReader = fileReader;
        }

        public async Task<CandidateDetails> ExtractDetails(string filePath)
        {
            var content = await fileReader.ReadContents(filePath);
            var details = ExtractDetailsFromContent(content);
            return details;
        }

        public async Task<CandidateDetails> ExtractDetails(Stream fileStream, FileType fileType)
        {
            var content = await fileReader.ReadContents(fileStream, fileType);
            var details = ExtractDetailsFromContent(content);
            return details;
        }

        private CandidateDetails ExtractDetailsFromContent(string content)
        {
            var details = new CandidateDetails
            {
                PhoneNumbers = ExtractPhone(content),
                EmailAddresses = ExtractEmail(content),
                Education = ExtractEducation(content),
                Skillsets = ExtractSkills(content)
            };
            details.Name = ExtractName(content, details);
            return details;
        }

        private string ExtractName(string content, CandidateDetails details)
        {
            // Assuming name will appear within first few lines
            var lines = content.Split('\n', '\r').Where(line => line.Trim().Length > 2).Take(3).ToList();
            for (int i = 0; i < lines.Count; i++)
            {
                var nameSegments = new List<Tuple<string, int>>();
                var line = new string(lines[i]);

                // First few lines may have email address which can be mistaken as name. So removing them
                details.EmailAddresses.ForEach(e => line = line.Replace(e, string.Empty));

                var words = line.Split(',', '.', ' ', '\r', '\t', ';', ':');

                for (int j = 0; j < words.Length; j++)
                {
                    var word = words[j];
                    if (trainedData.Names.Contains(word, StringComparer.InvariantCultureIgnoreCase))
                    {
                        nameSegments.Add(new(word, j));

                        // Incase of names like A.B.C.Peter, recursively prepend A, B and C as initials before name
                        var k = 2;
                        var l = j;
                        while (l > 0 && IsInitial(words[l - 1]))
                        {
                            // To avoid same word being added multiple times,
                            // checking if the word in given index is already added
                            if (!nameSegments.Any(s => s.Item2 == l))
                            {
                                nameSegments.Insert(nameSegments.Count - k++, new(word, l));
                            }
                            l--;
                        }

                        // Incase of names like Peter, A B C, recursively prepend A, B and C as initials before name
                        while (words.Length - 1 > j && IsInitial(words[j + 1]))
                        {
                            // To avoid same word being added multiple times,
                            // checking if the word in given index is already added
                            if (!nameSegments.Any(s => s.Item2 == j))
                            {
                                nameSegments.Add(new(words[j + 1], j + 1));
                            }
                            j++;
                        }
                    }
                }
                if (nameSegments.Any())
                {
                    var name = string.Join(" ", nameSegments.Select(s => s.Item1)).Trim();

                    foreach (var word in nonNameWords)
                    {
                        name = name.Replace(word, string.Empty, StringComparison.InvariantCultureIgnoreCase);
                    }
                    if (name.Trim().Where(ch => char.IsLetter(ch)).Count() >= 3) return name;
                }
            }

            var nameApprox = string.Empty;
            var lineNo = 0;
            do
            {
                // If name not found in database, assume name will be in first 3 words
                // if length is less than 100 characters after removing phone and email
                var firstLn = lines.Where(l => l.Trim().Length > 2).ElementAtOrDefault(lineNo);
                if (string.IsNullOrEmpty(firstLn)) return string.Empty;

                details.EmailAddresses.ForEach(e => firstLn = firstLn.Replace(e, string.Empty));
                details.PhoneNumbers.ForEach(e => firstLn = firstLn.Replace(e, string.Empty));
                firstLn = Regex.Replace(firstLn, UrlPattern, string.Empty, RegexOptions.IgnoreCase);
                var nameSegmentsApprox = firstLn.Split(' ', '.', ',', '\r')
                    .Where(n => !nonNameWords.Contains(n, StringComparer.InvariantCultureIgnoreCase))
                    .Take(3).ToArray();
                nameApprox = string.Join(' ', nameSegmentsApprox).Trim();
                lineNo++;
            } while (!IsValidName(nameApprox));
            return nameApprox;
        }

        private static bool IsValidName(string nameApprox)
        {
            return nameApprox.Length > 0 && nameApprox.Length < 100 && nameApprox.All(ch => char.IsLetter(ch));
        }

        private static bool IsInitial(string word)
        {
            return word.Length >= 1 && word.Length <= 2
                && !string.Equals(word, "Ph", StringComparison.InvariantCultureIgnoreCase)
                && !string.Equals(word, "Mob", StringComparison.InvariantCultureIgnoreCase)
                && !string.Equals(word, "Fax", StringComparison.InvariantCultureIgnoreCase)
                && word.All(ch => char.IsLetter(ch));
        }

        private static List<string> ExtractPhone(string content)
        {
            var phones = PhonePatterns.SelectMany(pattern => Regex.Matches(content, pattern))
                .Select(m => m.Value.Trim())
                .Distinct()
                .ToList();
            if (!phones.Any())
            {
                phones = Regex.Matches(content, ExtremeMatchPhonePattern)
                    .Select(m => m.Value.Trim())
                    .Where(m => m.Where(ch => char.IsDigit(ch)).Count() >= 9)
                    .Distinct()
                    .ToList();
            }
            return phones;
        }

        private static List<string> ExtractEmail(string content) => Regex.Matches(content, EmailPattern)
                            .Select(m => m.Value.Trim())
                            .Distinct()
                            .ToList();

        private static List<string> ExtractEducation(string content) =>
                            EducationPatterns.SelectMany(pattern => Regex.Matches(content, pattern))
                            .Select(m => m.Value.Trim())
                            .Distinct()
                            .ToList();

        private List<Skillset> ExtractSkills(string content)
        {
            var contentClone = new string(content);
            var matchingSkills = new List<string>();
            var skillsets = new List<Skillset>();
            var allSkills = trainedData.Skills;
            foreach (var skill in allSkills)
            {
                if (contentClone.Contains(skill)) matchingSkills.Add(skill);
            }
            foreach (var skill in matchingSkills.OrderByDescending(s => s.Length))
            {
                skillsets.Add(new Skillset
                {
                    Skill = skill,
                    Occurences = CountOccurences(contentClone, skill)
                });
                contentClone = contentClone.Replace(skill, "<SKILL>", StringComparison.InvariantCultureIgnoreCase);
            }
            var skills = skillsets
                .Where(s => s.Occurences > 0)
                .OrderByDescending(s => s.Occurences)
                .ToList();
            FindWeightage(skills);
            return skills;
        }

        private static void FindWeightage(List<Skillset> skills)
        {
            var totalOccurences = (float)skills.Sum(s => s.Occurences);
            skills.ForEach(s => s.Weightage = s.Occurences / totalOccurences * 100f);
        }

        private static int CountOccurences(string text, string value)
        {
            int count = 0, minIndex = text.IndexOf(value, 0);
            var splChars = new HashSet<char> { '!', '@', '#', '$', '%', '^', '&', '*', '_', '+', '=', '|', '<', '>' };
            while (minIndex != -1)
            {
                minIndex = text.IndexOf(value, minIndex + value.Length);
                // Checking if the given value is a substring within some same word.
                // For eg. C will be substring in Pascal and SSL will be subsgtring in SSLC
                var chBefore = text.ElementAtOrDefault(minIndex - 1);
                var chAfter = text.ElementAtOrDefault(minIndex + value.Length);

                if (!char.IsLetter(chBefore) &&
                    !char.IsLetter(chAfter) &&
                    !splChars.Contains(chBefore) &&
                    !splChars.Contains(chAfter))
                    count++;
            }
            return count;
        }
    }
}
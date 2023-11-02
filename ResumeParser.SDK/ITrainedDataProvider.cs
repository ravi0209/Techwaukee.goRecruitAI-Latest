namespace ResumeParser.SDK
{
    public interface ITrainedDataProvider
    {
        HashSet<string> Names { get; }
        HashSet<string> Skills { get; }
    }
}
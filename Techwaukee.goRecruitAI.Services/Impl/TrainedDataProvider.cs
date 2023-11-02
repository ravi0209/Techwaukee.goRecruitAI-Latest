using ResumeParser.SDK;

namespace Techwaukee.goRecruitAI.Services.Impl
{
    public class TrainedDataProvider : ITrainedDataProvider
    {
        private static HashSet<string>? _names = null;
        private static HashSet<string>? _skills = null;
        private readonly IResumeService resumeService;

        public TrainedDataProvider(IResumeService resumeService)
        {
            //_names ??= new HashSet<string>(resumeService.GetTrainedNames().ConfigureAwait(false).GetAwaiter().GetResult().Select(n => n.Name));
            //_skills ??= new HashSet<string>(resumeService.GetTrainedSkills().ConfigureAwait(false).GetAwaiter().GetResult().Select(n => n.Skill));
            this.resumeService = resumeService;
        }

        public HashSet<string> Names { get => _names ?? GetNames(); }

        public HashSet<string> Skills { get => _skills ?? GetSkills(); }

        private HashSet<string> GetNames()
        {
            _names ??= new HashSet<string>(resumeService.GetTrainedNames().ConfigureAwait(false).GetAwaiter().GetResult().Select(n => n.Name));
            return _names;
        }

        private HashSet<string> GetSkills()
        {
            _skills ??= new HashSet<string>(resumeService.GetTrainedSkills().ConfigureAwait(false).GetAwaiter().GetResult().Select(n => n.Skill));
            return _skills;
        }
    }
}

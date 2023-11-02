namespace Techwaukee.goRecruitAI.ViewModels
{
    public class UserLogin
    {
        public string? EmailId { get; set; }
        public string? Password { get; set; }
        public string? OTP { get; set; }
        public bool RememberMe { get; set; }
    }

    public class OtpResponse
    {
        public string? Status { get; set; }
        public string? OTP { get; set; }
    }
}
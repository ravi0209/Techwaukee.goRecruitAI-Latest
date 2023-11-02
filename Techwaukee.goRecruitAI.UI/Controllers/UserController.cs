using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using Techwaukee.goRecruitAI.Services;
using Techwaukee.goRecruitAI.Common;
using Techwaukee.goRecruitAI.ViewModels;

namespace Techwaukee.goRecruitAI.UI.Controllers
{
    public class UserController : Controller
    {
        private readonly IUserService _userService;
        private ITokenService _tokenService;
        private ILogger<UserController> _logger;

        public UserController(IUserService userService, ITokenService tokenService, ILogger<UserController> logger)
        {
            _userService = userService;
            _tokenService = tokenService;
            _logger = logger;
        }

        [HttpGet]
        public IActionResult Login()
        {
            return View(new UserLogin());
        }

        [HttpGet]
        public IActionResult Verification()
        {
            try
            {
                var objUserData = JsonSerializer.Deserialize<UserLogin>(HttpContext.Session.GetString("UserData"));
                ViewBag.UserEmail = objUserData.EmailId;
                ViewBag.OTP = objUserData.OTP;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return View();
        }

        [HttpGet]
        public async Task<IActionResult> OtpVerification(string otp)
        {
            try
            {
                UserLogin objUserData = new UserLogin();
                if (!string.IsNullOrEmpty(otp))
                {
                    string myToken = string.Empty;
                    if (!string.IsNullOrEmpty(HttpContext.Session.GetString("UserData")))
                    {
                        objUserData = JsonSerializer.Deserialize<UserLogin>(HttpContext.Session.GetString("UserData"));

                        if (objUserData != null && objUserData.OTP == otp)
                        {
                            myToken = await _tokenService.GetToken(objUserData.EmailId, objUserData.Password);
                            HttpContext.Session.SetString("MyToken", myToken);
                            return Json(new { status = "Success", message = myToken });
                        }
                        else
                        {
                            return Json(new { status = "Failed", message = "Invalid or Expired OTP." });
                        }
                    }
                    else
                    {
                        return Json(new { status = "Failed", message = "Invalid or Expired OTP." });
                    }
                }
                else
                {
                    return Json(new { status = "Failed", message = "OTP, Must be entered." });
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return Json(new { status = "Failed", message = ex.Message });
            }
        }

        [HttpPost]
        public async Task<IActionResult> Login(UserLogin user)
        {
            _logger.LogInformation($"Called : Login with {user.EmailId}");
            //throw new NotFoundException("Requested resource not found.");
            string otp = String.Empty;
            try
            {
                if (user != null && !string.IsNullOrEmpty(user.EmailId) && !string.IsNullOrEmpty(user.Password))
                {
                    var pwd = MyUtilities.Encrypt(user.Password);

                    var userDetail = await _userService.GetUserDetails(user.EmailId, pwd);

                    HttpContext.Session.SetString("UserDetails", JsonSerializer.Serialize<UserDetail>(userDetail).ToString());

                    if (userDetail != null)
                    {
                        OtpResponse objRes = new OtpResponse();
                        otp = MyUtilities.GenerateOTP(6);

                        //Get Email Templates
                        string emailHtml = MyUtilities.GetEmailTemplate("OTPVerify");

                        //Replace with dynamic contents.

                        emailHtml = emailHtml.Replace("{UserName}", userDetail.Firstname).Replace("{OTP}", otp);

                        var userdata = JsonSerializer.Serialize(new UserLogin { EmailId = user.EmailId, Password = MyUtilities.Encrypt(user.Password), OTP = otp });

                        HttpContext.Session.SetString("UserData", userdata);

                        if (MyUtilities.SendEmail(user.EmailId, "OTP Verification", emailHtml))
                        //if (MyUtilities.SendEmail("tamilarasi.s@techwaukee.com", "OTP Verification", emailHtml))
                        {
                            //var userdata = JsonSerializer.Serialize(new UserLogin { EmailId = user.EmailId, Password = MyUtilities.Encrypt(user.Password), OTP = otp });

                            //HttpContext.Session.SetString("UserData", userdata);

                            return Json(new { status = "Success", message = "OTP Sent your Email.", otpCode = otp });
                        }
                        else
                        {
                            return Json(new { status = "Failed", message = "Invalid User Email and Password." });
                        }
                    }
                    else
                    {
                        return Json(new { status = "Failed", message = "Invalid User Email and Password." });
                    }
                }
                else
                {
                    return Json(new { status = "Failed", message = "Invalid User Email and Password." });
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return Json(new { status = "Success", message = ex.Message, otpCode = otp });
            }
        }

        public IActionResult ForgotPassword()
        {
            return View();
        }

        [HttpGet]
        public async Task<IActionResult> VerifyUserAndSendResetLink(string EmailId)
        {
            try
            {
                if (string.IsNullOrEmpty(EmailId))
                {
                    return Json(new { status = "Failed", message = "EmailId is must be entered!" });
                }
                else
                {
                    var userEmailId = await _userService.GetVerifyUserAndSendResetPasswordLink(EmailId);

                    if (userEmailId)
                    {
                        return Json(new { status = "Success", message = "Password reset link to your EmailId." });
                    }
                    else
                    {
                        return Json(new { status = "Failed", message = "Invalid EmailId, Please check your EmailId." });
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return Json(new { status = "Failed", message = "Invalid EmailId, Please check your EmailId." });
            }
        }

        public IActionResult ResetPassword()
        {
            return View();
        }
    }
}
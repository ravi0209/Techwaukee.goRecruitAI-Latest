using Microsoft.EntityFrameworkCore;
using Techwaukee.goRecruitAI.Data;
using Techwaukee.goRecruitAI.Models;
using Techwaukee.goRecruitAI.Services;
using Techwaukee.goRecruitAI.Common;
using Techwaukee.goRecruitAI.ViewModels;

namespace Techwaukee.goRecruitAI.Repository
{
    public class UserRepository : IUserService
    {
        private RecruitContext _context;

        public UserRepository(RecruitContext context)
        {
            this._context = context;
        }

        public async Task<UserDetail> GetUserDetails(string emailId, string password)
        {
            try
            {
                var pwd = MyUtilities.MakeItDirtyAgain(password);
                var userDetail = await _context.Userprofilecreations
                                    .Where(wh => wh.Emailid == emailId && wh.Accountpassword == pwd)
                                    .Select(sel => new UserDetail
                                    {
                                        Emailid = sel.Emailid,
                                        Accountusername = sel.Accountusername,
                                        Designation = sel.Designation,
                                        Dob = sel.Dob,
                                        Firstname = sel.Firstname,
                                        Gender = sel.Gender,
                                        Initials = sel.Initials,
                                        Lastname = sel.Lastname,
                                        Phoneno = sel.Phoneno,
                                        Profileimage = sel.Profileimage,
                                        Reportingmanager = sel.Reportingmanager,
                                        ReportingTl = sel.ReportingTl,
                                        Role = sel.Role,
                                        Status = sel.Status,
                                        TweId = sel.TweId,
                                        Userid = sel.Userid
                                    }).FirstOrDefaultAsync();
                return userDetail;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> GetVerifyUserAndSendResetPasswordLink(string emailId)
        {
            try
            {
                var userDetail = await _context.Userprofilecreations
                               .Where(wh => wh.Emailid == emailId)
                               .Select(sel => new UserDetail
                               {
                                   Emailid = sel.Emailid,
                                   TweId = sel.TweId,
                                   Userid = sel.Userid
                               }).FirstOrDefaultAsync();

                if (userDetail != null)
                {
                    var htmlTemplate = MyUtilities.GetEmailTemplate("ResetPasswordLink");

                    htmlTemplate.Replace("{ResetURL}", "/User/ResetPassword");

                    if (MyUtilities.SendEmail("tamilarasi.s@techwaukee.com", "Reset Password", htmlTemplate))
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IEnumerable<Userprofilecreation>> GetAllUsers()
        {
            try
            {
                IEnumerable<Userprofilecreation> userDetails = new List<Userprofilecreation>();
                userDetails = await _context.Userprofilecreations.ToListAsync();
                return userDetails;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
using Itenso.TimePeriod;
using iText.Html2pdf;
using iText.IO.Source;
using iText.Kernel.Geom;
using iText.Kernel.Pdf;
using System.Globalization;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using static Techwaukee.goRecruitAI.Common.MyEnums;
using Aes = System.Security.Cryptography.Aes;

namespace Techwaukee.goRecruitAI.Common
{
    public static class MyUtilities
    {
        //for Email
        private static bool mailSent = false;

        //for OTP generation
        private static string[] sAllowedCharacters = { "1", "2", "3", "4", "5", "6", "7", "8", "9", "0" };

        public static ByteArrayOutputStream SaveReportAsByteArrayOutputStream(string htmlContent)
        {
            using (MemoryStream stream = new MemoryStream(Encoding.ASCII.GetBytes(htmlContent.ToString())))
            {
                ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
                PdfWriter writer = new PdfWriter(byteArrayOutputStream);
                PdfDocument pdfDocument = new PdfDocument(writer);
                pdfDocument.SetDefaultPageSize(PageSize.A4);
                HtmlConverter.ConvertToPdf(stream, pdfDocument);
                pdfDocument.Close();
                return byteArrayOutputStream;
            }
        }

        public static void PrintReportAsPDF(string htmlContent, string fileName, bool hasHeaderFooter, bool hasPageNumber)
        {
        }

        public static void ExportReportAsPDF(string htmlContent, string fileName, bool hasHeaderFooter = false, bool hasPageNumber = false)
        {
        }

        public static DateTime StartOfNthWeekOfYear(int year, int weekNumber, DayOfWeek firstDayOfWeek)
        {
            if (weekNumber < 1)
            {
                throw new ArgumentOutOfRangeException(nameof(weekNumber));
            }
            DateTime startOfWeek = StartOfFirstWeekOfYear(year, firstDayOfWeek).AddDays((weekNumber - 1) * 7);
            DateTime endOfWeek = startOfWeek.AddDays(6);
            if (endOfWeek.Year != year || startOfWeek.Year != year)
            {
                throw new ArgumentOutOfRangeException(nameof(weekNumber));
            }
            return startOfWeek;
        }

        public static DateTime StartOfFirstWeekOfYear(int year, DayOfWeek firstDayOfWeek)
        {
            DateTime startOfYear = new DateTime(year, 1, 1);
            if (startOfYear.DayOfWeek != firstDayOfWeek)
            {
                return StartOfWeek(startOfYear, firstDayOfWeek).AddDays(7);
            }
            return startOfYear;
        }

        //public static DateTime? FindLastFifthMonday(int year, int month, DayOfWeek dayOfWeek, int weekOfMonth = 5)
        //{
        //    var baseDate = new DateTime(year, month, 1);
        //    int firstDateOffset = ((int)dayOfWeek - (int)baseDate.DayOfWeek + 7) % 7;
        //    var date = baseDate.AddDays(firstDateOffset + 7 * (weekOfMonth - 1));
        //    //return date.Month == month ? date : (DateTime?)null;

        //    return date.AddDays(-28).Date;
        //}

        public static DateTime StartOfWeek(DateTime value, DayOfWeek firstDayOfWeek)
        {
            if (value.DayOfWeek != firstDayOfWeek)
            {
                return value.AddDays(-((7 + (int)value.DayOfWeek - (int)firstDayOfWeek) % 7));
            }
            return value;
        }

        public static List<DateTime> GetDateRange(DateRange dateRange, DateTime dateToCheck)
        {
            List<DateTime> lstDateTime = new List<DateTime>();
            DateTime dateRangeBegin = dateToCheck;
            TimeSpan duration = new TimeSpan(0, 0, 0, 0); //One day
            DateTime dateRangeEnd = DateTime.Today.Add(duration);

            switch (dateRange)
            {
                case DateRange.Daily:
                    dateRangeBegin = dateToCheck;
                    dateRangeEnd = dateRangeBegin;
                    break;

                case DateRange.Weekly:
                    dateRangeBegin = dateToCheck.AddDays(-(int)dateToCheck.DayOfWeek);
                    dateRangeEnd = dateToCheck.AddDays(6 - (int)dateToCheck.DayOfWeek);
                    break;

                case DateRange.Monthly:
                    duration = new TimeSpan(DateTime.DaysInMonth(dateToCheck.Year, dateToCheck.Month) - 1, 0, 0, 0);
                    dateRangeBegin = dateToCheck.AddDays((-1) * dateToCheck.Day + 1);
                    dateRangeEnd = dateRangeBegin.Add(duration);
                    break;

                case DateRange.Quarterly:
                    int currentQuater = (dateToCheck.Date.Month - 1) / 3 + 1;
                    int daysInLastMonthOfQuarter = DateTime.DaysInMonth(dateToCheck.Year, 3 * currentQuater);
                    dateRangeBegin = new DateTime(dateToCheck.Year, 3 * currentQuater - 2, 1);
                    dateRangeEnd = new DateTime(dateToCheck.Year, 3 * currentQuater, daysInLastMonthOfQuarter);
                    break;

                case DateRange.Annually:
                    dateRangeBegin = new DateTime(dateToCheck.Year, 1, 1);
                    dateRangeEnd = new DateTime(dateToCheck.Year, 12, 31);
                    break;
            }
            lstDateTime.Add(dateRangeBegin.Date);
            lstDateTime.Add(dateRangeEnd.Date);
            return lstDateTime;
        }

        public static DateRanges GetDateRange(DateTime baseDate)
        {
            var today = baseDate;
            var yesterday = baseDate.AddDays(-1);
            var thisWeekStart = baseDate.AddDays(-(int)baseDate.DayOfWeek);
            var thisWeekEnd = thisWeekStart.AddDays(7).AddSeconds(-1);
            var lastWeekStart = thisWeekStart.AddDays(-7);
            var lastWeekEnd = thisWeekStart.AddSeconds(-1);
            var thisMonthStart = baseDate.AddDays(1 - baseDate.Day);
            var thisMonthEnd = thisMonthStart.AddMonths(1).AddDays(-1);
            var lastMonthStart = thisMonthStart.AddMonths(-1);
            var lastMonthEnd = thisMonthStart.AddSeconds(-1);

            return new DateRanges
            {
                Today = today,
                Yesterday = yesterday,
                ThisWeekStart = thisWeekStart,
                ThisWeekEnd = thisWeekEnd,
                LastWeekStart = lastWeekStart,
                LastWeekEnd = lastWeekEnd,
                ThisMonthStart = thisMonthStart,
                ThisMonthEnd = thisMonthEnd,
                LastMonthStart = lastMonthStart,
                LastMonthEnd = lastMonthEnd,
            };
        }

        public static int CurrentWeek(this DateTime date)
        {
            //var day = (int)CultureInfo.CurrentCulture.Calendar.GetDayOfWeek(date);
            //return CultureInfo.CurrentCulture.Calendar.GetWeekOfYear(date.AddDays(4 - (day == 0 ? 7 : day)), CalendarWeekRule.FirstDay, DayOfWeek.Monday);

            // Seriously cheat.  If its Monday, Tuesday or Wednesday, then it'll
            // be the same week# as whatever Thursday, Friday or Saturday are,
            // and we always get those right
            DayOfWeek day = CultureInfo.InvariantCulture.Calendar.GetDayOfWeek(date);
            if (day >= DayOfWeek.Monday && day <= DayOfWeek.Wednesday)
            {
                date = date.AddDays(3);
            }

            // Return the week of our adjusted day
            return CultureInfo.InvariantCulture.Calendar.GetWeekOfYear(date, CalendarWeekRule.FirstFourDayWeek, DayOfWeek.Monday);
        }

        public static string GetWeeKPeriod(DateTime date)
        {
            string WeekDateRange = string.Empty;
            var week = new Week(FirstDayOfWeek(date));
            WeekDateRange = (week.FirstDayOfWeek.Day + 1).ToString() + "-" + (week.LastDayOfWeek.Day - 1).ToString() + " week";
            return WeekDateRange;
        }

        public static List<string> GetDayAndMonthNameOfWeekdays(DateTime date)
        {
            List<string> objDays = new List<string>();
            string DateAndMonthName = string.Empty;
            var week = new Week(FirstDayOfWeek(date));

            for (int i = 1; i <= 5; i++)
            {
                objDays.Add((week.FirstDayOfWeek.Date.AddDays(i).Day).ToString() + " " + week.FirstDayOfWeek.Date.AddDays(i).ToString("MMM"));
            }

            return objDays;
        }

        public static string GetDayAndMotntNameOfWeekday(DateTime date)
        {
            string DateAndMonthName = string.Empty;
            //var week = new Week(FirstDayOfWeek(date));
            DateAndMonthName = (date.Day).ToString() + " " + date.ToString("MMM");
            return DateAndMonthName;
        }

        public static List<DateTime> GetCurrentWeekDates(DateTime date)
        {
            List<DateTime> lstDate = new List<DateTime>();
            var week = new Week(FirstDayOfWeek(date));

            lstDate.Add(week.FirstDayOfWeek.Date.AddDays(1));
            lstDate.Add(week.LastDayOfWeek.Date.AddDays(-1));

            return lstDate;
        }

        //public static IEnumerable<(string Month, int Year)> GetMonthsBetween(DateTime startDate, DateTime endDate)
        //{
        //    DateTime iterator;
        //    DateTime limit;

        //    if (endDate > startDate)
        //    {
        //        iterator = new DateTime(startDate.Year, startDate.Month, 1);
        //        limit = endDate;
        //    }
        //    else
        //    {
        //        iterator = new DateTime(endDate.Year, endDate.Month, 1);
        //        limit = startDate;
        //    }

        //    var dateTimeFormat = CultureInfo.CurrentCulture.DateTimeFormat;
        //    while (iterator <= limit)
        //    {
        //        yield return (
        //            dateTimeFormat.GetMonthName(iterator.Month),
        //            iterator.Year
        //        );

        //        iterator = iterator.AddMonths(1);
        //    }
        //}

        public static IEnumerable<(int Month, int Year)> GetMonthsBetween(DateTime startDate, DateTime endDate)
        {
            DateTime iterator;
            DateTime limit;

            if (endDate > startDate)
            {
                iterator = new DateTime(startDate.Year, startDate.Month, 1);
                limit = endDate;
            }
            else
            {
                iterator = new DateTime(endDate.Year, endDate.Month, 1);
                limit = startDate;
            }

            var dateTimeFormat = CultureInfo.CurrentCulture.DateTimeFormat;
            while (iterator <= limit)
            {
                yield return (
                    iterator.Month,
                    iterator.Year
                );

                iterator = iterator.AddMonths(1);
            }
        }

        public static List<string> GetAllWeekRangesOfMonth(int year, int month)
        {
            List<string> lstGetWeeKPeriod = new List<string>();
            var mondays = AllDatesInMonth(year, month).Where(i => i.DayOfWeek == DayOfWeek.Monday);
            //AllDatesInMonth(2017, 7).Where(i => i.DayOfWeek == DayOfWeek.Monday);

            foreach (var item in mondays)
            {
                lstGetWeeKPeriod.Add(GetWeeKPeriod(item));
            }

            return lstGetWeeKPeriod;
        }

        public static List<string> GetAllWeekRangesOfGivenDateRange(DateTime fromDate, DateTime toDate)
        {
            List<string> lstGetWeeKPeriod = new List<string>();

            var dates = new List<DateTime>();

            for (var dt = fromDate; dt <= toDate; dt = dt.AddDays(1))
            {
                dates.Add(dt);
            }

            var mondays = dates.Where(i => i.DayOfWeek == DayOfWeek.Monday);

            foreach (var item in mondays)
            {
                lstGetWeeKPeriod.Add(GetWeeKPeriod(item));
            }

            return lstGetWeeKPeriod;
        }

        public static string GetMonthName(int month)
        {
            var nameOfTheMonth = (MonthName)month;
            return nameOfTheMonth.ToString();
        }

        public static IEnumerable<DateTime> AllDatesInMonth(int year, int month)
        {
            int days = DateTime.DaysInMonth(year, month);
            for (int day = 1; day <= days; day++)
            {
                yield return new DateTime(year, month, day);
            }
        }

        public static DateTime FirstDayOfWeek(DateTime date)
        {
            DayOfWeek fdow = CultureInfo.CurrentCulture.DateTimeFormat.FirstDayOfWeek;
            int offset = fdow - date.DayOfWeek;
            DateTime fdowDate = date.AddDays(offset);
            return fdowDate;
        }

        public static DateTime LastDayOfWeek(DateTime date)
        {
            DateTime ldowDate = FirstDayOfWeek(date).AddDays(6);
            return ldowDate;
        }

        //public static DateTime FirstDateOfWeek(int year, int weekNum, CalendarWeekRule rule)
        //{
        //    DateTime jan1 = new DateTime(year, 1, 1);

        //    int daysOffset = DayOfWeek.Monday - jan1.DayOfWeek;
        //    DateTime firstMonday = jan1.AddDays(daysOffset);

        //    var cal = CultureInfo.CurrentCulture.Calendar;
        //    int firstWeek = cal.GetWeekOfYear(firstMonday, rule, DayOfWeek.Monday);

        //    if (firstWeek <= 1)
        //    {
        //        weekNum -= 1;
        //    }

        //    DateTime result = firstMonday.AddDays(weekNum * 7);

        //    return result;
        //}

        public static string GenerateOTP(int iOTPLength = 6)
        {
            string sOTP = String.Empty;

            string sTempChars = String.Empty;

            Random rand = new Random();

            for (int i = 0; i < iOTPLength; i++)
            {
                int p = rand.Next(0, sAllowedCharacters.Length);

                sTempChars = sAllowedCharacters[rand.Next(0, sAllowedCharacters.Length)];

                sOTP += sTempChars;
            }

            return sOTP;
        }

        //private static void SendCompletedCallback(object sender, AsyncCompletedEventArgs e)
        //{
        //    // Get the unique identifier for this asynchronous operation.
        //    String token = (string)e.UserState;

        //    if (e.Cancelled)
        //    {
        //        Console.WriteLine("[{0}] Send canceled.", token);
        //    }
        //    if (e.Error != null)
        //    {
        //        Console.WriteLine("[{0}] {1}", token, e.Error.ToString());
        //    }
        //    else
        //    {
        //        Console.WriteLine("Message sent.");
        //    }
        //    mailSent = true;
        //}

        public static bool SendEmail(string toEmailIds, string subject, string mailBody, bool isBodyHTML = true, string ccEmailIds = "", string bccEmailIds = "")
        {
            //try
            //{
            // Command-line argument must be the SMTP host.
            //SmtpClient client = new SmtpClient("relay-hosting.secureserver.net");

            //client.Port = 587;
            //client.EnableSsl = true;
            //client.DeliveryMethod = SmtpDeliveryMethod.Network;
            //client.UseDefaultCredentials = false;
            //client.Credentials = new System.Net.NetworkCredential("admin@gorecruitai.com", "Techwaukee@2016");

            //// Specify the email sender.
            //// Create a mailing address that includes a UTF8 character
            //// in the display name.
            //MailAddress emailFrom = new MailAddress("admin@gorecruitai.com"); //"tamilarasi.s@techwaukee.com"

            SmtpClient client = new SmtpClient("relay-hosting.secureserver.net", 465);

            //client.Port = 25;
            //client.Port = 21;
            client.EnableSsl = true;
            //client.EnableSsl = false;
            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            client.UseDefaultCredentials = false;
            client.Credentials = new System.Net.NetworkCredential("admin@techwaukee.co.in", "Techwaukee@2016");

            // Specify the email sender.
            // Create a mailing address that includes a UTF8 character
            // in the display name.
            MailAddress emailFrom = new MailAddress("admin@techwaukee.co.in"); //"tamilarasi.s@techwaukee.com"

            //// Command-line argument must be the SMTP host.
            //SmtpClient client = new SmtpClient();
            //client.DeliveryMethod = SmtpDeliveryMethod.Network;
            //client.Host = "smtp.zoho.com";
            //client.Port = 587;
            //client.EnableSsl = true;
            //client.UseDefaultCredentials = false;
            //client.Credentials = new System.Net.NetworkCredential("tamilarasi.s@techwaukee.com", "Techwaukee@2016");

            //// Specify the email sender.
            //// Create a mailing address that includes a UTF8 character
            //// in the display name.
            //MailAddress emailFrom = new MailAddress("tamilarasi.s@techwaukee.com"); //"tamilarasi.s@techwaukee.com"

            // Specify the message content.
            MailMessage message = new MailMessage();

            message.From = emailFrom;

            // Set destinations for the email message. (TO)
            foreach (var emailId in toEmailIds.Split(','))
            {
                message.To.Add(emailId);
            }
            // Set destinations for the email message. (CC)
            if (!string.IsNullOrEmpty(ccEmailIds))
            {
                foreach (var emailId in ccEmailIds.Split(','))
                {
                    message.CC.Add(emailId);
                }
            }

            // Set destinations for the email message. (BCC)
            if (!string.IsNullOrEmpty(bccEmailIds))
            {
                foreach (var emailId in bccEmailIds.Split(','))
                {
                    message.Bcc.Add(emailId);
                }
            }

            message.IsBodyHtml = true;
            message.Body = mailBody;
            // Include some non-ASCII characters in body and subject.
            string someArrows = new string(new char[] { '\u2190', '\u2191', '\u2192', '\u2193' });
            message.Body += Environment.NewLine + someArrows;
            message.BodyEncoding = System.Text.Encoding.UTF8;
            message.Subject = subject;
            message.SubjectEncoding = System.Text.Encoding.UTF8;

            // Set the method that is called back when the send operation ends.
            //client.SendCompleted += new
            //SendCompletedEventHandler(SendCompletedCallback);
            // The userState can be any object that allows your callback
            // method to identify this send operation.
            // For this example, the userToken is a string constant.
            string userState = "test message1";
            client.Send(message);

            // If the user canceled the send, and mail hasn't been sent yet,
            // then cancel the pending operation.
            //if (answer.StartsWith("c") && mailSent == false)
            //{
            //    client.SendAsyncCancel();
            //}
            // Clean up.

            message.Dispose();

            return true;
            //}
            //catch (Exception ex)
            //{
            //    return true;
            //}
        }

        public static string GetEmailTemplate(string templateName)
        {
            string emailContent = string.Empty;

            if (templateName == "OTPVerify")
            {
                emailContent = @"<div data-zbluepencil-ignore=""true"" class=""zmail_extra"">
    <blockquote style=""margin: 0px;"" id=""blockquote_zmail"">
        <div>
            <div style=""font-family :  Verdana,  Arial,  Helvetica,  sans-serif; font-size :  10pt;"">
                <div>
                    <div>
                        <a target=""_blank"" href=""http://www.zoho.com/"" style=""display :  inline-block;"">
                            <img src=""https://zmdownload.zoho.com/zm/ImageDisplay?na=2869793000000008002&amp;nmsgId=1695299287448110001&amp;f=1.png&amp;mode=inline&amp;cid=0.28869226610.5062181190122621898.18ab23d8e7e__inline__img__src&amp;"" width=""150"" height=""49"" style=""cursor :  pointer;"">
                        </a>
                        <br>
                    </div>
                    <table width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0"" style=""color :  rgb(0, 0, 0); font-style :  normal; font-weight :  400; letter-spacing :  normal; orphans :  2; text-transform :  none; widows :  2; word-spacing :  0px; white-space :  normal; font-family :  &quot;Lato 2&quot;,  system-ui,  -apple-system,  &quot;Segoe UI&quot;,  Roboto,  Ubuntu,  Cantarell,  &quot;Noto Sans&quot;,  sans-serif; font-size :  14px; background-color :  rgb(255, 255, 255);"">
                        <tbody>
                            <tr>
                                <td>
                                    <table width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0"" style=""height :  459.797px;"">
                                        <tbody>
                                            <tr>
                                                <td style=""padding :  8px 0px 0px 12px; font-size :  24px; line-height :  48px; font-family :  &quot;Open Sans&quot;,  &quot;Trebuchet MS&quot;,  sans-serif;"">
                                                    <b>
                                                        <a rel=""nofollow"" href=""https://mail.zoho.com/zm/#"" target=""_blank"" style=""text-decoration :  none; cursor :  default; color :  rgb(34, 34, 34);"">
                                                            Hi {UserName}!
                                                        </a>
                                                    </b>
                                                    <br>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style=""padding :  20px 0px 0px 12px; font-size :  14px; line-height :  24px; font-family :  &quot;Open Sans&quot;,  &quot;Trebuchet MS&quot;,  sans-serif;"">
                                                    <div>
                                                        Use the following one-time password (OTP) to sign in to your GOrecruitAI account.
                                                        <br>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style=""padding :  20px 0px 0px 12px; font-size :  22px; line-height :  24px; font-family :  &quot;Open Sans&quot;,  &quot;Trebuchet MS&quot;,  sans-serif;"">
                                                    <b>
                                                        {OTP}
                                                    </b>
                                                    <br>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style=""padding :  20px 0px 0px 12px; font-size :  14px; line-height :  24px; font-family :  &quot;Open Sans&quot;,  &quot;Trebuchet MS&quot;,  sans-serif;"">
                                                    If you didn't initiate this action or if you think you received this email by mistake, please contact
                                                    <span>
                                                        <span>
                                                            &nbsp;
                                                        </span>
                                                    </span>
                                                    <a target=""_blank"" href=""mailto:support@zohoaccounts.com"" style=""color :  rgb(38, 150, 235); text-decoration :  none;"">
                                                        support@gorecruitai.com.
                                                    </a>
                                                    <br>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style=""padding :  20px 0px 0px 12px; font-size :  14px; line-height :  24px; font-family :  &quot;Open Sans&quot;,  &quot;Trebuchet MS&quot;,  sans-serif;"">
                                                    Regards,
                                                    <br>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style=""padding :  0px 0px 0px 12px; font-size :  14px; line-height :  24px; font-family :  &quot;Open Sans&quot;,  &quot;Trebuchet MS&quot;,  sans-serif;"">
                                                    <b>
                                                        GOrecruitAI Team
                                                    </b>
                                                    <br>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style=""padding :  0px 0px 0px 12px; font-size :  14px; line-height :  24px; font-family :  &quot;Open Sans&quot;,  &quot;Trebuchet MS&quot;,  sans-serif;"">
                                                    <div>
                                                        <a target=""_blank"" href=""http://www.zoho.com/"" style=""color :  rgb(38, 150, 235); text-decoration :  none;"">
                                                            www.gorecruitai.com
                                                        </a>
                                                        <br>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style=""padding :  0px 0px 0px 12px;"">
                                                    <div style=""border-bottom :  3px solid rgb(55, 149, 244);"">
                                                        <img src=""https://zmdownload.zoho.com/zm/ImageDisplay?na=2869793000000008002&amp;nmsgId=1695299287448110001&amp;f=2.png&amp;mode=inline&amp;cid=1.28869226610.6527195597331402485.18ab23d8e7f__inline__img__src&amp;"" width=""734"" height=""115"" style=""cursor :  pointer;"">
                                                        <br>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table style=""color :  rgb(0, 0, 0); font-style :  normal; font-weight :  400; letter-spacing :  normal; orphans :  2; text-transform :  none; widows :  2; word-spacing :  0px; white-space :  normal; font-family :  &quot;Lato 2&quot;,  system-ui,  -apple-system,  &quot;Segoe UI&quot;,  Roboto,  Ubuntu,  Cantarell,  &quot;Noto Sans&quot;,  sans-serif; font-size :  14px; background-color :  rgb(255, 255, 255);"">
                        <tbody>
                            <tr>
                                <td style=""padding :  10px 0px 10px 12px; font-size :  12px; color :  rgb(51, 51, 51); line-height :  22px; font-family :  &quot;Open Sans&quot;,  &quot;Trebuchet MS&quot;,  sans-serif;"">
                                    <div>
                                        gorecruitai&nbsp;Private Limited, Workafella-High Street,​ New, No. 431, Anna Salai, Chennai, Tamil Nadu 600018, India.
                                        <br>
                                    </div>
                                    <div>
                                        Toll free: +91-44-663-847-07&nbsp;
                                        <br>
                                    </div>
                                    <div>
                                        This e-mail is generated from Zoho Accounts. If you think this is SPAM, please report to
                                        <span>
                                            <span>
                                                &nbsp;
                                            </span>
                                        </span>
                                        <a target=""_blank"" href=""mailto:abuse@zohocorp.com"" style=""color :  rgb(0, 145, 255); text-decoration :  none;"">
                                            abuse@gorecruitai.com </a>
                                        for immediate action.
                                        <br>
                                    </div>
                                    <div>
                                        <br>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </blockquote>
</div>";
            }
            else if (templateName == "ResetPasswordLink")
            {
                emailContent = @"<div data-zbluepencil-ignore=""true"" class=""zmail_extra"">
    <blockquote style=""margin: 0px;"" id=""blockquote_zmail"">
        <div>
            <div style=""font-family :  Verdana,  Arial,  Helvetica,  sans-serif; font-size :  10pt;"">
                <div>
                    <div>
                        <a target=""_blank"" href=""http://www.zoho.com/"" style=""display :  inline-block;"">
                            <img src=""https://zmdownload.zoho.com/zm/ImageDisplay?na=2869793000000008002&amp;nmsgId=1695299287448110001&amp;f=1.png&amp;mode=inline&amp;cid=0.28869226610.5062181190122621898.18ab23d8e7e__inline__img__src&amp;"" width=""150"" height=""49"" style=""cursor :  pointer;"">
                        </a>
                        <br>
                    </div>
                    <table width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0"" style=""color :  rgb(0, 0, 0); font-style :  normal; font-weight :  400; letter-spacing :  normal; orphans :  2; text-transform :  none; widows :  2; word-spacing :  0px; white-space :  normal; font-family :  &quot;Lato 2&quot;,  system-ui,  -apple-system,  &quot;Segoe UI&quot;,  Roboto,  Ubuntu,  Cantarell,  &quot;Noto Sans&quot;,  sans-serif; font-size :  14px; background-color :  rgb(255, 255, 255);"">
                        <tbody>
                            <tr>
                                <td>
                                    <table width=""100%"" cellspacing=""0"" cellpadding=""0"" border=""0"" style=""height :  459.797px;"">
                                        <tbody>
                                            <tr>
                                                <td style=""padding :  8px 0px 0px 12px; font-size :  24px; line-height :  48px; font-family :  &quot;Open Sans&quot;,  &quot;Trebuchet MS&quot;,  sans-serif;"">
                                                    <b>
                                                        <a rel=""nofollow"" href=""https://mail.zoho.com/zm/#"" target=""_blank"" style=""text-decoration :  none; cursor :  default; color :  rgb(34, 34, 34);"">
                                                            Hi {UserName}!
                                                        </a>
                                                    </b>
                                                    <br>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style=""padding :  20px 0px 0px 12px; font-size :  14px; line-height :  24px; font-family :  &quot;Open Sans&quot;,  &quot;Trebuchet MS&quot;,  sans-serif;"">
                                                    <div>
                                                        Please click below link to Reset your Password.
                                                         <br>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style=""padding :  20px 0px 0px 12px; font-size :  22px; line-height :  24px; font-family :  &quot;Open Sans&quot;,  &quot;Trebuchet MS&quot;,  sans-serif;"">
                                                    <b>
                                                        {ResetPasswordLink}
                                                    </b>
                                                    <br>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style=""padding :  20px 0px 0px 12px; font-size :  14px; line-height :  24px; font-family :  &quot;Open Sans&quot;,  &quot;Trebuchet MS&quot;,  sans-serif;"">
                                                    If you didn't initiate this action or if you think you received this email by mistake, please contact
                                                    <span>
                                                        <span>
                                                            &nbsp;
                                                        </span>
                                                    </span>
                                                    <a target=""_blank"" href=""mailto:support@zohoaccounts.com"" style=""color :  rgb(38, 150, 235); text-decoration :  none;"">
                                                        support@gorecruitai.com.
                                                    </a>
                                                    <br>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style=""padding :  20px 0px 0px 12px; font-size :  14px; line-height :  24px; font-family :  &quot;Open Sans&quot;,  &quot;Trebuchet MS&quot;,  sans-serif;"">
                                                    Regards,
                                                    <br>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style=""padding :  0px 0px 0px 12px; font-size :  14px; line-height :  24px; font-family :  &quot;Open Sans&quot;,  &quot;Trebuchet MS&quot;,  sans-serif;"">
                                                    <b>
                                                        GOrecruitAI Team
                                                    </b>
                                                    <br>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style=""padding :  0px 0px 0px 12px; font-size :  14px; line-height :  24px; font-family :  &quot;Open Sans&quot;,  &quot;Trebuchet MS&quot;,  sans-serif;"">
                                                    <div>
                                                        <a target=""_blank"" href=""http://www.zoho.com/"" style=""color :  rgb(38, 150, 235); text-decoration :  none;"">
                                                            www.gorecruitai.com
                                                        </a>
                                                        <br>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style=""padding :  0px 0px 0px 12px;"">
                                                    <div style=""border-bottom :  3px solid rgb(55, 149, 244);"">
                                                        <img src=""https://zmdownload.zoho.com/zm/ImageDisplay?na=2869793000000008002&amp;nmsgId=1695299287448110001&amp;f=2.png&amp;mode=inline&amp;cid=1.28869226610.6527195597331402485.18ab23d8e7f__inline__img__src&amp;"" width=""734"" height=""115"" style=""cursor :  pointer;"">
                                                        <br>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table style=""color :  rgb(0, 0, 0); font-style :  normal; font-weight :  400; letter-spacing :  normal; orphans :  2; text-transform :  none; widows :  2; word-spacing :  0px; white-space :  normal; font-family :  &quot;Lato 2&quot;,  system-ui,  -apple-system,  &quot;Segoe UI&quot;,  Roboto,  Ubuntu,  Cantarell,  &quot;Noto Sans&quot;,  sans-serif; font-size :  14px; background-color :  rgb(255, 255, 255);"">
                        <tbody>
                            <tr>
                                <td style=""padding :  10px 0px 10px 12px; font-size :  12px; color :  rgb(51, 51, 51); line-height :  22px; font-family :  &quot;Open Sans&quot;,  &quot;Trebuchet MS&quot;,  sans-serif;"">
                                    <div>
                                        gorecruitai&nbsp;Private Limited, Workafella-High Street,​ New, No. 431, Anna Salai, Chennai, Tamil Nadu 600018, India.
                                        <br>
                                    </div>
                                    <div>
                                        Toll free: +91-44-663-847-07&nbsp;
                                        <br>
                                    </div>
                                    <div>
                                        This e-mail is generated from Zoho Accounts. If you think this is SPAM, please report to
                                        <span>
                                            <span>
                                                &nbsp;
                                            </span>
                                        </span>
                                        <a target=""_blank"" href=""mailto:abuse@zohocorp.com"" style=""color :  rgb(0, 145, 255); text-decoration :  none;"">
                                            abuse@gorecruitai.com
                                        </a>
                                        for immediate action.
                                        <br>
                                    </div>
                                    <div>
                                        <br>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </blockquote>
</div>";
            }

            return emailContent;
        }

        public static JsonSerializerOptions GetJsonSerializerOptions()
        {
            var jsonSerializerOptions = new JsonSerializerOptions
            {
                IgnoreNullValues = true,
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                WriteIndented = true,
            };

            return jsonSerializerOptions;
        }

        public static string Decrypt(string cipherText)
        {
            string EncryptionKey = "MAKV2SPBNI99212";
            if (cipherText != null)
            {
                byte[] cipherBytes = Convert.FromBase64String(cipherText);
                using (Aes encryptor = Aes.Create())
                {
                    Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
                    encryptor.Key = pdb.GetBytes(32);
                    encryptor.IV = pdb.GetBytes(16);
                    using (MemoryStream ms = new MemoryStream())
                    {
                        using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateDecryptor(), CryptoStreamMode.Write))
                        {
                            cs.Write(cipherBytes, 0, cipherBytes.Length);
                            cs.Close();
                        }
                        cipherText = Encoding.Unicode.GetString(ms.ToArray());
                    }
                }
            }

            return cipherText;
        }

        public static string Encrypt(string clearText)
        {
            string EncryptionKey = "MAKV2SPBNI99212";
            byte[] clearBytes = Encoding.Unicode.GetBytes(clearText);
            using (Aes encryptor = Aes.Create())
            {
                Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
                encryptor.Key = pdb.GetBytes(32);
                encryptor.IV = pdb.GetBytes(16);
                using (MemoryStream ms = new MemoryStream())
                {
                    using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateEncryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(clearBytes, 0, clearBytes.Length);
                        cs.Close();
                    }
                    clearText = Convert.ToBase64String(ms.ToArray());
                }
            }
            return clearText;
        }

        public static string CleanUpEncription(string encriptedstring)
        {
            string[] dirtyCharacters = { ";", "/", "?", ":", "@", "&", "=", "+", "$", "," };
            string[] cleanCharacters = { "p2n3t4G5l6m", "s1l2a3s4h", "q1e2st3i4o5n", "T22p14nt2s", "a9t", "a2n3nd", "e1q2ua88l", "p22l33u1ws", "d0l1ar5", "c0m8a1a" };

            foreach (string dirtyCharacter in dirtyCharacters)
            {
                encriptedstring = encriptedstring.Replace(dirtyCharacter, cleanCharacters[Array.IndexOf(dirtyCharacters, dirtyCharacter)]);
            }
            return encriptedstring;
        }

        public static string MakeItDirtyAgain(string encriptedString)
        {
            string[] dirtyCharacters = { ";", "/", "?", ":", "@", "&", "=", "+", "$", "," };
            string[] cleanCharacters = { "p2n3t4G5l6m", "s1l2a3s4h", "q1e2st3i4o5n", "T22p14nt2s", "a9t", "a2n3nd", "e1q2ua88l", "p22l33u1ws", "d0l1ar5", "c0m8a1a" };
            foreach (string symbol in cleanCharacters)
            {
                encriptedString = encriptedString.Replace(symbol, dirtyCharacters[Array.IndexOf(cleanCharacters, symbol)]);
            }
            return encriptedString;
        }
    }
}
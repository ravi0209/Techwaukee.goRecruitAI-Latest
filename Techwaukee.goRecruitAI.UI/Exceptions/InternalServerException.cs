using System.Net;

namespace recruIT_CurrentUI.GlobalExceptionHandling.Exceptions
{
    public class InternalServerException : CustomException
    {
        public InternalServerException(string message, List<string>? errors = default)
            : base(message, errors, HttpStatusCode.InternalServerError) { }
    }
}
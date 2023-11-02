using System.Net;

namespace recruIT_CurrentUI.GlobalExceptionHandling.Exceptions
{
    public class ConflictException : CustomException
    {
        public ConflictException(string message)
            : base(message, null, HttpStatusCode.Conflict) { }
    }
}
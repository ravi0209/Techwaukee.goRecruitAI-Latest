namespace recruIT_CurrentUI.GlobalExceptionHandling.Exceptions
{
    public class BadRequestException : Exception
    {
        public BadRequestException(string message) : base(message)
        { }
    }
}
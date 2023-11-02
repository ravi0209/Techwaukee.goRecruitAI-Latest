namespace recruIT_CurrentUI.GlobalExceptionHandling.Exceptions
{
    public class UnauthorizedAccessException : Exception
    {
        public UnauthorizedAccessException(string message) : base(message)
        { }
    }
}
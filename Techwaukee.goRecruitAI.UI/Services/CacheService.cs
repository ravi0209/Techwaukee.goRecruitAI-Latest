using recruIT_CurrentModels.Models;
using recruIT_CurrentModels.ViewModels;
using recruIT_Utilities;

namespace recruIT_CurrentUI.Services
{
    public class CacheService : ICacheService
    {
        public T GetData<T>(string key)
        {
            throw new NotImplementedException();
        }

        public object RemoveData(string key)
        {
            throw new NotImplementedException();
        }

        public bool SetData<T>(string key, T value, DateTimeOffset expirationTime)
        {
            throw new NotImplementedException();
        }
    }
}

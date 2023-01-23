using MonstaBackend.Models;
using MonstaBackend.Request;
using MonstaBackend.Response;

namespace MonstaBackend.Services
{
    public interface UserService
    {
        public  Task<LoginResponse> login(LoginRequest _userData);
        public Task<User> getUser(string username, string password);
        public Task<UserResponse> register(RegisterRequest req);
    }
}

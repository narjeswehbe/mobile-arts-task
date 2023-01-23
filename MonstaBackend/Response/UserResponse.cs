using MonstaBackend.Models;

namespace MonstaBackend.Response
{
    public class UserResponse
    {
        public User user { get; set; }
        public string message { get; set; }

        public UserResponse(User user, string message)
        {
            this.user = user;
            this.message = message;
        }
    }
}

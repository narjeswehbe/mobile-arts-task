using System.IdentityModel.Tokens.Jwt;

namespace MonstaBackend.Response
{
    public class LoginResponse
    {
        
     

        public string token { get; set; }
        public string message { get; set; }

        public LoginResponse(string token, string message)
        {
            this.token = token;
            this.message = message;
        }
    }
}

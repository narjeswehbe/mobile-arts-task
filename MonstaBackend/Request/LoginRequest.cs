using System.ComponentModel.DataAnnotations;

namespace MonstaBackend.Request
{
    public class LoginRequest
    {
        [Required(ErrorMessage ="Username is required")]
        public string username { get; set; }
        [Required(ErrorMessage = "Password is required")]
        public string password { get; set; }    
    }
}

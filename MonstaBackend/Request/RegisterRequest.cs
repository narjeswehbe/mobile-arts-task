using System.ComponentModel.DataAnnotations;

namespace MonstaBackend.Request
{
    public class RegisterRequest
    {
        [Required(ErrorMessage = "Username is required")]
        public string username { get; set; }
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage ="Please enter a valid email")]
        public string email { get; set; }
        [Required(ErrorMessage = "Password is required")]
        public string password { get; set; }
    }
}

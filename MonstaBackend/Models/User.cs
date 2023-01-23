using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MonstaBackend.Models
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        [Required]
        [StringLength(50, MinimumLength = 3)]
       
        
        public string username { get; set; }
        [Required]
        [EmailAddress]
       
        public string email { get; set; }
        public string password { get; set; }    

           
    }
}

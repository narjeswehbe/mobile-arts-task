using System.ComponentModel.DataAnnotations;

namespace MonstaBackend.Models
{
    public class Genre
    {

        public string name { get; set; }
       
        public String? genre_id { get; set; }
        public String parent_id { get; set; } = null;

        public String image { get; set; } = null;
       
     }
}

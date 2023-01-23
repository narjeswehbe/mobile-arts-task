using Microsoft.EntityFrameworkCore;
using MonstaBackend.Models;

namespace MonstaBackend.context
{
    public class Db : DbContext
    {

        public Db(DbContextOptions<Db> options) : base(options)
        {


        }
       


        public virtual DbSet<User> Users { get; set; }



    }
}

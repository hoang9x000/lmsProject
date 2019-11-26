using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace lmsProject.Models
{
    public class myDataContext: DbContext
    {
        public myDataContext(DbContextOptions<myDataContext> options) : base(options)
        {

        }
        public DbSet<User> Users { get; set; }
    }
}

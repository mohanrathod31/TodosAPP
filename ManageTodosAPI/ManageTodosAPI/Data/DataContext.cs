using ManageTodosAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ManageTodosAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<Todo> Todos { get; set; }
    }
}
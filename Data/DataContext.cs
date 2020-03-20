using Microsoft.EntityFrameworkCore;
using ReflowMaritimeTest.Models;

namespace ReflowMaritimeTest.Data
{
	public class DataContext : DbContext
	{
		public DataContext(DbContextOptions<DataContext> options) : base(options) { }

		public DbSet<User> Users { get; set; }
		public DbSet<Company> Companies { get; set; }
		public DbSet<City> Cities { get; set; }
		public DbSet<Country> Countries { get; set; }
		public DbSet<CompanyUser> CompanyOwners { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);

			modelBuilder.Entity<CompanyUser>()
				.HasKey(a => new { a.CompanyId, a.UserId });

			modelBuilder.Entity<Company>()
				.HasOne(a => a.Country)
				.WithMany(a => a.Companies)
				.HasForeignKey("CountryId")
				.OnDelete(DeleteBehavior.NoAction);
			//modelBuilder.Entity<CompanyOwner>()
			//	.HasOne(a => a.Owner)
			//	.WithMany(a => a.CompanyOwners)
			//	.HasForeignKey(a => a.UserId);
			//modelBuilder.Entity<CompanyOwner>()
			//	.HasOne(a => a.Company)
			//	.WithMany(a => a.CompanyOwners)
			//	.HasForeignKey(a => a.CompanyId);
		}
	}
}

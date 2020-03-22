using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using ReflowMaritimeTest.Models;
using ReflowMaritimeTest.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReflowMaritimeTest.Data
{
	public class Repository : IRepository
	{
		private readonly DataContext context;
		private readonly ILogger<Repository> logger;

		public Repository(DataContext context, ILogger<Repository> logger)
		{
			this.context = context;
			this.logger = logger;
		}

		public async Task<Company> CreateNewCompany(Company company)
		{
			try
			{
				context.Companies.Add(company);
				await context.SaveChangesAsync();
				return company;
			}
			catch (Exception ex)
			{
				var errorMsg = ex.GetExceptionMessage();
				logger.LogError(errorMsg);
				throw new Exception(errorMsg);
			}
		}

		public async Task<IEnumerable<CompanySummury>> GetCompanies()
		{
			try
			{
				return await context.Companies.Select(a => new CompanySummury()
				{
					Id = a.Id,
					Name = a.Name
				}).OrderBy(a => a.Name)
				.ToListAsync();
			}
			catch (Exception ex)
			{
				var errorMsg = ex.GetExceptionMessage();
				logger.LogError(errorMsg);
				throw new Exception(errorMsg);
			}
		}

		public async Task<Company> GetCompany(int id)
		{
			try
			{
				return await context.Companies
					.Include(a => a.City)
					.Include(a => a.Country)
					.Include(a => a.CompanyUsers).ThenInclude(b => b.User)
					.SingleOrDefaultAsync(a => a.Id == id);
			}
			catch (Exception ex)
			{
				var errorMsg = ex.GetExceptionMessage();
				logger.LogError(errorMsg);
				throw new Exception(errorMsg);
			}
		}

		public async Task UpdateCompany(Company company)
		{
			try
			{
				context.Entry(company).State = EntityState.Modified;
				await context.SaveChangesAsync();
			}
			catch (Exception ex)
			{
				var errorMsg = ex.GetExceptionMessage();
				logger.LogError(errorMsg);
				throw new Exception(errorMsg);
			}
		}
		
		public async Task DeleteCompany(Company company)
		{
			try
			{
				context.Entry(company).State = EntityState.Deleted;
				await context.SaveChangesAsync();
			}
			catch (Exception ex)
			{
				var errorMsg = ex.GetExceptionMessage();
				logger.LogError(errorMsg);
				throw new Exception(errorMsg);
			}
		}

		public async Task AddRemoveCompanyUser(CompanyUser companyUser)
		{
			try
			{
				var exists = await context.CompanyOwners
					.FindAsync(companyUser.CompanyId, companyUser.UserId);
				if (exists == null)
					context.CompanyOwners.Add(companyUser);
				else
					context.CompanyOwners.Remove(exists);
				await context.SaveChangesAsync();
			}
			catch (Exception ex)
			{
				var errorMsg = ex.GetExceptionMessage();
				logger.LogError(errorMsg);
				throw new Exception(errorMsg);
			}
		}

		public async Task<User> GetUser(int id)
		{
			return await context.Users.FindAsync(id);
		}

		public async Task<IEnumerable<User>> GetUsers()
		{
			return await context.Users.ToListAsync();
		}

		public async Task<int> CreateNewUser(User user)
		{
			try
			{
				context.Users.Add(user);
				await context.SaveChangesAsync();
				return user.Id;
			}
			catch (Exception ex)
			{
				var errorMsg = ex.GetExceptionMessage();
				logger.LogError(errorMsg);
				throw new Exception(errorMsg);
			}
		}

		public async Task<IEnumerable<Country>> GetCountries()
		{
			return await context.Countries.ToListAsync();
		}

		public async Task<Country> GetCountry(int id)
		{
			return await context.Countries.FindAsync(id);
		}

		public async Task<IEnumerable<City>> GetCities(int id)
		{
			return await context.Cities.Where(a => a.CountryId == id).ToListAsync();
		}

		public async Task<City> GetCity(int id)
		{
			return await context.Cities.FindAsync(id);
		}

		public async Task<int> CreateNewCountry(Country country)
		{
			try
			{
				context.Countries.Add(country);
				await context.SaveChangesAsync();
				return country.Id;
			}
			catch (Exception ex)
			{
				var errorMsg = ex.GetExceptionMessage();
				logger.LogError(errorMsg);
				throw new Exception(errorMsg);
			}
		}

		public async Task<int> CreateNewCity(City city)
		{
			try
			{
				context.Cities.Add(city);
				await context.SaveChangesAsync();
				return city.Id;
			}
			catch (Exception ex)
			{
				var errorMsg = ex.GetExceptionMessage();
				logger.LogError(errorMsg);
				throw new Exception(errorMsg);
			}
		}

		public async Task UpdateUser(User user)
		{
			try
			{
				context.Entry(user).State = EntityState.Modified;
				await context.SaveChangesAsync();
			}
			catch (Exception ex)
			{
				var errorMsg = ex.GetExceptionMessage();
				logger.LogError(errorMsg);
				throw new Exception(errorMsg);
			}
		}

		public async Task DeleteUser(User user)
		{
			try
			{
				context.Entry(user).State = EntityState.Deleted;
				await context.SaveChangesAsync();
			}
			catch (Exception ex)
			{
				var errorMsg = ex.GetExceptionMessage();
				logger.LogError(errorMsg);
				throw new Exception(errorMsg);
			}
		}

		public async Task UpdateCountry(Country country)
		{
			try
			{
				context.Entry(country).State = EntityState.Modified;
				await context.SaveChangesAsync();
			}
			catch (Exception ex)
			{
				var errorMsg = ex.GetExceptionMessage();
				logger.LogError(errorMsg);
				throw new Exception(errorMsg);
			}
		}

		public async Task UpdateCity(City city)
		{
			try
			{
				context.Entry(city).State = EntityState.Modified;
				await context.SaveChangesAsync();
			}
			catch (Exception ex)
			{
				var errorMsg = ex.GetExceptionMessage();
				logger.LogError(errorMsg);
				throw new Exception(errorMsg);
			}
		}

		public async Task DeleteCountry(Country country)
		{
			try
			{
				context.Entry(country).State = EntityState.Deleted;
				await context.SaveChangesAsync();
			}
			catch (Exception ex)
			{
				var errorMsg = ex.GetExceptionMessage();
				logger.LogError(errorMsg);
				throw new Exception(errorMsg);
			}
		}

		public async Task DeleteCity(City city)
		{
			try
			{
				context.Entry(city).State = EntityState.Deleted;
				await context.SaveChangesAsync();
			}
			catch (Exception ex)
			{
				var errorMsg = ex.GetExceptionMessage();
				logger.LogError(errorMsg);
				throw new Exception(errorMsg);
			}
		}
	}
}

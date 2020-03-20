using Microsoft.AspNetCore.Mvc;
using ReflowMaritimeTest.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ReflowMaritimeTest.Data
{
	public interface IRepository
	{
		Task<Company> CreateNewCompany(Company company);
		Task<IEnumerable<CompanySummury>> GetCompanies();
		Task<Company> GetCompany(int id);
		Task UpdateCompany(Company company);
		Task DeleteCompany(Company company);
		Task AddRemoveCompanyUser(CompanyUser companyUser);
		Task<User> GetUser(int id);
		Task<IEnumerable<User>> GetUsers();
		Task<User> CreateNewUser(User user);
		Task<IEnumerable<Country>> GetCountries();
		Task<IEnumerable<City>> GetCities(int id);
	}
}

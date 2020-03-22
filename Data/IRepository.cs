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
		Task<int> CreateNewUser(User user);
		Task<IEnumerable<Country>> GetCountries();
		Task<Country> GetCountry(int id);
		Task<IEnumerable<City>> GetCities(int id);
		Task<City> GetCity(int id);
		Task<int> CreateNewCountry(Country country);
		Task<int> CreateNewCity(City city);
		Task UpdateUser(User user);
		Task UpdateCountry(Country country);
		Task UpdateCity(City city);
		Task DeleteUser(User user);
		Task DeleteCountry(Country country);
		Task DeleteCity(City city);
	}
}

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using ReflowMaritimeTest.Data;
using ReflowMaritimeTest.Models;
using System.Threading.Tasks;

namespace ReflowMaritimeTest.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class CompaniesController : ControllerBase
	{
		private readonly IRepository repo;

		public CompaniesController(IRepository repo)
		{
			this.repo = repo;
		}

		[HttpGet]
		public async Task<IActionResult> Get()
		{
			return Ok(await repo.GetCompanies());
		}

		[HttpGet("{id}")]
		public async Task<IActionResult> Get(int id)
		{
			var companyEntity = await repo.GetCompany(id);

			if (companyEntity == null)
			{
				return NotFound();
			}

			var settings = new JsonSerializerSettings
			{
				ReferenceLoopHandling = ReferenceLoopHandling.Ignore
			};
			var str = JsonConvert.SerializeObject(companyEntity, settings);
			return new JsonResult(str);

			//var companyUsers = new List<CompanyUser>();
			//foreach (var companyUser in companyEntity.CompanyUsers)
			//{
			//	companyUsers.Add(new CompanyUser()
			//	{
			//		UserId = companyUser.UserId,
			//		User = new User()
			//		{
			//			Id = companyUser.UserId,
			//			Name = companyUser.User.Name
			//		}
			//	});
			//}
			//var company = new Company()
			//{
			//	Address = companyEntity.Address,
			//	City = new City()
			//	{
			//		Id = companyEntity.CityId,
			//		Name = companyEntity.City.Name
			//	},
			//	CityId = companyEntity.CityId,
			//	Country = new Country()
			//	{
			//		Id = companyEntity.CountryId,
			//		Name = companyEntity.Country.Name
			//	},
			//	CountryId = companyEntity.CountryId,
			//	Email = companyEntity.Email,
			//	Name = companyEntity.Name,
			//	Id = companyEntity.Id,
			//	Phone = companyEntity.Phone,
			//	CompanyUsers = companyUsers
			//};

			//return Ok(company);
		}

		[HttpPut("{id}")]
		public async Task<IActionResult> Put(int id, Company company)
		{
			if (id != company.Id)
			{
				return BadRequest();
			}

			try
			{
				await repo.UpdateCompany(company);
			}
			catch (DbUpdateConcurrencyException)
			{
				var exists = await CompanyExists(id);
				if (!exists)
				{
					return NotFound($"Company with id {id} dosn't exsits.");
				}
				else
				{
					throw;
				}
			}
			return NoContent();
		}

		[HttpPost]
		public async Task<IActionResult> NewCompany(Company company)
		{
			var newCompany = await repo.CreateNewCompany(company);
			return Ok(newCompany.Id);
		}

		[HttpDelete("{id}")]
		public async Task<IActionResult> Delete(int id)
		{
			var company = await repo.GetCompany(id);
			if (company == null)
			{
				return NotFound();
			}

			await repo.DeleteCompany(company);
			return NoContent();
		}

		[HttpPost("AddRemoveCompanyUser")]
		public async Task<IActionResult> AddRemoveCompanyUser(CompanyUser data)
		{
			var companyExists = await CompanyExists(data.CompanyId);
			if (!companyExists)
			{
				return NotFound($"Company with id {data.CompanyId} dosn't exsits.");
			}

			var userExists = await UserExists(data.UserId);
			if (!userExists)
			{
				return NotFound($"User with id {data.UserId} dosn't exsits.");
			}

			await repo.AddRemoveCompanyUser(data);
			return Ok();
		}

		private async Task<bool> CompanyExists(int id)
		{
			return await repo.GetCompany(id) != null;
		}
		private async Task<bool> UserExists(int id)
		{
			return await repo.GetUser(id) != null;
		}
	}
}
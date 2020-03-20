using Microsoft.AspNetCore.Mvc;
using ReflowMaritimeTest.Data;
using ReflowMaritimeTest.Models;
using System.Threading.Tasks;

namespace ReflowMaritimeTest.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class UsersController : ControllerBase
	{
		private readonly IRepository repo;

		public UsersController(IRepository repo)
		{
			this.repo = repo;
		}

		[HttpGet]
		public async Task<IActionResult> GetUsers()
		{
			return Ok(await repo.GetUsers());
		}

		[HttpPost]
		public async Task<IActionResult> NewUser(User user)
		{
			return Ok(await repo.CreateNewUser(user));
		}
	}
}
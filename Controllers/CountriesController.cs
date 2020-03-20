using Microsoft.AspNetCore.Mvc;
using ReflowMaritimeTest.Data;
using System.Threading.Tasks;

namespace ReflowMaritimeTest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CountriesController : ControllerBase
    {
        private readonly IRepository repo;

        public CountriesController(IRepository repo)
        {
            this.repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetCountries()
        {
            return Ok(await repo.GetCountries());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCities(int id)
        {
            return Ok(await repo.GetCities(id));
        } 
    }
}
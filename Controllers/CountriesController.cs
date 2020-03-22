using Microsoft.AspNetCore.Mvc;
using ReflowMaritimeTest.Data;
using ReflowMaritimeTest.Models;
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

        [HttpPost]
        public async Task<IActionResult> NewCountry(Country country)
        {
            return Ok(await repo.CreateNewCountry(country));
        }

        [HttpPut]
        public async Task<IActionResult> UpdateCountry(Country country)
        {
            await repo.UpdateCountry(country);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCountry(int id)
        {
            var country = await repo.GetCountry(id);
            await repo.DeleteCountry(country);
            return NoContent();
        }

    }
}
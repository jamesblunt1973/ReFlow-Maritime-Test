using Microsoft.AspNetCore.Mvc;
using ReflowMaritimeTest.Data;
using ReflowMaritimeTest.Models;
using System.Threading.Tasks;

namespace ReflowMaritimeTest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CitiesController : ControllerBase
    {
        private readonly IRepository repo;

        public CitiesController(IRepository repo)
        {
            this.repo = repo;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCities(int id)
        {
            return Ok(await repo.GetCities(id));
        }

        [HttpPost]
        public async Task<IActionResult> NewCity(City city)
        {
            return Ok(await repo.CreateNewCity(city));
        }

        [HttpPut]
        public async Task<IActionResult> UpdateCity(City city)
        {
            await repo.UpdateCity(city);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCity(int id)
        {
            var city = await repo.GetCity(id);
            await repo.DeleteCity(city);
            return NoContent();
        }
    }
}
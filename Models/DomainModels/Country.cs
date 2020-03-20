using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ReflowMaritimeTest.Models
{
	public class Country
	{
		[Required]
		public int Id { get; set; }

		[Required]
		[StringLength(255)]
		public string Name { get; set; }

		// Navigation Properties
		public IEnumerable<Company> Companies { get; set; }
		public IEnumerable<City> Cities { get; set; }
	}
}

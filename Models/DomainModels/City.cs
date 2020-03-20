using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ReflowMaritimeTest.Models
{
	public class City
	{
		[Required]
		public int Id { get; set; }

		[Required]
		[StringLength(255)]
		public string Name { get; set; }

		[Required]
		public int CountryId { get; set; }

		// Navigation Properties
		public Country Country { get; set; }
		
		public IEnumerable<Company> Companies { get; set; }
	}
}

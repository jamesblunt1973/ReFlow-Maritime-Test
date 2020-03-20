using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ReflowMaritimeTest.Models
{
	public class Company
	{
		public int Id { get; set; }
		
		[Required]
		[StringLength(255)]
		public string Name { get; set; }

		[Required]
		[StringLength(1000)]
		public string Address { get; set; }

		[Required]
		public int CityId { get; set; }

		[Required]
		public int CountryId { get; set; }

		[EmailAddress]
		public string Email { get; set; }

		[Phone]
		public string Phone { get; set; }

		// Navigation Properties
		public City City { get; set; }

		public Country Country { get; set; }

		public IEnumerable<CompanyUsers> CompanyOwners { get; set; }
	}
}

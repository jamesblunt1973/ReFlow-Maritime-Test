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

		[Required(AllowEmptyStrings = true)]
		[StringLength(255)]
		[EmailAddress]
		public string Email { get; set; }

		[Required(AllowEmptyStrings = true)]
		[StringLength(255)]
		[Phone]
		public string Phone { get; set; }

		// Navigation Properties
		public City City { get; set; }

		public Country Country { get; set; }

		public IEnumerable<CompanyUser> CompanyUsers { get; set; }
	}
}

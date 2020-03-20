using System.ComponentModel.DataAnnotations;

namespace ReflowMaritimeTest.Models
{
	/// <summary>
	/// This is a join entity
	/// </summary>
	public class CompanyUsers
	{
		[Required]
		public int CompanyId { get; set; }
		
		[Required]
		public int UserId { get; set; }

		// Navigation Properties
		public Company Company { get; set; }
		public User User { get; set; }
	}
}

using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ReflowMaritimeTest.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        // Navigation Properties
        public IEnumerable<CompanyUsers> CompanyOwners { get; set; }
    }
}

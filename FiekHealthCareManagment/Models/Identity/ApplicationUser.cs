using Microsoft.AspNetCore.Identity;

namespace FiekHealthCareManagment.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
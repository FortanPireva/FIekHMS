using FiekHealthCareManagment.Models;

namespace FiekHealthCareManagment.Extensions
{
    public static class UserExtensions
    {
        public  static User ToUser(this ApplicationUser user)
        {
            return new()
            {
                Email = user.Email,
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
            };
        }
    }
}
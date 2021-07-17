namespace FiekHealthCareManagment.Models.Auth
{
    public class AuthenticationResponse
    {
        public string Id { get; set; }
        public string FistName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }

        public AuthenticationResponse(User user,string token)
        {
            Id = user.Id;
            FistName = user.FirstName;
            LastName = user.LastName;
            Email = user.Email;
            Token = token;
        }
    }
}
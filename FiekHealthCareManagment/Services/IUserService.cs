using System.Threading.Tasks;
using FiekHealthCareManagment.Models;
using FiekHealthCareManagment.Models.Auth;

namespace FiekHealthCareManagment.Services
{
    public interface IUserService
    {
        
        Task<User> GetById(string userid);
        Task<AuthenticationResponse> Authenticate(AuthenticationRequest model);
        Task<RegistrationResponse> Register(RegistrationRequest registrationRequest);
    }
}
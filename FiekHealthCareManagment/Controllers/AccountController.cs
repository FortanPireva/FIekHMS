using System.Threading.Tasks;
using FiekHealthCareManagment.Models.Auth;
using FiekHealthCareManagment.Services;
using Microsoft.AspNetCore.Mvc;

namespace FiekHealthCareManagment.Controllers
{
    public class AccountController : BaseController
    {
        private readonly IUserService _userService;

        public AccountController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] RegistrationRequest registrationRequest)
        {
            var response =await _userService.Register(registrationRequest);
            if (response is null)
                return BadRequest();
            return Ok(response);
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] AuthenticationRequest authenticationRequest)
        {
            var response = await _userService.Authenticate(authenticationRequest);
            if (response is null)
                return BadRequest();
            return Ok(response);
        }
    }
}
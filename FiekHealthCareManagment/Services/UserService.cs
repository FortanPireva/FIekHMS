using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using FiekHealthCareManagment.Data;
using FiekHealthCareManagment.Extensions;
using FiekHealthCareManagment.Models;
using FiekHealthCareManagment.Models.Auth;
using FiekHealthCareManagment.Settings;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting.Internal;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace FiekHealthCareManagment.Services
{
    public class UserService : IUserService
    {
        private readonly JwtSettings _jwtSettings;
        private readonly AppDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        public UserService(IOptions<JwtSettings> jwtSettings,AppDbContext context, UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager)
        {
            _jwtSettings = jwtSettings.Value;
            this._context = context;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        public async Task<User> GetById(string userid)
        {
            var user= await _userManager.FindByIdAsync(userid);
            if (user is not null)
            {
                return user.ToUser();
            }

            return null;
        }

        public async Task<AuthenticationResponse> Authenticate(AuthenticationRequest model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user==null)
            {
                return null;
            }

            var passwordHasher = new PasswordHasher<ApplicationUser>();

            var result = passwordHasher.VerifyHashedPassword(user, user.PasswordHash, model.Password);
            if (result == PasswordVerificationResult.Failed)
            {
                return null;
            }

            var token = await  generateJwtToken(user);
            return new AuthenticationResponse(user.ToUser(), token);
        }

        public async Task<RegistrationResponse> Register(RegistrationRequest registrationRequest)
        {
            var applicationUser = new ApplicationUser()
            {
                UserName = registrationRequest.Email,
                FirstName = registrationRequest.FirstName,
                LastName = registrationRequest.LastName,
                Email = registrationRequest.Email,
            };

            var result = await _userManager.CreateAsync(applicationUser, registrationRequest.Password);

            if (result.Succeeded)
            {
                return new RegistrationResponse()
                {
                    token = await generateJwtToken(applicationUser)
                };
            }

            return null;
        }

        private async Task<string> generateJwtToken(ApplicationUser user)
        {
            var userRoles = await _userManager.GetRolesAsync(user);  
  
            var authClaims = new List<Claim>  
            {  
                new Claim(ClaimTypes.Name, user.UserName),  
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),  
            };  
  
            foreach (var userRole in userRoles)  
            {  
                authClaims.Add(new Claim(ClaimTypes.Role, userRole));  
            }  
  
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Secret));  
  
            var token = new JwtSecurityToken(  
                issuer: _jwtSettings.Issuer,
                audience: _jwtSettings.Audience,  
                expires: DateTime.Now.AddHours(3),  
                claims: authClaims,  
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)  
            );  
            var tokenHandler = new JwtSecurityTokenHandler();
            return tokenHandler.WriteToken(token);
        }
    }
}
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using UnemployedNotAPI.Data;
using UnemployedNotAPI.Models;

namespace UnemployedNotAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly string _jwtKey = "UnemployedNotSuperSecretKey1234567890!!";

        public AuthController(AppDbContext db) { _db = db; }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            if (await _db.Users.AnyAsync(u => u.Email == dto.Email))
                return BadRequest(new { message = "Email already exists" });

            var user = new User
            {
                Name = dto.Name,
                Email = dto.Email,
                PasswordHash = HashPassword(dto.Password),
                Phone = dto.Phone,
                City = dto.City,
                AccountType = dto.AccountType,
                DateOfBirth = dto.DateOfBirth
            };

            _db.Users.Add(user);
            await _db.SaveChangesAsync();
            return Ok(new { message = "Registered successfully" });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
            if (user == null || user.PasswordHash != HashPassword(dto.Password))
                return Unauthorized(new { message = "Invalid email or password" });

            var token = GenerateToken(user);
            return Ok(new { token, name = user.Name, accountType = user.AccountType });
        }

        private string HashPassword(string password)
        {
            var bytes = SHA256.HashData(Encoding.UTF8.GetBytes(password));
            return Convert.ToHexString(bytes);
        }

        private string GenerateToken(User user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.AccountType)
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(claims: claims, expires: DateTime.UtcNow.AddDays(7), signingCredentials: creds);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }

    public class RegisterDto
    {
        public string Name { get; set; } = "";
        public string Email { get; set; } = "";
        public string Password { get; set; } = "";
        public string Phone { get; set; } = "";
        public string City { get; set; } = "";
        public string AccountType { get; set; } = "jobseeker";
        public DateTime DateOfBirth { get; set; }
    }

    public class LoginDto
    {
        public string Email { get; set; } = "";
        public string Password { get; set; } = "";
    }
}
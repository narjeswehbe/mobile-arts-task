using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MonstaBackend.context;
using MonstaBackend.Models;
using MonstaBackend.Request;
using MonstaBackend.Response;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace MonstaBackend.Services
{
    public class UserServiceImpl:UserService
    {
        private readonly Db _db;
        public IConfiguration _configuration;

        public UserServiceImpl(Db db , IConfiguration configuration)
        {
            _db = db;
            _configuration = configuration;
        }

        public async  Task<LoginResponse> login(LoginRequest _userData)
        {

            if (_userData != null && _userData.username != null && _userData.password != null)
            {
                var user = await getUser(_userData.username, _userData.password);

                if (user != null)
                {
                    //create claims details based on the user information
                    var claims = new[] {

                        new Claim("sub", user.ID.ToString()),
                        new Claim("username", user.username),
                        new Claim("email", user.email)
                    };

                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                    var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                    var jwtSettings = _configuration.GetSection("Jwt");
                    var token = new JwtSecurityToken(
                         jwtSettings["Issuer"],
                         jwtSettings["Audience"],
                         claims,
                        expires: DateTime.UtcNow.AddMinutes(30),
                        signingCredentials: signIn);


                    var string_token = new JwtSecurityTokenHandler().WriteToken(token);

                    return new LoginResponse(string_token, "Logged in !");
                }
                else
                {

                    return new LoginResponse(null, "invalid username and password");
                }
            }
            else
            {

                return new LoginResponse(null, "please provide username and password");
            }

        }


        public async Task<User> getUser(string username , string password)
        {
            return await _db.Users.FirstOrDefaultAsync(u => u.username == username && u.password == password);

        }


        public async Task<UserResponse> register(RegisterRequest req)
        {
            var us = _db.Users.SingleOrDefault(u => u.username == req.username);
            if (us != null)
            {
                return new UserResponse(null, "username already exits");
            }

            User user = new User();
            user.username = req.username;
            user.email = req.email;
            user.password = req.password;
            _db.Users.AddAsync(user);
            _db.SaveChanges();
            return new UserResponse(user, "User registered successfully");

        }
    }
}

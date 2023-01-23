using MonstaBackend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using MonstaBackend.context;
using MonstaBackend.Response;
using MonstaBackend.Request;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using MonstaBackend.Services;

namespace MonstaBackend.Controllers
{
    [ApiController]
    
    public class UserController : Controller
    {
        private readonly UserService _service;
       


        public UserController(UserService userService)
        {
            _service = userService;
        }

        [HttpPost("/api/register")]
        public UserResponse register([FromBody] RegisterRequest req)
        {
            return _service.register(req).Result; 
        }
        [HttpPost("/api/login")]
        public  LoginResponse login(LoginRequest _userData)
        {
               return _service.login(_userData).Result;
        }

    
       
    }
}

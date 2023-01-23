using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MonstaBackend.Models;
using MonstaBackend.Services;
using System.Net.Http.Headers;
using System.Text;

namespace MonstaBackend.Controllers
{


        
    [ApiController]
    public class GenreController : Controller
    {

        private readonly GenreService _service;
        public GenreController(GenreService service)
        {
            _service = service;
        }
        [Authorize]
        [HttpGet("/api/genres")]
        public async  Task<List<Genre>> index(
            [FromHeader(Name= "Authorization")] string token,
            [FromQuery] string code,
            [FromQuery] string date,
            [FromQuery] string store)
        {

            
           
            return await _service.getAllGenres(code,date,store);
        }



        //get Application per genre
        [Authorize]
        [HttpGet("/api/genres/apps")]
        public  List<App> getApps(
            [FromHeader(Name = "Authorization")] string token,
            [FromQuery] string genre_id ,
            [FromQuery] string code,
            [FromQuery] string date,
            [FromQuery] string store
            )
        {
            return _service.getAppsByGenre(genre_id, code, date, store);
        }
        [Authorize]
        [HttpGet("/api/apps")]
        public  App getApp(
             [FromHeader(Name = "Authorization")] string token,
            [FromQuery] string app_id ,
            [FromQuery] string code,
            [FromQuery] string store

            )
        {
            if (app_id == null || code == null || store == null) return null;
            return _service.getAppDetails(app_id, code, store).Result;
        }

    }
}

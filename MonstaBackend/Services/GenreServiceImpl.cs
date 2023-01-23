using MonstaBackend.Models;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using System.Text;
using System.Web;

namespace MonstaBackend.Services
{
    public class GenreServiceImpl : GenreService
    {
        private readonly IConfiguration _configuration;
        public GenreServiceImpl(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        
        /* A direct API call without modification
            */
        public async Task<List<Genre>> getAllGenres(String country , String date , String store)
        {
            var client = new HttpClient();
            var secret = _configuration["API_KEY"] + ":1234";
            var byteArray = Encoding.ASCII.GetBytes(secret);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", Convert.ToBase64String(byteArray));
           
  
             List<Genre> genres = new List<Genre>();
            var uriBuilder = new UriBuilder("https", "api.appmonsta.com");
            uriBuilder.Path = $"v1/stores/{store}/rankings/genres.json";
            var query = HttpUtility.ParseQueryString(uriBuilder.Query);
            query["date"] = date;
            query["country"] = country;
            uriBuilder.Query = query.ToString();
            string url = uriBuilder.ToString();




            var response = await client.GetAsync(url);

               var content = await response.Content.ReadAsStringAsync();
                string[] jsonObjects = content.Split("\n");
            
                foreach (string jsonObject in jsonObjects)
                {
                    if (jsonObject.Trim() != "")
                    {
                        Genre genre = JsonConvert.DeserializeObject<Genre>(jsonObject);
                        if (genre.genre_id == null || genre.name == null) continue;
                        //this code is commented becuase it is it is taking time + many api calls to find the first
                        //application then gets its details , knowing that Monsta free trail only allows 100 calls/day 
                        //genre.image = AddGenreIcon(genre.genre_id,country,date,store);
                        genres.Add(genre);
                    }
                
            }
        
            return genres;
        }

         /** 
          * the results of this API are not directly used , it is where we get to join between genres and
          * applications and use it in later functions
          */

        public async Task<List<Rank>> getAllRanks(String code, String date, String store)
        {
            //1-get all ranks
            var client = new HttpClient();
            var secret = _configuration["API_KEY"] + ":1234";

            var byteArray = Encoding.ASCII.GetBytes(secret);
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", Convert.ToBase64String(byteArray));
            var response = await client.GetAsync("https://api.appmonsta.com/v1/stores/"+store+"/rankings/aggregate.json?country="+code+"&date="+date);
            var content = await response.Content.ReadAsStringAsync();
            string[] jsonObjects = content.Split("\n");
            List<Rank> ranks = new List<Rank>();
            foreach (string jsonObject in jsonObjects)
            {
                if (jsonObject.Trim() != "")
                {
                    Rank rank = JsonConvert.DeserializeObject<Rank>(jsonObject);

                    ranks.Add(rank);
                }
            }
            return ranks;
        }
        
         /*
          * Using a direct API without the need of modifing the results ,
          * but instead of saving all the properties I only saved the attributes we are intreasted in
          * using [JsonProperty] becuase the details return a long -not needed for our business case-
          * 
          */

        public async Task<App> getAppDetails(string appId , string country , string store)
        {
            var client = new HttpClient();
            var byteArray = Encoding.ASCII.GetBytes("4432bafb3d59364923722642b79c86588bf10279:1234");
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", Convert.ToBase64String(byteArray));
            var response = await client.GetAsync("https://api.appmonsta.com/v1/stores/"+store+"/details/"+appId+".json?country="+country);
            var content = await response.Content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<App>(content);

        }

        /**
         * since there is no direct API at monsta to get App by genre , I am calling the API which fetches 
         * the ranks , knowing that each group of ranks has there genre_id , I joined the applications with
         * their genre 
         * The API :
         GET https://api.appmonsta.com/v1/stores/<store>/rankings/aggregate.json?country=<country_code>&date=<date>
           This is the response schema from app monta :
         {"ranks":["com.free.daily.horoscope.zodiac.secret","com.valpak.android",
          "com.srpinfosoft.Claptoflashlightonoff","com.tuya.smart",...],
           "country":"US",
           "rank_id":"apps_movers_shakers",
           "genre_id":"LIFESTYLE"}
          Thats why I am :
         -looping throught the ranks
         - checking the genre_id of this rank , if it matches the genre_id I am getting the apps for

         * 
         */

        public List<App> getAppsByGenre(String genre_id, String code, String date, String store)
        {
            List<Rank> ranks = getAllRanks(code,date,store).Result;
            List<App> res = new List<App> ();
            foreach(var r in ranks)
            {
                if(r.genre_id==genre_id)
                {
                    foreach(var app in r.ranks)
                    {

                        
                        App a = getAppDetails(app,code,store).Result;
                        a.id = app;
                       
                        res.Add(a);
                        //this break statment to get only the first group of Apps
                        //in this genre , in order to minimize the number API calls , time and load
                        break;
                    }
                }
            }
            return res;

        }

         /*
          * To get the genre icon , which is the icon of the  first application in the genre
          * I followed the same approach of fetching the Apps by genre , but breaking the loop as soon as 
          I  find the first application  , then calling the API that fetches the details of a single app*/

          public String AddGenreIcon(String genre_id, String code, String date, String store)
        {
            List<Rank> ranks = getAllRanks(code, date, store).Result;
            String icon = "";
            foreach (var rank in ranks)
            {
                if (rank.genre_id == genre_id)
                {
                    icon = getAppDetails(rank.ranks[0], code, store).Result.iconUrl;
                    break;
                }
            }
            return icon;

        }
    }
}


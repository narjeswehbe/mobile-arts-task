using Newtonsoft.Json;

namespace MonstaBackend.Models
{
    public class App
    {
        [JsonProperty("id")]
        public string id { get; set; }

        [JsonProperty("app_name")]
        public string name { get; set; }

        [JsonProperty("icon_url")]
        public string iconUrl { get; set; }

        [JsonProperty("description")]
        public string description { get; set; }

        [JsonProperty("all_rating")]
        public float rating { get; set; }

        [JsonProperty("screenshot_urls")]
        public List<String> screenshot_urls { get; set; }
        [JsonProperty("publisher_name")]
        public String publisher { get; set; }
        [JsonProperty("genres")]
        public List<String> genres { get; set; }




    }
}

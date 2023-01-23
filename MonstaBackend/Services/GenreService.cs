using MonstaBackend.Models;

namespace MonstaBackend.Services
{
    public interface GenreService
    {
        Task<List<Rank>> getAllRanks(String code, String date, String store);
        Task<List<Genre>> getAllGenres(String code , String date , String store);

        Task<App> getAppDetails(String appId,String c , String store);

        List<App> getAppsByGenre(String genre_id, String code, String date, String store);
       
      

    }
}

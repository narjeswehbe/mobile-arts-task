## How to Run this project locally ? 

- change the following configurations in backend project / appsettings.json
   - Mysql connection link (port , username , password & database name if necessary)
   - if the APIS are not fetching , it may be that I used my 100 free calls during testing , 
      if you'd like to provide another API KEY for monsta change it here : appsettings.json "API_KEY"

> Kindly take into consideration that this is my first Angular project , other than the mini pprojects I built during learning angular      

## APIS :
- (get request) /genres/country/date/store : fetch all the genres  , directly from monsta api with specific filters
- (get request) /genre/id/country/date/store : fetches the apps for a specific genre , but there is no specific api to fetch apps by genre , I fetched all ranks and checked the application ranks that has this genre , then fetching its details , the filters are passed down from all genres page
- (get request) /apps/id/country/store fetching application details using an api directly from monsta api , the filters are passed down from apps by genre page
- (post request) /login : for the authentication process I used JWT authentication . JWT generates a token everytime the user loggs in , this toke should be sent in every request header in order for the user to access the resources 
Moreover , before every action in the frontend we check for the token in localstorage and check its expiry time
-(post requet) /register : registers the user into our database

  > logout is not a request , since jwt tokens are statless , we cannot track / unvalidate them from the backend , it is enough to remove the token from localstorage and redirect the user to login page again

  



## Default values
- I am using default filters (if the user doesnt choose any) because monsta free trail only renders the data for itunes / US / and the date you get the free key , if the user tries other filters a convenient message is displayed 


<br>
I apppreciate any professional feedback for this project
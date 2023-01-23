import { Component ,OnInit } from '@angular/core';
import { HttpClient, HttpHeaders , HttpParams } from '@angular/common/http';
import {Genre} from  './genre';
import { Router } from '@angular/router';

@Component({
  selector: 'mb-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrls: ['./genre-list.component.css']
})
export class GenreListComponent {

  constructor(private http: HttpClient , private router : Router) {}
  isFetched=false;
  data: Genre[] = [];
  //deafult filtering values accroding to the Monsta API free key
  country = "US"
  date="2023-01-18"
  store="itunes"
  message=""
  
  ngOnInit() {
     this.fetchData(this.country,this.date,this.store);
     
  }
  
   fetchData(country:string , date:string,store:string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
   
    const queryParams = new HttpParams().set("code",country)
                                      .set("date",date)
                                      .set("store" , store)
    
     console.log(queryParams)
     this.http.get('https://localhost:7080/api/genres'  , {
      headers:headers , params:queryParams 
     }).subscribe(
      (response) => {
        this.data=response as Genre[]
        this.isFetched=true
        if(this.data.length==0)
        {
          this.message="No data available"
        }else this.message=""
        
      },
      (error) => {
        console.log(error);
        
        this.isFetched=true;
     
      }
    );
  }
  goToGenre(id: string  , name:string) {
    localStorage.setItem("title" , name)
    this.router.navigate(['/genre', id , this.country ,this.date , this.store]);
  }
    selectStore(store:string) {


     let itunes_btn = document.getElementById('itunes-btn')
     let android_btn = document.getElementById('android-btn')
     if(itunes_btn)
     {
      itunes_btn.classList.remove('active')
     }
     if(android_btn)
     {
      android_btn.classList.remove('active')
     }
    
    if (store === 'android' && android_btn) {
      android_btn.classList.add('active');
     } else if(itunes_btn) {
      itunes_btn.classList.add('active');}
      this.store = store;
      this.fetchData(this.country , this.date,this.store);
    } 


    onCountryChange(event: any)  
    {
      console.log("changing country")
     
      this.country = event.target.value;
     
      this.fetchData(this.country , this.date,this.store);
    }
    onChangeDate(event: any)
    {
      this.date=event.target.value;
      this.fetchData(this.country, this.date, this.store);
    }
    
   
      
  



}

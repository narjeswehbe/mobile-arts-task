import { Component ,OnInit } from '@angular/core';
import {App} from './app';
import { ActivatedRoute } from '@angular/router';
import { HttpClient ,HttpHeaders,HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'mb-app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.css']
})

export class AppListComponent implements OnInit {
  genreId: String='';
  country:String='US';
  date:String='2023-01-18';
  store:String='itunes';
  title:string=''
  data:App[] = []
  isFetched=false;
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient ,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.title = localStorage.getItem('title') as string;
    this.route.paramMap.subscribe(params => {
      if(params.get('id') !== null) {
        this.genreId =  params.get('id') as string;
      } else {
        this.genreId = '';
      }
      if(params.get('store') !== null) {
        this.store =  params.get('store') as string;
      }
      if(params.get('date') !== null) {
        this.date =  params.get('date') as string;
      } 
      if(params.get('country') !== null) {
        this.country =  params.get('country') as string;
      } 


    });
    this.fetchData()
  }
  fetchData(): void {
      var country , date , store

      
      if(localStorage.getItem('contry')!=null)   
      {
         country = localStorage.getItem('country')
      }else country="US"
      if(localStorage.getItem('date')!=null)   
      {
         date = localStorage.getItem('date');
      }else country="2023-01-18"
      if(localStorage.getItem('store')!=null)   
      {
         store = localStorage.getItem('store');
      }else country="itunes"
      
      
      const params = new HttpParams().set("code" , country as string)
                                     .set("date" ,date as string)
                                     .set("store" , store as string)
                                     .set("genre_id" , this.genreId as string)
                                 
 
     this.http.get('https://localhost:7080/api/genres/apps' , { params:params}).subscribe(
      (response) => {
        console.log('fetching')
        console.log(response);
        this.data=response as App[]
        this.isFetched=true
      
      },
      (error) => {
        console.log(error);
        this.isFetched=true;
      }
    );
  }
  goToApp(id : string)
  {
    this.router.navigate(['/apps', id , this.country , this.store]); 
  }
  

}

import { Component } from '@angular/core';
import {App} from '../app-list/app';
import { ActivatedRoute } from '@angular/router';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'mb-app-details',
  templateUrl: './app-details.component.html',
  styleUrls: ['./app-details.component.css']
})
export class AppDetailsComponent {
  appId: String='';
  data:App = new App();
 
  country:String='';
  store:String=''
  formatted:any
  images = [  
    { img: "https://play-lh.googleusercontent.com/3tLV4cYsh0q3KGB2ECwZNoN70AaO4zN1vNrVwmTQS3-MIG_SiZvLQxmwW7jGEMNr8PI" },  
    { img: "https://play-lh.googleusercontent.com/3tLV4cYsh0q3KGB2ECwZNoN70AaO4zN1vNrVwmTQS3-MIG_SiZvLQxmwW7jGEMNr8PI" },  
    { img: "https://play-lh.googleusercontent.com/3tLV4cYsh0q3KGB2ECwZNoN70AaO4zN1vNrVwmTQS3-MIG_SiZvLQxmwW7jGEMNr8PI" },  
    { img: "https://play-lh.googleusercontent.com/3tLV4cYsh0q3KGB2ECwZNoN70AaO4zN1vNrVwmTQS3-MIG_SiZvLQxmwW7jGEMNr8PI" },  
    { img: "https://play-lh.googleusercontent.com/3tLV4cYsh0q3KGB2ECwZNoN70AaO4zN1vNrVwmTQS3-MIG_SiZvLQxmwW7jGEMNr8PI" },  
    
     
  ];
  slideConfig = {  
    "slidesToShow": 3,  
    "slidesToScroll": 3,  
    "dots": true,  
  
    "arrows": false,
   
    
   
  };    
  

  isFetched=false;
  Message=""
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient ,
    private router: Router , 
    private sanitizer : DomSanitizer
  ) { }
  ngOnInit(): void {
    this.data.rating=5
    this.route.paramMap.subscribe(params => {
      if(params.get('id') !== null) {
        this.appId =  params.get('id') as string;
      } else {
        this.appId = '';
      }
      if(params.get('country') !== null) {
        this.country =  params.get('country') as string;
      } else {
        this.country = 'US';
      }
      if(params.get('store') !== null) {
        this.store =  params.get('store') as string;
      } else {
        this.store = 'itunes';
      }
    });
    this.fetchData()
  }
  fetchData(): void {
    if(localStorage.getItem('token')==null) {
      var error = 'Your session is expired please login again'
      this.router.navigate(['/login' , error]);
    }
   
    
   
     this.http.get('https://localhost:7080/api/apps?app_id='+this.appId+'&code='+this.country+'&store='+this.store ).subscribe(
      (response) => {
       
        this.data=response as App
       
        this.formatted = this.sanitizer.bypassSecurityTrustHtml(`<ul>${this.data.description}</ul>`);
        this.isFetched=true
       
      },
      (error) => {
        console.log(error);
        this.Message="Application not found"
        this.isFetched=true;
      
      }
    );
  }




}

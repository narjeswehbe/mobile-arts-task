import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'mb-login',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
 
  username :string='';
  password:string='';
  errorMessage:string='';


  constructor(private http: HttpClient , private router: Router ) {}
  onSubmit() {
    
    
    if(this.username=='' || this.username==null)
    {
      this.errorMessage="Username is required"
      return
    }
    if(this.password=='' || this.password==null)
    {
      this.errorMessage="Password is required"
      return
    }
  
    const headers = new HttpHeaders().set('content-Type', 'application/json');

    this.http.post('https://localhost:7080/api/login',  {username:this.username, password:this.password}, {headers}).subscribe(
        (response) => {
          // Successful login
           // Extract the token from the response
        
          
           const token = (response as any).token;
          
           if(token==null || token.length==0) 
           {
            this.router.navigate(['/login']);
            this.errorMessage = (response as any).message;
            return
           }
           // Store the token in local storage or a service
           // to keep the user logged in
           localStorage.setItem('token', token);
           this.router.navigate(['/genres'])
        },
        (error) => {
          // Handle login error
          console.log(error);
          this.router.navigate(['/login'])
          
        }
      );
      

   
}



}

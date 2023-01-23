import { Component } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'mb-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {
  username: string=''
  password: string=''
  email: string=''
  errorMessage: string=''
  private emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  constructor(private http: HttpClient , private router: Router ) {}
  onSubmit(event: Event) {
    event.preventDefault();
  
    if(this.email=='' || !this.emailRegex.test(this.email)) 
    {
      this.errorMessage="email is empty or invalid"
      return
    }
    if(this.username=='') {
      this.errorMessage="username is required"
      return
    }
    if(this.password=='') 
    {
      this.errorMessage="password is required"
      return
    }
    const headers = new HttpHeaders().set('content-Type', 'application/json');

    this.http.post('https://localhost:7080/api/register',  {username:this.username,email: this.email,password:this.password}, {headers}).subscribe(
        (response) => {
            if((response as any).user ==null)
            {
              this.errorMessage = (response as any).message;
              return
            }
           this.router.navigate(['/login'])
        },
        (error) => {
          // Handle login error
          console.log(error);
          this.errorMessage="An error occured please try again"
          this.router.navigate(['/registe'])
        }
      );
      

  }


}

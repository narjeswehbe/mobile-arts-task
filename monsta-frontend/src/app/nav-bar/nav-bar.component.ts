import { Component } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'mb-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  constructor(public router: Router){}
  logout(): void{
    console.log(localStorage.getItem('token'))
    localStorage.removeItem('token')
    console.log(localStorage.getItem('token'))
    this.router.navigate(['/login']);
  
  }

}

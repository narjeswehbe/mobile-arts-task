import { NgModule } from '@angular/core';
import { RouterModule, Routes  } from '@angular/router';
import { AppListComponent } from './app-list/app-list.component';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { GenreListComponent } from './genre-list/genre-list.component';
import { AppDetailsComponent } from './app-details/app-details.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { AboutUsComponent } from './about-us/about-us.component';


const routes: Routes = [
  { path: 'login', component: LoginFormComponent   },
  {path:'register' , component:RegisterFormComponent },
  { path: 'genre/:id/:country/:date/:store', component: AppListComponent },
  {path:'genres' , component: GenreListComponent } , 
  {path:'aboutus' , component: AboutUsComponent } , 
  {path:'apps/:id/:country/:store' , component: AppDetailsComponent},
 
  {path: '',
  pathMatch: 'full',
  redirectTo: 'genres'},
 
  
  
];



@NgModule({
  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

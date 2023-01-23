import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { GenreListComponent } from './genre-list/genre-list.component';
import { AppListComponent } from './app-list/app-list.component';
import { AppDetailsComponent } from './app-details/app-details.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';  
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from './jwt.middleware';
import { AboutUsComponent } from './about-us/about-us.component';
@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ] , 
  declarations: [
    AppComponent,
    LoginFormComponent,
    GenreListComponent,
    AppListComponent,
    AppDetailsComponent,
    NavBarComponent,
    RegisterFormComponent,
    AboutUsComponent,
  
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SlickCarouselModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
  {
    provide:HTTP_INTERCEPTORS,
    useClass:JwtInterceptor,
    multi: true
  }
 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

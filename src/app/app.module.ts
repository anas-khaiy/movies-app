import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AngularFireModule} from '@angular/fire/compat'
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { ForgetPasswordComponent } from './component/forget-password/forget-password.component';
import { EmailVerificationComponent } from './component/email-verification/email-verification.component';
import { BackgroundVideoComponent } from './component/background-video/background-video.component';
import { HomeComponent } from './component/home/home.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { FooterComponent } from './component/footer/footer.component';
import { ProfileComponent } from './component/profile/profile.component';
import { MainPageComponent } from './component/main-page/main-page.component';
import { DetailsComponent } from './component/details/details.component';
import { YouTubePlayerModule } from "@angular/youtube-player";
import { BrowseComponent } from './component/browse/browse.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ForgetPasswordComponent,
    EmailVerificationComponent,
    BackgroundVideoComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    ProfileComponent,
    MainPageComponent,
    DetailsComponent,
    BrowseComponent
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    YouTubePlayerModule,
    FormsModule
  ],
  providers: [NavbarComponent,BrowseComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

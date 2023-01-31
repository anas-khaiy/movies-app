import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ForgetPasswordComponent } from './component/forget-password/forget-password.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/compat/auth-guard';
import { MainPageComponent } from './component/main-page/main-page.component';
import { ProfileComponent } from './component/profile/profile.component';
import { DetailsComponent } from './component/details/details.component';
import { BrowseComponent } from './component/browse/browse.component';

const adminOnly = () => hasCustomClaim('admin');
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToItems = () => redirectLoggedInTo(['items']);
const belongsToAccount = (next:any) => hasCustomClaim(`account-${next.params.id}`);


const routes: Routes = [{path:"",redirectTo:'home',pathMatch:'full',},
  {path:"login",component:LoginComponent,/*canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToItems } */},
  {path:"dashboard",component:DashboardComponent},
  {path:"register",component:RegisterComponent},
  {path:"browse",component:BrowseComponent},
  {path:"details/:id",component:DetailsComponent},
  {path:"forget-password",component:ForgetPasswordComponent},
  {path:"home",component:HomeComponent,},
  {path:"main-page",component:MainPageComponent,/*canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }*/},
  {path:"profile",component:ProfileComponent,/*canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } */ }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

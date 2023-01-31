import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {  Router } from '@angular/router';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  navbarState=false

  constructor(private fireAuth:AngularFireAuth,private router:Router)
  {
    this.fireAuth.onAuthStateChanged(user=>
      {
        
        if(!user?.emailVerified)
        {
          this.navbarState=false
         // this.router.navigate(["/login"])
        }
        else 
        {
          this.navbarState=true
        }   
      })
  }
}

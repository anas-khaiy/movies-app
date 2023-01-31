import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {  Router } from '@angular/router';
import { DataModService } from './shared/data-mod.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'firebase-app2';
  constructor(private fireAuth:AngularFireAuth,private router:Router,private dataM:DataModService)
  {

    
    this.fireAuth.onAuthStateChanged(user=>
      {

        if(!user?.emailVerified)
        {
          this.router.navigate(["/login"])
        }    
      })

      
      
  }
  ngOnInit(): void {
    
    
  }

  onActivate(e:any)
  {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

    
}

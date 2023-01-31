import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  
  constructor(private fireAuth:AngularFireAuth,private router:Router){
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

  logout()
  {
      
  }
}

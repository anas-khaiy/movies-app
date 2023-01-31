import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginStatut:boolean=false
  registerStatut:boolean=false
  msgError:string="ljnlkn"
  constructor(private fireAuth:AngularFireAuth,private router:Router) { }

  login(email:string,password:string)
  {
    this.fireAuth.signInWithEmailAndPassword(email,password).then(()=>{
      this.loginStatut=true
        localStorage.setItem("token","true")
      this.router.navigate(["dashboard"])
      

    },err=>{
      this.loginStatut=false
      this.router.navigate(["/loign"])
    })
  } 
  
  register(email:string,password:string)
  {
    let errorMsg:string=''
    this.fireAuth.createUserWithEmailAndPassword(email,password).then(()=>{
      alert("Well done Sign In Now")
      this.registerStatut=true

    },err=>{
      alert(err.message)
      this.registerStatut=false
      //this.router.navigate(["/register"])
    })

    this.msgError=errorMsg
    
  }

  

  logout()
  {
    this.fireAuth.signOut().then(()=>
    {
      localStorage.removeItem("token")
      this.router.navigate(["/login"])

    }, err =>{
      alert(err.massage)
    })
  }
}

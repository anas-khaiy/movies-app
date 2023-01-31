import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import {GoogleAuthProvider} from '@angular/fire/auth'
import firebase from 'firebase/compat/app';
import { DataModService } from 'src/app/shared/data-mod.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:string=""
  password:string=""

 

  constructor(private authService:AuthService,private fireAuth:AngularFireAuth,private router:Router,private dataM:DataModService){
   
  }


  ngOnInit(): void {

    
    this.fireAuth.onAuthStateChanged(user=>
      {
        if(user?.emailVerified)
        {
          this.router.navigate(["/home"])
        }
        
      })

      
  }

  
  login()
  {

    const checkRegister=document.getElementById("checkLogin") as HTMLElement
    if(this.email=="" || this.password=="")
    {
      checkRegister.innerHTML="please insert all fields"
      checkRegister.style.color="rgb(255, 145, 145)"
      checkRegister.style.display="block"
    }
    else
    {
      const loadIcon=document.getElementById("loadIcon") as HTMLElement
      loadIcon.style.display="inline"

      this.fireAuth.signInWithEmailAndPassword(this.email,this.password).then(res=>{
        
        if(res.user?.emailVerified==true)
        {
          loadIcon.style.display="none"
          this.router.navigate(["home"])
        }
        else
        {
          loadIcon.style.display="none"
          checkRegister.innerHTML="please verifiy your email"
          checkRegister.style.color="rgb(255, 145, 145)"
          checkRegister.style.display="block"
        }
        

    },err=>{
        loadIcon.style.display="none"
        checkRegister.innerHTML=""+err.message.slice(9)
        checkRegister.style.color="rgb(255, 145, 145)"
        checkRegister.style.display="block"
      
    })
    }
    
  } 

  signInWithGoogle()
  {
    const checkRegister=document.getElementById("checkLogin") as HTMLElement
    const loadIcon=document.getElementById("loadIcon") as HTMLElement
    

    this.fireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(res=>
      {
        console.log(res.user?.email)
        console.log(res.user?.displayName)
        console.log(res.user?.uid)
        
        this.dataM.addUsersGoogle(res.user?.email as string,res.user?.displayName as string,res.user?.uid as string)
      
        //this.router.navigate(["/home"])
      },err=>
      {
        loadIcon.style.display="none"
        checkRegister.innerHTML=""+err.message
        checkRegister.style.color="rgb(255, 145, 145)"
        checkRegister.style.display="block"
      })
  }


  
}

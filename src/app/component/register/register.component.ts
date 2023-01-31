import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Form } from '@angular/forms';
import { DataModService } from 'src/app/shared/data-mod.service';
import { User } from 'src/app/model/user';
import { Users } from 'src/app/classes/users';
import { user } from '@angular/fire/auth';

import {AngularFireDatabase,AngularFireList} from '@angular/fire/compat/database'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userList?:AngularFireList<Users>
  check=0
  email:string=""
  password:string=""
  username:string=""
  passwordConf:string=""
  valid:boolean=false
  listUsernames:string[]=[]
  
  constructor(private fireAuth:AngularFireAuth,private router:Router,private dataM:DataModService){}

  ngOnInit(): void {
    this.fireAuth.onAuthStateChanged(user=>
      {
        if(user?.emailVerified)
        {
          this.router.navigate(["/home"])
        }
        
      })
    this.dataM.getUsers().subscribe(list=>
      {
        list.forEach(u=>
          {
            this.listUsernames.push(u.payload.val()?.username as string)
          })
      })

     console.log(this.listUsernames) 
  
  
    }


  
  


  register()
  {
    const checkRegister=document.getElementById("checkRegister") as HTMLElement
    const checkRegisterError=document.getElementById("checkRegisterError") as HTMLElement
    
    if(this.email=="" || this.password=="" || this.username=="" || this.passwordConf=="")
    {
      checkRegisterError.innerHTML="please insert all fields"
      checkRegisterError.style.display="block"

    }
    else if(this.password!=this.passwordConf)
    {
      checkRegisterError.innerHTML="passwords not matching"
      checkRegisterError.style.display="block"
    }
    else
    {
      //check Username First
      
      const loadIcon=document.getElementById("loadIcon") as HTMLElement
      loadIcon.style.display="inline"

      if(this.listUsernames.filter(u=>u==this.username).length!=0)
      {
        loadIcon.style.display="none"
        checkRegisterError.innerHTML="username already exists"
        checkRegisterError.style.display="block"
        checkRegister.style.display="none"
      }
      else
      {
        
        
        this.fireAuth.createUserWithEmailAndPassword(this.email,this.password).then(res=>{
          
          res.user?.sendEmailVerification().then(()=>
          {
            checkRegister.style.display="block"
            checkRegisterError.style.display="none"
            this.valid=true
            loadIcon.style.display="none"
            this.dataM.addUsers(this.email,this.username)
            
  
            this.email=""
            this.password=""
            this.username=""
            this.passwordConf=""
            alert("Please Verify Your Email")
            
          }, err =>{
            checkRegisterError.innerHTML=""+err.message.slice(9)
            checkRegisterError.style.display="block"
            checkRegister.style.display="none"
            loadIcon.style.display="none"
          })
           
  
        },err=>{
          loadIcon.style.display="none"
          checkRegisterError.innerHTML=""+err.message.slice(9)
          checkRegisterError.style.display="block"
          checkRegister.style.display="none"
        })
      }

      
        

      
      

      
    }
    

  }



  
}

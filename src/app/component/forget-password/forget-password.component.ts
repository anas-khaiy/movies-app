import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  valid:boolean=false
  email:string=""
  constructor(private fireAuth:AngularFireAuth,private router:Router){}

  forgotPassword()
  {
    const checkRegister=document.getElementById("checkLogin") as HTMLElement

    if(this.email=="")
    {
      checkRegister.innerHTML="please insert The Email"
      checkRegister.style.color="rgb(255, 145, 145)"
      checkRegister.style.display="block"
    }
    else
    {
      const loadIcon=document.getElementById("loadIcon") as HTMLElement
      loadIcon.style.display="inline"
      this.fireAuth.sendPasswordResetEmail(this.email).then(()=>
      {
        this.valid=true
        this.email=""
        loadIcon.style.display="none"
        checkRegister.innerHTML="please check your email to reset password"
        checkRegister.style.color="#378DE5"
        checkRegister.style.display="block"
      },err=>
      {
        loadIcon.style.display="none"
        checkRegister.innerHTML=""+err.message.slice(9)
        checkRegister.style.color="rgb(255, 145, 145)"
        checkRegister.style.display="block"
      })
    }
    
  }
}

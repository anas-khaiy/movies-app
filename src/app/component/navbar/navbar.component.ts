import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {  Router,NavigationEnd } from '@angular/router';
import { DataModService } from 'src/app/shared/data-mod.service';
import { BrowseComponent } from '../browse/browse.component';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  classApplied=false
  navbarState=false
  hideSearch=false


  constructor(private fireAuth:AngularFireAuth,private router:Router,private dataM:DataModService)
  {
    
    this.fireAuth.onAuthStateChanged(user=>
      {
        
        if(!user?.emailVerified)
        {
          this.navbarState=false
          //this.router.navigate(["/login"])
        }
        else 
        {
          this.navbarState=true
        }   
      })
  }
  ngOnInit(): void {
    
  }

  clickNav=false

  clickMe() :void{
    const nav=document.getElementById("nav") as HTMLHtmlElement
    this.classApplied = !this.classApplied;
    if(!this.clickNav)
    {
      this.clickNav=true
      nav.style.display="block"
    }
    else
    {
      this.clickNav=false
      nav.style.display="none"
    }
  }

  hideSearchFunction()
  {
    this.hideSearch=false
  }
  showSearchFunction()
  {
    this.hideSearch=true
  }

  clickHome()
  {
    this.hideSearch=false
  }

  clickProfile()
  {
    this.hideSearch=false

  }
  clickBrowse()
  {
    this.hideSearch=true

  }

  searchFunction(e :any)
  {
    
    
    
  }

  clickForSearch()
  {
    /*
    console.log("Clicked")
    const searchInput=document.getElementById("searchText") as HTMLInputElement
    this.dataM.getMovieSearch(searchInput.value)
    */
  }
}

import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import {AngularFireDatabase,AngularFireList} from '@angular/fire/compat/database'
import { Users } from 'src/app/classes/users';
import { Movies } from 'src/app/classes/movies';
import { DataModService } from 'src/app/shared/data-mod.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userList?:AngularFireList<Users>
  moviesList?:AngularFireList<Movies> | undefined
  moviesListCurrentUSer?:AngularFireList<Movies>
  userEmail=""
  listUsers:Users[]=[]
  listMovies:Movies[]=[]
  constructor(private fireAuth:AngularFireAuth,private router:Router,private dataM:DataModService,private storage: AngularFireStorage){

    
  }

  
  ngOnInit(): void {

    

    //Profile Informations

    this.fireAuth.onAuthStateChanged(user=>
      {
        var usernameUser=document.getElementById("usernameUser") as HTMLLIElement
        var statutUser=document.getElementById("statutUser") as HTMLLIElement
        var numberMovieAdded=document.getElementById("numberMovieAdded") as HTMLLIElement
        var numberLikes=document.getElementById("numberLikes") as HTMLLIElement
        var numberViews=document.getElementById("numberViews") as HTMLLIElement
        var numberShare=document.getElementById("numberShare") as HTMLLIElement
        var profileImageUser=document.getElementById("profileImageUser") as HTMLImageElement
        if(user?.emailVerified)
        {
          
          this.dataM.getUsers().subscribe(list=>
            {
              /*public email:string,public username:string,public idUSer:string,
              public numberMovieAdded:string,public numberLikes:string,public numberViews:string,
              public numberShare:string,public profileImg:string */
        
              list.filter(u=>u.payload.val()?.email==user.email).forEach(u=>
                {
                  
                 var user= new Users(u.payload.val()?.email as string,
                  u.payload.val()?.username as string,
                  u.payload.val()?.idUSer as string,
                  u.payload.val()?.numberMovieAdded as string,
                  u.payload.val()?.numberLikes as string,
                  u.payload.val()?.numberViews as string,u.payload.val()?.numberShare as string,
                  u.payload.val()?.profileImg as string,u.payload.val()?.statutUser as string)

                  usernameUser.innerHTML=user.username
                  statutUser.innerHTML=user.statutUser
                  numberMovieAdded.innerHTML=user.numberMovieAdded
                  numberLikes.innerHTML=user.numberLikes
                  numberViews.innerHTML=user.numberViews
                  numberShare.innerHTML=user.numberShare

                  const ref = this.storage.ref(user.profileImg);
                  ref.getDownloadURL().forEach(url=>profileImageUser.src=url );
                  
                })
            })
      
           //console.log(this.listUsers) 
            
           
           this.userEmail=user?.email as string
           this.dataM.getMovies().subscribe(list=>
            {
              this.listMovies=[]
              list.filter(u=>u.payload.val()?.idUserMovie==user.email).forEach(u=>
                {
                  /*  constructor(public movieName:string,public movieYoutube:string, 
              public movieCategorie:string,public movieRating:string,public movieDescription:string
              ,public movieImg1:string, public movieImg2:string,public movieImg3:string,
              public currentFilm:string){} */
                const ref = this.storage.ref(u.payload.val()?.movieImg1 as string);
                 ref.getDownloadURL().forEach(url=>{
                    this.listMovies.push(new Movies(u.payload.val()?.idMovie as string,
                    u.payload.val()?.idUserMovie as string,u.payload.val()?.movieName as string,
                    u.payload.val()?.movieYoutube as string,u.payload.val()?.movieCategorie as string,
                    u.payload.val()?.movieRating as string,u.payload.val()?.movieDescription as string,
                    url as string,u.payload.val()?.movieImg2 as string,
                    u.payload.val()?.movieImg3 as string, u.payload.val()?.currentFilm as string, u.payload.val()?.size as string,
                    u.payload.val()?.downloads as string))
                 });
                  
                })
                
                console.log(this.listMovies)
                 
            })
          }
           
      })


      this.dataM.getMovies().subscribe()

     
      
  }

  clickedAddMovie=false
  classNameChange="addMovieClass1"
  addMovie(e:any)
  {
    e.preventDefault()
    const addMovieDiv=document.getElementById("addMovieDiv") as HTMLElement

    if(!this.clickedAddMovie)
    {
      addMovieDiv.style.display="block"
      addMovieDiv.style.height="800px"
      addMovieDiv.style.padding="50px"
      addMovieDiv.className="animate__animated animate__fadeInDown"
      this.clickedAddMovie=true
    }
    else
    {
      addMovieDiv.className="animate__animated animate__fadeOutUp"
      addMovieDiv.style.height="0px"
      addMovieDiv.style.padding="0px"
      this.clickedAddMovie=false

    }
   
    
    
  }
  

  
  logout()
  {
    this.fireAuth.signOut().then(()=>
      {
        localStorage.removeItem("token")
        this.router.navigate(["/login"])
      },err=>
      {
        alert(err.message)

      })
  }


  uploadMovie()
  {
      const  movieNameAddTxt = document.getElementById("movieNameAddTxt") as HTMLInputElement
      const  movieYoutubeAddTxt = document.getElementById("movieYoutubeAddTxt") as HTMLInputElement
      const  movieCategorieAddTxt = document.getElementById("movieCategorieAddTxt") as HTMLInputElement
      const  movieRatingAddTxt = document.getElementById("movieRatingAddTxt") as HTMLInputElement
      const  movieDescriptionAddTxt = document.getElementById("movieDescriptionAddTxt") as HTMLInputElement
      const  movieImg1Add = document.getElementById("movieImg1Add") as HTMLInputElement
      const  movieImg2Add = document.getElementById("movieImg2Add") as HTMLInputElement
      const  movieImg3Add = document.getElementById("movieImg3Add") as HTMLInputElement
      const loadingMoviesDiv=document.getElementById("loadingMoviesDiv") as HTMLElement
      if(movieNameAddTxt.value=="" || movieYoutubeAddTxt.value==""
       || movieCategorieAddTxt.value=="" || movieRatingAddTxt.value==""
       || movieDescriptionAddTxt.value=="" || movieImg1Add.value==""
       || movieImg2Add.value=="" || movieImg3Add.value=="")
       {
          alert("Please Insert All Fields")
       }
       else
       {
        
        //Upload Image 1
        loadingMoviesDiv.style.display="flex"
        let dateTime = new Date()
        const file =(movieImg1Add as HTMLInputElement)?.files?.[0];
        var filePath = 'movies/file1'+dateTime;
        const ref = this.storage.ref(filePath);
        
        
        ref.put(file).then(res =>
          {
              //Upload Image 2
              const file2 =(movieImg2Add as HTMLInputElement)?.files?.[0];
              const filePath2 = 'movies/file2'+dateTime;
              const ref2 = this.storage.ref(filePath2);
              ref2.put(file2).then(res=>{
              //Upload Image 3
              const file3 =(movieImg3Add as HTMLInputElement)?.files?.[0];
              const filePath3 = 'movies/file3'+dateTime;
              const ref3 = this.storage.ref(filePath3);
              ref3.put(file3).then(res=>{
                //Add Movie To DataBase

                this.dataM.addmovie(movieNameAddTxt.value,movieYoutubeAddTxt.value,movieCategorieAddTxt.value,movieRatingAddTxt.value,
                  movieDescriptionAddTxt.value,filePath,filePath2,filePath3,"no")

                  loadingMoviesDiv.style.display="none"
                  alert("Movie Uploaded")
                  movieNameAddTxt.value=""
                  movieYoutubeAddTxt.value=""
                  movieCategorieAddTxt.value=""
                  movieRatingAddTxt.value=""
                  movieDescriptionAddTxt.value=""
                  movieImg1Add.value=""
                  movieImg2Add.value=""
                  movieImg3Add.value=""
              })
              })
          })

          
        
        

        
        



       }


  }


  
  
}

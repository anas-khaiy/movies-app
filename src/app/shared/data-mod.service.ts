import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {AngularFireDatabase,AngularFireList} from '@angular/fire/compat/database'
import { User } from '../model/user';
import { Users } from '../classes/users';
import { Movies } from '../classes/movies';
import { Router } from '@angular/router';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Comments } from '../classes/comments';

@Injectable({
  providedIn: 'root'
})
export class DataModService {
   userList?:AngularFireList<Users>
   moviesList?:AngularFireList<Movies>
   commentsList?:AngularFireList<Comments>
   listMoviesAll:Movies[]=[]
   listMoviesSearch:Movies[]=[]
  constructor(private afs:AngularFireDatabase,private router:Router,private fireAuth:AngularFireAuth,private storage: AngularFireStorage){}

  getMovies()
  {
    this.moviesList=this.afs.list("movies")
    return this.moviesList.snapshotChanges()
  }

  getMoviesWithLimit(nb:number)
  {
    this.moviesList=this.afs.list("movies",ref=>ref.limitToFirst(nb))
    return this.moviesList.snapshotChanges()
  }

  getMovieSearch(searchValue:string)
  {
    if(searchValue!="")
    {
      this.listMoviesSearch=[]
      this.getMovies().subscribe(list=>
        {
          list.forEach(u=>
            {
              
            const ref = this.storage.ref(u.payload.val()?.movieImg1 as string);
             ref.getDownloadURL().forEach((url : any)=>{
                this.listMoviesAll.push(new Movies(u.payload.val()?.idMovie as string,
                u.payload.val()?.idUserMovie as string,u.payload.val()?.movieName as string,
                u.payload.val()?.movieYoutube as string,u.payload.val()?.movieCategorie as string,
                u.payload.val()?.movieRating as string,u.payload.val()?.movieDescription as string,
                url as string,u.payload.val()?.movieImg2 as string,
                u.payload.val()?.movieImg3 as string, u.payload.val()?.currentFilm as string, u.payload.val()?.size as string,
                u.payload.val()?.downloads as string))
             });
              
            })
  
        })
  
        this.listMoviesSearch=[]
        this.listMoviesAll.filter(mv=>new RegExp("\\b"+searchValue.toLowerCase().trim()+"\\b").test(mv.movieName.toLowerCase())).forEach(u=>{
        const ref = this.storage.ref(u.movieImg1 as string);
        this.listMoviesSearch.push(new Movies(u.idMovie as string,
              u.idUserMovie as string,u.movieName as string,
              u.movieYoutube as string,u.movieCategorie as string,
              u.movieRating as string,u.movieDescription as string,
              u.movieImg1 as string,u.movieImg2 as string,
              u.movieImg3 as string, u.currentFilm as string, u.size as string,
              u.downloads as string))
      })
    }

    
  }

  
  getUsers()
  {
    this.userList=this.afs.list("users")
    return this.userList.snapshotChanges()
  }

  addUsers(email:string,username:string)
  {
    const id = this.afs.createPushId();
    this.userList?.push(new Users(email,username,id,"54","1.54K","8.12k","589","users/profile.jpg","I don't have a bad handwriting, I have my own font."))
  }

  addUsersGoogle(email:string,username:string,id:string)
  {
    
    this.userList?.push(new Users(email,username,id,"54","1.54K","8.12k","589","users/profile.jpg","I don't have a bad handwriting, I have my own font."))
  }

  getUserConnected() :string
  {
    var idUser="jnsjkdnc"
    this.fireAuth.onAuthStateChanged(user=>
      {
        
        if(user?.emailVerified)
        {
          
          this.getUsers().subscribe(list=>
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

                  

                  idUser=user.idUSer
                  
                })
            })
      

          }
           
      })

      return idUser
  }

  /* constructor(public idMovie:string,public idUserMovie:string,public movieName:string,public movieYoutube:string, 
        public movieCategorie:string,public movieRating:string,public movieDescription:string
        ,public movieImg1:string, public movieImg2:string,public movieImg3:string,
        public currentFilm:string){} */

  addmovie(movieName:string,movieYoutube:string,movieCategorie:string,movieRating:string,
    movieDescription:string,movieImg1:string,movieImg2:string,movieImg3:string,currentFilm:string)
  {
     this.fireAuth.currentUser.then(res=>{
      const idMovie = this.afs.createPushId();
      const emailUser=res?.email  
         
      this.moviesList?.push(new Movies(idMovie,res?.email as string,movieName,movieYoutube,movieCategorie,movieRating,movieDescription,
        movieImg1,movieImg2,movieImg3,"no","1.5GB","1.6k"))
        
     })
  }

  getComments()
  {
    this.commentsList=this.afs.list("comments")
    return this.commentsList.snapshotChanges()
  }
  addComment(comment:string,idMovie:string)
  {
    this.fireAuth.currentUser.then(res=>{
      const idComment = this.afs.createPushId();
      const emailUser=res?.email  
      let date=new Date()
      this.commentsList?.push(new Comments(idComment,comment,emailUser as string,idMovie,""+date))
        
     })
  }


}

function randomIntFromInterval(arg0: number, arg1: number) {
  throw new Error('Function not implemented.');
}


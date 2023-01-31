import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Movies } from 'src/app/classes/movies';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { DataModService } from 'src/app/shared/data-mod.service';
import { Observable } from 'rxjs';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  listMovieOneByOne:Movies[]=[]
  listMovies:Movies[]=[]
  listMoviesAll:Movies[]=[]
  numberAdd=8
  movieCurrent=new Movies("","","","","","","","","","","","","")

   uniqueMovies:Movies[]=[]
  movieImgCurrent:Observable<any> | undefined;

  constructor(private navbarCom:NavbarComponent,private fireAuth:AngularFireAuth ,private router:Router,private dataM:DataModService,private storage: AngularFireStorage)
  {
    
    
  }
  ngOnInit(): void {
    
    
    
    const currentMovieName=document.getElementById("currentMovieName") as HTMLElement
    const currentMovieImg=document.getElementById("currentMovieDiv") as HTMLElement
    
    this.dataM.getMovies().subscribe(list=>
      {
        this.listMovies=[]
        list.forEach(u=>
          {
            /*  constructor(public movieName:string,public movieYoutube:string, 
        public movieCategorie:string,public movieRating:string,public movieDescription:string
        ,public movieImg1:string, public movieImg2:string,public movieImg3:string,
        public currentFilm:string){} */
             

            this.listMovies.push(new Movies(u.payload.val()?.idMovie as string,
                u.payload.val()?.idUserMovie as string,u.payload.val()?.movieName as string,
                u.payload.val()?.movieYoutube as string,u.payload.val()?.movieCategorie as string,
                u.payload.val()?.movieRating as string,u.payload.val()?.movieDescription as string,
                u.payload.val()?.movieImg1 as string,u.payload.val()?.movieImg2 as string,
                u.payload.val()?.movieImg3 as string, u.payload.val()?.currentFilm as string, u.payload.val()?.size as string,
                u.payload.val()?.downloads as string))
          })

          this.listMovies.filter(mv=>mv.currentFilm=="yes").forEach(mv=>
            {
              
              currentMovieName.innerHTML="<em>Watch Now </em>"+mv.movieName
              const ref = this.storage.ref(mv.movieImg2);
              this.movieImgCurrent = ref.getDownloadURL();
              this.movieImgCurrent.forEach(url=>{
                  console.log(url)
                 currentMovieImg.style.backgroundImage="url('"+url+"')"}
                )
              
              
              
          })
           
      })



      //
      this.dataM.getMovies().subscribe(list=>
        {
          
          
          list.forEach(u=>
            {
              
            const ref = this.storage.ref(u.payload.val()?.movieImg1 as string);
             ref.getDownloadURL().forEach(url=>{
                this.listMoviesAll.push(new Movies(u.payload.val()?.idMovie as string,
                u.payload.val()?.idUserMovie as string,u.payload.val()?.movieName as string,
                u.payload.val()?.movieYoutube as string,u.payload.val()?.movieCategorie as string,
                u.payload.val()?.movieRating as string,u.payload.val()?.movieDescription as string,
                url as string,u.payload.val()?.movieImg2 as string,
                u.payload.val()?.movieImg3 as string, u.payload.val()?.currentFilm as string, u.payload.val()?.size as string,
                u.payload.val()?.downloads as string))
             });
              
            })

            
            
            console.log(this.listMoviesAll)

        })

     
  }

  loadMore(e:any)
  {
    e.preventDefault()
    this.numberAdd+=8
    this.dataM.getMoviesWithLimit(this.numberAdd).subscribe(list=>
      {
        
        this.listMoviesAll=[]
        list.forEach(u=>
          {
            
              const ref = this.storage.ref(u.payload.val()?.movieImg1 as string);
              ref.getDownloadURL().forEach(url=>{
              this.listMoviesAll.push(new Movies(u.payload.val()?.idMovie as string,
              u.payload.val()?.idUserMovie as string,u.payload.val()?.movieName as string,
              u.payload.val()?.movieYoutube as string,u.payload.val()?.movieCategorie as string,
              u.payload.val()?.movieRating as string,u.payload.val()?.movieDescription as string,
              url as string,u.payload.val()?.movieImg2 as string,
              u.payload.val()?.movieImg3 as string, u.payload.val()?.currentFilm as string, u.payload.val()?.size as string,
              u.payload.val()?.downloads as string))
           });
            
          })

         
          
          console.log(this.listMoviesAll)

           
      })
  }

   
}
   


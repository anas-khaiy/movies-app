import { Component, OnInit } from '@angular/core';
import { Movies } from 'src/app/classes/movies';
import { DataModService } from 'src/app/shared/data-mod.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {
  listMoviesAll:Movies[]=[]
  listMoviesSearch:Movies[]=[]
  constructor(private navbarCom:NavbarComponent,private dataM:DataModService,private storage: AngularFireStorage){
    
  }
  ngOnInit(): void {
    this.dataM.getMovies().subscribe
    this.dataM.getMovies().subscribe(list=>
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

          
          
          console.log(this.listMoviesAll)

      })
  }


  showMoviesSearch(searchValue:any)
  {
    if(searchValue.target.value!="")
    {
      this.listMoviesSearch=[]
      this.listMoviesAll.filter(mv=>new RegExp("\\b"+searchValue.target.value.toLowerCase().trim()+"\\b").test(mv.movieName.toLowerCase())).forEach(u=>{
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


  

}

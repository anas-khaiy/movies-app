import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movies } from 'src/app/classes/movies';
import { DataModService } from 'src/app/shared/data-mod.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Comments } from 'src/app/classes/comments';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  movieCurrent=new Movies("","","","","","","","","","","","","")
  listComments:Comments[]=[]
  listCommentsFilter:Comments[]=[]
  constructor(private activatedRoute:ActivatedRoute,private dataM:DataModService,private storage: AngularFireStorage){}
  ngOnInit(): void {
    
    this.dataM.getMovies().subscribe(list=>
      {
        list.filter(mv=>mv.payload.val()?.idMovie==this.activatedRoute.snapshot.paramMap.get("id")).forEach(u=>
          {
            const ref = this.storage.ref(u.payload.val()?.movieImg1 as string);
             ref.getDownloadURL().forEach((url1:any)=>{
                const ref = this.storage.ref(u.payload.val()?.movieImg3 as string);
                ref.getDownloadURL().forEach((url2:any)=>{
                  const ref = this.storage.ref(u.payload.val()?.movieImg2 as string);
                  ref.getDownloadURL().forEach((url3:any)=>{
                    this.movieCurrent= new Movies(u.payload.val()?.idMovie as string,
                    u.payload.val()?.idUserMovie as string,u.payload.val()?.movieName as string,
                    u.payload.val()?.movieYoutube.slice(32) as string,u.payload.val()?.movieCategorie as string,
                    u.payload.val()?.movieRating as string,u.payload.val()?.movieDescription as string,
                    url1 as string,url2 as string,
                    url3 as string, u.payload.val()?.currentFilm as string, u.payload.val()?.size as string,
                    u.payload.val()?.downloads as string)

                    console.log(this.movieCurrent.idMovie)
                    this.dataM.getComments().subscribe(list=>
                      {
                        this.listComments=[]
                        list.filter(m=>m.payload.val()?.idMovie==this.movieCurrent.idMovie ).forEach(c=>{
                          this.listComments.push(new Comments(c.payload.val()?.idComment as string,
                          c.payload.val()?.Comment as string,c.payload.val()?.idUSer as string,c.payload.val()?.idMovie as string,c.payload.val()?.dateComment as string))
                        })

                        this.listComments.sort((a:any,b:any)=>{
                          var date1=new Date(a.dateComment)
                          var date2=new Date(b.dateComment)
                          if(date1.getTime() > date2.getTime()) return -1
                          else return 1
                        })
                        if(this.listComments.length==0)
                        {
                          this.listComments.length=0
                        }                        
                        else if(this.listComments.length==1)
                        {
                          this.listComments.length=1
                        }
                        else if(this.listComments.length==2)
                        {
                          this.listComments.length=2
                        }
                        else 
                        {
                          this.listComments.length=3
                        }
                        
                      })
          
                  });
                });
             });

              /* 
              */
            
            

          })


          
          
      })

      

  }


  compareDates(a:Comments,b:Comments)
  {
    var date1=new Date(a.dateComment)
    var date2=new Date(b.dateComment)
    if(date1 > date2)
    {
      return 1;
    }
    else
    {
      return 1;
    }
  }

  

  addComment()
  {
    const commentTxt=document.getElementById("commentTxt") as HTMLInputElement
    if(commentTxt.value!="")
    {
      this.dataM.addComment(commentTxt.value,this.movieCurrent.idMovie)
      commentTxt.value=""
    }
    
  }

}

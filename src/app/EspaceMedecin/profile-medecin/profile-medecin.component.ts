import { Component, OnInit , ElementRef , ViewChild} from '@angular/core';
import {UserAuthService} from "../../Services/interceptor/user-auth.service";
import {Router} from "@angular/router";
import {ShareServiceService} from "../../Services/share-service.service";
import {MedecinModel} from "../../Models/MedecinModel";

@Component({
  selector: 'app-profile-medecin',
  templateUrl: './profile-medecin.component.html',
  styleUrls: ['./profile-medecin.component.scss']
})
export class ProfileMedecinComponent implements OnInit {
  infoMed! :MedecinModel;

  element!: HTMLElement;
  constructor(private authService :UserAuthService,private  share : ShareServiceService,
              private router : Router) { }

  ngOnInit() {

this.getUserInfo();


  }

   openNav() {

     const closebtnOpen= document.getElementById(
       'openbtn' ,
     )  as HTMLButtonElement | null;

     if(closebtnOpen !=null){
       console.log("close button open");
       closebtnOpen.style.color="transparent"

     }

    const openbtn= document.getElementById(
      'Sidenav' ,
      )  as HTMLButtonElement | null;

     if(openbtn !=null){
       console.log("open nav clicked");
       openbtn.style.display="flex";

     }


     const closebtn= document.getElementById(
       'closebtn' ,
     )  as HTMLButtonElement | null;
     if(closebtn !=null){
       console.log("open nav clicked");
       closebtn.style.display="flex";
       closebtn.style.marginTop="-3.5rem";
       closebtn.style.marginLeft="0.2rem";

     }


  }



   closeNav(){
       console.log("clicked succefully");
     const closebtn
       = document.getElementById(
       'Sidenav',
     ) as HTMLButtonElement | null;

     if (closebtn != null) {
     closebtn.style.display="none";
     }

     const closenbtn= document.getElementById(
       'closebtn' ,
     )  as HTMLButtonElement | null;
     if(closenbtn !=null){
       console.log("open nav clicked");
       closenbtn.style.display="none";

     }

     const closebtnOpen= document.getElementById(
       'openbtn' ,
     )  as HTMLButtonElement | null;

     if(closebtnOpen !=null){
       console.log("close button open");
       closebtnOpen.style.color="black"

     }



   }
   logOut(){
    this.authService.clear();
    this.router.navigate(['authentifier']);


   }


   getUserInfo():any {
    const token = this.getToken();
    console.log("token:", token);
    if (token) {
      //Decode the token to get the payload (which contains user information
     const payload =JSON.parse(window.atob(token.split('.')[1]));
      const id = payload.sub;
      console.log("decoded payload:", payload);
      this.share.getActivateDoctor(id).subscribe((data)=>{
        this.infoMed = data;
        console.log("info users by id :",this.infoMed)
      });

      return payload;


    } else {
      return null;
    }
  }


   getToken() {
    return localStorage.getItem("token") ;
  }
}

import { Component, OnInit , ElementRef , ViewChild} from '@angular/core';

@Component({
  selector: 'app-profile-medecin',
  templateUrl: './profile-medecin.component.html',
  styleUrls: ['./profile-medecin.component.scss']
})
export class ProfileMedecinComponent implements OnInit {

  element!: HTMLElement;
  constructor() { }

  ngOnInit(): void {
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



}

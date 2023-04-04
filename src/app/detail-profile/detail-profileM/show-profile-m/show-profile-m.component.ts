import { Component, OnInit } from '@angular/core';
import {MedecinModel} from "../../../Models/MedecinModel";
import {ShareServiceService} from "../../../Services/share-service.service";

@Component({
  selector: 'app-show-profile-m',
  templateUrl: './show-profile-m.component.html',
  styleUrls: ['./show-profile-m.component.scss']
})
export class ShowProfileMComponent implements OnInit {
medecin! : MedecinModel;

  constructor( private  share: ShareServiceService) { }

  ngOnInit(): void {
    this.getUserInfo();
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
        this.medecin = data;
        console.log("info users by id :",this.medecin)
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

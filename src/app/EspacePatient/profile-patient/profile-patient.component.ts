import {Component, OnInit, ViewChild} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import {Router} from "@angular/router";
import {UserAuthService} from "../../Services/interceptor/user-auth.service";
import {MedecinModel} from "../../Models/MedecinModel";
import {ShareServiceService} from "../../Services/share-service.service";
import {PatientModel} from "../../Models/PatientModel";


@Component({
  selector: 'app-profile-patient',
  templateUrl: './profile-patient.component.html',
  styleUrls: ['./profile-patient.component.scss']
})
export class ProfilePatientComponent implements OnInit {
  patient! : PatientModel;

  constructor(private observer: BreakpointObserver, private router: Router,
              private userAuth : UserAuthService,private  share: ShareServiceService) { }

  ngOnInit(): void {
   this.getPatientInfo();
  }

public  isLoggedIn()
 {
  return this.userAuth.isLoggedIn();
 }

  logOut(){
    this.userAuth.clear();
    this.router.navigate(['/loginPatient']);

  }



  getPatientInfo():any {
    const token = this.getToken();
    console.log("token:", token);
    if (token) {
      //Decode the token to get the payload (which contains user information
      const payload =JSON.parse(window.atob(token.split('.')[1]));
      const id = payload.sub;
      console.log("decoded payload:", payload);
      this.share.getActivatePatient(id).subscribe((data)=>{
        this.patient = data;
        console.log("info users by id :",this.patient)
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










import { Component, OnInit } from '@angular/core';
import {ShareServiceService} from "../../../Services/share-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AppointementResult} from "../../../Models/AppointementResult";
import {UserAuthService} from "../../../Services/interceptor/user-auth.service";

@Component({
  selector: 'app-accepter-rdv',
  templateUrl: './accepter-rdv.component.html',
  styleUrls: ['./accepter-rdv.component.scss']
})
export class AccepterRdvComponent implements OnInit {
idAp!:string;
appointment : AppointementResult[]=[];
  constructor(private share: ShareServiceService,
              private router: Router,
              private authService:UserAuthService,
              private route : ActivatedRoute,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.getAcceptedApnt();
  }

  getAcceptedApnt(){
    const token = this.getToken();
    console.log("token:", token);
    if (token) {
      //Decode the token to get the payload (which contains user information
      const payload =JSON.parse(window.atob(token.split('.')[1]));
      const id = payload.sub;
   this.share.getAllAcceptedAppointementByDcotorId(id).subscribe(data=>{
     this.appointment=data;
     console.log("appointments:" , this.appointment);

   })

  }
  }


    getToken() {
      return localStorage.getItem("token") ;
    }

  detailAppointment(idA: string) {
    this.router.navigate(['detailAccptedApnt',idA])
  }
}

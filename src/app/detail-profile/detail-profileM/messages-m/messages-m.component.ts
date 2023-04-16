import { Component, OnInit } from '@angular/core';
import {ShareServiceService} from "../../../Services/share-service.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {UserAuthService} from "../../../Services/interceptor/user-auth.service";
import {AppointmentRequest} from "../../../Models/AppointmentRequest";
import {AppointementResult} from "../../../Models/AppointementResult";

@Component({
  selector: 'app-messages-m',
  templateUrl: './messages-m.component.html',
  styleUrls: ['./messages-m.component.scss']
})
export class MessagesMComponent implements OnInit {
appointmentRes : AppointementResult[] =[];
  constructor(private share: ShareServiceService,
              private router: Router,
              private authService: UserAuthService,
              private http: HttpClient) { }

  ngOnInit(): void {

    this.getAllAppointment();
  }


  getAllAppointment():any {
    const token = this.getToken();
    console.log("token:", token);
    if (token) {
      //Decode the token to get the payload (which contains user information
      const payload =JSON.parse(window.atob(token.split('.')[1]));
      const id = payload.sub;
      console.log("decoded payload:", payload);
      this.share.getAllAppointementByDcotorId(id).subscribe((data)=>{
        this.appointmentRes = data;
        console.log("info users by id :",this.appointmentRes)
      });

      return payload;


    } else {
      return null;
    }
  }

  detailAppntmnt(id:string){
    this.router.navigate(['detailMsg',id])

  }
  getToken() {
    return localStorage.getItem("token") ;
  }
}

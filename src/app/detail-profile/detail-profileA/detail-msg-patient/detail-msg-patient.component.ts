import { Component, OnInit } from '@angular/core';
import {AppointementResult} from "../../../Models/AppointementResult";
import {ShareServiceService} from "../../../Services/share-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AdminModel} from "../../../Models/AdminModel";

@Component({
  selector: 'app-detail-msg-patient',
  templateUrl: './detail-msg-patient.component.html',
  styleUrls: ['./detail-msg-patient.component.scss']
})
export class DetailMsgPatientComponent implements OnInit {

  id!:string;
  apntmnt!:AppointementResult;
  admin!:AdminModel;


  constructor(private share: ShareServiceService,
              private router: Router,
              private route : ActivatedRoute,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.share.getAppointementById(this.id).subscribe(data=>{
      this.apntmnt = data;
      console.log("data =>",this.apntmnt);
    })
  }


  getUserInfo():any {
    const token = this.getToken();
    console.log("token:", token);
    if (token) {
      //Decode the token to get the payload (which contains user information
      const payload =JSON.parse(window.atob(token.split('.')[1]));
      this.id= payload.sub;
      console.log("decoded payload:", payload);

      return payload;


    } else {
      return null;
    }
  }


  getToken() {
    return localStorage.getItem("token") ;
  }

  affecterMedecin(idD: string, idAp: string){
    this.router.navigate(['affecterMedecin',idD,idAp])

  }

  rejeterAp(id: string) {
    this.share.rejectRdv(id).subscribe(data => {
      console.log("new data for rejected status", data)

    })
    this.router.navigate(['/rdvAvecMedecin']);
  }
}

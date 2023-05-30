import { Component, OnInit } from '@angular/core';
import {AppointementResult} from "../../../Models/AppointementResult";
import {ShareServiceService} from "../../../Services/share-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-rdv-confirme',
  templateUrl: './rdv-confirme.component.html',
  styleUrls: ['./rdv-confirme.component.scss']
})
export class RdvConfirmeComponent implements OnInit {
  id!:string;
  apntmnt!:AppointementResult[];
  constructor(private share: ShareServiceService  ,
              private router : Router ,
              private route: ActivatedRoute, private fb: FormBuilder) { }


  ngOnInit(): void {
    this.listAppointment();
  }

  listAppointment(){
    const token = this.getToken();
    console.log("token:", token);
    if (token) {
      //Decode the token to get the payload (which contains user information
      const payload = JSON.parse(window.atob(token.split('.')[1]));
      this.id = payload.sub;
      this.share.getAllConfirmededDevisByDoctorId(this.id).subscribe(data => {
        this.apntmnt = data;
        console.log("confirmed RDV =>", this.apntmnt);
      })


    }}

  getToken() {
    return localStorage.getItem("token") ;
  }

}

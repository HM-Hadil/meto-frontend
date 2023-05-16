import { Component, OnInit } from '@angular/core';
import {AppointementResult} from "../../../Models/AppointementResult";
import {ShareServiceService} from "../../../Services/share-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-rdv-confirmee',
  templateUrl: './rdv-confirmee.component.html',
  styleUrls: ['./rdv-confirmee.component.scss']
})
export class RdvConfirmeeComponent implements OnInit {
  listRdv : AppointementResult[] = [];
  id!:string;
  constructor(private share: ShareServiceService,
              private router: Router,
              private route : ActivatedRoute,
              private http: HttpClient,
  ) { }

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
      this.share.getAllConfirmededDevisByPatientId(this.id).subscribe(data => {
        this.listRdv = data;
        console.log("confirmed RDV =>", this.listRdv);
      })


    }}

  getToken() {
    return localStorage.getItem("token") ;
  }
}

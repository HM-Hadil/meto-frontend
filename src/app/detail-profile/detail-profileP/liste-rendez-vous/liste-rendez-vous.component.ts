import { Component, OnInit } from '@angular/core';
import {ShareServiceService} from "../../../Services/share-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AppointementResult} from "../../../Models/AppointementResult";

@Component({
  selector: 'app-liste-rendez-vous',
  templateUrl: './liste-rendez-vous.component.html',
  styleUrls: ['./liste-rendez-vous.component.scss']
})
export class ListeRendezVousComponent implements OnInit {
id!:string;
listRdv : AppointementResult[] = [];
  constructor(private share: ShareServiceService,
              private router: Router,
              private route : ActivatedRoute,
              private http: HttpClient) { }

  ngOnInit() {
    this.listAppointment();

  }
listAppointment(){
  const token = this.getToken();
  console.log("token:", token);
  if (token) {
    //Decode the token to get the payload (which contains user information
    const payload = JSON.parse(window.atob(token.split('.')[1]));
    this.id = payload.sub;
    this.share.getRdvByPatient(this.id).subscribe(data => {
      this.listRdv = data;

      console.log("liste RDV =>", this.listRdv);
    })


  }}

  getToken() {
    return localStorage.getItem("token") ;
  }
}

import { Component, OnInit } from '@angular/core';
import {ShareServiceService} from "../../../Services/share-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AppointementResult} from "../../../Models/AppointementResult";

@Component({
  selector: 'app-detail-rdv-patient',
  templateUrl: './detail-rdv-patient.component.html',
  styleUrls: ['./detail-rdv-patient.component.scss']
})
export class DetailRdvPatientComponent implements OnInit {
  id!:string;
  apntmnt!:AppointementResult;
  constructor(private share: ShareServiceService,
              private router: Router,
              private route : ActivatedRoute,
              private http: HttpClient,) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.share.getAppointementById(this.id).subscribe(data=>{
      this.apntmnt = data;
      console.log("data =>",this.apntmnt);
    })
  }

}

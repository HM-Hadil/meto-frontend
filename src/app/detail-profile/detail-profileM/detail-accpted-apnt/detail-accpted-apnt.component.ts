import { Component, OnInit } from '@angular/core';
import {ShareServiceService} from "../../../Services/share-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AppointementResult} from "../../../Models/AppointementResult";

@Component({
  selector: 'app-detail-accpted-apnt',
  templateUrl: './detail-accpted-apnt.component.html',
  styleUrls: ['./detail-accpted-apnt.component.scss']
})
export class DetailAccptedApntComponent implements OnInit {
id!:string;
apntmnt!:AppointementResult;
  constructor(private share: ShareServiceService,
              private router: Router,
              private route : ActivatedRoute,
              private http: HttpClient) { }

  ngOnInit() {
    this.id=this.route.snapshot.params['id'];
    this.share.getAppointementById(this.id).subscribe(data=>{
      this.apntmnt = data;
      console.log("data =>",this.apntmnt);
    })
  }

  rejeterAp(id: string) {
    this.share.rejectRdv(id).subscribe(data => {
      console.log("new data for rejected status", data)

    })
    this.router.navigate(['/acceptedRdv']);
  }

  ValiderFacture(idAp:string) {
   this.router.navigate(['validerFacture',idAp]);
  }
}

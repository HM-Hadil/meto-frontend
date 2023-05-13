import { Component, OnInit } from '@angular/core';
import {ShareServiceService} from "../../../../Services/share-service.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AppointementResult} from "../../../../Models/AppointementResult";

@Component({
  selector: 'app-messages-med',
  templateUrl: './messages-med.component.html',
  styleUrls: ['./messages-med.component.scss']
})
export class MessagesMedComponent implements OnInit {
  appointmentRes : AppointementResult[]=[];

  constructor(private share: ShareServiceService,
              private router: Router,
              private http: HttpClient) { }

  ngOnInit(): void {
    this. getAllCreatedDevis();
  }
  getAllCreatedDevis(){
    this.share.getAllCreatedDevisByDoctor().subscribe(apntmntRes=>{
      this.appointmentRes=apntmntRes;
      console.log(apntmntRes);
    })
  }

  details(id:string){
    this.router.navigate(['detailRdvDevis',id]);

  }

}

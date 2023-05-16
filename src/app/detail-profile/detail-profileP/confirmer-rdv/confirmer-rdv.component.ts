import { Component, OnInit } from '@angular/core';
import {ShareServiceService} from "../Services/share-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {AppointementResult} from "../Models/AppointementResult";

@Component({
  selector: 'app-confirmer-rdv',
  templateUrl: './confirmer-rdv.component.html',
  styleUrls: ['./confirmer-rdv.component.scss']
})
export class ConfirmerRDVComponent implements OnInit {
id!:string;
  apntmnt!:AppointementResult;
  constructor(private share: ShareServiceService  ,
              private router : Router ,
              private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit() {
    this.id=this.route.snapshot.params['id'];
    this.share.getChangedAppointmentByAdmin(this.id).subscribe(result=>{
      this.apntmnt=result;
      console.log("result devis by Admin :",result);
    })
  }

  ConfirmerDevis() {
this.share.approveDevisByPatient(this.id).subscribe(result=>{
  console.log("result: approve devis ", result);
})
  }

  reject() {
    this.share.rejectDevisByPatient(this.id).subscribe(result=>{
      console.log("resultRejectDevis:",result);
    })
  }
}


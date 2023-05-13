import { Component, OnInit } from '@angular/core';
import {ShareServiceService} from "../../../../Services/share-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AppointementResult} from "../../../../Models/AppointementResult";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DevisReq} from "../../../../Models/DevisReq";

@Component({
  selector: 'app-detail-rdv-devis',
  templateUrl: './detail-rdv-devis.component.html',
  styleUrls: ['./detail-rdv-devis.component.scss']
})
export class DetailRdvDevisComponent implements OnInit {
id!:string;
apntmnt!:AppointementResult;
DevisForm!:FormGroup;
newCost:any;
  constructor(private share: ShareServiceService  ,
              private router : Router ,
              private route: ActivatedRoute, private fb: FormBuilder) {
    this.DevisForm = this.fb.group({
      cost:['', Validators.required]
    })
  }

  ngOnInit() {
    this.id=this.route.snapshot.params['id'];
  this.share.getCreatedAppointmentById(this.id).subscribe(data=>{
  this.apntmnt=data;
  console.log("data", this.apntmnt);
    this.newCost = this.apntmnt.devis.cost * 1.1;
    this.DevisForm.patchValue({ cost: this.newCost });

  })

  }

  updateDevis(){
    const newCost = this.DevisForm.value.cost;
    const devis = new DevisReq(newCost);
    this.share.updateDevisByAdmin(this.id,devis).subscribe(result=>{
      console.log("result=>", result);
      this.router.navigate(['rendez-vous'])
    })
  }

}

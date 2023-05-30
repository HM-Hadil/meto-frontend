import { Component, OnInit } from '@angular/core';
import {AppointementResult} from "../../../Models/AppointementResult";
import {ShareServiceService} from "../../../Services/share-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-rdv-confirmee-a',
  templateUrl: './rdv-confirmee-a.component.html',
  styleUrls: ['./rdv-confirmee-a.component.scss']
})
export class RdvConfirmeeAComponent implements OnInit {

  id!: string;
  apntmnt!: AppointementResult[];

  constructor(private share: ShareServiceService,
              private router: Router,
              private route: ActivatedRoute, private fb: FormBuilder) {
  }


  ngOnInit(): void {
    this.listAppointment();
  }

  listAppointment() {

    this.share.getAllApprovedDevisByPatient().subscribe(data => {
      this.apntmnt = data;
      console.log("confirmed RDV =>", this.apntmnt);
    })


  }
}

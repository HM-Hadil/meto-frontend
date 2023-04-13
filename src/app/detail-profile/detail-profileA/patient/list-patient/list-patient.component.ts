import { Component, OnInit } from '@angular/core';
import {PatientModel} from "../../../../Models/PatientModel";
import {ShareServiceService} from "../../../../Services/share-service.service";

@Component({
  selector: 'app-list-patient',
  templateUrl: './list-patient.component.html',
  styleUrls: ['./list-patient.component.scss']
})
export class ListPatientComponent implements OnInit {
patient : PatientModel[]= [];
  constructor(private share : ShareServiceService) { }

  ngOnInit(): void {
    this.getdllActivePatient();
  }

  getdllActivePatient(){
    return this.share.getAllActivePatient().subscribe(
      (data )=> {
        this.patient = data;
        console.log('reload data ==>>', this.patient);
      },

      (err) => {
        console.error('Error ', err);
      }
    )

  }
  desactiver(id:number){

  }

}

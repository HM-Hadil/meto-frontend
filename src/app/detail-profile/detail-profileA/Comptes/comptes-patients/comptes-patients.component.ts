import { Component, OnInit } from '@angular/core';
import {ShareServiceService} from "../../../../Services/share-service.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {PatientModel} from "../../../../Models/PatientModel";




@Component({
  selector: 'app-comptes-patients',
  templateUrl: './comptes-patients.component.html',
  styleUrls: ['./comptes-patients.component.scss']
})
export class ComptesPatientsComponent implements OnInit {
patient : PatientModel[]= [];
user! : PatientModel;
  constructor(private share: ShareServiceService,
              private router: Router,
              private http: HttpClient) {

  }

  ngOnInit(): void {
    this. getDisabledAccountsPatient();

  }

  getDisabledAccountsPatient(){
    return this.share.getDisabledPatient().subscribe(
      (data )=> {
        this.patient = data;
        console.log('reload data ==>>', this.patient);

      },

      (err) => {
        console.error('Error ', err);
      }
    )

  }


  deleteUser(id : number){
    this.share.deleteAccount(id).subscribe();
    alert("deleted");
  }


  activatePatient(id: number) {
    this.share.activateAccountPatient(id).subscribe(data => {
      this.user = data;
    }, error => {
      console.log('Error activating doctor:', error);
    });
  }

  }






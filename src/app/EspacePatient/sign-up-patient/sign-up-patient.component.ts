import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl,FormGroup, Validators,} from '@angular/forms';
import * as alertify from "alertifyjs"
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ShareServiceService } from 'src/app/Services/share-service.service';
import { PatientModel } from 'src/app/Models/PatientModel';

@Component({
  selector: 'app-sign-up-patient',
  templateUrl: './sign-up-patient.component.html',
  styleUrls: ['./sign-up-patient.component.scss']
})
export class SignUpPatientComponent implements OnInit {
  patientForm!: FormGroup;

  constructor(  private share: ShareServiceService,
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder) {
      let formControles = {
        firstname: new FormControl('', [Validators.required]),
        lastname: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
      };
      this.patientForm = this.fb.group(formControles);
    }

  

  ngOnInit(): void {
  }

  signUpPatient(){
    if (this.patientForm.valid){

      let data = this.patientForm.value;
      console.log("data--->",data);
      let usersPatient = new PatientModel(
        data.id,
        data.firstname,
        data.lastname,
        data.email,
        data.password
      );
     
      console.log("PatientModel--->",usersPatient);

      this.share.signUpPatient(usersPatient).subscribe();
      console.log('>>>> Add patient', usersPatient);
      alertify.success("votre inscription a réussi  ")




  }
  else {
    alertify.error("données non valide ! ")

  }
}
}


import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormControl,FormGroup, Validators,} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as alertify from "alertifyjs"
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ShareServiceService } from 'src/app/Services/share-service.service';
import { PatientModel } from 'src/app/Models/PatientModel';
import { AdminModel } from 'src/app/Models/AdminModel';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
AdminForm!:FormGroup;
  constructor( private share: ShareServiceService,
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder) { 
      let formControles = {
        firstname: new FormControl('', [Validators.required]),
        lastname: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
      };
      this.AdminForm = this.fb.group(formControles);
    }

  ngOnInit(): void {
  }
  signUpAdmin(){
    if (this.AdminForm.valid){

      let data = this.AdminForm.value;
      console.log("data--->",data);
      let usersAdmin= new AdminModel(
        data.id,
        data.firstname,
        data.lastname,
        data.email,
        data.password
      );
     
      console.log("AdminModel--->",usersAdmin);

      this.share.signUpAdmin(usersAdmin).subscribe();
      console.log('>>>> Add admin', usersAdmin);
      alertify.success("votre inscription a réussi  ")


  }
  else {
    alertify.error("données non valide ! ")

  }
  }

}

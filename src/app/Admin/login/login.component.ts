import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder,FormControl,FormGroup, Validators,} from '@angular/forms';
import { Router } from '@angular/router';
import * as alertify from "alertifyjs";
import { Authentication } from 'src/app/Models/Authentication';

import { ShareServiceService } from 'src/app/Services/share-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  authForm!: FormGroup;

  constructor(private share: ShareServiceService,
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder) { 
      this.authForm = this.fb.group({

        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
      });
       }


  ngOnInit(): void {
  }

  loginAdmin(){
    let data = this.authForm.value;
    console.log("data from form-->",data);
    let authentication = new Authentication(
      data.email,
      data.password
    );

    this.share.login(authentication).subscribe((response) => {
      let auth = response;  
      console.log('reload data ==>>', auth);

    });
    console.log("authentication-->",authentication);


  }


}

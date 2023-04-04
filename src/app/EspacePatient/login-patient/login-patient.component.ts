import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ShareServiceService} from "../../Services/share-service.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Authentication} from "../../Models/Authentication";
import {UserAuthService} from "../../Services/interceptor/user-auth.service";

@Component({
  selector: 'app-login-patient',
  templateUrl: './login-patient.component.html',
  styleUrls: ['./login-patient.component.scss']
})
export class LoginPatientComponent implements OnInit {

  authenticateForm!: FormGroup;

  constructor(private share: ShareServiceService,
              private router: Router,
              private http: HttpClient,
              private fb: FormBuilder,
              private userAuth : UserAuthService) {
    this.authenticateForm = this.fb.group({

      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  loginPatient(){
    let data = this.authenticateForm.value;
    console.log("data from form-->",data);
    let authentication = new Authentication(
      data.email,
      data.password
    );

    this.share.login(authentication).subscribe((response) => {
      let auth = response;
      console.log('reload data ==>>', auth);
      this.userAuth.setRole(response.role);
      this.userAuth.setToken(response.token);
      this.router.navigate(['/formuleRndv']);

    });
    console.log("authentication-->",authentication);


  }

}

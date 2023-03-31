import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ShareServiceService} from "../../Services/share-service.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Authentication} from "../../Models/Authentication";

@Component({
  selector: 'app-authentifier',
  templateUrl: './authentifier.component.html',
  styleUrls: ['./authentifier.component.scss']
})
export class AuthentifierComponent implements OnInit {

  authenticationForm!: FormGroup;

  constructor(private share: ShareServiceService,
              private router: Router,
              private http: HttpClient,
              private fb: FormBuilder) {
    this.authenticationForm = this.fb.group({

      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }
  loginDoctor(){
    let data = this.authenticationForm.value;
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

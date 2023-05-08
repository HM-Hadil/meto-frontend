import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ShareServiceService} from "../../../../Services/share-service.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {TypeChirurgie} from "../../../../Models/typeChirurgie/type-chirurgie";
import alertify from "alertifyjs";
import {OpinionRequest} from "../../../../Models/opinion";

@Component({
  selector: 'app-donner-avis',
  templateUrl: './donner-avis.component.html',
  styleUrls: ['./donner-avis.component.scss']
})
export class DonnerAvisComponent implements OnInit {
  opinionForm!: FormGroup;
  userFile: any;
  public imagePath: any;
  imgURL: any = '';
  idP!:string;

  constructor(   private share: ShareServiceService,
                 private router: Router,
                 private http: HttpClient,
                 private fb: FormBuilder) {
    this.opinionForm = this.fb.group({
      image:['',Validators.required],
      message:['',Validators.required] ,
      patient:[this.idP,Validators.required]

    });
  }

  ngOnInit() {

    this.getPatientInfo();

    this.opinionForm.setValue({patient:this.idP});

  }

  getPatientInfo():any {
    const token = this.getToken();
    console.log("token:", token);
    if (token) {
      //Decode the token to get the payload (which contains user information
      const payload =JSON.parse(window.atob(token.split('.')[1]));
      const id = payload.sub;
      this.idP=payload.sub;
      console.log("idP", this.idP)

      return payload;

    } else {
      return null;
    }
  }

  addOpinion() {
      let data = this.opinionForm.value;
      console.log("form",data);
      let opinion = new OpinionRequest(
        data.id,
        this.imgURL,
        data.message,
        this.idP
      );
      console.log(opinion);

      this.share.addOpinion(opinion).subscribe(data=>{
        console.log("opinion=>", data)
        alertify.success("votre avis est bien ajoutée ")

      });

    }



  //upload Image
  onSelectFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.userFile = file;

      var reader = new FileReader();

      this.imagePath = file;
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      };
    }

  }
  getToken() {
    return localStorage.getItem("token") ;
  }

}



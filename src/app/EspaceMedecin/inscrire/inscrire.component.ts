import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder,FormControl,FormGroup, Validators,} from '@angular/forms';
import { Router } from '@angular/router';
import { MedecinModel } from 'src/app/Models/MedecinModel';
import * as alertify from "alertifyjs";

import { ShareServiceService } from 'src/app/Services/share-service.service';

@Component({
  selector: 'app-inscrire',
  templateUrl: './inscrire.component.html',
  styleUrls: ['./inscrire.component.scss']
})
export class InscrireComponent implements OnInit {
  MedecinForm!:FormGroup;
  userFile: any;
  public imagePath: any;
  imgURL: any = '';

  parcoursFormGroup: {} =  this.fb.group({
                                diploma: ['', Validators.required],
                                establishment: ['', Validators.required],
                                field: ['', Validators.required]
                              });

  experienceFormGroup: {} = this.fb.group({
    establishment: ['', Validators.required],
    specialty: ['', Validators.required]
  })

  constructor(private share: ShareServiceService,
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder) {

      this.MedecinForm = this.fb.group({

        adresse: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        firstname: ['', Validators.required],
        gender: ['', Validators.required],
        image: ['', Validators.required],
        lastname: ['', Validators.required],

       experience: this.fb.array([]),

        parcours: this.fb.array([]),
        password: ['', Validators.required],
        specialite: [''],
        telephone: ['', Validators.required],
        ville: ['', Validators.required]
      });


      }



  ngOnInit(): void {

  }

  get parcours() {
    return  this.MedecinForm.controls["parcours"] as FormArray;

  }

  get experience() {
    return this.MedecinForm.controls["experience"] as FormArray;
  }

  addNewParcours(){
this.parcours.push(this.parcoursFormGroup);

  }

  addNewExperience(){
    this.experience.push(this.experienceFormGroup);

  }


  remove(Index: number) {
    this.parcours.removeAt(Index);
  }

  removeEx(Index: number) {
    this.experience.removeAt(Index);
  }

  signUpMedecin(){

    let data = this.MedecinForm.value;
    console.log("data from form-->",data);

   let medecins = new MedecinModel(
      data.id,
      data.firstname,
      data.lastname,
      data.email,
      data.password,
      data.ville,
      data.adresse,
      data.specialite,
      data.gender,
      this.imgURL,
      data.telephone,
      data.experience,
      data.parcours


    );


   console.log("medecinModel-->", medecins);
    this.share.signUpMedecin(medecins).subscribe();
    console.log('>>>> Add medecins to backend', medecins);
      alertify.success("votre inscription a réussi  ")

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





}

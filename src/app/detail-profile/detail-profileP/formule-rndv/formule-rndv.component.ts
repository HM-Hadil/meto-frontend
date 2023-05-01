import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import { AppointmentRequest } from 'src/app/Models/AppointmentRequest';
import {ShareServiceService} from "../../../Services/share-service.service";
import {UserAuthService} from "../../../Services/interceptor/user-auth.service";
import {PatientModel} from "../../../Models/PatientModel";
import {TypeChirurgie} from "../../../Models/typeChirurgie/type-chirurgie";
import * as alertify from "alertifyjs"
@Component({
  selector: 'app-formule-rndv',
  templateUrl: './formule-rndv.component.html',
  styleUrls: ['./formule-rndv.component.scss']
})
export class FormuleRndvComponent implements OnInit {
idCh!:string;
name!:any;
idP!:string;
patient! : PatientModel;
appointmentForm!: FormGroup;
  userFile: any;
  imagePath: any ='';
  imgURL: any = '';
  chirurgieList: TypeChirurgie[]= [];
  constructor(private route:ActivatedRoute,
              private router: Router,
              private userAuth : UserAuthService,
              private  share: ShareServiceService ,private fb: FormBuilder) {

    this.appointmentForm = this.fb.group({
      age: ['', Validators.required],
      dateRDV: ['', Validators.required],
      doctorId: [''],
      patientId: ['', Validators.required],
      image: ['', Validators.required],
      note: ['', Validators.required],
      phone: ['', Validators.required],
     // surgeryId: [this.idCh, Validators.required],
      typeSang: ['', Validators.required],
      ville: ['', Validators.required],
      weight: ['', Validators.required],
      surgeries: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getListChirurgie();
    this.getChirurgieById();
    this.getPatientInfo();
    this.appointmentForm.patchValue({patientId:this.idP,
      //surgeryId:this.idCh,
      });
  }


  changeEventChirurgie(event: any) {
    const selectedSurgeries = this.appointmentForm.controls['surgeries'] as FormArray;
    const surgery = event.target.value;
    selectedSurgeries.push(new FormControl(surgery));
  }

  //get All Chirurgie
  getListChirurgie() {
    this.share.getAllChirurgie().subscribe(
      (response) => {
        this.chirurgieList = response;
        console.log('reload data ==>>', this.chirurgieList);
      },

      (err) => {
        console.error('Error ', err);
      }
    );
  }

  getChirurgieById(){
    this.share.getChirurgirById(this.idCh).subscribe(res=>{
      this.name=res.name;
      console.log("chirurgie",this.name);
    })
  }

  onSubmit() {
    if (this.appointmentForm.invalid) {
      let data=this.appointmentForm.value;
      console.log("data form:", data);
    const appointmentRequest = new AppointmentRequest(
      data.id,
      data.age,
      data.dateRDV,
      data.doctorId,
      this.imagePath,
      data.note,
      data.patientId,
      data.phone,
      data.surgeries,
      data.typeSang,
      data.ville,
      data.weight,

    );
    console.log(appointmentRequest);

    this.share.createAppointment(appointmentRequest).subscribe(resultRDV=>{
      console.log(resultRDV);

    })
      alertify.success("Rendez-vous  ajoutée ")
      this.router.navigate(['listRdv'])
    }
    else {
        alertify.error("insérer données valide ! ")

      }
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
      console.log("decoded payload:", payload);
      this.share.getActivatePatient(id).subscribe((data)=>{
        this.patient = data;

        console.log("info users by id :",this.patient)
      });

      return payload;


    } else {
      return null;
    }
  }


  getToken() {
    return localStorage.getItem("token") ;
  }

  //upload Image
  onSelectFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        this.imagePath = e.target.result;
      };
    }
  }

  changeEventSpecialite($event: Event) {

  }
}

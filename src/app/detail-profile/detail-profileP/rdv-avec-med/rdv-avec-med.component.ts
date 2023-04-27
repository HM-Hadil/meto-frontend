import { Component, OnInit } from '@angular/core';
import {PatientModel} from "../../../Models/PatientModel";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserAuthService} from "../../../Services/interceptor/user-auth.service";
import {ShareServiceService} from "../../../Services/share-service.service";
import {AppointmentRequest} from "../../../Models/AppointmentRequest";
import alertify from "alertifyjs";
import {MedecinModel} from "../../../Models/MedecinModel";

@Component({
  selector: 'app-rdv-avec-med',
  templateUrl: './rdv-avec-med.component.html',
  styleUrls: ['./rdv-avec-med.component.scss']
})
export class RdvAvecMedComponent implements OnInit {

  idChirurgie!:any;
  idDoctor!:any;
  name!:any;
  idP!:string;
  medecin!:MedecinModel;
  patient! : PatientModel;
  appointmentForm!: FormGroup;
  userFile: any;
  imagePath: any ='';
  imgURL: any = '';
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
    this.getChirurgieById();
    this.getPatientInfo();
    this.getDoctorById()
    this.appointmentForm.patchValue({patientId:this.idP,
      surgeries  :this.idChirurgie.replace(/"/g, ''),
      doctorId:this.idDoctor.replace(/"/g, '')
    });
  }




  changeEventChirurgie(event: any) {
    const selectedSurgeries = this.appointmentForm.controls['surgeries'] as FormArray;
    const surgery = event.target.value;
    selectedSurgeries.push(new FormControl(surgery));
  }


  getChirurgieById(){

    this.idChirurgie = this.share.getIdChirurgie()
    console.log("id chirurgie", this.idChirurgie)

    this.share.getChirurgirById(this.idChirurgie.replace(/"/g, '')).subscribe(res=>{
      this.name=res.name;
      console.log("name",this.name);
    })
  }
  getDoctorById(){
    this.idDoctor = this.share.getIdDoctor()
    console.log("id doctor", this.idDoctor)

    this.share.getActivateDoctor(this.idDoctor.replace(/"/g, '')).subscribe(res=>{
      this.medecin=res;
    })
  }

  onSubmit() {
    if (this.appointmentForm.valid) {
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
      alertify.success("chirurgie ajoutée ")
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

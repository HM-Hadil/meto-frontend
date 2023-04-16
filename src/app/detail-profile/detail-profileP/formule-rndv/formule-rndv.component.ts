import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import { AppointmentRequest } from 'src/app/Models/AppointmentRequest';
import {ShareServiceService} from "../../../Services/share-service.service";
import {UserAuthService} from "../../../Services/interceptor/user-auth.service";
import {PatientModel} from "../../../Models/PatientModel";

@Component({
  selector: 'app-formule-rndv',
  templateUrl: './formule-rndv.component.html',
  styleUrls: ['./formule-rndv.component.scss']
})
export class FormuleRndvComponent implements OnInit {
idCh!:number;
name!:any;
idP!:string;
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
      age: [, Validators.required],
      dateRDV: ['', Validators.required],
      doctorId: ['', Validators.required],
      patientId: ['', Validators.required],
      image: ['', Validators.required],
      note: ['', Validators.required],
      phone: ['', Validators.required],
      surgeryId: [this.idCh, Validators.required],
      typeSang: ['', Validators.required],
      ville: ['', Validators.required],
      weight: ['', Validators.required]
    });
  }

  ngOnInit(): void {
this.idCh=this.share.idChirurgie
    console.log("idch",this.idCh)
    this.getChirurgieById();
    this.getPatientInfo();
    this.appointmentForm.patchValue({patientId:this.idP, surgeryId:this.idCh,
    doctorId:"281bfa77-f22a-4340-874d-ab1c0526df92"});
  }

  getChirurgieById(){
    this.idCh=this.share.idChirurgie
    this.share.getChirurgirById(this.idCh).subscribe(res=>{
      this.name=res.name;
      console.log("chirurgie",this.name);
    })
  }
  onSubmit() {
   /** if (this.appointmentForm.invalid) {
      return;
    }**/
    console.log("data form:",this.appointmentForm.value);
    const appointmentRequest = new AppointmentRequest(
      this.appointmentForm.value.age,
      this.appointmentForm.value.dateRDV,
      this.appointmentForm.value.doctorId,
      this.imagePath,
      this.appointmentForm.value.description,
      this.appointmentForm.value.patientId,
      this.appointmentForm.value.phone,
      this.appointmentForm.value.surgeryId,
      this.appointmentForm.value.typeSang,
      this.appointmentForm.value.ville,
      this.appointmentForm.value.weight
    );
    console.log(appointmentRequest);

    this.share.createAppointment(appointmentRequest).subscribe(resultRDV=>{
      console.log(resultRDV);
    })
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
}

import { Component, OnInit } from '@angular/core';
import {ShareServiceService} from "../../../Services/share-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppointmentRequest} from "../../../Models/AppointmentRequest";
import {AppointementResult} from "../../../Models/AppointementResult";
import {TypeChirurgie} from "../../../Models/typeChirurgie/type-chirurgie";
import {MedecinModel} from "../../../Models/MedecinModel";
import {updateAppointmentReq} from "../../../Models/updateAppointmentReq";

@Component({
  selector: 'app-modifier-rdv',
  templateUrl: './modifier-rdv.component.html',
  styleUrls: ['./modifier-rdv.component.scss']
})
export class ModifierRdvComponent implements OnInit {
id!:string;
  RdvForm!: FormGroup;
  rdvmodel!:AppointementResult
  chirurgieList: TypeChirurgie[]= [];
  medecinList:MedecinModel[]=[];
  idChirurgie!:string
  idP!:string;

  constructor(private share: ShareServiceService,
              private router: Router,
              private route : ActivatedRoute,
              private http: HttpClient,
              private fb: FormBuilder) {

    this.RdvForm = this.fb.group({
      age: ['', Validators.required],
      dateRDV: ['', Validators.required],
      doctorId: [''],
      patientId: ['', Validators.required],
      image: ['', Validators.required],
      note: ['', Validators.required],
      phone: ['', Validators.required],
      typeSang: ['', Validators.required],
      ville: ['', Validators.required],
      weight: ['', Validators.required],
      surgeries: ['', Validators.required],
    });
  }

  ngOnInit() {
    const token = this.getToken();
    console.log("token:", token);
    if (token) {
      //Decode the token to get the payload (which contains user information
      const payload =JSON.parse(window.atob(token.split('.')[1]));
      const id = payload.sub;
      this.idP=payload.sub;
    this.id=this.route.snapshot.params['id'];
    this.share.getAppointementById(this.id).subscribe((oldData)=>{
      console.log('>>>>old data :', oldData);
      this.rdvmodel=oldData;
      console.log('>>>>model :', this.rdvmodel);
    //  this.idChirurgie=oldData.surgery.id;

        this.share.getDoctorsByChirurgie(oldData.surgery.id).subscribe(data=>{
          this.medecinList=data;
          console.log("medecin liste",this.medecinList);})

      this.RdvForm.patchValue({
      age:oldData.age,note:oldData.note,ville:oldData.ville,weight:this.rdvmodel.weight,
      typeSang:this.rdvmodel.typeSang,phone:this.rdvmodel.phone,dateRDV:this.rdvmodel.dateRDV,
        surgeries: this.rdvmodel.surgery.id
        , doctorId: this.rdvmodel.doctor.id,
        patientId:this.idP

    });



    })}
    this.getListChirugie();
  }


  getListDoctorsBySurgery(surgeryId: string) {
    this.share.getDoctorsByChirurgie(surgeryId).subscribe((data) => {
      this.medecinList = data;
      console.log("List of doctors:", this.medecinList);
    });
  }
  getListChirugie(){
    this.share.getAllChirurgie().subscribe(data=>{
      this.chirurgieList = data;
    })
  }

  changeEventChirurgie(event: any) {
    const selectedSurgeryId = event.target.value;
    console.log("Selected surgery ID:", selectedSurgeryId);
    this.getListDoctorsBySurgery(selectedSurgeryId);
  }

  onSubmit() {
    let data = this.RdvForm.value;
    console.log("data form =>" ,data);
    let rdvModel = new updateAppointmentReq(
      data.id,
      data.age,
      data.dateRDV,
      data.doctorId,
      data.note,
      data.patientId,
      data.phone,
      data.surgeries,
      data.typeSang,
      data.ville,
      data.weight,
    )
   this.share.updateAppointment(this.id ,rdvModel).subscribe(data=>{
     console.log("updating data", data)
     this.router.navigate(['listRdv'])
   })
  }


    getToken() {
      return localStorage.getItem("token") ;
    }

  }

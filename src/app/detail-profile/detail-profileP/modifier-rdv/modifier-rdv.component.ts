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
  userFile: any;
  imagePath: any ='';
  imgURL: any = '';
  showDiabete = false;
  showTension = false;
  showAutreMaladie=false;
  showAncienOp=false
  ImageDiabeteAnalyse: any ='';
  ImageAnalyseancienOp: any ='';
  ImageautreAnalyse: any ='';
  ImageAnalyseAutreMaladie: any ='';

  constructor(private share: ShareServiceService,
              private router: Router,
              private route : ActivatedRoute,
              private http: HttpClient,
              private fb: FormBuilder) {

    this.RdvForm = this.fb.group({
      age: ['',[Validators.required, Validators['min'](1), Validators['max'](100)]],
      dateRDV: ['', Validators.required],
      doctorId: [''],
      patientId: ['', Validators.required],
      image: ['', Validators.required],
      note: ['', Validators.required],
      phone: ['', Validators.required],
      typeSang: ['', Validators.required],
      ville: ['', Validators.required],
      weight: ['',[Validators.required, Validators['min'](1), Validators['max'](300)]],
      surgeries: ['', Validators.required],
      alcoolique: ['', Validators.required],
      tension: ['', Validators.required],
      diabete: ['', Validators.required],
      fumee: ['', Validators.required],
      mesureTension: [''],
      mesureDiabete: [''],
      analyseDiabete: [''],
      autreMaladie: [''],
      desAutreMaladie: ['', Validators.required],
      analyseAutreMaladie: [''],
      ancienOperation: ['', Validators.required],
      nomAncienOperation: [''],
      analyseAncienOperation: [''],
      autreAnalyse: [''],
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
        image:this.imagePath,
      typeSang:this.rdvmodel.typeSang,phone:this.rdvmodel.phone,dateRDV:this.rdvmodel.dateRDV,
        surgeries: this.rdvmodel.surgery.id
        , doctorId: this.rdvmodel.doctor.id,
        patientId:this.idP,alcoolique:this.rdvmodel.alcoolique,diabete:this.rdvmodel.diabete,
        tension:this.rdvmodel.tension,fumee:this.rdvmodel.fumee,mesureTension:this.rdvmodel.mesureTension,
        analyseDiabete:this.rdvmodel.analyseDiabete,autreMaladie:this.rdvmodel.autreMaladie,
        desAutreMaladie:this.rdvmodel.desAutreMaladie,analyseAutreMaladie:this.rdvmodel.analyseAutreMaladie,
        ancienOperation:this.rdvmodel.ancienOperation,nomAncienOperation:this.rdvmodel.nomAncienOperation,
        mesureDiabete:this.rdvmodel.mesureDiabete,


    });


    })}
    this.getListChirugie();
  }

  showDiabeteFields(event: Event) {
    if ((event.target as HTMLInputElement).value === 'oui') {
      this.showDiabete = true;
    }
  }

  showAutreMaladieFields(event: Event) {
    if ((event.target as HTMLInputElement).value === 'oui') {
      this.showAutreMaladie = true;
    }

  }
  showTensionFields(event: Event) {
    if ((event.target as HTMLInputElement).value === 'oui') {
      this.showTension = true;
    }

  }
  showAncienOpFields(event: Event) {
    if ((event.target as HTMLInputElement).value === 'oui') {
      this.showAncienOp = true;
    }
  }

  hideDiabeteFields() {
    this.showDiabete = false;
  }
  hideTensionFields() {
    this.showTension = false;
  }
  hideAncienOpFields() {
    this.showAncienOp=false
  }

  hideAutreMaladieFields() {
    this.showAutreMaladie=false;
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
      data.note,
      this.imagePath,
      data.age,
      data.patientId,
      data.ville,
      data.weight,
      data.dateRDV,
      data.typeSang,
      data.phone,
      data.surgeries,
      data.doctorId,
      data.alcoolique,
      data.tension,
      data.diabete,
      data.fumee,
      data.mesureTension,
      data.mesureDiabete,
      this.ImageDiabeteAnalyse,
      data.autreMaladie,
      data.desAutreMaladie,
      this.ImageAnalyseAutreMaladie,
      data.ancienOperation,
      data.nomAncienOperation,
      this.ImageAnalyseancienOp,
      this.ImageautreAnalyse,

    )
    console.log("appointmentRequest", this.rdvmodel)
   this.share.updateAppointment(this.id ,rdvModel).subscribe(data=>{
     console.log("updating data", data)
     this.router.navigate(['listRdv'])
   })
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


  onSelectFileDiabeteAnalyse(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        this.ImageDiabeteAnalyse = e.target.result;
      };
    }
  }



  onSelectFileAnalyseancienOp(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        this.ImageAnalyseancienOp = e.target.result;
      };
    }
  }


  onSelectFileautreAnalyse(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        this.ImageautreAnalyse = e.target.result;
      };
    }
  }

  onSelectFileAnalyseAutreMaladie(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        this.ImageAnalyseAutreMaladie = e.target.result;
      };
    }
  }

}

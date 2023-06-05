import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import { AppointmentRequest } from 'src/app/Models/AppointmentRequest';
import {ShareServiceService} from "../../../Services/share-service.service";
import {UserAuthService} from "../../../Services/interceptor/user-auth.service";
import {PatientModel} from "../../../Models/PatientModel";
import {TypeChirurgie} from "../../../Models/typeChirurgie/type-chirurgie";
import * as alertify from "alertifyjs"
import {DoctorNotAvailableException} from "../../../Exception/DoctorNotAvailableException";
import {ErrorModalComponent} from "../../../error-modal/error-modal.component";
import {MedecinModel} from "../../../Models/MedecinModel";


@Component({
  selector: 'app-formule-rndv',
  templateUrl: './formule-rndv.component.html',
  styleUrls: ['./formule-rndv.component.scss']
})
export class FormuleRndvComponent implements OnInit {
  @Input() errorMessage: string | undefined;
idCh!:string;
name!:any;
idP!:string;
patient! : PatientModel;
appointmentForm!: FormGroup;
  imagePath: any ='';
  imgURL: any = '';
  chirurgieList: TypeChirurgie[]= [];
  showDiabete = false;
  showTension = false;
  showAutreMaladie=false;
  showAncienOp=false
  ImageDiabeteAnalyse: any ='';
  ImageAnalyseancienOp: any ='';
  ImageautreAnalyse: any ='';
  ImageAnalyseAutreMaladie: any ='';
  isInvalidDate: boolean = false;
  constructor(private route:ActivatedRoute,
              private router: Router,
              private userAuth : UserAuthService,
              private  share: ShareServiceService ,
              private fb: FormBuilder,
          ) {

    this.appointmentForm = this.fb.group({
      age: ['',[Validators.required, Validators['min'](1), Validators['max'](100)]],
      dateRDV: ['', Validators.required],
      doctor: new FormControl(null),
      patientId: ['', Validators.required],
      image: ['', Validators.required],
      note: ['', Validators.required],
      phone: ['', Validators.required],
     // surgeryId: [this.idCh, Validators.required],
      typeSang: ['', Validators.required],
      ville: ['', Validators.required],
      weight: ['',[Validators.required, Validators['min'](1), Validators['max'](300)]],
      surgeries: this.fb.array([]),
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

  ngOnInit(): void {
    this.getListChirurgie();
    this.getChirurgieById();
    this.getPatientInfo();
    this.appointmentForm.patchValue({patientId:this.idP,
      //surgeryId:this.idCh,
      });
    this. getAppointmentByChirurgie();
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    const day = ('0' + currentDate.getDate()).slice(-2);
    const hours = ('0' + currentDate.getHours()).slice(-2);
    const minutes = ('0' + currentDate.getMinutes()).slice(-2);

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  getAppointmentDates(appointments: any[]): string[] {
    const appointmentDates: string[] = [];

    for (const appointment of appointments) {
      const dateRdv = new Date(appointment.dateRDV);
      if (dateRdv) {
        appointmentDates.push(dateRdv.toDateString());
      }
    }

    return appointmentDates;
  }
  getAppointmentByChirurgie() {
    const userDate = new Date(this.appointmentForm.value.dateRDV); // Get the user input date

    if (userDate < new Date()) {
      this.isInvalidDate = true;
    } else {
      this.isInvalidDate = false;
      // Perform any other necessary actions
    }
    let data=this.appointmentForm.value;
      this.share.getAllAppointementByChirurgieIdAndStatus(data.surgeries)
        .subscribe((resultDoctorCh: any) => {
          console.log(resultDoctorCh);
          const appointmentDates = this.getAppointmentDates(resultDoctorCh); // Get the list of appointment dates

          if (appointmentDates.includes(userDate.toDateString())) {
            alert('Date déja reservé, choisissez un autre date!');
            const dateInput = document.getElementById('dateInput') as HTMLInputElement;
            dateInput.value = '';
          }

          if (appointmentDates.length > 0) {
            console.log('Appointment dates:', appointmentDates);
          } else {
            console.log('No valid appointment dates found');
          }
        });
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

  changeEventChirurgie(event: any) {
    if (!this.appointmentForm.controls['surgeries']) {
      console.error("The 'surgeries' control does not exist in the appointmentForm.");
      return;
    }

    const selectedSurgeries = this.appointmentForm.controls['surgeries'] as FormArray;
    const surgery = event.target.value;

    this.share.getDoctorsByChirurgie(surgery).subscribe(
      (doctors: MedecinModel[]) => {
        if (doctors && doctors.length > 0) {
          selectedSurgeries.clear(); // Clear existing surgeries
          this.appointmentForm.controls['surgeries'].setValue('');

          // Set the doctor FormControl value
          this.appointmentForm.controls['doctor'].setValue(doctors[0]);
        } else {
          // Display an alert if no doctors are available for the selected surgery
          alert('Aucun médecin disponible pour la chirurgie sélectionnée.');
          this.appointmentForm.controls['surgeries'].setValue(null);
          this.clearSelectedSurgeries(); // Clear selected surgeries


        }
      },
      (error) => {
        console.error("Error retrieving doctors for the selected surgery:", error);
      }
    );
  }
  clearSelectedSurgeries() {
    const selectedSurgeries = this.appointmentForm.controls['surgeries'] as FormArray;
    selectedSurgeries.clear();
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
      let data=this.appointmentForm.value;}
    const data = this.appointmentForm.value;
    console.log("data form:", data);
    const dateRDV: Date | null = data.dateRDV ? new Date(data.dateRDV) : null; // Convert dateRDV to Date object or set it as null

        const appointmentRequest = new AppointmentRequest(data.id, data.note, this.imagePath, data.age, data.patientId, data.ville, data.weight,      dateRDV instanceof Date ? dateRDV : undefined,
          data.typeSang, data.phone, data.surgeries, data.doctorId, data.alcoolique, data.tension, data.diabete, data.fumee, data.mesureTension, data.mesureDiabete, this.ImageDiabeteAnalyse, data.autreMaladie, data.desAutreMaladie, this.ImageAnalyseAutreMaladie, data.ancienOperation, data.nomAncienOperation, this.ImageAnalyseancienOp, this.ImageautreAnalyse);
      console.log("appopntment request",appointmentRequest);
// Check if the dateRDV already exists in appointments
    this.share.getAllAppointments().subscribe(appointments => {
      const filteredAppointments = appointments.filter(a => a.dateRDV === appointmentRequest.dateRDV);
      if (filteredAppointments.length
        > 0) {
        alertify.error("Le médecin a déjà un rendez-vous à cette date.");
        return;
      }});
      this.share.createAppointment(appointmentRequest).subscribe(resultRDV => {
        console.log("appointmenr result",resultRDV);
      });

      alertify.success("Rendez-vous ajoutée ");
      this.router.navigate(['listRdv']);





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

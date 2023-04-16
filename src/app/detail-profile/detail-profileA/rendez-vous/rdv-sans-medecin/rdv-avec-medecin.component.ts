import { Component, OnInit } from '@angular/core';
import {ShareServiceService} from "../../../../Services/share-service.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AppointementResult} from "../../../../Models/AppointementResult";

@Component({
  selector: 'app-rdv-avec-medecin',
  templateUrl: './rdv-avec-medecin.component.html',
  styleUrls: ['./rdv-avec-medecin.component.scss']
})
export class RdvAvecMedecinComponent implements OnInit {
appointmentRes : AppointementResult[]=[];
  constructor(private share: ShareServiceService,
              private router: Router,
              private http: HttpClient) { }

  ngOnInit() {
    this.getAllAppointmentWithoutDoctor();
  }


  getAllAppointmentWithoutDoctor(){
    this.share.getAllAppointementWithoutDcotorId().subscribe(apntmntRes=>{
      this.appointmentRes=apntmntRes;
      console.log(apntmntRes);
    })
  }

  detailapntmnt(id:string){
    this.router.navigate(['detailMsgPatient',id])

  }
}

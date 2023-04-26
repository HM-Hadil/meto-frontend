import { Component, OnInit } from '@angular/core';
import {ShareServiceService} from "../../../../Services/share-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MedecinModel} from "../../../../Models/MedecinModel";
import {UpdateAppointmentRequest} from "../../../../Models/UpdateAppointmentRequest";
import alertify from "alertifyjs";
@Component({
  selector: 'app-afficher-detail-medc',
  templateUrl: './afficher-detail-medc.component.html',
  styleUrls: ['./afficher-detail-medc.component.scss']
})
export class AfficherDetailMedcComponent implements OnInit {
medecin!:MedecinModel;
idD!:number;
idAp!:string;
  constructor(private share: ShareServiceService  ,
              private router : Router ,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getDetailsDoctor()
  }
  getDetailsDoctor(){
    this.idD=this.route.snapshot.params['idD'];
    this.idAp=this.route.snapshot.params['idAp'];

    this.share.getActivateDoctor(this.idD).subscribe(data=> {
      this.medecin=data;
      console.log("medecin detail=>", this.medecin)
    })

  }
  getSpecialiteWithoutBrackets(specialite: string): string {
    return specialite.replace(/\[|\]/g, '');}


  affecterMedcin() {
    const updateAppointmentRequest: UpdateAppointmentRequest = {
      doctorId: this.idD
    };
  this.share.affecterMedecin(this.idAp,updateAppointmentRequest).subscribe(data=>{
    console.log("data",data);
    alertify.success("L'affectation a été effectuée avec succès ")
    this.router.navigate(['rdvAvecMedecin']);

  });
  }
}

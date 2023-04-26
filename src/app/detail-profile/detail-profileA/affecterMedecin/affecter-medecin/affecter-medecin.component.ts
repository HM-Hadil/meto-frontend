import { Component, OnInit } from '@angular/core';
import {ShareServiceService} from "../../../../Services/share-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {MedecinModel} from "../../../../Models/MedecinModel";

@Component({
  selector: 'app-affecter-medecin',
  templateUrl: './affecter-medecin.component.html',
  styleUrls: ['./affecter-medecin.component.scss']
})
export class AffecterMedecinComponent implements OnInit {
idC!:string;
idAp!:string;
medecins:MedecinModel[]=[];

  constructor(private share: ShareServiceService,
              private router: Router,
              private route : ActivatedRoute,
              private http: HttpClient) { }

  ngOnInit(): void {
    this. getDoctorsByChirurgie();
  }

  getSpecialiteWithoutBrackets(specialite: string): string {
    return specialite.replace(/\[|\]/g, '');}

  getDoctorsByChirurgie(){
    this.idC=this.route.snapshot.params['idC'];
    this.idAp=this.route.snapshot.params['idAp'];

    this.share.getDoctorsByChirurgie(this.idC).subscribe(data=>{
      this.medecins=data;
      console.log("medecins", this.medecins)

    })
  }

  voirDetails(idD: string) {
    this.router.navigate(['detailProfileMed',idD,this.idAp])

  }
}

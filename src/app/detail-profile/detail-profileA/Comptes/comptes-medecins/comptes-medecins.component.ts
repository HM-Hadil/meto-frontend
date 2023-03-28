import { Component, OnInit } from '@angular/core';
import {ShareServiceService} from "../../../../Services/share-service.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {MedecinModel} from "../../../../Models/MedecinModel";

@Component({
  selector: 'app-comptes-medecins',
  templateUrl: './comptes-medecins.component.html',
  styleUrls: ['./comptes-medecins.component.scss']
})
export class ComptesMedecinsComponent implements OnInit {
  MedecinModel: MedecinModel[]= [];
  constructor( private share: ShareServiceService,
               private router: Router,
               private http: HttpClient,) { }

  ngOnInit() {
    this.getDisabledAccountsMedecins();

  }

  getDisabledAccountsMedecins(){
return this.share.getDisableddoctor().subscribe(
  (data )=> {
    this.MedecinModel = data;
    console.log('reload data ==>>', this.MedecinModel);



  },

  (err) => {
    console.error('Error ', err);
  }
)

  }

  seeDetails(id:number){
    this.router.navigate(['detail-compte-Medecin',id]);

  }
}

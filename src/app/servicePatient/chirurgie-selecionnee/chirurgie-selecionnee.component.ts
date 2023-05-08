import { Component, OnInit } from '@angular/core';
import {ShareServiceService} from "../../Services/share-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MedecinModel} from "../../Models/MedecinModel";

@Component({
  selector: 'app-chirurgie-selecionnee',
  templateUrl: './chirurgie-selecionnee.component.html',
  styleUrls: ['./chirurgie-selecionnee.component.scss']
})
export class ChirurgieSelecionneeComponent implements OnInit {
id!:string;
nomChirurgie:any;
medecins: MedecinModel[]=[];
  constructor(private share: ShareServiceService,private route: ActivatedRoute,
              private router:Router) { }

  ngOnInit(): void {
   this. getDoctorsByChirurgie();
   this.getChirurgie();
  }

  getChirurgie(){
    this.share.getChirurgirById(this.id).subscribe(data=>{
      this.nomChirurgie=data.name;
    })
  }
  getSpecialiteWithoutBrackets(specialite: string): string {
    return specialite.replace(/\[|\]/g, '');}

  getDoctorsByChirurgie(){
    this.id=this.route.snapshot.params['id'];
    this.share.getDoctorsByChirurgie(this.id).subscribe(data=>{
      this.medecins=data;
      console.log("medecins", this.medecins)

    })
  }

  voirDetails(id: string) {
    this.router.navigate(['detailParcoursMedecin',id])
    this.share.setIdChirurgie(this.id);

  }
}

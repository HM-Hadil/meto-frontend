import { Component, OnInit } from '@angular/core';
import {ShareServiceService} from "../../Services/share-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MedecinModel} from "../../Models/MedecinModel";

@Component({
  selector: 'app-detail-parcours-medc',
  templateUrl: './detail-parcours-medc.component.html',
  styleUrls: ['./detail-parcours-medc.component.scss']
})
export class DetailParcoursMedcComponent implements OnInit {
  id!:number;
  medecin!:MedecinModel;
  constructor(private share: ShareServiceService,private route: ActivatedRoute,
              private router:Router) { }

  ngOnInit(): void {
    this.getDetailsDoctor()
  }
  getDetailsDoctor(){
  this.id=this.route.snapshot.params['id'];
  this.share.getActivateDoctor(this.id).subscribe(data=> {
    this.medecin=data;
    console.log("medecin detail=>", this.medecin)
  })

}
  getSpecialiteWithoutBrackets(specialite: string): string {
    return specialite.replace(/\[|\]/g, '');}

  /**
  onBackButtonClick() {
    // Navigate back to the previous page
    this.router.navigate(['../'], { relativeTo: this.route });
  }**/
}

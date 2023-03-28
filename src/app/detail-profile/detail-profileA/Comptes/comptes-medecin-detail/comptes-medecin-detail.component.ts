import { Component, OnInit } from '@angular/core';
import {ShareServiceService} from "../../../../Services/share-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MedecinModel} from "../../../../Models/MedecinModel";

@Component({
  selector: 'app-comptes-medecin-detail',
  templateUrl: './comptes-medecin-detail.component.html',
  styleUrls: ['./comptes-medecin-detail.component.scss']
})
export class ComptesMedecinDetailComponent implements OnInit {
  id!:number;
  medecin!: MedecinModel  ;
  constructor(private share: ShareServiceService  ,
              private router : Router , private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];

    this.share.getDoctorByIdAndEnabledFalse(this.id).subscribe((data) => {
      console.log('>>>> data :', data);
      this.medecin = data;
    });
  }


}

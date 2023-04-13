import { Component, OnInit } from '@angular/core';
import {MedecinModel} from "../../../../Models/MedecinModel";
import {ShareServiceService} from "../../../../Services/share-service.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-detail-medecin',
  templateUrl: './detail-medecin.component.html',
  styleUrls: ['./detail-medecin.component.scss']
})
export class DetailMedecinComponent implements OnInit {

  id!:number;
  medecin!: MedecinModel  ;
  user! : MedecinModel;
  constructor(private share: ShareServiceService  ,
              private router : Router , private route: ActivatedRoute) { }

  ngOnInit() {
    this.id=this.route.snapshot.params['id'];

    this.share.getActivateDoctor(this.id).subscribe((data) => {
      console.log('>>>> active doctor :', data);
      this.medecin = data;
    });
  }



}

import { Component, OnInit } from '@angular/core';
import {ShareServiceService} from "../../../Services/share-service.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {OpinionRequest} from "../../../Models/opinion";
import {OpinionResult} from "../../../Models/opinionResult";

@Component({
  selector: 'app-avis-patient',
  templateUrl: './avis-patient.component.html',
  styleUrls: ['./avis-patient.component.scss']
})
export class AvisPatientComponent implements OnInit {
opinion : OpinionResult[] = [];
  constructor( private share: ShareServiceService,
               private router: Router,
               private http: HttpClient) { }

  ngOnInit(): void {
    this.getEnabledOpinion();
  }

  getEnabledOpinion(){
    this.share.getAllEnabledOpinion().subscribe((data)=>{
      this.opinion=data;
      console.log("opinion",this.opinion)
    })

  }

  accepter(id:string) {
    this.share.accepterAvis(id).subscribe(data=>{
      console.log(data);
      window.location.reload();
    })


  }

  supprimer(id: string) {
    this.share.supprimerOpinion(id).subscribe(data=>{
      console.log(data);
      window.location.reload();
    })

  }
}

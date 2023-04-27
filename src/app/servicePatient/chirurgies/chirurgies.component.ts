import { Component, OnInit } from '@angular/core';
import {ShareServiceService} from "../../Services/share-service.service";
import {TypeChirurgie} from "../../Models/typeChirurgie/type-chirurgie";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-chirurgies',
  templateUrl: './chirurgies.component.html',
  styleUrls: ['./chirurgies.component.scss']
})
export class ChirurgiesComponent implements OnInit {
  ModelChirurgie: TypeChirurgie[]= [];
 private fragment!: string ;

  constructor(private share: ShareServiceService,private route: ActivatedRoute,
  private router:Router) {
    this.route.fragment.subscribe(fragment => {
      if (fragment != null) {
        this.fragment = fragment;
      }
    });
  }

  ngOnInit(): void {
    this.reloadData();
  }

  ngAfterViewInit(): void {
    try {
      const fragment = document.querySelector('#' + this.fragment);
      if (fragment != null) {
        fragment.scrollIntoView();
        console.log("link active");
      }

    } catch (e) {}
  }

  prendreRDV(idC:string){
    this.router.navigate(['/loginPatient'])
    console.log('id chirurgie', idC)

      this.share.setIdChirurgie(idC);


  }

  //get All Chirurgie
  reloadData() {
    this.share.getAllChirurgie().subscribe(
      (response) => {
        this.ModelChirurgie = response;
        console.log('reload data ==>>', this.ModelChirurgie);
      },

      (err) => {
        console.error('Error ', err);
      }
    );
  }

  choisirMedecin(id: string) {
    this.router.navigate(['chirurgieSelecionnee',id])
  }
}

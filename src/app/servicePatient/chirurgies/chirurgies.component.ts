import { Component, OnInit } from '@angular/core';
import {ShareServiceService} from "../../Services/share-service.service";
import {TypeChirurgie} from "../../Models/typeChirurgie/type-chirurgie";
import {ActivatedRoute, Router} from "@angular/router";
import {UserAuthService} from "../../Services/interceptor/user-auth.service";

@Component({
  selector: 'app-chirurgies',
  templateUrl: './chirurgies.component.html',
  styleUrls: ['./chirurgies.component.scss']
})
export class ChirurgiesComponent implements OnInit {
  ModelChirurgie: TypeChirurgie[]= [];
 private fragment!: string ;

  constructor(private share: ShareServiceService,private route: ActivatedRoute,
  private router:Router, private authService : UserAuthService) {
    this.route.fragment.subscribe(fragment => {
      if (fragment != null) {
        this.fragment = fragment;
      }
    });
  }

  ngOnInit(): void {
    this.reloadData();
  }


  prendreRDV(idC:string){
    if(this.authService.getRole()==='PATIENT'!==null){
      this.router.navigate(['/rdvAvecMed'])
      console.log('id chirurgie', idC)

      this.share.setIdChirurgie(idC);

    }
    else{
      this.router.navigate(['/loginPatient'])
      console.log('id chirurgie', idC)

      this.share.setIdChirurgie(idC);


    }



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

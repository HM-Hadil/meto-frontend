import { Component, OnInit } from '@angular/core';
import {ShareServiceService} from "../../Services/share-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MedecinModel} from "../../Models/MedecinModel";
import {UserAuthService} from "../../Services/interceptor/user-auth.service";

@Component({
  selector: 'app-detail-parcours-medc',
  templateUrl: './detail-parcours-medc.component.html',
  styleUrls: ['./detail-parcours-medc.component.scss']
})
export class DetailParcoursMedcComponent implements OnInit {
  id!:number;
  medecin!:MedecinModel;
  constructor(private share: ShareServiceService,private route: ActivatedRoute,
              private router:Router,private authService : UserAuthService) { }

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


  prendreRdvMedecin(id: any) {
    if(this.authService.getRole()==='PATIENT'!==null){
      this.router.navigate(['/rdvAvecMed'])
      this.share.setIdDoctor(id);

    }
    else {
      this.share.setIdDoctor(id);
      this.router.navigate(['/signPatient'])
    }
  }
}

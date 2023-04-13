import { Component, OnInit } from '@angular/core';
import {ShareServiceService} from "../../../../Services/share-service.service";
import {MedecinModel} from "../../../../Models/MedecinModel";
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import alertify from "alertifyjs";
@Component({
  selector: 'app-list-medecin',
  templateUrl: './list-medecin.component.html',
  styleUrls: ['./list-medecin.component.scss']
})
export class ListMedecinComponent implements OnInit {
  MedecinModel: MedecinModel[]= [];
   // @ts-ignore
  doctor = new MedecinModel();
  name: string = '';
  specialty: string = '';

  constructor(private share : ShareServiceService, private router: Router) {
  }
  form = new FormGroup({
    name : new FormControl()
  });

  ngOnInit(): void {
    this.getAllActiveMedecins();
  }


  getAllActiveMedecins(searchKeyWord : string=""){
    return this.share.getAllActiveDoctor(searchKeyWord).subscribe(
      (data )=> {
        this.MedecinModel = data;
        console.log('reload data ==>>', this.MedecinModel);
      },

      (err) => {
        console.error('Error ', err);
      }
    )

  }

  searchByKeyWord(searchKeyWord: string){
    console.log(searchKeyWord);
    this.MedecinModel = [];
    this.getAllActiveMedecins(searchKeyWord);
  }

  voirDetail(id:number){
    this.router.navigate(['/detailMedecin',id]);

  }

  desactiver(id:number){
    this.share.desactivateAccountDoctor(id).subscribe(
      data => {

        alertify.success("compte désactiver avec succée.")

        window.location.reload();

      }, error => {
        console.log('Error activating doctor:', error);
      });


  }
}

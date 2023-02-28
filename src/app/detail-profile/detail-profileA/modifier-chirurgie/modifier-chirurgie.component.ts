import { Component, OnInit } from '@angular/core';
import {TypeChirurgie} from "../../../Models/typeChirurgie/type-chirurgie";
import {Observable} from "rxjs";
import {ShareServiceService} from "../../../Services/share-service.service";

@Component({
  selector: 'app-modifier-chirurgie',
  templateUrl: './modifier-chirurgie.component.html',
  styleUrls: ['./modifier-chirurgie.component.scss']
})
export class ModifierChirurgieComponent implements OnInit {

  chirurgieModel  : TypeChirurgie[] = [];

  constructor(private share: ShareServiceService ) { }

  ngOnInit(): void {

    this.reloadData();
  }

    reloadData(){
    this.share.getAllChirurgie().subscribe(response =>{
      try {
        if (response) {
          this.chirurgieModel = response;

        }
      } catch (e) {
        console.warn('Exception ', e);
      }
    }, err => {
      console.error('Error ', err);
    });
  }

  //delete chirurgie

  deleteChirurgie(id : number){
    this.share.deleteChirurgie(id).subscribe(data => {
      console.log(data)
      console.log(data.id)
      this.reloadData();
    })

  }

  //update chirurgie

  updateChirurgie(id: number , chirurgie:TypeChirurgie) {
     this.share.updateChirurgie(id,chirurgie).subscribe();
  }

}

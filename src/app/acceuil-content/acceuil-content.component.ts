import { Component, OnInit } from '@angular/core';
import {ShareServiceService} from "../Services/share-service.service";
import {TypeChirurgie} from "../Models/typeChirurgie/type-chirurgie";

@Component({
  selector: 'app-acceuil-content',
  templateUrl: './acceuil-content.component.html',
  styleUrls: ['./acceuil-content.component.scss']
})
export class AcceuilContentComponent implements OnInit {
  ModelChirurgie: TypeChirurgie[]= [];
  constructor(private share:ShareServiceService ) { }

  ngOnInit(): void {
    this.reloadData();

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
}


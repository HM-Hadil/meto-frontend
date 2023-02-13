import { Component, OnInit } from '@angular/core';
import {TypeChirurgie} from "./TypeChirurgie";

@Component({
  selector: 'app-acceuil-content',
  templateUrl: './acceuil-content.component.html',
  styleUrls: ['./acceuil-content.component.scss']
})
export class AcceuilContentComponent implements OnInit {
  public chirurgies : Array<TypeChirurgie> =[

    {
      id:'1',
      titre:'Chirurgie dentaire',
      url:'../assets/image/chirurgie dentaire.jfif'
    },
    {   id:'2',
      titre:' Chirurgie de l’obésité',
      url:'../assets/image/CHIRURGIE DE L’OBÉSITÉ.jfif'
    },
    {  id:'3',
      titre:' Chirurgie digestive',
      url:'../assets/image/La chirurgie digestive.jfif'
    },
    {
      id:'4',
      titre:' Chirurgie ophtalmologique',
      url:'../assets/image/la chirurgie ophtamologique4.jfif'
    },
    {
      id:'5',
      titre:' Chirurgie orthopédique',
      url:'../assets/image/Chirurgie orthopédique2.jfif'
    },
    {
      id:'6',
      titre:' Chirurgie des vales cardiaques ',
      url:'../assets/image/CHIRURGIE CARDIO VASCULAIRE.jfif'
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}

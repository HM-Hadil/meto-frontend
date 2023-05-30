import { Component, OnInit } from '@angular/core';
import {ShareServiceService} from "../../Services/share-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {TypeChirurgie} from "../../Models/typeChirurgie/type-chirurgie";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  ModelChirurgie: TypeChirurgie[]= [];
  constructor(private share: ShareServiceService,
              private router: Router,
              private route : ActivatedRoute,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.  reloadData();
  }
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

  alert0() {
    alert("le clinique n'est pas encore terminé mais il est en cours de développement")
  } alert1() {
    alert("le séjours n'est pas encore terminé mais il est en cours de développement")
  } alert2() {
    alert("les hotels n'est pas encore terminé mais il est en cours de développement")
  }
  alert3() {
    alert("les chirurgiens n'est pas encore terminé mais il est en cours de développement")
  }
  alert4() {
    alert("le devis n'est pas encore terminé mais il est en cours de développement")
  }
}

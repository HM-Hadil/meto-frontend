import { Component, OnInit } from '@angular/core';
import {ShareServiceService} from "../../../Services/share-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AppointementResult} from "../../../Models/AppointementResult";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DevisReq} from "../../../Models/DevisReq";

@Component({
  selector: 'app-valider-facture',
  templateUrl: './valider-facture.component.html',
  styleUrls: ['./valider-facture.component.scss']
})
export class ValiderFactureComponent implements OnInit {
  id!:string;
  apntmnt!:AppointementResult;
  DevisForm!:FormGroup;
  constructor(private share: ShareServiceService,
              private router: Router, private fb: FormBuilder,
              private route : ActivatedRoute,
              private http: HttpClient) {
    this.DevisForm = this.fb.group({
      cost:['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['idAp'];
    this.share.getAppointementById(this.id).subscribe(data=>{
      this.apntmnt = data;
      console.log("data =>",this.apntmnt);
    })
  }

  Valider(id: string) {
    let data = this.DevisForm.value;
    let devis = new DevisReq(
      data.cost
    );
    this.share.createDevis(id,devis).subscribe(data=>{
      console.log("devis result", data);
      this.router.navigate(['/acceptedRdv'])
    })

  }

  openImage(imageUrl: any): void {
    const imageWindow = window.open("", "_blank");
    if (imageWindow) {
      const fileName = imageUrl.substring(imageUrl.lastIndexOf('/')+1);
      imageWindow.document.write("<html><head><title>Tourisme Médical Image</title></head>" +
        "<body style='text-align:center'><h2 style='color: #0066FF'>Clicker sur l'image pour le télécharger:" +
        "</h2><a href='" + imageUrl + "' download='" + fileName + "'><img src='" + imageUrl + "' />" +
        "</a></body></html>");
      imageWindow.document.close();
    }
  }

}

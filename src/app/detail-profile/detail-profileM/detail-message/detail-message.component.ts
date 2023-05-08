import { Component, OnInit } from '@angular/core';
import {ShareServiceService} from "../../../Services/share-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AppointementResult} from "../../../Models/AppointementResult";
import {AdminModel} from "../../../Models/AdminModel";

@Component({
  selector: 'app-detail-message',
  templateUrl: './detail-message.component.html',
  styleUrls: ['./detail-message.component.scss']
})
export class DetailMessageComponent implements OnInit {
    id!:string;
    apntmnt!:AppointementResult;

  constructor(private share: ShareServiceService,
              private router: Router,
              private route : ActivatedRoute,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.share.getAppointementById(this.id).subscribe(data=>{
      this.apntmnt = data;
      console.log("data =>",this.apntmnt);
    })
  }


  accpterAp(idAp: string) {
    this.share.accepterRdv(idAp).subscribe(data=>{
      console.log("new data for accepted status", data)
    })
    this.router.navigate(['/acceptedRdv']);


  }

  rejeterAp(id: string) {
    this.share.rejectRdv(id).subscribe(data=>{
      console.log("new data for rejected status", data)

    })
    this.router.navigate(['messagesM']);
    window.location.reload();


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

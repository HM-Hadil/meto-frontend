import { Component, OnInit } from '@angular/core';
import {UserAuthService} from "../../Services/interceptor/user-auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-profil-admin',
  templateUrl: './profil-admin.component.html',
  styleUrls: ['./profil-admin.component.scss']
})
export class ProfilAdminComponent implements OnInit {

  constructor(private authService:UserAuthService,
  private router: Router) { }

  ngOnInit(): void {
  }
  logOut(){
    this.authService.clear();
    this.router.navigate(['login']);

  }
}

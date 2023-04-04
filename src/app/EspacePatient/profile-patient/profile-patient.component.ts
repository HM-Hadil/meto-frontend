import {Component, OnInit, ViewChild} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import {Router} from "@angular/router";
import {UserAuthService} from "../../Services/interceptor/user-auth.service";


@Component({
  selector: 'app-profile-patient',
  templateUrl: './profile-patient.component.html',
  styleUrls: ['./profile-patient.component.scss']
})
export class ProfilePatientComponent implements OnInit {

  constructor(private observer: BreakpointObserver, private router: Router,
              private userAuth : UserAuthService) { }

  ngOnInit(): void {

  }
public  isLoggedIn()
 {
  return this.userAuth.isLoggedIn();
 }

  public  logOut()
  {
    return this.userAuth.clear();
  }

}

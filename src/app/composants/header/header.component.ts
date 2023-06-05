import {Component, HostListener, OnInit, Renderer2} from '@angular/core';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import {UserAuthService} from "../../Services/interceptor/user-auth.service";
import {Router} from "@angular/router";
import {ShareServiceService} from "../../Services/share-service.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
role:any;
  constructor(
    private router:Router,private authService : UserAuthService) { }

  ngOnInit() {
   this.role = this.authService.getRole();
  }


  navigateTo() {
    console.log('role', this.role);
    if (this.role = "PATIENT") {
      this.router.navigate(['/listRdv']);
    } else {
      this.router.navigate(['/loginPatient']);
    }
  }

}

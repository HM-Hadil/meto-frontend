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
  navbarScrolled: boolean = false;
  constructor(private scrollDispatcher: ScrollDispatcher,
              private router:Router,private authService : UserAuthService,private share: ShareServiceService) { }

  ngOnInit() {
    window.addEventListener('scroll', this.onWindowScroll);
   this.role = this.authService.getRole();
  }


  onWindowScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (scrollTop > 0) {
      this.navbarScrolled = true;
    } else {
      this.navbarScrolled = false;
    }
  };


  navigateTo() {
    console.log('role', this.role);
    if (this.role = "PATIENT") {
      this.router.navigate(['/listRdv']);
    } else {
      this.router.navigate(['/loginPatient']);
    }
  }



}

import {Component, HostListener, OnInit, Renderer2} from '@angular/core';
import { ScrollDispatcher } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  navbarScrolled: boolean = false;
  constructor(private scrollDispatcher: ScrollDispatcher) { }

  ngOnInit() {
    window.addEventListener('scroll', this.onWindowScroll);
  }


  onWindowScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (scrollTop > 0) {
      this.navbarScrolled = true;
    } else {
      this.navbarScrolled = false;
    }
  };


}

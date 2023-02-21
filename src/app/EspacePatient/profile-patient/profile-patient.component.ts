import {Component, OnInit, ViewChild} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import {Router} from "@angular/router";


@Component({
  selector: 'app-profile-patient',
  templateUrl: './profile-patient.component.html',
  styleUrls: ['./profile-patient.component.scss']
})
export class ProfilePatientComponent implements OnInit {

  constructor(private observer: BreakpointObserver, private router: Router) { }

  ngOnInit(): void {

  }

}

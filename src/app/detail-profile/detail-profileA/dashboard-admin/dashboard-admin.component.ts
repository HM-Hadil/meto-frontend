import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import {ShareServiceService} from "../../../Services/share-service.service";
@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent implements OnInit {

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: any = {};
  chartOptionsdogh: any = {};

  constructor(private share: ShareServiceService) {
  }

  ngOnInit() {
this.getPatientParGender()
  }


  getPatientParGender(): void {
  }
}


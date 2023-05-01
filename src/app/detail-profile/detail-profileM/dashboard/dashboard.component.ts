import { Component, OnInit } from '@angular/core';
import {ShareServiceService} from "../../../Services/share-service.service";
import {HttpClient} from "@angular/common/http";
import {UserAuthService} from "../../../Services/interceptor/user-auth.service";
import {ChartType, ChartOptions, ChartDataset} from 'chart.js';
import { AppointmentStatsResult } from "../../../Models/appointmentStatsResult";
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  appointmentStats!: AppointmentStatsResult;
  id!:string;
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: any = {};

  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  barChartLabels: string[] = ['Total', 'Males', 'Females'];
  barChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  constructor(private share: ShareServiceService, private  authService : UserAuthService) { }

  ngOnInit() {
    this.getAppointmentStatsByDoctor();
    this.initChart();
    this. getRequestPerMonth();
  }

  getAppointmentStatsByDoctor() {
    // Fetch appointment statistics by doctor
    const  token = this.authService.getToken();
    if (token) {
      //Decode the token to get the payload (which contains user information
      const payload = JSON.parse(window.atob(token.split('.')[1]));
      this.id = payload.sub;
      console.log("decoded payload:", payload);

      this.share.getAppointmentStatsByDoctor(this.id)
        .subscribe(result => {
          this.appointmentStats = result;
          // Call a function to render the chart with the fetched data
          this.updateChartData();
        });
    }

  }

  updateChartData(): void {
    // Update the chart data with the fetched data
    this.barChartData = [
      { data: [this.appointmentStats.total, this.appointmentStats.males, this.appointmentStats.females], label: 'nombres des patients' }
    ];
  }

  getToken() {
      return localStorage.getItem("token") ;
    }

  getMonthName(monthNumber: any) {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString('en-US', {
      month: 'long',
    });
  }


  initChart() {
    this.chartOptions = {
      title: {
        text: 'Nombre de rendez-vous par mois'
      },
      xAxis: {
        categories: []
      },
      series: [{
        data: [],
        step: 'right',
        name: 'nombre de rendez-vous par mois'
      }]

    }
  }

  getRequestPerMonth() {
    const  token = this.authService.getToken();
    if (token) {
      //Decode the token to get the payload (which contains user information
      const payload = JSON.parse(window.atob(token.split('.')[1]));
      this.id = payload.sub;
    this.share.getRdvtPerMonth(this.id).subscribe((data) => {
      console.log('>>>> rdv par mois', data);
      data.forEach((item: any) =>{
        const splittedDate = item[1].split('-');
        const monthName = this.getMonthName(splittedDate[0]);
        console.log(monthName +" "+ splittedDate[1])
        this.chartOptions.xAxis.categories.push(monthName +" "+ splittedDate[1])
        this.chartOptions.series[0].data.push(item[0])
      } )
      console.log('>>>> Dash', this.chartOptions);
      Highcharts.chart('container', this.chartOptions);
    });}
  }

}

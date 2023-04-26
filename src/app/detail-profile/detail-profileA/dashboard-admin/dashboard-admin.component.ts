import { Component, OnInit } from '@angular/core';
import {ShareServiceService} from "../../../Services/share-service.service";
import {HttpClient} from "@angular/common/http";
import {Chart, ChartData, DoughnutController} from 'chart.js';
import { ChartType, ChartOptions } from 'chart.js';
import {MedecinModel} from "../../../Models/MedecinModel";
Chart.register(DoughnutController);
@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent implements OnInit {

 name!:string;
 count!:number;
 image!:string;
 d_firstname!:string;
 d_lastname!:string;
 d_image!:string;
 d_count!:number;
 d_specialite!:string;
 medecin!:MedecinModel;
 city_name!:string;
 city_count!:number;

  public options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart Title'
      }
    }
  };
  constructor(private share: ShareServiceService,private http: HttpClient) {
  }

  ngOnInit() {
    this.getMostFrequentSurgery()
    this.getMostFrequentDoctor()
    this.getMostFrequentCity()
  }



  public doughnutChartData: ChartData<'doughnut', number[], string> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        hoverBackgroundColor: []
      }
    ]
  };

  getMostFrequentCity(){
    this.http.get('http://localhost:8800/appointments/mostFrequentCity').subscribe(
      (data:any)=>{
        this.city_name = data[0][0];
        this.city_count=data[0][1];
      })


  }
getMostFrequentDoctor(){
  this.http.get('http://localhost:8800/appointments/mostFrequentDoctorId').subscribe(
    (response:any)=>{
      this.d_firstname=response[0][0];
      this.d_lastname=response[0][1];
      this.d_specialite=response[0][2]
      this.d_image=response[0][3];
      this.d_count=response[0][4]
      this.medecin=response[0][3];
      console.log("image mdc",this.medecin)
    }
  )
}

  getMostFrequentSurgery(): void {
    this.http.get('http://localhost:8800/appointments/mostFrequentSurgeryId').subscribe(
      (response: any) => {
        // Handle the response data
        this.name = response[0][0];
        this.image= response[0][1]
        this.count = response[0][2];
        console.log("image",this.image)



        // Set chart data and labels
        this.doughnutChartData.labels = [this.name];
        this.doughnutChartData.datasets[0].data = [this.count];
        this.doughnutChartData.datasets[0].backgroundColor = ['#4e73df'];
        this.doughnutChartData.datasets[0].hoverBackgroundColor = ['#FF6384'];


        console.log('Most frequent surgery name:', this.name);
        console.log('Surgery count:', this.count);
      },
      (error: any) => {
        // Handle the error
        console.error('Failed to get most frequent surgery:', error);
      }
    );
  }






}


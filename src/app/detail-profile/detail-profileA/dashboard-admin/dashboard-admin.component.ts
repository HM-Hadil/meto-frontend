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
    this.share.getCountPatientPerGender().subscribe((data: any[]) => {
      const chartLabels: string[] = [];
      const chartData: Highcharts.SeriesMapDataOptions[] = [];

      data.forEach((item: any) => {
        const labelName = `Genre ${item[1]}`;
        chartLabels.push(labelName);
        this.chartOptionsdogh.series[0].data.push({
          name: labelName,
          value: item[0], // use value instead of y
          sliced: true,
          selected: true
        });
      });

      const chartOptionsdogh: Highcharts.Options = {
        chart: {
          type: 'pie',
        },
        title: {
          text: 'Nombre des patients par genre',
        },

        accessibility: {
          point: {
            valueSuffix: '%',
          },
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            },
          },
        },
        legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle',
        },
        series: [
          {
            type: 'pie',
            name: 'Pourcentage de genre',
            colorByPoint: true,
            data: chartData,
          },
        ],
      };

      Highcharts.chart('doughnut', chartOptionsdogh);

    });

  }

}

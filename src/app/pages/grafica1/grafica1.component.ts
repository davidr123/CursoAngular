import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component implements OnInit {

  public doughnutChartType: ChartType = 'doughnut';
  constructor() { }

  ngOnInit(): void {
  }

}

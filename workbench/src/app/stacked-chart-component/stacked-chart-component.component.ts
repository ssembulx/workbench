import { AfterViewInit, Component, OnInit } from '@angular/core';
// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

@Component({
  selector: 'app-stacked-chart-component',
  templateUrl: './stacked-chart-component.component.html',
  styleUrls: ['./stacked-chart-component.component.scss']
})
export class StackedChartComponentComponent implements OnInit, AfterViewInit{
  colors: any;

  constructor() { }
  ngAfterViewInit(): void {
    this.getStackedChart();
  }

  ngOnInit(): void {
   
  }
  
  getStackedChart(){
    am4core.useTheme(am4themes_animated);
    // Themes end
    
    var chart = am4core.create("chartdiv1", am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
    chart.colors.list = this.colors;

    // color list for chart and legend
    chart.colors.list = [
      am4core.color('#ff7979'),
      am4core.color('#7bed9f'),
      // am4core.color('#6c5ce7'),
      // am4core.color('#e84393'),
      // am4core.color('#f39c12'),
      // am4core.color('#b2bec3')
    ];
    
    chart.data = [
      {
        category: "SRR1",
        value1: 5,
        value2: 4
      },
      {
        category: "SRR2",
        value1: 4,
        value2: 5
      },
      {
        category: "SRR3",
        value1: 5,
        value2: 5
      },
    
    ];
    
    chart.colors.step = 2;
    // chart.padding(30, 30, 10, 30);
    chart.legend = new am4charts.Legend();
    
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "category";
    categoryAxis.renderer.grid.template.location = 0;
    
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.max = 100;
    valueAxis.strictMinMax = true;
    valueAxis.calculateTotals = true;
    valueAxis.renderer.minWidth = 50;
    
    
    var series1 = chart.series.push(new am4charts.ColumnSeries());
    series1.columns.template.width = am4core.percent(80);
    series1.columns.template.tooltipText =
      "{name}: {valueY.totalPercent.formatNumber('#.00')}%";
    series1.name = "Allocated";
    series1.dataFields.categoryX = "category";
    series1.dataFields.valueY = "value1";
    series1.dataFields.valueYShow = "totalPercent";
    // series1.dataItems.template.locations.categoryX = 0.5;
    series1.stacked = true;
    // series1.tooltip.pointerOrientation = "vertical";
    
    var bullet1 = series1.bullets.push(new am4charts.LabelBullet());
    bullet1.interactionsEnabled = false;
    bullet1.label.text = "{valueY.totalPercent.formatNumber('#.00')}%";
    bullet1.label.fill = am4core.color("#ffffff");
    bullet1.locationY = 0.5;
    
    var series2 = chart.series.push(new am4charts.ColumnSeries());
    series2.columns.template.width = am4core.percent(80);
    series2.columns.template.tooltipText =
      "{name}: {valueY.totalPercent.formatNumber('#.00')}%";
    series2.name = "UnAllocated";
    series2.dataFields.categoryX = "category";
    series2.dataFields.valueY = "value2";
    series2.dataFields.valueYShow = "totalPercent";
    // series2.dataItems.template.locations.categoryX = 0.5;
    series2.stacked = true;

     //**** for dotted outline line ****//
     series2.stroke = am4core.color("red").lighten(0.5);
     series2.strokeDasharray="3,3" 
    
    var bullet2 = series2.bullets.push(new am4charts.LabelBullet());
    bullet2.interactionsEnabled = false;
    bullet2.label.text = "{valueY.totalPercent.formatNumber('#.00')}%";
    bullet2.locationY = 0.5;
    bullet2.label.fill = am4core.color("#ffffff");
      }

}

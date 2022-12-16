import { AfterViewInit, Component, OnInit } from '@angular/core';
// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

@Component({
  selector: 'app-labwise-alloted-chart-component',
  templateUrl: './labwise-alloted-chart-component.component.html',
  styleUrls: ['./labwise-alloted-chart-component.component.scss']
})
export class LabwiseAllotedChartComponentComponent implements OnInit,AfterViewInit {

  constructor() { }
  ngAfterViewInit(): void {
    this.getLabwiseStackedChart();
  }

  ngOnInit(): void {
  }

  getLabwiseStackedChart(){
    am4core.useTheme(am4themes_animated);
    // Themes end
    
    var chart = am4core.create("chartdiv2", am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
    
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
    // series2.tooltip.pointerOrientation = "vertical";
    
    var bullet2 = series2.bullets.push(new am4charts.LabelBullet());
    bullet2.interactionsEnabled = false;
    bullet2.label.text = "{valueY.totalPercent.formatNumber('#.00')}%";
    bullet2.locationY = 0.5;
    bullet2.label.fill = am4core.color("#ffffff");

    //*****x-axis scrollbar*****//
    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarX.parent = chart.bottomAxesContainer;
    chart.scrollbarX.width = am4core.percent(99);
    // chart.scrollbarX.minHeight = 4;
    chart.scrollbarX.thumb.background.fillOpacity = 0.2;
    chart.scrollbarX.thumb.background.strokeWidth = 1;
    chart.scrollbarX.background.fill = am4core.color("#d9d9d9");
    chart.scrollbarX.thumb.background.fill = am4core.color("#d9d9d9");
    chart.scrollbarX.startGrip.background.fill = am4core.color("#d9d9d9");
    chart.scrollbarX.endGrip.background.fill = am4core.color("#d9d9d9");
    chart.scrollbarX.stroke = am4core.color("#d9d9d9");
  
  }

}

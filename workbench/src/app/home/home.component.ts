import { AfterViewInit, Component, OnInit } from '@angular/core';
// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
am4core.options.commercialLicense = true;

am4core.options.autoSetClassName = true;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit,AfterViewInit {

  orderMappedRelease: string = '';
  reverseMappedRelease: boolean = true;
  typeChart = "Location Chart";

  constructor() { }
  ngAfterViewInit(): void {
    this.getSemiCirclePiechart();
  }

  summaryData = [
    { slno: 1, program: "MTL", SKU: "P", vendor: "Vendor 1", AllocateTo: "Srikanth Uppuluri", FromWW:"WW20-2022", ToWW:"WW50-2022",BenchCount:"15",Staus:"Available"},
    { slno: 2, program: "MTL", SKU: "S", vendor: "Vendor 1", AllocateTo: "Krishna Prasad M", FromWW:"WW33-2022", ToWW:"WW49-2022",BenchCount:"15",Staus:"Booked"},
    { slno: 3, program: "MTL", SKU: "M", vendor: "Vendor 2", AllocateTo: "Vijay B R", FromWW:"WW25-2022", ToWW:"WW52-2022",BenchCount:"18",Staus:"SIV"},
    { slno: 4, program: "MTL", SKU: "P", vendor: "Vendor 1", AllocateTo: "Srikanth Uppuluri", FromWW:"WW20-2022", ToWW:"WW50-2022",BenchCount:"15",Staus:"Non-SIV"},

  ]

  ngOnInit(): void {
   
 
// // Themes begin
// am4core.useTheme(am4themes_animated);
// // Themes end

// // Create chart instance
// var chart = am4core.create("chartdiv", am4charts.XYChart);
// chart.colors.list = this.colors;

// color list for chart and legend
// chart.colors.list = [
//   am4core.color('#2ecc71'),
//   am4core.color('#e74c3c'),
//   // am4core.color('#6c5ce7'),
//   // am4core.color('#e84393'),
//   am4core.color('#f39c12'),
//   am4core.color('#b2bec3')
// ];

// // Add data
// chart.data = [{
//  status: "Available",
//       value: 50
//     }, {
//       status: "Booked",
//       value:4
//     }, {
//       status: "Siv",
//       value: 64
//     }, {
//       status: "Non-siv",
//       value: 64
// }];

// // Create axes

// var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
// categoryAxis.dataFields.category = "status";
// categoryAxis.renderer.grid.template.location = 0;
// categoryAxis.renderer.minGridDistance = 30;

// // categoryAxis.renderer.labels.template.adapter.add("dy", function(dy, target) {
// //   if (target.dataItem && target.dataItem.index & 2 == 2) {
// //     return dy + 25;
// //   }
// //   return dy;
// // });

// var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

// //*****x-axis scrollbar*****//
// chart.scrollbarX = new am4core.Scrollbar();
//     chart.scrollbarX.parent = chart.bottomAxesContainer;
//     chart.scrollbarX.width = am4core.percent(99);
//     // chart.scrollbarX.minHeight = 4;
//     chart.scrollbarX.thumb.background.fillOpacity = 0.2;
//     chart.scrollbarX.thumb.background.strokeWidth = 1;
//     chart.scrollbarX.background.fill = am4core.color("#d9d9d9");
//     chart.scrollbarX.thumb.background.fill = am4core.color("#d9d9d9");
//     chart.scrollbarX.startGrip.background.fill = am4core.color("#d9d9d9");
//     chart.scrollbarX.endGrip.background.fill = am4core.color("#d9d9d9");
//     chart.scrollbarX.stroke = am4core.color("#d9d9d9");


// // Create series
// var series = chart.series.push(new am4charts.ColumnSeries());
// series.dataFields.valueY = "value";
// series.dataFields.categoryX = "status";
// series.name = "Available";
// series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
// series.columns.template.fillOpacity = 0.8;
// // series.columns.template.fillOpacity = .8;

// var columnTemplate = series.columns.template;
// columnTemplate.strokeWidth = 0;
// columnTemplate.strokeOpacity = 1;


//     //*** different color for every bar ***//
//     series.columns.template.adapter.add("fill", function (fill, target:any) {
//       return chart.colors.getIndex(target.dataItem.index);
//     });

//     chart.legend = new am4charts.Legend()
//     // var legend = new am4charts.Legend();
//     chart.legend.parent = chart.chartContainer;
//     //legend.itemContainers.template.togglable = false;
//     chart.legend.marginTop = 20;

//     series.events.on("ready", function (ev) {
//       var legenddata:any = [];
//       series.columns.each(function (column:any) {
//         legenddata.push({
//           name: column.dataItem.categoryX,
//           fill: column.fill,
//           columnDataItem: column.dataItem
//         });
//       });
//       chart.legend.data = legenddata;
//     });

//     chart.legend.itemContainers.template.events.on("hit", function (ev:any) {
//       if (!ev.target.isActive) {
//         ev.target.dataItem.dataContext.columnDataItem.hide();
//       }
//       else {
//         ev.target.dataItem.dataContext.columnDataItem.show();
//       }
//     });

//     chart.legend.itemContainers.template.events.on("over", function (ev:any) {
//       ev.target.dataItem.dataContext.columnDataItem.column.isHover = true;
//       ev.target.dataItem.dataContext.columnDataItem.column.showTooltip();
//     });

//     chart.legend.itemContainers.template.events.on("out", function (ev:any) {
//       ev.target.dataItem.dataContext.columnDataItem.column.isHover = false;
//       ev.target.dataItem.dataContext.columnDataItem.column.hideTooltip();
//     });
 }

 //****** Semicircle Pie Chart ******//
  getSemiCirclePiechart(){
       // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    var chart = am4core.create("chartdiv", am4charts.PieChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.data = [
      {
        status: "SIV",
        value: 50
      },
      {
        status: "Non-Siv",
        value: 20
      },
    
    ];
    chart.radius = am4core.percent(70);
    chart.innerRadius = am4core.percent(40);
    chart.startAngle = 180;
    chart.endAngle = 360;  

    var series = chart.series.push(new am4charts.PieSeries());
    series.dataFields.value = "value";
    series.dataFields.category = "status";

    series.slices.template.cornerRadius = 10;
    series.slices.template.innerCornerRadius = 7;
    series.slices.template.draggable = true;
    series.slices.template.inert = true;
    series.alignLabels = false;

    series.hiddenState.properties.startAngle = 90;
    series.hiddenState.properties.endAngle = 90;

    series.colors.list = [
      am4core.color("#845EC2"),
      am4core.color("#D65DB1"),
      am4core.color("#FF6F91"),
      am4core.color("#FF9671"),
      am4core.color("#FFC75F"),
      am4core.color("#F9F871"),
    ];

    chart.legend = new am4charts.Legend();
  }

 //**** Sorting functionality in table(ascending descending order) ****//
 setOrderRelease(value: string) {
  if (this.orderMappedRelease === value) {
    this.reverseMappedRelease = !this.reverseMappedRelease;
  }
  this.orderMappedRelease = value;
}

 // *** Vertical chart in home page *** //
 Options() {
  // this.mainChartLoader = true;
  this.typeChart = this.typeChart == "Location Chart" ? "Program chart" :  "Location Chart" 
 }
 toggleFullScreen(){

 }
}

import { AfterViewInit, Component, OnInit } from '@angular/core';
// amCharts imports
// import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { Chart } from '@amcharts/amcharts5';

// amCharts imports
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5percent from "@amcharts/amcharts5/percent";



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit,AfterViewInit {

  orderMappedRelease: string = '';
  reverseMappedRelease: boolean = true;
  typeChart = "Location chart";
  // typeChart:any
  fullScreenFlag = false;
  fullScreenBack: boolean = false;
  smallscreen = true;


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
  // getSemiCirclePiechart(){
  //      // Themes begin
  //   am4core.useTheme(am4themes_animated);
  //   // Themes end

  //   var chart = am4core.create("chartdiv", am4charts.PieChart);
  //   chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

  //   chart.data = [
  //     {
  //       status: "Non-Siv Allocated",
  //       value: 20
  //     },
  //     {
  //       status: "SIV Allocated",
  //       value: 50, 

  //     },
  //     {
  //       status: "SIV UnAllocated",
  //       value: 20,      
  //     }
    
  //     // {
  //     //   status: "Non-Siv UnAllocated",
  //     //   value: 30,
        
  //     // }
      
  //   ];
  //   chart.radius = am4core.percent(70);
  //   chart.innerRadius = am4core.percent(40);
  //   chart.startAngle = 180;
  //   chart.endAngle = 360;  

  //   var series = chart.series.push(new am4charts.PieSeries());
  //   series.dataFields.value = "value";
  //   series.dataFields.category = "status";

  //   series.slices.template.cornerRadius = 10;
  //   series.slices.template.innerCornerRadius = 7;
  //   series.slices.template.draggable = true;
  //   series.slices.template.inert = true;
  //   series.alignLabels = false;

  //   // series.slices.template._systemValidateLayouts({fillopacity:0.9})

  //   series.hiddenState.properties.startAngle = 90;
  //   series.hiddenState.properties.endAngle = 90;

  //   series.colors.list = [
  //     // am4core.color("#FF9671"),
  //    am4core.color("#6794dc") ,
  //     am4core.color("#67b7dc"),
  //     am4core.color("#67b7dc").lighten(0.9),
  //     // am4core.color("#FF6F91"),
      
  //     // am4core.color("#FFC75F"),
  //     // am4core.color("#F9F871"),
  //   ];

  //   chart.legend = new am4charts.Legend();

  //   // **** Removing % from legend values ****//
  //   chart.legend.valueLabels.template.disabled = true;

  //   // **** Removing % from values ****//
  //   series.labels.template.text = "{category}: {value.value}";
  //   series.slices.template.tooltipText = "{category}: {value.value}";
  //   chart.legend.valueLabels.template.text = "{value.value}";

    
  //    //**** for dotted outline line ****//
  //   //  chart.data.forEach(element => {
  //   //    debugger
  //   //   if(element.status == "SIV UnAllocated"){
      
  //   //     series.stroke = am4core.color("blue").lighten(0.5);
  //   //     series.strokeDasharray="3,3" 

  //   //   }
  //   //   // else if(element.status == "Non-Siv UnAllocated"){

  //   //   //   series.stroke = am4core.color("blue").lighten(0.5);
  //   //   //   series.strokeDasharray="3,3" 

  //   //   // }

  //   // });
  // }

 

  getSemiCirclePiechart(){
    var root = am5.Root.new("chartdiv");

    // Set themes
    root.setThemes([
      am5themes_Animated.new(root)
    ]);
    
    // root.defaultTheme.rule("ColorSet").set("colors", [
    //   am5.color(0x095256),
    //   am5.color(0x087f8c),
    //   am5.color(0x5aaa95),
    //   am5.color(0x86a873),
    //   am5.color(0xbb9f06)
    // ]);
    
    // Create chart
    // start and end angle must be set both for chart and series
    var chart = root.container.children.push(am5percent.PieChart.new(root, {
      startAngle: 180,
      endAngle: 360,
      layout: root.verticalLayout,
      innerRadius: am5.percent(50)
    }));
    
    // Create series
    // start and end angle must be set both for chart and series
    var series = chart.series.push(am5percent.PieSeries.new(root, {
      startAngle: 180,
      endAngle: 360,
      valueField: "value",
      categoryField: "category",
      alignLabels: false,
      
    }));

    series.states.create("hidden", {
      startAngle: 180,
      endAngle: 180
    });
    
    series.slices.template.setAll({
      cornerRadius: 5,
      strokeWidth: 2
      
    });
    

    //   series.get("colors").set("colors", [
    //   am5.color(0x095256),
    //   am5.color(0x087f8c),
    //   am5.color(0x5aaa95),
    //   // am5.color(0x86a873),
    //   // am5.color(0xbb9f06)
    // ]);
    
    
    //**** for transperent color(opacity) ***//
    series.slices.template.adapters.add("fillOpacity", function(fillOpacity, target:any) {
      if (target.dataItem.get("category") == "SIV UnAllocated") {
          return 0.1;
      }
      else{
        return void 0
      }  
    });
    
    //**** for dotted border ***//
    series.slices.template.adapters.add("strokeDasharray", function(strokeDasharray, target:any) {
      if (target.dataItem.get("category") == "SIV UnAllocated") {
          return [8,4];
      }
      else{
        return void 0
      }
    });

    //**** custom color for slices****//
    series.slices.template.adapters.add("fill", function(fill, target:any) {
      if (target.dataItem.get("category") == "Non-Siv Allocated") {
          return am5.color('#6794dc'); 
      }
      else if(target.dataItem.get("category") == "SIV Allocated") {
        return am5.color('#67b7dc')
      }
      else if(target.dataItem.get("category") == "SIV UnAllocated") {
        return am5.color('#67b7dc')
      }
      else{
        return void 0
      }
    });

    //**** custom color for border(stroke)****//
    series.slices.template.adapters.add("stroke", function(fill, target:any) {
      if (target.dataItem.get("category") == "Non-Siv Allocated") {
        return am5.color('#6794dc'); 
      }
      else if(target.dataItem.get("category") == "SIV Allocated") {
        return am5.color('#67b7dc')
      }
      else if(target.dataItem.get("category") == "SIV UnAllocated") {
        return am5.color('#67b7dc')
      }
      else{
        return void 0
      }
    });

    series.ticks.template.setAll({
      forceHidden: true
    });
    
    
    //**** for removing % from labels ***//
    series.labels.template.set("text", "{category}:{value}");
    
     //**** for removing % from tooltip ***//
    series.slices.template.set("tooltipText", "{category}:{value}");
    
    // Set data
    series.data.setAll([
      { value: 50, category: "Non-Siv Allocated"},
      { value: 30, category: "SIV Allocated" },
      { value: 20, category: "SIV UnAllocated" }
    ]);
    
     // **** Add legend ****//
     var legend = chart.children.push(am5.Legend.new(root, {
      nameField: "category",
      centerX: am5.percent(50),
      x: am5.percent(55),
    }));

    legend.data.setAll(series.dataItems);

    series.appear(1000, 100);
  }

 //**** Sorting functionality in table(ascending descending order) ****//
 setOrderRelease(value: string) {
  if (this.orderMappedRelease === value) {
    this.reverseMappedRelease = !this.reverseMappedRelease;
  }
  this.orderMappedRelease = value;
}

 // *** chart options according to click *** //
 Options(status:any) {
  if(status == 'location'){
    this.typeChart = "Location chart"
  }
  else if(status == 'program'){
    this.typeChart = "Program chart"
  }
  else if(status == 'vendor'){
    this.typeChart = "Vendor chart"
  }
 }
 toggleFullScreen(){
    this.fullScreenFlag = !this.fullScreenFlag;
 }
}

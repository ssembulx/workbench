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
import * as am5percent from '@amcharts/amcharts5/percent';
import { SummaryService } from '../shared/service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  orderMappedRelease: string = '';
  reverseMappedRelease: boolean = true;
  typeChart = 'Location chart';
  // typeChart:any
  fullScreenFlag = false;
  fullScreenBack: boolean = false;
  smallscreen = true;
  ChartData:any;
  ChartData1:any;
  changestatus: any;
  type = "pie chart";
  Labtype = "Lab chart";
  Loctype = "Loc chart";
  Prgtype = "Prg chart";
  Ventype = "Ven chart";
  semiType = "Semi chart"
  pieChartLoader = false;
  semicircle :any=false;
  setIconPossition: boolean = true;
  labList:any
  lab :string = "SRR-1";
  program : string = "All";
  prgmList:any;
  vendorList:any;
  vendor :string = "All";

  // ChartData:any;
  labwiseChartLoader = false;

  constructor(private service: SummaryService) {}

  chartData = [
    { slno: 1, data: "Non-SIV Allocated", value: "50"},
    { slno: 2, data: "Allocated", value: "30"},
    { slno: 3, data: "Free", value: "20"},
  ]

  semiChartData = [
    { slno: 2, data: "Allocated", value: "30"},
    { slno: 3, data: "Free", value: "20"},
  ]

  LabchartData = [
    { slno: 1, labName: "CRD1", allocated: "45",Free:"55"},
    { slno: 2, labName: "CRD2", allocated: "20",Free:"30"},
    { slno: 3, labName: "CRD3", allocated: "15",Free:"10"},
    { slno: 4, labName: "CRD4", allocated: "30",Free:"15"},
    { slno: 5, labName: "CRD5", allocated: "12",Free:"32"},
  ]

  LocationchartData = [
    { slno: 1, location: "SRR1", allocated: "45",Free:"55"},
    { slno: 2, location: "SRR2", allocated: "30",Free:"70"},
    { slno: 3, location: "SRR3", allocated: "20",Free:"80"},
    { slno: 4, location: "SRR4", allocated: "85",Free:"15"},
    { slno: 5, location: "SRR5", allocated: "12",Free:"88"},
  ]

  ProgramchartData = [
    { slno: 1, program: "ADL-P", value: "45"},
    { slno: 2, program: "MTL_P", value: "65"},
    { slno: 3, program: "RKL-S", value: "70"},
    { slno: 4, program: "GLK-S", value: "65"},
    { slno: 5, program: "RPL-T", value: "75"},
    { slno: 6, program: "MTL-S", value: "70"},
    { slno: 7, program: "RTL-S", value: "80"},
    { slno: 8, program: "TGL-R", value: "60"},
    { slno: 9, program: "CFL-H", value: "60"},
    { slno: 10, program: "WHL-U", value: "50"},
  ]

  VendorchartData = [
    { slno: 1, vendor: "UST", value: "45"},
    { slno: 2, vendor: "Wipro", value: "55"},
    { slno: 3, vendor: "Infosys", value: "50"},
  ]

  ngOnInit() {
    // this.LabOverallSummary();
    this.getCheckbox();
    this.getLabDetails();
    this.getProgramDetails();
    this.getVendorDetails();
    this.LabwiseSummary();

    // this.lab = "SRR1";
    // this.program = "All";
    // this.vendor = "All"; 
   
    // this.getSemiPiechart();
  }

  //**** Calling labdetails API for select drop down in labwise program chart ***//
  getLabDetails(){
    this.service.getLabDetail().subscribe((res) => {
      this.labList = res;
      console.log(this.labList,"****")
  });
    
  }

   //**** Calling program details API for select drop down in labwise program chart ***//
  getProgramDetails(){
     this.service.getPrgmDetail().subscribe((res) => {
      this.prgmList = res;
      // console.log(this.labList,"****")
  });
  }

   //**** Calling vendor details API for select drop down in labwise program chart ***//
  getVendorDetails(){
     this.service.getVendorDetail().subscribe((res) => {
      if (res) {
        this.vendorList = res;
      }
    });
  }

  //**** Change function for lab select drop down in labwise program chart ***//
  labChange(){
    this.LabwiseSummary();
  }

  //**** Change function for program select drop down in labwise program chart ***//
  programChange(){
    this.LabwiseSummary();
  }

  //**** Change function for vendor select drop down in labwise program chart ***//
  vendorChange(){
    this.LabwiseSummary();
  }
  
   //****Calling API for Labwsie summary chart ***//
   LabwiseSummary(){
    debugger
    this.labwiseChartLoader = false;
    let req = {"LabName":this.lab,
    "Program":this.program,
    "Vendor":this.vendor}
   
    this.service.LabwiseSummary(req).subscribe(res => {
      debugger
      this.ChartData1 = res.Location; 
      console.log("stacked chart",this.ChartData1)
      // this.getLabwiseStackedChart();
      this.labwiseChartLoader = true;
   })
  }
    //****Calling API for summary pie chart ***//
    OverallAvailability() {
      this.pieChartLoader = false;
      this.service.OverallAvailability().subscribe((res) => {
        this.ChartData = res.Data;
        console.log('pie chart', this.ChartData);
        this.getSemiPiechart();
        this.pieChartLoader = true;
      });
    }

   //**** Chart data ****//
   getSemiPiechart() {
    var root = am5.Root.new('chartdiv');
    //****** removing chart logo *****//
    root._logo.dispose();
    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    // start and end angle must be set both for chart and series
    var chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        startAngle: 180,
        endAngle: 360,
        layout: root.verticalLayout,
        innerRadius: am5.percent(50),
      })
    );

    // Create series
    // start and end angle must be set both for chart and series
    var series = chart.series.push(
      am5percent.PieSeries.new(root, {
        startAngle: 180,
        endAngle: 360,
        valueField: 'values',
        categoryField: 'Category',
        alignLabels: false,
      })
    );

    series.states.create('hidden', {
      startAngle: 180,
      endAngle: 180,
    });

    series.slices.template.setAll({
      cornerRadius: 5,
      strokeWidth: 2,
    });

    //**** for transperent color(opacity) ***//
    series.slices.template.adapters.add("fillOpacity", function(fillOpacity, target:any) {
      if (target.dataItem.get("category") == "Free") {
          return 0.1;
        }
      }
    );

    //**** for dotted border ***//
    series.slices.template.adapters.add("strokeDasharray", function(strokeDasharray, target:any) {
      if (target.dataItem.get("category") == "Free") {
          return [8,4];
      }
     }
    );

    //**** custom color for slices****//
    series.slices.template.adapters.add("fill", function(fill, target:any) {
      // if (target.dataItem.get("category") == "Non-SIV") {
      //     return am5.color('#6794dc'); 
      // }
       if(target.dataItem.get("category") == "Allocated") {
        return am5.color('#67b7dc')
      }
      else if(target.dataItem.get("category") == "Free") {
        return am5.color('#67b7dc')
      }
    });

    //**** custom color for border(stroke)****//
    series.slices.template.adapters.add("stroke", function(fill, target:any) {
      // if (target.dataItem.get("category") == "Non-SIV") {
      //   return am5.color('#6794dc'); 
      // }
      if(target.dataItem.get("category") == "Allocated") {
        return am5.color('#67b7dc')
      }
      else if(target.dataItem.get("category") == "Free") {
        return am5.color('#67b7dc')
      }
    });

    series.ticks.template.setAll({
      forceHidden: true,
    });

    //**** for removing % from labels ***//
    series.labels.template.set('text', '{Category}:{values}');

    //**** for removing % from tooltip ***//
    series.slices.template.set('tooltipText', '{Category}:{values}');

    //**** chart data ****//
    series.data.setAll(this.ChartData);
    // Set data
    // series.data.setAll([
    //   // { Value: 50, Category: "Non-Siv"},
    //   { Value: 30, Category: "Allocated" },
    //   { Value: 20, Category: "Free" }
    // ]);

    // **** Add legend ****//
    var legend = chart.children.push(
      am5.Legend.new(root, {
        nameField: 'Category',
        centerX: am5.percent(50),
        x: am5.percent(55),
      })
    );

    legend.data.setAll(series.dataItems);
    // legend.data.setAll(chart.series.values);
   
    // let legend = chart.children.push(am5.Legend.new(root, {}));
    // let legend = chart.children.push(am5.Legend.new(root, {
    //   nameField: "name",
    //   fillField: "color",
    //   strokeField: "color",
    //   centerX: am5.percent(50),
    //   x: am5.percent(50)
    // }));
    
    // legend.data.setAll([{
    //   name: "Allocated",
    //   color: am5.color('#67b7dc')
    // }, {
    //   name: "Free",
    //   color: am5.color('#67b7dc'),
    //   fillOpacity: 0.7,
    //   strokeWidth: 3,
    //   strokeDasharray: [10, 5, 2, 5],
    // }]);

    series.appear(1000, 100);
  }
//   getSemiPiechart(){
//     debugger
//     var root = am5.Root.new("chartdiv6");
//  //****** removing chart logo *****//
//     root._logo.dispose();

// // Set themes
// // https://www.amcharts.com/docs/v5/concepts/themes/
// root.setThemes([
//   am5themes_Animated.new(root)
// ]);

// // Create chart
// // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
// // start and end angle must be set both for chart and series
// var chart = root.container.children.push(am5percent.PieChart.new(root, {
//   startAngle: 180,
//   endAngle: 360,
//   layout: root.verticalLayout,
//   innerRadius: am5.percent(50)
// }));

// // Create series
// // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
// // start and end angle must be set both for chart and series
// var series = chart.series.push(am5percent.PieSeries.new(root, {
//   startAngle: 180,
//   endAngle: 360,
//   valueField: "value",
//   categoryField: "category",
//   alignLabels: false
// }));

// series.states.create("hidden", {
//   startAngle: 180,
//   endAngle: 180
// });

// series.slices.template.setAll({
//   cornerRadius: 5
// });   

// series.ticks.template.setAll({
//   forceHidden: true
// });

//  //**** for removing % from labels ***//
//     series.labels.template.set('text', '{category}:{value}');

//     //**** for removing % from tooltip ***//
//     series.slices.template.set('tooltipText', '{category}:{value}');

// // Set data
// // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
// series.data.setAll([
//  { value: 30, category: "SIV Allocated"},
//  { value: 20, category: "SIV Free" }
// ]);


//     // **** Add legend ****//
//     var legend = chart.children.push(
//       am5.Legend.new(root, {
//         nameField: 'category',
//         centerX: am5.percent(50),
//         x: am5.percent(55),
//       })
//     );

//     legend.data.setAll(series.dataItems);

// series.appear(1000, 100);
//   }


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

 

  //**** Sorting functionality in table(ascending descending order) ****//
  setOrderRelease(value: string) {
    if (this.orderMappedRelease === value) {
      this.reverseMappedRelease = !this.reverseMappedRelease;
    }
    this.orderMappedRelease = value;
  }

  // *** chart options according to click *** //
  Options(status: any) {
    if (status == 'location') {
      this.typeChart = 'Location chart';
    } else if (status == 'program') {
      this.typeChart = 'Program chart';
    } else if (status == 'vendor') {
      this.typeChart = 'Vendor chart';
    }
  }
 
  // *** checkbox click functionality *** //
  getCheckbox(){
    console.log("checked",this.semicircle)
    if(!this.semicircle){
      // this.getSemiPiechart()
      setTimeout(() => {
        debugger
        this.OverallAvailability();
      }, 100);
    }
    else{
      this.ToggleOptions(this.changestatus);
     }
  }

 // *** Pie chart and table options according to click *** //
 ToggleOptions(changestatus:any) {
  if(changestatus == 'chart'){
    this.type = "pie chart"
  }
  else if(changestatus == 'table'){
    this.type = "pie table"
  }
 }

  // *** Labwise chart and table options according to click *** //
  ChangeOption(Status:any){
    if(Status == 'Labchart'){
      debugger
      this.Labtype = "Lab chart"
    }
    else if(Status == 'Labtable'){
      this.Labtype = "Lab table"
    }
  }

  // *** Location chart and table options according to click *** //
  LocationOptions(LocStatus:any){
    if(LocStatus == 'LocChart'){
      debugger
      this.Loctype = "Loc chart"
    }
    else if(LocStatus == 'LocTable'){
      this.Loctype = "Loc table"
    }
  }

  // ***Program  chart and table options according to click *** //
  ProgramOptions(PrgStatus:any){
    if(PrgStatus == 'PrgChart'){
      debugger
      this.Prgtype = "Prg chart"
    }
    else if(PrgStatus == 'PrgTable'){
      this.Prgtype = "Prg table"
    }
  }

  // ***Vendor chart and table options according to click *** //
  VendorOptions(VenStatus:any){
    if(VenStatus == 'VenChart'){
      debugger
      this.Ventype = "Ven chart"
    }
    else if(VenStatus == 'VenTable'){
      this.Ventype = "Ven table"
    }
  }
  
  toggleFullScreen(){
      this.fullScreenFlag = !this.fullScreenFlag;
      this.setIconPossition = !this.setIconPossition;
    }
}

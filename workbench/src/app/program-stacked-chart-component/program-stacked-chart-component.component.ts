import { AfterViewInit, Component, OnInit } from '@angular/core';

// // amCharts imports
// import * as am4core from '@amcharts/amcharts4/core';
// import * as am4charts from '@amcharts/amcharts4/charts';
// import am4themes_animated from '@amcharts/amcharts4/themes/animated';

// amCharts imports
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { SummaryService } from '../shared/service';

// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';


@Component({
  selector: 'app-program-stacked-chart-component',
  templateUrl: './program-stacked-chart-component.component.html',
  styleUrls: ['./program-stacked-chart-component.component.scss']
})
export class ProgramStackedChartComponentComponent implements OnInit{

  // colors: any;
  ChartData:any;
  ChartLoader = false;
  programChartLoader = false;
  constructor(private service:SummaryService) { }
 

  ngOnInit(): void {
    // this.LabProgramSummary();
    this.getProgramSatckedChartData();
  }

   //****Calling API for program chart ***//
  // LabProgramSummary(){
  //   this.programChartLoader = false;
  //   this.service.LabProgramSummary().subscribe(res => {
  //     this.ChartData = res.Data;
  //     console.log("stacked chart",this.ChartData)
  //     // this.getProgramColumnChart();
  //     this.programChartLoader = true;
  //    })
  // }

  //**** Chart data ****//
  // getProgramColumnChart(){
  //   var root = am5.Root.new("chartdiv3");
  //   root._logo.dispose();
    
  //   // Set themes
  //   root.setThemes([
  //     am5themes_Animated.new(root)
  //   ]);

  //   var chart:any = root.container.children.push(am5xy.XYChart.new(root, {
  //       panY: false,
  //       wheelY: "zoomX",
  //       panX: true,
  //       wheelX: "panX",
  //       pinchZoomX:true,

  //       //for leged position bottom
  //       layout: root.verticalLayout,    
  //     }) 
  //   );

  //   // Add cursor
  //   var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
  //   cursor.lineY.set("visible", false);


  //   // Create axes
  //   var xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
  //   xRenderer.labels.template.setAll({
  //     // rotation: -90,
  //     // centerY: am5.p50,
  //     // centerX: am5.p100,
  //     // paddingRight: 15
  //   });

  //   var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  //     maxDeviation: 0.3,
  //     categoryField: "Program",
  //     renderer: xRenderer,
  //     tooltip: am5.Tooltip.new(root, {})
  //   }));

  //   var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  //     maxDeviation: 0.3,
  //     renderer: am5xy.AxisRendererY.new(root, {})
  //   }));


  //   // Create series
  //   var series = chart.series.push(am5xy.ColumnSeries.new(root, {
  //     name: "Series 1",
  //     xAxis: xAxis,
  //     yAxis: yAxis,
  //     valueYField: "Value",
  //     sequencedInterpolation: true,
  //     categoryXField: "Program",
  //     tooltip: am5.Tooltip.new(root, {
  //       labelText:"{valueY}"
  //     })
  //   }));

  //   series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5 });

  //   // *** color for columns ***//
  //   series.columns.template.adapters.add("fill", function (fill:any, target:any) {
  //     return chart.get("colors").getIndex(series.columns.indexOf(target));
  //   }); 

  //   series.columns.template.adapters.add("stroke", function(stroke:any, target:any) {
  //     return chart.get("colors").getIndex(series.columns.indexOf(target));
  //   });
    
  //   var data = this.ChartData;
  // //   // Set data
  // //   var data = [{
  // //     program: "ADL-P",
  // //     value: 80
  // //   }, {
  // //     program: "MTL-P",
  // //     value: 70
  // //   }, {
  // //     program: "RKL-S",
  // //     value: 60
  // //   }, {
  // //     program: "GLK-S",
  // //     value: 50
  // //   }, {
  // //     program: "RPL-T",
  // //     value: 40
  // //   }, {
  // //     program: "MTL-S",
  // //     value: 35
  // //   }, {
  // //     program: "RTL-S",
  // //     value: 30
  // //   }, {
  // //     program: "TGL-R",
  // //     value: 25
  // //   }, {
  // //     program: "CFL-H",
  // //     value: 20
  // //   }, {
  // //     program: "WHL-U",
  // //     value: 15
  // //   }
  // // ];

  //   xAxis.data.setAll(data);
  //   series.data.setAll(data);

  //   // **** Add legend ****//
  //   var legend = chart.children.push(am5.Legend.new(root, {
  //     nameField: "categoryX",
  //     centerX: am5.percent(50),
  //     x: am5.percent(55)

  //   }));

  //   legend.data.setAll(series.dataItems);

  //   // **** Add scroll bar **** //
  //   var scrollbarX = am5.Scrollbar.new(root, {
  //     orientation: "horizontal"
  //   });

  //   chart.set("scrollbarX", scrollbarX);
  //   chart.bottomAxesContainer.children.push(scrollbarX);
  //   // chart.set("scrollbarX", am5.Scrollbar.new(root, { orientation: "horizontal"}));
  // }


  // ***** Stacked chart **** //
    getProgramSatckedChartData() {
      am4core.useTheme(am4themes_animated);
      am4core.options.autoSetClassName = true;
      am4core.options.commercialLicense = true;
    
      var chart = am4core.create("chartdiv3", am4charts.XYChart);
      chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
      // chart.colors.list = this.colors;
  
      //*** color list for chart and legend ***//
      chart.colors.list = [
        am4core.color('#e67e22'),
        am4core.color('#2980b9'),
        am4core.color('#11d6f1'),
        am4core.color('#67b7dc'),
        am4core.color('#e67e22'),
        am4core.color('#2980b9'),
        am4core.color('#67b7dc'),
      ];
      
      // chart.data = this.ChartData;
      chart.data = [
        {
          category: "ADL-P",
          value1: 5,
          value2: 5,
          value3: 10,
          value4: 5,
          value5: 10,
          value6: 5,
          value7: 5
        },
        {
          category: "MTL-P",
          value1: 5,
          value2: 20,
          value3: 10,
          value4: 10,
          value5: 10,
          value6: 5,
          value7: 5
        },
        {
          category: "RKL-S",
          value1: 25,
          value2: 10,
          value3: 10,
          value4: 5,
          value5: 10,
          value6: 5,
          value7: 5
        },
        {
          category: "GLK-S",
          value1: 10,
          value2: 10,
          value3: 15,
          value4: 10,
          value5: 5,
          value6: 10,
          value7: 5
        },
        {
          category: "RPL-T",
          value1: 10,
          value2: 15,
          value3: 10,
          value4: 10,
          value5: 5,
          value6: 20,
          value7: 5
        },
        {
          category: "MTL-S",
          value1: 10,
          value2: 10,
          value3: 15,
          value4: 10,
          value5: 10,
          value6: 5,
          value7: 10
        },
        {
          category: "RTL-S",
          value1: 15,
          value2: 10,
          value3: 10,
          value4: 20,
          value5: 10,
          value6: 10,
          value7: 5
        },
        {
          category: "TGL-R",
          value1: 10,
          value2: 15,
          value3: 5,
          value4: 10,
          value5: 5,
          value6: 10,
          value7: 5
        },
        {
          category: "CFL-H",
          value1: 15,
          value2: 10,
          value3: 10,
          value4: 5,
          value5: 5,
          value6: 10,
          value7: 5
        }, {
          category: "WHL-U",
          value1: 10,
          value2: 10,
          value3: 5,
          value4: 5,
          value5: 5,
          value6: 5,
          value7: 10
        } 
      ];
      
      chart.colors.step = 2;
      // chart.padding(30, 30, 10, 30);

      chart.legend = new am4charts.Legend();
      //******for legend size*****//
      chart.legend.useDefaultMarker = true;
      var markerTemplate = chart.legend.markers.template;
      markerTemplate.width = 20;
      markerTemplate.height = 20;
      markerTemplate.stroke = am4core.color("#ccc");
      
      var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "category";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.cellStartLocation = 0;
      categoryAxis.renderer.cellEndLocation = 1;
      // categoryAxis.renderer.labels.template.rotation = 280;
      // categoryAxis.renderer.labels.template.verticalCenter = "middle";
      // categoryAxis.renderer.labels.template.horizontalCenter = "right";
      
      var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.min = 0;
      valueAxis.max = 100;
      valueAxis.strictMinMax = true;
      valueAxis.calculateTotals = true;
      valueAxis.renderer.minWidth = 30;
      
      
      var series1 = chart.series.push(new am4charts.ColumnSeries3D());
      series1.columns.template.width = am4core.percent(40);
      series1.columns.template.tooltipText =
        "{name}: {valueY.formatNumber('#')}";
      series1.name = "Domain ";
      series1.dataFields.categoryX = "category";
      series1.dataFields.valueY = "value1";
      // series1.dataFields.valueYShow = "totalPercent";
      // series1.dataItems.template.locations.categoryX = 0.5;
      series1.stacked = true;
      // series1.tooltip.pointerOrientation = "vertical";
      
      var bullet1 = series1.bullets.push(new am4charts.LabelBullet());
      bullet1.interactionsEnabled = false;
      bullet1.label.text = "{valueY.formatNumber('#')}";
      bullet1.label.fill = am4core.color("#ffffff");
      bullet1.locationY = 0.5;
      
      var series2 = chart.series.push(new am4charts.ColumnSeries3D());
      series2.columns.template.width = am4core.percent(40);
      series2.columns.template.tooltipText =
        "{name}: {valueY.formatNumber('#')}";
      series2.name = "Debug";
      series2.dataFields.categoryX = "category";
      series2.dataFields.valueY = "value2";
      // series2.dataFields.valueYShow = "totalPercent";
      // series2.dataItems.template.locations.categoryX = 0.5;
      series2.stacked = true;
  
      //**** for transperncy color***//
      // series2. fillOpacity =  0.1;
      
      //**** for dotted outline border ****//
      // series2.stroke = am4core.color("#67b7dc").lighten(0.5);
      // series2.strokeDasharray = "8,4" 
  
      var bullet2 = series2.bullets.push(new am4charts.LabelBullet());
      bullet2.interactionsEnabled = false;
      bullet2.label.text = "{valueY.formatNumber('#')}";
      bullet2.locationY = 0.5;
      bullet2.label.fill = am4core.color("#ffffff");
  
      // var columnTemplate = series2.columns.template;
      // columnTemplate.strokeWidth = 2;
      // columnTemplate.strokeOpacity = 1;
  
      var series3 = chart.series.push(new am4charts.ColumnSeries3D());
      series3.columns.template.width = am4core.percent(40);
      series3.columns.template.tooltipText =
        "{name}: {valueY.formatNumber('#')}";
      series3.name = "Execution";
      series3.dataFields.categoryX = "category";
      series3.dataFields.valueY = "value3";
      // series1.dataFields.valueYShow = "totalPercent";
      // series1.dataItems.template.locations.categoryX = 0.5;
      series3.stacked = true;
      // series1.tooltip.pointerOrientation = "vertical";
      
      var bullet3 = series3.bullets.push(new am4charts.LabelBullet());
      bullet3.interactionsEnabled = false;
      bullet3.label.text = "{valueY.formatNumber('#')}";
      bullet3.label.fill = am4core.color("#ffffff");
      bullet3.locationY = 0.5;

      var series4 = chart.series.push(new am4charts.ColumnSeries3D());
      series4.columns.template.width = am4core.percent(40);
      series4.columns.template.tooltipText =
        "{name}: {valueY.formatNumber('#')}";
      series4.name = "PnP";
      series4.dataFields.categoryX = "category";
      series4.dataFields.valueY = "value4";
      // series1.dataFields.valueYShow = "totalPercent";
      // series1.dataItems.template.locations.categoryX = 0.5;
      series4.stacked = true;
      // series1.tooltip.pointerOrientation = "vertical";
      
      var bullet4 = series4.bullets.push(new am4charts.LabelBullet());
      bullet4.interactionsEnabled = false;
      bullet4.label.text = "{valueY.formatNumber('#')}";
      bullet4.label.fill = am4core.color("#ffffff");
      bullet4.locationY = 0.5;

      var series5 = chart.series.push(new am4charts.ColumnSeries3D());
      series5.columns.template.width = am4core.percent(40);
      series5.columns.template.tooltipText =
        "{name}: {valueY.formatNumber('#')}";
      series5.name = "Integration";
      series5.dataFields.categoryX = "category";
      series5.dataFields.valueY = "value5";
      // series1.dataFields.valueYShow = "totalPercent";
      // series1.dataItems.template.locations.categoryX = 0.5;
      series5.stacked = true;
      // series1.tooltip.pointerOrientation = "vertical";
      
      var bullet5 = series5.bullets.push(new am4charts.LabelBullet());
      bullet5.interactionsEnabled = false;
      bullet5.label.text = "{valueY.formatNumber('#')}";
      bullet5.label.fill = am4core.color("#ffffff");
      bullet5.locationY = 0.5;


      var series6 = chart.series.push(new am4charts.ColumnSeries3D());
      series6.columns.template.width = am4core.percent(40);
      series6.columns.template.tooltipText =
        "{name}: {valueY.formatNumber('#')}";
      series6.name = "Validation";
      series6.dataFields.categoryX = "category";
      series6.dataFields.valueY = "value6";
      // series1.dataFields.valueYShow = "totalPercent";
      // series1.dataItems.template.locations.categoryX = 0.5;
      series6.stacked = true;
      // series1.tooltip.pointerOrientation = "vertical";
      
      var bullet6 = series6.bullets.push(new am4charts.LabelBullet());
      bullet6.interactionsEnabled = false;
      bullet6.label.text = "{valueY.formatNumber('#')}";
      bullet6.label.fill = am4core.color("#ffffff");
      bullet6.locationY = 0.5;

      var series7 = chart.series.push(new am4charts.ColumnSeries3D());
      series7.columns.template.width = am4core.percent(40);
      series7.columns.template.tooltipText =
        "{name}: {valueY.formatNumber('#')}";
      series7.name = "Automation/POC/Misc";
      series7.dataFields.categoryX = "category";
      series7.dataFields.valueY = "value7";
      // series1.dataFields.valueYShow = "totalPercent";
      // series1.dataItems.template.locations.categoryX = 0.5;
      series7.stacked = true;
      // series1.tooltip.pointerOrientation = "vertical";
      
      var bullet7 = series7.bullets.push(new am4charts.LabelBullet());
      bullet7.interactionsEnabled = false;
      bullet7.label.text = "{valueY.formatNumber('#')}";
      bullet7.label.fill = am4core.color("#ffffff");
      bullet7.locationY = 0.5;

  
      // Create a LabelBullet for the top, stacked series
      var labelBullet = series7.bullets.push(new am4charts.LabelBullet());
      var label = labelBullet.label;
      label.text = "{valueY.total.formatNumber('#')}";
      label.dy = -30;
      labelBullet.label.fontSize = 12;
      labelBullet.label.background.fill = am4core.color("#6A4C0E");
      labelBullet.label.background.fillOpacity = 0.2;
      labelBullet.label.padding(5, 10, 5, 10);
      

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
     
      //**** initial load 5 data **** //
       chart.events.on('ready', () => {
        if (chart.data.length < 30) {
          categoryAxis.zoomToIndexes(
            0, 5,
            false,
            true
          );
        } else {
          categoryAxis.zoomToIndexes(
            0, 5,
            false,
            true
          );
        }
      });
    }
}

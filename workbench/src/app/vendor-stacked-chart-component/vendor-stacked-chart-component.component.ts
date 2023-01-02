import { AfterViewInit, Component, OnInit } from '@angular/core';
// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

// amCharts imports
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

@Component({
  selector: 'app-vendor-stacked-chart-component',
  templateUrl: './vendor-stacked-chart-component.component.html',
  styleUrls: ['./vendor-stacked-chart-component.component.scss']
})
export class VendorStackedChartComponentComponent implements OnInit,AfterViewInit {

  // colors:any;
  // root:any
  constructor() { }
  ngAfterViewInit(): void {
    this.getVendorColumnChart();
  }

  ngOnInit(): void {
  }

  // getVendorStackedChart(){
  //   am4core.useTheme(am4themes_animated);
  //   // Themes end
    
  //   var chart = am4core.create("chartdiv4", am4charts.XYChart);
  //   chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
  //   chart.colors.list = this.colors;

  //   // color list for chart and legend
  //   chart.colors.list = [
  //     am4core.color('#ff7979'),
  //     am4core.color('#ccae62'),
  //   ];
    
  //   chart.data = [
  //     {
  //       category: "UST",
  //       value1: 55,
  //       value2: 45
  //     },
  //     {
  //       category: "Wipro",
  //       value1: 45,
  //       value2: 55
  //     },
  //     {
  //       category: "Infosys",
  //       value1: 50,
  //       value2: 50
  //     },
    
  //   ];
    
  //   chart.colors.step = 2;
  //   // chart.padding(30, 30, 10, 30);
  //   chart.legend = new am4charts.Legend();
    
  //   var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
  //   categoryAxis.dataFields.category = "category";
  //   categoryAxis.renderer.grid.template.location = 0;
    
  //   var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  //   valueAxis.min = 0;
  //   valueAxis.max = 100;
  //   valueAxis.strictMinMax = true;
  //   valueAxis.calculateTotals = true;
  //   valueAxis.renderer.minWidth = 50;
    
  //   var series1 = chart.series.push(new am4charts.ColumnSeries());
  //   series1.columns.template.width = am4core.percent(80);
  //   series1.columns.template.tooltipText =
  //     "{name}: {valueY.formatNumber('#')}";
  //   series1.name = "Allocated";
  //   series1.dataFields.categoryX = "category";
  //   series1.dataFields.valueY = "value1";
  //   series1.dataFields.valueYShow = "totalPercent";
  //   // series1.dataItems.template.locations.categoryX = 0.5;
  //   series1.stacked = true;
  //   // series1.tooltip.pointerOrientation = "vertical";
    
  //   var bullet1 = series1.bullets.push(new am4charts.LabelBullet());
  //   bullet1.interactionsEnabled = false;
  //   bullet1.label.text = "{valueY.formatNumber('#')}";
  //   bullet1.label.fill = am4core.color("#ffffff");
  //   bullet1.locationY = 0.5;
    
  //   var series2 = chart.series.push(new am4charts.ColumnSeries());
  //   series2.columns.template.width = am4core.percent(80);
  //   series2.columns.template.tooltipText =
  //     "{name}: {valueY.formatNumber('#')}";
  //   series2.name = "UnAllocated";
  //   series2.dataFields.categoryX = "category";
  //   series2.dataFields.valueY = "value2";
  //   series2.dataFields.valueYShow = "totalPercent";
  //   // series2.dataItems.template.locations.categoryX = 0.5;
  //   series2.stacked = true;
    
  //   //**** for dotted outline border ****//
  //   series2.stroke = am4core.color("red").lighten(0.5);
  //   series2.strokeDasharray = "8,4" 
   
    
  //   var bullet2 = series2.bullets.push(new am4charts.LabelBullet());
  //   bullet2.interactionsEnabled = false;
  //   bullet2.label.text = "{valueY.formatNumber('#')}";
  //   bullet2.locationY = 0.5;
  //   bullet2.label.fill = am4core.color("#ffffff");

  //   var columnTemplate = series2.columns.template;
  //   columnTemplate.strokeWidth = 2;
  //   columnTemplate.strokeOpacity = 1;

  //   //*****x-axis scrollbar*****//
  //   chart.scrollbarX = new am4core.Scrollbar();
  //   chart.scrollbarX.parent = chart.bottomAxesContainer;
  //   chart.scrollbarX.width = am4core.percent(99);
  //   // chart.scrollbarX.minHeight = 4;
  //   chart.scrollbarX.thumb.background.fillOpacity = 0.2;
  //   chart.scrollbarX.thumb.background.strokeWidth = 1;
  //   chart.scrollbarX.background.fill = am4core.color("#d9d9d9");
  //   chart.scrollbarX.thumb.background.fill = am4core.color("#d9d9d9");
  //   chart.scrollbarX.startGrip.background.fill = am4core.color("#d9d9d9");
  //   chart.scrollbarX.endGrip.background.fill = am4core.color("#d9d9d9");
  //   chart.scrollbarX.stroke = am4core.color("#d9d9d9");
  
  // }
  getVendorColumnChart(){
   
    var root = am5.Root.new("chartdiv4");
    // this.root = am5.Root.new('chartdiv4');
    //  this.root._logo.dispose();
    // Set themes
    root.setThemes([
      am5themes_Animated.new(root)
    ]);

  

    // Create chart
    // var chart = root.container.children.push(am5xy.XYChart.new(root, {
    //   panX: true,
    //   panY: true,
    //   wheelX: "panX",
    //   wheelY: "zoomX",
    //   pinchZoomX:true
    // }));

    var chart:any = root.container.children.push( 
      am5xy.XYChart.new(root, {
        panY: false,
        wheelY: "zoomX",
        panX: true,
        wheelX: "panX",
        pinchZoomX:true,
        //for leged position bottom
        layout: root.verticalLayout
      }) 
    );
    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);


    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    var xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
    xRenderer.labels.template.setAll({
      // rotation: -90,
      // centerY: am5.p50,
      // centerX: am5.p100,
      // paddingRight: 15
    });

    var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
      maxDeviation: 0.3,
      categoryField: "vendor",
      renderer: xRenderer,
      tooltip: am5.Tooltip.new(root, {})
    }));

    var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      maxDeviation: 0.3,
      renderer: am5xy.AxisRendererY.new(root, {})
    }));


    // Create series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    var series = chart.series.push(am5xy.ColumnSeries.new(root, {
      name: "Series 1",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value",
      sequencedInterpolation: true,
      categoryXField: "vendor",
      tooltip: am5.Tooltip.new(root, {
        labelText:"{valueY}"
      })
    }));

    series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5 });

    // *** color for columns ***//
    series.columns.template.adapters.add("fill", function (fill:any, target:any) {
      return chart.get("colors").getIndex(series.columns.indexOf(target));
    });

    series.columns.template.adapters.add("stroke", function(stroke:any, target:any) {
      return chart.get("colors").getIndex(series.columns.indexOf(target));
    });


    // Set data
    var data = [{
      vendor: "UST",
      value: 80
    }, {
      vendor: "Wipro",
      value: 70
    }, {
      vendor: "Infosys",
      value: 20
    }
  ];

    xAxis.data.setAll(data);
    series.data.setAll(data);

    // Add legend
    // var legend = chart.children.push(am5.Legend.new(root, {
    //   nameField: "name",
    //   fillField: "color",
    //   strokeField: "color",
    //   centerX: am5.percent(50),
    //   x: am5.percent(50)
    // }));

    // legend.data.setAll([{
    //   name: "ADL-P",
    //   color: am5.color(0x297373)
    // }, {
    //   name: "Over budget",
    //   color: am5.color(0xff621f)
    // }]);

    // **** Add legend ****//
    var legend = chart.children.push(am5.Legend.new(root, {
      nameField: "categoryX",
      centerX: am5.percent(50),
      x: am5.percent(55)

    }));

    legend.data.setAll(series.dataItems);

    // **** Add scroll bar **** //
    var scrollbarX = am5.Scrollbar.new(root, {
      orientation: "horizontal"
    });

    chart.set("scrollbarX", scrollbarX);
    chart.bottomAxesContainer.children.push(scrollbarX);
    // chart.set("scrollbarX", am5.Scrollbar.new(root, { orientation: "horizontal"}));
  }
}

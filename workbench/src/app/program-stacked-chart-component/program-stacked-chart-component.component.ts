import { AfterViewInit, Component, OnInit } from '@angular/core';

// // amCharts imports
// import * as am4core from '@amcharts/amcharts4/core';
// import * as am4charts from '@amcharts/amcharts4/charts';
// import am4themes_animated from '@amcharts/amcharts4/themes/animated';

// amCharts imports
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';


@Component({
  selector: 'app-program-stacked-chart-component',
  templateUrl: './program-stacked-chart-component.component.html',
  styleUrls: ['./program-stacked-chart-component.component.scss']
})
export class ProgramStackedChartComponentComponent implements OnInit,AfterViewInit {

  // colors: any;

  constructor() { }
  ngAfterViewInit(): void {
    // this.getProgramStackedChart();
    this.getProgramColumnChart();
  }

  ngOnInit(): void {
  }

  getProgramColumnChart(){
    var root = am5.Root.new("chartdiv3");
    
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

    var chart:any = root.container.children.push(am5xy.XYChart.new(root, {
        panY: false,
        wheelY: "zoomX",
        panX: true,
        wheelX: "panX",
        pinchZoomX:true,
        //for leged position bottom
        layout: root.verticalLayout,    
      }) 
    );

    // chart.get("colors").set("colors", [
    //   am5.color(0x095256),
    //   am5.color(0x087f8c),
    //   am5.color(0x5aaa95),
    //   am5.color(0x86a873),
    //   am5.color(0xbb9f06),
    //   am5.color(0xbb9f06),
    //   am5.color(0xbb9f06),
    //   am5.color(0xbb9f06),
    //   am5.color(0xbb9f06),
    //   am5.color(0xbb9f06)
    //   ])
    // Add cursor
    var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);


    // Create axes
    var xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
    xRenderer.labels.template.setAll({
      // rotation: -90,
      // centerY: am5.p50,
      // centerX: am5.p100,
      // paddingRight: 15
    });

    var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
      maxDeviation: 0.3,
      categoryField: "program",
      renderer: xRenderer,
      tooltip: am5.Tooltip.new(root, {})
    }));

    var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      maxDeviation: 0.3,
      renderer: am5xy.AxisRendererY.new(root, {})
    }));


    // Create series
    var series = chart.series.push(am5xy.ColumnSeries.new(root, {
      name: "Series 1",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value",
      sequencedInterpolation: true,
      categoryXField: "program",
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
      program: "ADL-P",
      value: 80
    }, {
      program: "MTL-P",
      value: 70
    }, {
      program: "RKL-S",
      value: 60
    }, {
      program: "GLK-S",
      value: 50
    }, {
      program: "RPL-T",
      value: 40
    }, {
      program: "MTL-S",
      value: 35
    }, {
      program: "RTL-S",
      value: 30
    }, {
      program: "TGL-R",
      value: 25
    }, {
      program: "CFL-H",
      value: 20
    }, {
      program: "WHL-U",
      value: 15
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

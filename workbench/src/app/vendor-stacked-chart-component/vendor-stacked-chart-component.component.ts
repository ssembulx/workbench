import { AfterViewInit, Component, OnInit } from '@angular/core';
// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

// amCharts imports
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { SummaryService } from '../shared/service';

@Component({
  selector: 'app-vendor-stacked-chart-component',
  templateUrl: './vendor-stacked-chart-component.component.html',
  styleUrls: ['./vendor-stacked-chart-component.component.scss'],
})
export class VendorStackedChartComponentComponent implements OnInit {
  // colors:any;
  // root:any
  ChartData: any;
  vendorChartLoader = false;

  constructor(private service: SummaryService) {}

  ngOnInit(): void {
    this.LabVendorSummary();
  }

  //****Calling API for program chart ***//
  LabVendorSummary() {
    debugger
    this.vendorChartLoader = false;
    this.service.LabVendorSummary().subscribe((res) => {
      this.ChartData = res.Data;
      console.log('stacked chart', this.ChartData);
      this.getVendorColumnChart();
      this.vendorChartLoader = true;
    });
  }

  //**** Chart data ****//
  getVendorColumnChart() {
    debugger
    var root = am5.Root.new('chartdiv4');
    root._logo.dispose();

    
    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);
    const colors = [
      am5.color("#FF5733"),
      am5.color("#C70039"),
      am5.color("#900C3F"),
      am5.color("#581845")
    ];

    var chart: any = root.container.children.push(
      am5xy.XYChart.new(root, {
        panY: false,
        wheelY: 'zoomX',
        panX: true,
        wheelX: 'panX',
        pinchZoomX: true,
        //for leged position bottom
        layout: root.verticalLayout,
      })
    );
    // Add cursor
    var cursor = chart.set('cursor', am5xy.XYCursor.new(root, {}));
    cursor.lineY.set('visible', false);

    // Create axes
    var xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });

    var xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0.3,
        categoryField: 'Vendor',
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    var yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0.3,
        min: 0,
        // max: 100,
        // strictMinMax: true,
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    // Create series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    var series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'Series 1',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'Value',
        sequencedInterpolation: true,
        categoryXField: 'Vendor',
        tooltip: am5.Tooltip.new(root, {
          labelText: '{valueY}',
        }),
      })
    );

    series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5 });

    // *** color for columns ***//
    series.columns.template.adapters.add(
      'fill',
      function (fill: any, target: any) {
        return chart.get('colors').getIndex(series.columns.indexOf(target));
      }
    );

    series.columns.template.adapters.add(
      'stroke',
      function (stroke: any, target: any) {
        return chart.get('colors').getIndex(series.columns.indexOf(target));
      }
    );

    var data = this.ChartData;
    //   // Set data
    //   var data = [{
    //     vendor: "UST",
    //     value: 80
    //   }, {
    //     vendor: "Wipro",
    //     value: 70
    //   }, {
    //     vendor: "Infosys",
    //     value: 20
    //   }
    // ];
 
// // // Create the value axis
// var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
// valueAxis.stacking = "normal";
// valueAxis.calculateTotals = true;
// valueAxis.strictMinMax = true;

// //  // Set the minimum and maximum value
// valueAxis.min = 0;
// valueAxis.max = 100;

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
    var legend = chart.children.push(
      am5.Legend.new(root, {
        nameField: 'categoryX',
        centerX: am5.percent(50),
        x: am5.percent(55),
      })
    );

    legend.data.setAll(series.dataItems);

    // **** Add scroll bar **** //
    var scrollbarX = am5.Scrollbar.new(root, {
      orientation: 'horizontal',
    });

    chart.set('scrollbarX', scrollbarX);
    chart.bottomAxesContainer.children.push(scrollbarX);
    // chart.set("scrollbarX", am5.Scrollbar.new(root, { orientation: "horizontal"}));
  }
}

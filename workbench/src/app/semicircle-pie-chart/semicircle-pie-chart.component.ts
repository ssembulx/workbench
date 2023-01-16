import { Component, OnInit } from '@angular/core';
// amCharts imports
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5percent from '@amcharts/amcharts5/percent';
import { SummaryService } from '../shared/service';
@Component({
  selector: 'app-semicircle-pie-chart',
  templateUrl: './semicircle-pie-chart.component.html',
  styleUrls: ['./semicircle-pie-chart.component.scss']
})
export class SemicirclePieChartComponent implements OnInit {

  ChartData:any;
  semipieChartLoader = false;

  constructor(private service: SummaryService) { }

  ngOnInit(): void {
    this.LabOverallSummary();
  }

  //****Calling API for summary pie chart ***//
  LabOverallSummary() {
    this.semipieChartLoader = false;
    this.service.LabOverallSummary().subscribe((res) => {
      this.ChartData = res.Data;
      console.log('stacked chart', this.ChartData);
      this.getSemiCirclePiechart();
      this.semipieChartLoader = true;
    });
  }

  //**** Chart data ****//
  getSemiCirclePiechart() {
    debugger
    var root = am5.Root.new('chartdiv5');
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
        valueField: 'Value',
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
      if (target.dataItem.get("category") == "Non-SIV") {
          return am5.color('#6794dc'); 
      }
      else if(target.dataItem.get("category") == "Allocated") {
        return am5.color('#67b7dc')
      }
      else if(target.dataItem.get("category") == "Free") {
        return am5.color('#67b7dc')
      }
    });

    //**** custom color for border(stroke)****//
    series.slices.template.adapters.add("stroke", function(fill, target:any) {
      if (target.dataItem.get("category") == "Non-SIV") {
        return am5.color('#6794dc'); 
      }
      else if(target.dataItem.get("category") == "Allocated") {
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
    series.labels.template.set('text', '{Category}:{Value}');

    //**** for removing % from tooltip ***//
    series.slices.template.set('tooltipText', '{Category}:{Value}');

    //**** chart data ****//
    series.data.setAll(this.ChartData);
    // Set data
    // series.data.setAll([
    //   { value: 50, category: "Non-Siv Allocated"},
    //   { value: 30, category: "SIV Allocated" },
    //   { value: 20, category: "SIV UnAllocated" }
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
   
    series.appear(1000, 100);
  }
}

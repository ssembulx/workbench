import { Component, OnInit } from '@angular/core';
import { SummaryService } from '../shared/service';
import { any } from '@amcharts/amcharts5/.internal/core/util/Array';
import { ToastrService } from 'ngx-toastr';
// amCharts imports
// import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { Chart } from '@amcharts/amcharts5';
import * as am5plugins_exporting from '@amcharts/amcharts5/plugins/exporting';
import { fitAngleToRange } from '@amcharts/amcharts5/.internal/core/util/Math';
import * as am5percent from '@amcharts/amcharts5/percent';

// amCharts imports
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss'],
})
export class ForecastComponent implements OnInit {
  yearList;
  preSelectedYear;
  preSelectedYearRVP;
  preSelectedQuarterRVP;
  preSelectedForecastTableSummary;
  constructor(
    private dataSvc: SummaryService,
    private toastrService: ToastrService
  ) {
    // Get the current year
    this.preSelectedYear = new Date().getFullYear();
    this.preSelectedYearRVP = new Date().getFullYear();
    this.preSelectedQuarterRVP = new Date().getFullYear();
    this.preSelectedForecastTableSummary = new Date().getFullYear();
    // Create an array of years from 2010 to the current year
    this.yearList = [];
    for (let year = 2023; year <= this.preSelectedYear; year++) {
      this.yearList.push(year);
    }

    console.log(this.yearList);
  }

  programList: any;
  skuList: any;
  vendorList: any;
  teamList: any;
  boardList: any;
  /* onchange program dropdown */
  onChangeProgram(value: any) {
    this.labwiseChartLoader = false;
    this.dataSvc.getSKU({ ProgramShortName: value }).subscribe((res) => {
      if (res) {
        this.skuList = res;
        this.labwiseChartLoader = true;
      }
    });
  }
  labwiseChartLoader = false;
  /* API call get board list */
  getBoardList() {
    this.labwiseChartLoader = false;
    this.dataSvc.getBoard().subscribe((res) => {
      if (res) {
        this.boardList = res;
        /*  this.boardList = [
          {
            Program: 'MTL',
            Sku: 'S',
            Team: 'Automation',
            Vendor: 'UST',
            TotalBoard: 1000,
            createdBy: 'Nayak, Dilip',
            createdDate: '2023-09-13T04:10:54.328000Z',
            modifiedBy: 'Nayak, Dilip',
            modifiedDate: '2023-09-13T04:10:54.328000Z',
            deletedBy: 'Nayak, Dilip',
            deletedDate: '2023-09-13T04:10:54.328000Z',
            isdeleted: false,
            January: {
              boardsIntelBench: 250,
              boardIntelRack: 501,
              boardsODCBench: 35,
              boardsODCRack: 0,
            },
            February: {
              boardsIntelBench: 250,
              boardIntelRack: 50,
              boardsODCBench: 351,
              boardsODCRack: 0,
            },
            March: {
              boardsIntelBench: 250,
              boardIntelRack: 50,
              boardsODCBench: 35,
              boardsODCRack: 10,
            },
            April: {
              boardsIntelBench: 250,
              boardIntelRack: 150,
              boardsODCBench: 35,
              boardsODCRack: 0,
            },
            May: {
              boardsIntelBench: 250,
              boardIntelRack: 250,
              boardsODCBench: 35,
              boardsODCRack: 0,
            },
            June: {
              boardsIntelBench: 250,
              boardIntelRack: 50,
              boardsODCBench: 355,
              boardsODCRack: 0,
            },
            July: {
              boardsIntelBench: 3250,
              boardIntelRack: 50,
              boardsODCBench: 35,
              boardsODCRack: 0,
            },
            August: {
              boardsIntelBench: 2550,
              boardIntelRack: 50,
              boardsODCBench: 35,
              boardsODCRack: 0,
            },
            September: {
              boardsIntelBench: 250,
              boardIntelRack: 750,
              boardsODCBench: 35,
              boardsODCRack: 0,
            },
            October: {
              boardsIntelBench: 250,
              boardIntelRack: 580,
              boardsODCBench: 35,
              boardsODCRack: 0,
            },
            November: {
              boardsIntelBench: 250,
              boardIntelRack: 50,
              boardsODCBench: 35,
              boardsODCRack: 80,
            },
            December: {
              boardsIntelBench: 250,
              boardIntelRack: 50,
              boardsODCBench: 935,
              boardsODCRack: 0,
            },
          },
          {
            Program: 'MTL',
            Sku: 'S',
            Team: 'Automation',
            Vendor: 'UST',
            TotalBoard: 1000,
            createdBy: 'Nayak, Dilip',
            createdDate: '2023-09-13T04:10:54.328000Z',
            modifiedBy: 'Nayak, Dilip',
            modifiedDate: '2023-09-13T04:10:54.328000Z',
            deletedBy: 'Nayak, Dilip',
            deletedDate: '2023-09-13T04:10:54.328000Z',
            isdeleted: false,
            January: {
              boardsIntelBench: 250,
              boardIntelRack: 50,
              boardsODCBench: 35,
              boardsODCRack: 0,
            },
            February: {
              boardsIntelBench: 250,
              boardIntelRack: 50,
              boardsODCBench: 35,
              boardsODCRack: 0,
            },
            March: {
              boardsIntelBench: 250,
              boardIntelRack: 50,
              boardsODCBench: 35,
              boardsODCRack: 0,
            },
            April: {
              boardsIntelBench: 250,
              boardIntelRack: 50,
              boardsODCBench: 35,
              boardsODCRack: 0,
            },
            May: {
              boardsIntelBench: 250,
              boardIntelRack: 50,
              boardsODCBench: 35,
              boardsODCRack: 0,
            },
            June: {
              boardsIntelBench: 250,
              boardIntelRack: 50,
              boardsODCBench: 35,
              boardsODCRack: 0,
            },
            July: {
              boardsIntelBench: 250,
              boardIntelRack: 50,
              boardsODCBench: 35,
              boardsODCRack: 0,
            },
            August: {
              boardsIntelBench: 250,
              boardIntelRack: 50,
              boardsODCBench: 35,
              boardsODCRack: 0,
            },
            September: {
              boardsIntelBench: 250,
              boardIntelRack: 50,
              boardsODCBench: 35,
              boardsODCRack: 0,
            },
            October: {
              boardsIntelBench: 250,
              boardIntelRack: 50,
              boardsODCBench: 35,
              boardsODCRack: 0,
            },
            November: {
              boardsIntelBench: 250,
              boardIntelRack: 50,
              boardsODCBench: 35,
              boardsODCRack: 0,
            },
            December: {
              boardsIntelBench: 250,
              boardIntelRack: 50,
              boardsODCBench: 35,
              boardsODCRack: 0,
            },
          },
        ]; */
        this.formatStructure();
        this.labwiseChartLoader = true;
      }
    });
  }
  userInfo: any;
  benchDemand() {
    this.dataSvc.getBoard().subscribe((res) => {
      if (res) {
        this.boardList = res;
        this.formatStructure();
        this.labwiseChartLoader = true;
      }
    });
  }
  /* allocated api call */
  allocatedList;
  allocatedAPICall() {
    this.labwiseChartLoader = false;
    let payload = {
      year: this.preSelectedYear,
    };
    this.dataSvc.allocatedAPICall(payload).subscribe((res) => {
      if (res) {
        this.allocatedList = res;
        this.chartdiv();
        this.labwiseChartLoader = true;
      }
    });
  }
  /* rvp ramp yearly data API call */
  rvpYearList;
  rvpYear() {
    this.labwiseChartLoader = false;
    let payload = {
      year: this.preSelectedYearRVP,
    };
    this.dataSvc.rvpYearAPICall(payload).subscribe((res) => {
      if (res) {
        debugger;
        this.rvpYearList = res;
        this.chartdiv2();
        this.labwiseChartLoader = true;
      }
    });
  }

  /* rvp ramp yearly data API call */
  rvpQuarterList;
  rvpQuarter() {
    this.labwiseChartLoader = false;
    let payload = {
      year: this.preSelectedQuarterRVP,
    };
    this.dataSvc.rvpQuarterAPICall(payload).subscribe((res) => {
      if (res) {
        debugger;
        this.rvpQuarterList = res;
        this.chartdiv1();
        this.labwiseChartLoader = true;
      }
    });
  }

  /* forecast Table Summary API call*/
  forecastTableSummaryList;
  forecastTableSummary() {
    this.labwiseChartLoader = false;
    let payload = {
      year: this.preSelectedForecastTableSummary,
    };
    this.dataSvc.forecastTableSummary(payload).subscribe((res) => {
      if (res) {
        debugger;
        this.forecastTableSummaryList =
          res[this.preSelectedForecastTableSummary];
        this.labwiseChartLoader = true;
      }
    });
  }

  onItemSelected() {
    this.allocatedAPICall();
  }
  onItemSelectedrvpYear() {
    this.rvpYear();
  }
  onItemSelectedrvpQuarter() {
    this.rvpQuarter();
  }
  onItemSelectedforecastTableSummary() {
    this.forecastTableSummary();
  }
  ngAfterViewInit() {
    this.allocatedAPICall();
    this.rvpYear();
    this.rvpQuarter();
    this.forecastTableSummary();
  }

  chartdiv() {
    am5.array.each(am5.registry.rootElements, function (root) {
      if (root?.dom.id == 'chartdiv') {
        root.dispose();
      }
    });
    /* Chart code */
    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    let root = am5.Root.new('chartdiv');
    root._logo.dispose();
    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: 'panX',
        wheelY: 'zoomX',
        layout: root.verticalLayout,
      })
    );

    // Add legend
    // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
    let legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
      })
    );
    let data = this.allocatedList[this.preSelectedYear];
    /* let data = [
      {
        year: 'JAN',
        Bench_Allocation: 520,
        No_Of_RVP_Bench_Demand_Intel: 517,
      },
      {
        year: 'FEB',
        Bench_Allocation: 520,
        No_Of_RVP_Bench_Demand_Intel: 310,
      },
      {
        year: 'MAR',
        Bench_Allocation: 520,
        No_Of_RVP_Bench_Demand_Intel: 280,
      },
      {
        year: 'APR',
        Bench_Allocation: 520,
        No_Of_RVP_Bench_Demand_Intel: 230,
      },
      {
        year: 'MAY',
        Bench_Allocation: 520,
        No_Of_RVP_Bench_Demand_Intel: 280,
      },
      {
        year: 'JUN',
        Bench_Allocation: 520,
        No_Of_RVP_Bench_Demand_Intel: 327,
      },
      {
        year: 'JUL',
        Bench_Allocation: 520,
        No_Of_RVP_Bench_Demand_Intel: 513,
      },
      {
        year: 'AUG',
        Bench_Allocation: 520,
        No_Of_RVP_Bench_Demand_Intel: 645,
      },
      {
        year: 'SEP',
        Bench_Allocation: 520,
        No_Of_RVP_Bench_Demand_Intel: 655,
      },
      {
        year: 'OCT',
        Bench_Allocation: 520,
        No_Of_RVP_Bench_Demand_Intel: 631,
      },
      {
        year: 'NOV',
        Bench_Allocation: 520,
        No_Of_RVP_Bench_Demand_Intel: 631,
      },
      {
        year: 'DEC',
        Bench_Allocation: 520,
        No_Of_RVP_Bench_Demand_Intel: 604,
      },
    ]; */

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let xRenderer = am5xy.AxisRendererX.new(root, {
      cellStartLocation: 0.1,
      cellEndLocation: 0.9,
      maxWidth: 100,
      minGridDistance: 20,
    });

    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: 'category',
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    xRenderer.grid.template.setAll({
      location: 1,
    });

    xAxis.data.setAll(data);

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {
          strokeOpacity: 0.1,
        }),
      })
    );

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    function makeSeries(name, fieldName, color) {
      let series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: name,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: fieldName,
          categoryXField: 'category',
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: 'horizontal',
            labelText: '{name}, {categoryX}:{valueY}',
          }),
        })
      );

      series.columns.template.setAll({
        // tooltipText: '{name}, {categoryX}:{valueY}',
        width: am5.percent(90),
        // tooltipY: 0,
        strokeOpacity: 0,
        fill: am5.color(color),
        stroke: am5.color(color),
      });

      series.data.setAll(data);

      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      series.appear(1000);

      series.bullets.push(function () {
        return am5.Bullet.new(root, {
          locationY: 1,
          sprite: am5.Label.new(root, {
            text: '{valueY}',
            fill: root.interfaceColors.get('alternativeText'),
            centerY: 0,
            centerX: am5.p50,
            populateText: true,
          }),
        });
      });

      legend.data.push(series);
    }
    function makeLineSeries() {
      let series = chart.series.push(
        am5xy.LineSeries.new(root, {
          /* minBulletDistance: 10, */
          name: 'WSE Bench Allocation',
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: 'WSE_BENCH_Allocation',
          categoryXField: 'category',
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: 'horizontal',
            labelText: '{name}, {categoryX}:{valueY}',
          }),
        })
      );

      series.strokes.template.setAll({
        strokeWidth: 3,
        stroke: am5.color(0xd7a700),
      });

      series.data.setAll(data);
      series.appear(1000);
      series.bullets.push(function () {
        return am5.Bullet.new(root, {
          sprite: am5.Circle.new(root, {
            radius: 6,
            fill: series.get('fill'),
            stroke: root.interfaceColors.get('background'),
            strokeWidth: 2,
          }),
        });
      });
      legend.data.push(series);
    }

    makeSeries('Intel', 'intel', '#5b9bd5');
    makeSeries('ODC', 'ODC', '#ed7d31');
    makeLineSeries();
    /*  makeSeries('Asia', 'asia');
    makeSeries('Latin America', 'lamerica');
    makeSeries('Middle East', 'meast');
    makeSeries('Africa', 'africa'); */
    chart.set('cursor', am5xy.XYCursor.new(root, {}));
    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    // series2.appear(1000, 100);
    chart.appear(1000, 100);
  }
  chartdiv1() {
    am5.array.each(am5.registry.rootElements, function (root) {
      if (root?.dom.id == 'chartdiv1') {
        root.dispose();
      }
    });
    /* Chart code */
    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    let root = am5.Root.new('chartdiv1');
    root._logo.dispose();
    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: 'panX',
        wheelY: 'zoomX',
        layout: root.verticalLayout,
      })
    );

    // Add legend
    // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
    let legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
      })
    );
    let data = this.rvpQuarterList[this.preSelectedQuarterRVP];
    /* let data = [
      {
        year: 'JAN',
        Bench_Allocation: 520,
        No_Of_RVP_Bench_Demand_Intel: 517,
      },
      {
        year: 'FEB',
        Bench_Allocation: 520,
        No_Of_RVP_Bench_Demand_Intel: 310,
      },
      {
        year: 'MAR',
        Bench_Allocation: 520,
        No_Of_RVP_Bench_Demand_Intel: 280,
      },
      {
        year: 'APR',
        Bench_Allocation: 520,
        No_Of_RVP_Bench_Demand_Intel: 230,
      },
      {
        year: 'MAY',
        Bench_Allocation: 520,
        No_Of_RVP_Bench_Demand_Intel: 280,
      },
      {
        year: 'JUN',
        Bench_Allocation: 520,
        No_Of_RVP_Bench_Demand_Intel: 327,
      },
      {
        year: 'JUL',
        Bench_Allocation: 520,
        No_Of_RVP_Bench_Demand_Intel: 513,
      },
      {
        year: 'AUG',
        Bench_Allocation: 520,
        No_Of_RVP_Bench_Demand_Intel: 645,
      },
      {
        year: 'SEP',
        Bench_Allocation: 520,
        No_Of_RVP_Bench_Demand_Intel: 655,
      },
      {
        year: 'OCT',
        Bench_Allocation: 520,
        No_Of_RVP_Bench_Demand_Intel: 631,
      },
      {
        year: 'NOV',
        Bench_Allocation: 520,
        No_Of_RVP_Bench_Demand_Intel: 631,
      },
      {
        year: 'DEC',
        Bench_Allocation: 520,
        No_Of_RVP_Bench_Demand_Intel: 604,
      },
    ]; */

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let xRenderer = am5xy.AxisRendererX.new(root, {
      cellStartLocation: 0.1,
      cellEndLocation: 0.9,
      maxWidth: 100,
      minGridDistance: 20,
    });

    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: 'category',
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    xRenderer.grid.template.setAll({
      location: 1,
    });

    xAxis.data.setAll(data);

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {
          strokeOpacity: 0.1,
        }),
      })
    );

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    function makeSeries(name, fieldName, color) {
      let series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: name,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: fieldName,
          categoryXField: 'category',
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: 'horizontal',
            labelText: '{name}, {categoryX}:{valueY}',
          }),
        })
      );

      series.columns.template.setAll({
        // tooltipText: '{name}, {categoryX}:{valueY}',
        width: am5.percent(90),
        // tooltipY: 0,
        strokeOpacity: 0,
        fill: am5.color(color),
        stroke: am5.color(color),
      });

      series.data.setAll(data);

      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      series.appear(1000);

      series.bullets.push(function () {
        return am5.Bullet.new(root, {
          locationY: 1,
          sprite: am5.Label.new(root, {
            text: '{valueY}',
            fill: root.interfaceColors.get('alternativeText'),
            centerY: 0,
            centerX: am5.p50,
            populateText: true,
          }),
        });
      });

      legend.data.push(series);
    }
    function makeLineSeries() {
      let series = chart.series.push(
        am5xy.LineSeries.new(root, {
          /* minBulletDistance: 10, */
          name: 'WSE Bench Allocation',
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: 'WSE_BENCH_Allocation',
          categoryXField: 'category',
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: 'horizontal',
            labelText: '{name}, {categoryX}:{valueY}',
          }),
        })
      );

      series.strokes.template.setAll({
        strokeWidth: 3,
        stroke: am5.color(0xd7a700),
      });

      series.data.setAll(data);
      series.appear(1000);
      series.bullets.push(function () {
        return am5.Bullet.new(root, {
          sprite: am5.Circle.new(root, {
            radius: 6,
            fill: series.get('fill'),
            stroke: root.interfaceColors.get('background'),
            strokeWidth: 2,
          }),
        });
      });
      legend.data.push(series);
    }

    makeSeries('Intel', 'intel', '#5b9bd5');
    makeSeries('ODC', 'ODC', '#ed7d31');
    //  makeLineSeries();
    /*  makeSeries('Asia', 'asia');
    makeSeries('Latin America', 'lamerica');
    makeSeries('Middle East', 'meast');
    makeSeries('Africa', 'africa'); */
    chart.set('cursor', am5xy.XYCursor.new(root, {}));
    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    // series2.appear(1000, 100);
    chart.appear(1000, 100);
  }
  chartdiv2() {
    am5.array.each(am5.registry.rootElements, function (root) {
      if (root?.dom.id == 'chartdiv2') {
        root.dispose();
      }
    });
    /* Chart code */
    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    let root = am5.Root.new('chartdiv2');
    root._logo.dispose();
    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: 'panX',
        wheelY: 'zoomX',
        layout: root.verticalLayout,
      })
    );

    // Add legend
    // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
    let legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
      })
    );
    let data = this.rvpYearList[this.preSelectedYear];
    /* let data = [
      {
        year: 'JAN',
        Bench_Allocation: 520,
        No_Of_RVP_Bench_Demand_Intel: 517,
      },
      {
        year: 'FEB',
        Bench_Allocation: 520,
        No_Of_RVP_Bench_Demand_Intel: 310,
      },
      {
        year: 'MAR',
        Bench_Allocation: 520,
        No_Of_RVP_Bench_Demand_Intel: 280,
      },
      {
        year: 'APR',
        Bench_Allocation: 520,
        No_Of_RVP_Bench_Demand_Intel: 230,
      },
      {
        year: 'MAY',
        Bench_Allocation: 520,
        No_Of_RVP_Bench_Demand_Intel: 280,
      },
      {
        year: 'JUN',
        Bench_Allocation: 520,
        No_Of_RVP_Bench_Demand_Intel: 327,
      },
      {
        year: 'JUL',
        Bench_Allocation: 520,
        No_Of_RVP_Bench_Demand_Intel: 513,
      },
      {
        year: 'AUG',
        Bench_Allocation: 520,
        No_Of_RVP_Bench_Demand_Intel: 645,
      },
      {
        year: 'SEP',
        Bench_Allocation: 520,
        No_Of_RVP_Bench_Demand_Intel: 655,
      },
      {
        year: 'OCT',
        Bench_Allocation: 520,
        No_Of_RVP_Bench_Demand_Intel: 631,
      },
      {
        year: 'NOV',
        Bench_Allocation: 520,
        No_Of_RVP_Bench_Demand_Intel: 631,
      },
      {
        year: 'DEC',
        Bench_Allocation: 520,
        No_Of_RVP_Bench_Demand_Intel: 604,
      },
    ]; */

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let xRenderer = am5xy.AxisRendererX.new(root, {
      cellStartLocation: 0.1,
      cellEndLocation: 0.9,
      maxWidth: 100,
      minGridDistance: 20,
    });

    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: 'category',
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    xRenderer.grid.template.setAll({
      location: 1,
    });

    xAxis.data.setAll(data);

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {
          strokeOpacity: 0.1,
        }),
      })
    );

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    function makeSeries(name, fieldName, color) {
      let series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: name,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: fieldName,
          categoryXField: 'category',
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: 'horizontal',
            labelText: '{name}, {categoryX}:{valueY}',
          }),
        })
      );

      series.columns.template.setAll({
        // tooltipText: '{name}, {categoryX}:{valueY}',
        width: am5.percent(90),
        // tooltipY: 0,
        strokeOpacity: 0,
        fill: am5.color(color),
        stroke: am5.color(color),
      });

      series.data.setAll(data);

      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      series.appear(1000);

      series.bullets.push(function () {
        return am5.Bullet.new(root, {
          locationY: 1,
          sprite: am5.Label.new(root, {
            text: '{valueY}',
            fill: root.interfaceColors.get('alternativeText'),
            centerY: 0,
            centerX: am5.p50,
            populateText: true,
          }),
        });
      });

      legend.data.push(series);
    }
    function makeLineSeries() {
      let series = chart.series.push(
        am5xy.LineSeries.new(root, {
          /* minBulletDistance: 10, */
          name: 'Ramp',
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: 'Total',
          categoryXField: 'category',
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: 'horizontal',
            labelText: '{name}, {categoryX}:{valueY}',
          }),
        })
      );

      series.strokes.template.setAll({
        strokeWidth: 3,
        stroke: am5.color(0xd7a700),
      });

      series.data.setAll(data);
      series.appear(1000);
      series.bullets.push(function () {
        return am5.Bullet.new(root, {
          sprite: am5.Circle.new(root, {
            radius: 6,
            fill: series.get('fill'),
            stroke: root.interfaceColors.get('background'),
            strokeWidth: 2,
          }),
        });
      });
      legend.data.push(series);
    }

    // makeSeries('Intel', 'intel', '#5b9bd5');
    // makeSeries('ODC', 'ODC', '#ed7d31');
    makeLineSeries();
    /*  makeSeries('Asia', 'asia');
    makeSeries('Latin America', 'lamerica');
    makeSeries('Middle East', 'meast');
    makeSeries('Africa', 'africa'); */
    chart.set('cursor', am5xy.XYCursor.new(root, {}));
    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    // series2.appear(1000, 100);
    chart.appear(1000, 100);
  }

  ngOnInit(): void {
    this.labwiseChartLoader = false;
    /* API call get user info */
    this.dataSvc.GetUser().subscribe((res: any) => {
      console.log('userdeatils', res);
      this.userInfo = res;
    });
    this.getBoardList();
    /* API call get program list */
    this.dataSvc.getProgram().subscribe((res) => {
      if (res) {
        this.programList = res;
        this.labwiseChartLoader = true;
      }
    });
    /* API call get vendor list */
    this.dataSvc.getVendor().subscribe((res) => {
      if (res) {
        this.vendorList = res;
        this.labwiseChartLoader = true;
      }
    });
    /* API call get team list */
    this.dataSvc.getTeam().subscribe((res) => {
      if (res) {
        this.teamList = res;
        this.labwiseChartLoader = true;
      }
    });
    this.createHeadarColumns();
  }

  columns: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  boardsHeader: string[] = [
    'Boards @ Intel Bench',
    'Board @ Intel Rack',
    'Boards @ ODC Bench',
    'Boards @ ODC Rack',
  ];
  monthsOfYear: any = [];
  boardsHeaderColumns: any = [];

  /* Create dynamic header column */
  createHeadarColumns() {
    this.monthsOfYear = [];
    this.boardsHeaderColumns = [];
    this.columns.forEach((month) => {
      for (let i = 0; i < 4; i++) {
        this.monthsOfYear.push(month);
        this.boardsHeaderColumns.push(this.boardsHeader[i]);
      }
    });
  }

  /* Tab selection */
  typeChart = 'Location chart';
  Options(status: any) {
    if (status == 'Allocation') {
      this.typeChart = 'Location chart';
    } else if (status == 'Deallocation') {
      this.typeChart = 'Program chart';
    }
  }

  tableData: any[][] = [
    /*   [
      { value: 'A1', editing: false },
      { value: 'B1', editing: false },
      { value: 'C1', editing: false },
    ],
    [
      { value: 'A2', editing: false },
      { value: 'B2', editing: false },
      { value: 'C2', editing: false },
    ],
    [
      { value: 'A3', editing: false },
      { value: 'B3', editing: false },
      { value: 'C3', editing: false },
    ], */
  ];
  tempList: any[];
  tableDataList: any[] = [
    'Program',
    'Sku',
    'Team',
    'Vendor',
    'TotalBoard',
    'boardsIntelBench',
    'boardIntelRack',
    'boardsODCBench',
    'boardsODCRack',
  ];

  /* re structure  board list*/
  formatStructure() {
    this.tableData = [];
    this.boardList.forEach((element) => {
      this.tempList = [];
      for (let key in element) {
        if (isObject(element[key])) {
          for (let k in element[key]) {
            this.tempList.push({
              value: element[key][k],
              editing: false,
              properties: key,
              valueName: k,
            });
          }
        } else {
          if (this.tableDataList.includes(key)) {
            this.tempList.push({
              value: element[key],
              editing: false,
              properties: key,
            });
          }
        }
      }
      console.log('Temporary list', this.tempList);
      this.tempList.push({
        value: 'Update',
        editing: false,
        properties: 'Action',
      });
      this.tableData.push(this.tempList);
    });
    function isObject(variable) {
      return typeof variable === 'object' && variable !== null;
    }
    console.log(this.boardList);
  }

  startEditingCell(rowIndex: number, colIndex: number): void {
    this.tableData[rowIndex][colIndex].editing = true;
  }

  onCellEditDone(rowIndex: number, colIndex: number): void {
    this.tableData[rowIndex][colIndex].editing = false;
  }
  /* update row  */
  EditRow(row, rowIndex) {
    let tempAddnewRow = {};
    // Create a new Date object
    const currentDateAndTime = new Date();

    // Get the individual components
    const year = currentDateAndTime.getFullYear();
    const month = currentDateAndTime.getMonth() + 1; // Months are zero-indexed, so add 1
    const day = currentDateAndTime.getDate();
    const hours = currentDateAndTime.getHours();
    const minutes = currentDateAndTime.getMinutes();
    const seconds = currentDateAndTime.getSeconds();

    // Format the date and time
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    console.log(formattedDateTime);
    let id = this.boardList[rowIndex]?.id;
    tempAddnewRow['createdBy'] = this.boardList[rowIndex]?.createdBy;
    tempAddnewRow['createdDate'] = this.boardList[rowIndex]?.createdDate;
    tempAddnewRow['modifiedBy'] = this.userInfo?.name;
    tempAddnewRow['modifiedDate'] = formattedDateTime;
    tempAddnewRow['deletedBy'] = this.boardList[rowIndex]?.deletedBy;
    tempAddnewRow['deletedDate'] = this.boardList[rowIndex]?.deletedDate;
    tempAddnewRow['isdeleted'] = false;

    let tempStuctureAddNew = {
      January: {
        boardsIntelBench: 0,
        boardIntelRack: 0,
        boardsODCBench: 0,
        boardsODCRack: 0,
      },
      February: {
        boardsIntelBench: 0,
        boardIntelRack: 0,
        boardsODCBench: 0,
        boardsODCRack: 0,
      },
      March: {
        boardsIntelBench: 0,
        boardIntelRack: 0,
        boardsODCBench: 0,
        boardsODCRack: 0,
      },
      April: {
        boardsIntelBench: 0,
        boardIntelRack: 0,
        boardsODCBench: 0,
        boardsODCRack: 0,
      },
      May: {
        boardsIntelBench: 0,
        boardIntelRack: 0,
        boardsODCBench: 0,
        boardsODCRack: 0,
      },
      June: {
        boardsIntelBench: 0,
        boardIntelRack: 0,
        boardsODCBench: 0,
        boardsODCRack: 0,
      },
      July: {
        boardsIntelBench: 0,
        boardIntelRack: 0,
        boardsODCBench: 0,
        boardsODCRack: 0,
      },
      August: {
        boardsIntelBench: 0,
        boardIntelRack: 0,
        boardsODCBench: 0,
        boardsODCRack: 0,
      },
      September: {
        boardsIntelBench: 0,
        boardIntelRack: 0,
        boardsODCBench: 0,
        boardsODCRack: 0,
      },
      October: {
        boardsIntelBench: 0,
        boardIntelRack: 0,
        boardsODCBench: 0,
        boardsODCRack: 0,
      },
      November: {
        boardsIntelBench: 0,
        boardIntelRack: 0,
        boardsODCBench: 0,
        boardsODCRack: 0,
      },
      December: {
        boardsIntelBench: 0,
        boardIntelRack: 0,
        boardsODCBench: 0,
        boardsODCRack: 0,
      },
    };

    row.forEach((element) => {
      if (element.valueName == undefined) {
        if (element.value != 'Update') {
          tempAddnewRow[element.properties] = element.value;
        }
      } else if (element.valueName != undefined) {
        for (let key in tempStuctureAddNew) {
          if (key == element.properties) {
            if (isObject(tempStuctureAddNew[key])) {
              tempStuctureAddNew[key][element.valueName] = element.value;
            }
          }
        }
      }
      function isObject(variable) {
        return typeof variable === 'object' && variable !== null;
      }
    });
    let mergedObject: any = { ...tempAddnewRow, ...tempStuctureAddNew };
    if (mergedObject?.Program == '') {
      this.toastrService.warning('Please select Program', 'Warning');
    } else if (mergedObject?.Sku == '') {
      this.toastrService.warning('Please select SKU', 'Warning');
    } else if (mergedObject?.Team == '') {
      this.toastrService.warning('Please select Team', 'Warning');
    } else if (mergedObject?.Vendor == '') {
      this.toastrService.warning('Please select Vendor', 'Warning');
    } else {
      this.labwiseChartLoader = false;
      this.dataSvc.updateBoard(id, mergedObject).subscribe((res) => {
        if (res) {
          this.toastrService.success(
            'Forcaste Data Updated Successfully',
            'Success!'
          );
          this.getBoardList();
          this.labwiseChartLoader = true;
        }
      });
    }
  }
  /* delete row already added from the board list*/
  DeleteRow(row, rowIndex) {
    this.labwiseChartLoader = false;
    this.boardList[rowIndex]?.id;
    this.dataSvc.deleteBoard(this.boardList[rowIndex]?.id).subscribe((res) => {
      if (res) {
        this.toastrService.success(
          'Forcaste Data Deleted Successfully',
          'Success!'
        );
        this.getBoardList();
        // this.boardList = res;
        this.labwiseChartLoader = true;
      }
    });
  }
  /* delete row after click add new forecast data button*/
  DeleteAddRow(rowIndex) {
    this.tableData.splice(rowIndex, 1);
  }
  /* add row after click add new forecast data button*/
  AddNewRow(row, rowIndex) {
    let tempAddnewRow = {};
    // Create a new Date object
    const currentDateAndTime = new Date();

    // Get the individual components
    const year = currentDateAndTime.getFullYear();
    const month = currentDateAndTime.getMonth() + 1; // Months are zero-indexed, so add 1
    const day = currentDateAndTime.getDate();
    const hours = currentDateAndTime.getHours();
    const minutes = currentDateAndTime.getMinutes();
    const seconds = currentDateAndTime.getSeconds();

    // Format the date and time
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    console.log(formattedDateTime);

    tempAddnewRow['createdBy'] = this.userInfo?.name;
    // tempAddnewRow['createdBy'] = 'SakthirajanX';
    tempAddnewRow['createdDate'] = formattedDateTime;
    tempAddnewRow['modifiedBy'] = '';
    tempAddnewRow['modifiedDate'] = '';
    tempAddnewRow['deletedBy'] = '';
    tempAddnewRow['deletedDate'] = '';
    tempAddnewRow['isdeleted'] = false;

    let tempStuctureAddNew = {
      January: {
        boardsIntelBench: 0,
        boardIntelRack: 0,
        boardsODCBench: 0,
        boardsODCRack: 0,
      },
      February: {
        boardsIntelBench: 0,
        boardIntelRack: 0,
        boardsODCBench: 0,
        boardsODCRack: 0,
      },
      March: {
        boardsIntelBench: 0,
        boardIntelRack: 0,
        boardsODCBench: 0,
        boardsODCRack: 0,
      },
      April: {
        boardsIntelBench: 0,
        boardIntelRack: 0,
        boardsODCBench: 0,
        boardsODCRack: 0,
      },
      May: {
        boardsIntelBench: 0,
        boardIntelRack: 0,
        boardsODCBench: 0,
        boardsODCRack: 0,
      },
      June: {
        boardsIntelBench: 0,
        boardIntelRack: 0,
        boardsODCBench: 0,
        boardsODCRack: 0,
      },
      July: {
        boardsIntelBench: 0,
        boardIntelRack: 0,
        boardsODCBench: 0,
        boardsODCRack: 0,
      },
      August: {
        boardsIntelBench: 0,
        boardIntelRack: 0,
        boardsODCBench: 0,
        boardsODCRack: 0,
      },
      September: {
        boardsIntelBench: 0,
        boardIntelRack: 0,
        boardsODCBench: 0,
        boardsODCRack: 0,
      },
      October: {
        boardsIntelBench: 0,
        boardIntelRack: 0,
        boardsODCBench: 0,
        boardsODCRack: 0,
      },
      November: {
        boardsIntelBench: 0,
        boardIntelRack: 0,
        boardsODCBench: 0,
        boardsODCRack: 0,
      },
      December: {
        boardsIntelBench: 0,
        boardIntelRack: 0,
        boardsODCBench: 0,
        boardsODCRack: 0,
      },
    };

    row.forEach((element) => {
      if (element.valueName == undefined) {
        if (element.value != 'Add') {
          tempAddnewRow[element.properties] = element.value;
        }
      } else if (element.valueName != undefined) {
        for (let key in tempStuctureAddNew) {
          if (key == element.properties) {
            if (isObject(tempStuctureAddNew[key])) {
              tempStuctureAddNew[key][element.valueName] = element.value;
            }
          }
        }
      }
      function isObject(variable) {
        return typeof variable === 'object' && variable !== null;
      }
    });
    let mergedObject: any = { ...tempAddnewRow, ...tempStuctureAddNew };
    if (mergedObject?.Program == '') {
      this.toastrService.warning('Please select Program', 'Warning');
    } else if (mergedObject?.Sku == '') {
      this.toastrService.warning('Please select SKU', 'Warning');
    } else if (mergedObject?.Team == '') {
      this.toastrService.warning('Please select Team', 'Warning');
    } else if (mergedObject?.Vendor == '') {
      this.toastrService.warning('Please select Vendor', 'Warning');
    } else {
      this.labwiseChartLoader = false;
      this.dataSvc.addBoard(mergedObject).subscribe((res) => {
        if (res) {
          this.toastrService.success(
            'Forcaste Data Added Successfully',
            'Success!'
          );
          this.getBoardList();
          this.labwiseChartLoader = true;
        }
      });
    }
  }
  /*click add new forecast data button*/
  AddRow() {
    let tempStucture = [
      {
        value: '',
        editing: true,
        properties: 'Program',
      },
      {
        value: '',
        editing: true,
        properties: 'Sku',
      },
      {
        value: '',
        editing: true,
        properties: 'Team',
      },
      {
        value: '',
        editing: true,
        properties: 'Vendor',
      },
      {
        value: 0,
        editing: true,
        properties: 'TotalBoard',
      },
      {
        value: 0,
        editing: true,
        properties: 'January',
        valueName: 'boardsIntelBench',
      },
      {
        value: 0,
        editing: true,
        properties: 'January',
        valueName: 'boardIntelRack',
      },
      {
        value: 0,
        editing: true,
        properties: 'January',
        valueName: 'boardsODCBench',
      },
      {
        value: 0,
        editing: true,
        properties: 'January',
        valueName: 'boardsODCRack',
      },
      {
        value: 0,
        editing: true,
        properties: 'February',
        valueName: 'boardsIntelBench',
      },
      {
        value: 0,
        editing: true,
        valueName: 'boardIntelRack',
      },
      {
        value: 0,
        editing: true,
        properties: 'February',
        valueName: 'boardsODCBench',
      },
      {
        value: 0,
        editing: true,
        properties: 'February',
        valueName: 'boardsODCRack',
      },
      {
        value: 0,
        editing: true,
        properties: 'March',
        valueName: 'boardsIntelBench',
      },
      {
        value: 0,
        editing: true,
        properties: 'March',
        valueName: 'boardIntelRack',
      },
      {
        value: 0,
        editing: true,
        properties: 'March',
        valueName: 'boardsODCBench',
      },
      {
        value: 0,
        editing: true,
        properties: 'March',
        valueName: 'boardsODCRack',
      },
      {
        value: 0,
        editing: true,
        properties: 'April',
        valueName: 'boardsIntelBench',
      },
      {
        value: 0,
        editing: true,
        properties: 'April',
        valueName: 'boardIntelRack',
      },
      {
        value: 0,
        editing: true,
        properties: 'April',
        valueName: 'boardsODCBench',
      },
      {
        value: 0,
        editing: true,
        properties: 'April',
        valueName: 'boardsODCRack',
      },
      {
        value: 0,
        editing: true,
        properties: 'May',
        valueName: 'boardsIntelBench',
      },
      {
        value: 0,
        editing: true,
        properties: 'May',
        valueName: 'boardIntelRack',
      },
      {
        value: 0,
        editing: true,
        properties: 'May',
        valueName: 'boardsODCBench',
      },
      {
        value: 0,
        editing: true,
        properties: 'May',
        valueName: 'boardsODCRack',
      },
      {
        value: 0,
        editing: true,
        properties: 'June',
        valueName: 'boardsIntelBench',
      },
      {
        value: 0,
        editing: true,
        properties: 'June',
        valueName: 'boardIntelRack',
      },
      {
        value: 0,
        editing: true,
        properties: 'June',
        valueName: 'boardsODCBench',
      },
      {
        value: 0,
        editing: true,
        properties: 'June',
        valueName: 'boardsODCRack',
      },
      {
        value: 0,
        editing: true,
        properties: 'July',
        valueName: 'boardsIntelBench',
      },
      {
        value: 0,
        editing: true,
        properties: 'July',
        valueName: 'boardIntelRack',
      },
      {
        value: 0,
        editing: true,
        properties: 'July',
        valueName: 'boardsODCBench',
      },
      {
        value: 0,
        editing: true,
        properties: 'July',
        valueName: 'boardsODCRack',
      },
      {
        value: 0,
        editing: true,
        properties: 'August',
        valueName: 'boardsIntelBench',
      },
      {
        value: 0,
        editing: true,
        properties: 'August',
        valueName: 'boardIntelRack',
      },
      {
        value: 0,
        editing: true,
        properties: 'August',
        valueName: 'boardsODCBench',
      },
      {
        value: 0,
        editing: true,
        properties: 'August',
        valueName: 'boardsODCRack',
      },
      {
        value: 0,
        editing: true,
        properties: 'September',
        valueName: 'boardsIntelBench',
      },
      {
        value: 0,
        editing: true,
        properties: 'September',
        valueName: 'boardIntelRack',
      },
      {
        value: 0,
        editing: true,
        properties: 'September',
        valueName: 'boardsODCBench',
      },
      {
        value: 0,
        editing: true,
        properties: 'September',
        valueName: 'boardsODCRack',
      },
      {
        value: 0,
        editing: true,
        properties: 'October',
        valueName: 'boardsIntelBench',
      },
      {
        value: 0,
        editing: true,
        properties: 'October',
        valueName: 'boardIntelRack',
      },
      {
        value: 0,
        editing: true,
        properties: 'October',
        valueName: 'boardsODCBench',
      },
      {
        value: 0,
        editing: true,
        properties: 'October',
        valueName: 'boardsODCRack',
      },
      {
        value: 0,
        editing: true,
        properties: 'November',
        valueName: 'boardsIntelBench',
      },
      {
        value: 0,
        editing: true,
        properties: 'November',
        valueName: 'boardIntelRack',
      },
      {
        value: 0,
        editing: true,
        properties: 'November',
        valueName: 'boardsODCBench',
      },
      {
        value: 0,
        editing: true,
        properties: 'November',
        valueName: 'boardsODCRack',
      },
      {
        value: 0,
        editing: true,
        properties: 'December',
        valueName: 'boardsIntelBench',
      },
      {
        value: 0,
        editing: true,
        properties: 'December',
        valueName: 'boardIntelRack',
      },
      {
        value: 0,
        editing: true,
        properties: 'December',
        valueName: 'boardsODCBench',
      },
      {
        value: 0,
        editing: true,
        properties: 'December',
        valueName: 'boardsODCRack',
      },
      {
        value: 'Add',
        editing: false,
        properties: 'Action',
      },
    ];
    this.tableData.push(tempStucture);
  }
}

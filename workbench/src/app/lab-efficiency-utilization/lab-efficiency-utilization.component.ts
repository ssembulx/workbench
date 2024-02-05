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
import { ExportService } from '../shared/export.service';
import { ExcelService } from '../shared/excel.service';
import moment from 'moment';
@Component({
  selector: 'app-lab-efficiency-utilization',
  templateUrl: './lab-efficiency-utilization.component.html',
  styleUrls: ['./lab-efficiency-utilization.component.scss'],
})
export class LabEfficiencyUtilizationComponent implements OnInit {
  preSelectedYear;
  yearList;
  preSelectedForecastTableSummary;
  minDate: Date;
  maxDate: Date;
  constructor(
    private dataSvc: SummaryService,
    private toastrService: ToastrService,
    private exportService1: ExportService,
    private excelService: ExcelService,
    private ExportService: ExportService
  ) {
    this.preSelectedYear = new Date().getFullYear();
    this.preSelectedForecastTableSummary = new Date().getFullYear();
    this.preSelectedYearAddForecast = new Date().getFullYear();
    this.onDateSelectFrom(new Date());
    this.onDateSelectFromUtiSum(new Date());
    this.yearList = [];
    /* API call get year list */
    this.labwiseChartLoader = false;
    let payload = {
      workweek: '022024',
    };
    this.dataSvc.getYearListUtilization(payload).subscribe((res) => {
      if (res) {
        for (let key in res) {
          this.yearList.push(Number(key));
        }
        this.labwiseChartLoader = true;
      }
    });
    console.log(this.yearList);

    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate());

    this.maxDate = new Date(this.minDate);
    this.maxDate.setDate(this.minDate.getDate() + 365);
  }
  labwiseChartLoader = true;

  /* work week calendar */
  fromworkweek: any = '';
  fromformatWW: any = '';

  selectedFromWorkWeek: Date;

  toworkweek: any = '';
  toworkweekExtend: any = '';
  toformatWW: any = '';
  toformatWWExtend: any = '';

  selectedToWorkWeek: Date;
  selectedToWorkWeekExtend: Date;

  bsValueFrom = new Date();
  bsRangeValueFrom: Date[];
  bsValueTo = new Date();
  bsRangeValueTo: Date[];
  bsValueToExtend = new Date();
  bsRangeValueToExtend: Date[];
  toselWeekExtend: any;
  fromselWeek: any;
  Durationextend: any = 0;
  durationNum: any;
  onDateSelectFromDate: any;
  yearonDateSelectFrom: any;
  onDateSelectFrom(date: any) {
    debugger;
    this.fromselWeek = '';
    if (date !== undefined && date !== null) {
      this.onDateSelectFromDate = moment(date);
      var selDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );
      let week = moment(selDate).week();
      let month = moment(selDate).month();
      this.yearonDateSelectFrom = moment(selDate).year();
      /* let selWeek; */
      if (week < 10) {
        this.fromselWeek = ('0' + week).slice(-2);
      } else {
        this.fromselWeek = week;
      }
      if (month === 11 && week === 1) {
        this.yearonDateSelectFrom = this.yearonDateSelectFrom + 1;
      }
      this.fromworkweek =
        this.fromselWeek + "'" + this.yearonDateSelectFrom.toString();
      this.fromformatWW = (this.fromselWeek + "'" + this.yearonDateSelectFrom)
        .toString()
        .split("'")
        .join()
        .replace(',', '');
    }
  }
  fromselWeekUtiSum: any;
  DurationextendUtiSum: any = 0;
  durationNumUtiSum: any;
  onDateSelectFromDateUtiSum: any;
  yearonDateSelectFromUtiSum: any;
  fromworkweekUtiSum: any = '';
  fromformatWWUtiSum: any = '';
  onDateSelectFromUtiSum(date: any) {
    debugger;
    this.fromselWeekUtiSum = '';
    if (date !== undefined && date !== null) {
      this.onDateSelectFromDateUtiSum = moment(date);
      var selDateUtiSum = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );
      let weekUtiSum = moment(selDateUtiSum).week();
      let monthUtiSum = moment(selDateUtiSum).month();
      this.yearonDateSelectFromUtiSum = moment(selDateUtiSum).year();
      /* let selWeek; */
      if (weekUtiSum < 10) {
        this.fromselWeekUtiSum = ('0' + weekUtiSum).slice(-2);
      } else {
        this.fromselWeekUtiSum = weekUtiSum;
      }
      if (monthUtiSum === 11 && weekUtiSum === 1) {
        this.yearonDateSelectFromUtiSum = this.yearonDateSelectFromUtiSum + 1;
      }
      this.fromworkweekUtiSum =
        this.fromselWeekUtiSum +
        "'" +
        this.yearonDateSelectFromUtiSum.toString();
      this.fromformatWWUtiSum = (
        this.fromselWeekUtiSum +
        "'" +
        this.yearonDateSelectFromUtiSum
      )
        .toString()
        .split("'")
        .join()
        .replace(',', '');
    }
  }
  /* allocated api call */
  allocatedAPICall_no_data_available = false;
  wwallocatedAPICall_no_data_available = false;
  allocatedList;
  temp;
  utilizationTableList = [];
  allocatedAPICall() {
    this.labwiseChartLoader = false;
    let payload = {
      Year: this.preSelectedYear,
    };
    this.dataSvc.utilizationSumary(payload).subscribe((res) => {
      if (res) {
        this.temp = [];
        this.allocatedList = res;
        this.allocatedList.forEach((item) => {
          item.Actual_Utilization_Percentage = parseFloat(
            item.Actual_Utilization_Percentage.replace('%', '')
          );
          item.Utilization_Percentage = parseFloat(
            item.Utilization_Percentage.replace('%', '')
          );
        });
        /*  if (this.allocatedList.length == 0) {
          this.allocatedAPICall_no_data_available = true;
        } else if (this.allocatedList.length > 0) {
          this.allocatedAPICall_no_data_available = false;
          for (const key in this.allocatedList) {
            if (this.allocatedList.hasOwnProperty(key)) {
              this.allocatedList[key]['category'] =
                this.allocatedList[key].Lab_Details;
              this.allocatedList[key].Utilization = parseInt(
                this.allocatedList[key].Utilization,
                10
              );
              this.temp.push(this.allocatedList[key]);
            }
          }
          this.allocatedList = this.temp;
          let totalPlanned = 0;
          let totalActual = 0;
          let totalUtilization;
          debugger;
          this.temp.forEach((element, index) => {
            let data = {
              category: element?.Lab_Details,
              Planned: element['Planned Utilization'],
              Actual: element['Actual Utilization'],
              Utilization: element?.Utilization,
            };
            totalPlanned += element['Planned Utilization'];
            totalActual += element['Actual Utilization'];
            this.utilizationTableList.push(data);
          });
          this.utilizationTableList.push({
            category: 'Total',
            Planned: totalPlanned,
            Actual: totalActual,
            Utilization: ((totalActual / totalPlanned) * 100).toFixed(2),
          });
        } */
        this.chartdiv();
        this.labwiseChartLoader = true;
      }
    });
  }
  utilizationSumaryWWList;
  utilizationWWList = [];
  utilizationSumaryWW() {
    this.labwiseChartLoader = false;
    let payload = {
      workweek: this.fromformatWW,
      /*  workweek: '022023', */
    };
    this.dataSvc.utilizationSumaryWW(payload).subscribe((res) => {
      if (res) {
        this.temp = [];
        this.utilizationWWList = [];
        this.utilizationSumaryWWList = res;
        this.utilizationSumaryWWList.forEach((item) => {
          item.Utilization = parseFloat(item.Utilization.replace('%', ''));
          /* item.Utilization_Percentage = parseFloat(
            item.Utilization_Percentage.replace('%', '')
          ); */
          let data = {
            category: item?.LocationName,
            Planned: item['Planned Utilization'],
            Actual: item['Actual Utilization'],
            Utilization: item?.Utilization,
          };
          this.utilizationWWList.push(data);
        });
        debugger;
        this.chartdiv1();
        this.labwiseChartLoader = true;
      }
    });
  }

  /* download utlization summary */
  downloadUtlizationSummary() {
    this.ExportService.downloadUtilizationSummary(
      this.allocatedList,
      'Utilization Data'
    );
  }

  /* download utlization ww summary */
  downloadUtlizationSummaryWW() {
    this.ExportService.downloadUtlizationSummaryWW(
      this.utilizationWWList,
      'Utilization Data'
    );
  }

  onItemSelected() {
    this.allocatedAPICall();
  }

  ngAfterViewInit() {
    this.allocatedAPICall();
    this.utilizationSumaryWW();
    // this.chartdiv();
  }

  /* download forecast Table Summary data */
  downloadForecastTableSummaryList() {
    this.excelService.downloadExcel(
      this.utilizationTableList,
      'Utilization Data'
    );
  }

  onItemSelectedforecastTableSummary() {
    // this.forecastTableSummary();
    this.allocatedAPICall();
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

    var scrollbarX = am5.Scrollbar.new(root, {
      orientation: 'horizontal',
    });

    chart.set('scrollbarX', scrollbarX);
    chart.bottomAxesContainer.children.push(scrollbarX);

    //Export chart
    let exporting = am5plugins_exporting.Exporting.new(root, {
      menu: am5plugins_exporting.ExportingMenu.new(root, {}),
    });
    debugger;
    let data = this.allocatedList;
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

    xRenderer.labels.template.setAll({
      rotation: -90,
      centerY: am5.p50,
      centerX: am5.p100,
      paddingRight: 15,
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
        min: 0,
        renderer: am5xy.AxisRendererY.new(root, {
          strokeOpacity: 0.1,
        }),
      })
    );

    /* paretoAxis */
    let paretoAxisRenderer = am5xy.AxisRendererY.new(root, { opposite: true });
    let paretoAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: paretoAxisRenderer,
        min: 0,
      })
    );

    paretoAxisRenderer.grid.template.set('forceHidden', true);
    paretoAxis.set('numberFormat', "#'%");

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    function makeSeries(name, fieldName, color) {
      let series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: name,
          stacked: true,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: fieldName,
          categoryXField: 'category',
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: 'horizontal',
            // labelText: '{name}, {categoryX}:{valueY}',
            labelText: '{name} : {valueY}',
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
      series.columns.template.onPrivate('height', function (height, target) {
        am5.array.each(target.dataItem.bullets, function (bullet) {
          if (height > 10) {
            bullet.get('sprite').show();
          } else {
            bullet.get('sprite').hide();
          }
        });
      });
      legend.data.push(series);
    }
    function makeLineSeries() {
      // let series = chart.series.push(
      //   am5xy.LineSeries.new(root, {
      //     /* minBulletDistance: 10, */
      //     name: 'Actual Utilization %',
      //     xAxis: xAxis,
      //     yAxis: yAxis,
      //     valueYField: 'Actual_Utilization_Percentage',
      //     categoryXField: 'category',
      //     fill: am5.color('#4472c4'),
      //     stroke: am5.color('#4472c4'),
      //     tooltip: am5.Tooltip.new(root, {
      //       pointerOrientation: 'horizontal',
      //       //labelText: '{name}, {categoryX}:{valueY}',
      //       labelText: '{name} : {valueY}',
      //     }),
      //   })
      // );

      // series.strokes.template.setAll({
      //   strokeWidth: 3,
      //   stroke: am5.color('#4472c4'),
      // });

      // series.data.setAll(data);
      // series.appear(1000);
      // series.bullets.push(function () {
      //   return am5.Bullet.new(root, {
      //     sprite: am5.Circle.new(root, {
      //       radius: 6,
      //       fill: am5.color('#4472c4'),
      //       stroke: am5.color('#4472c4'),
      //       strokeWidth: 2,
      //     }),
      //   });
      // });
      // legend.data.push(series);
      let paretoSeries = chart.series.push(
        am5xy.LineSeries.new(root, {
          name: 'Actual Utilization %',
          xAxis: xAxis,
          yAxis: paretoAxis,
          valueYField: 'Actual_Utilization_Percentage',
          categoryXField: 'category',
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: 'horizontal',
            //  labelText: '{name}, {categoryX} : {valueY}%',
            labelText: '{name} : {valueY}',
          }),
          /*  stroke: root.interfaceColors.get('alternativeBackground'),
            maskBullets: false, */
        })
      );
      paretoSeries.strokes.template.setAll({
        strokeWidth: 3,
        stroke: paretoSeries.get('fill'),
      });
      paretoSeries.bullets.push(function () {
        return am5.Bullet.new(root, {
          locationY: 1,
          sprite: am5.Circle.new(root, {
            radius: 5,
            fill: paretoSeries.get('fill'),
            stroke: root.interfaceColors.get('background'),
          }),
        });
      });
      paretoSeries.data.setAll(data);
      legend.data.push(paretoSeries);

      let paretoSeries1 = chart.series.push(
        am5xy.LineSeries.new(root, {
          name: 'Utilization %',
          xAxis: xAxis,
          yAxis: paretoAxis,
          valueYField: 'Utilization_Percentage',
          categoryXField: 'category',
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: 'horizontal',
            //  labelText: '{name}, {categoryX} : {valueY}%',
            labelText: '{name} : {valueY}',
          }),
          /*  stroke: root.interfaceColors.get('alternativeBackground'),
            maskBullets: false, */
        })
      );
      paretoSeries1.strokes.template.setAll({
        strokeWidth: 3,
        stroke: paretoSeries1.get('fill'),
      });
      paretoSeries1.bullets.push(function () {
        return am5.Bullet.new(root, {
          locationY: 1,
          sprite: am5.Circle.new(root, {
            radius: 5,
            fill: paretoSeries1.get('fill'),
            stroke: root.interfaceColors.get('background'),
          }),
        });
      });
      paretoSeries1.data.setAll(data);
      legend.data.push(paretoSeries1);
    }

    function makeLineSeries1() {
      let series1 = chart.series.push(
        am5xy.LineSeries.new(root, {
          /* minBulletDistance: 10, */
          name: 'Actual Utilization',
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: 'Actual Utilization',
          fill: am5.color('#92d050'),
          stroke: am5.color('#92d050'),
          categoryXField: 'category',
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: 'horizontal',
            //labelText: '{name}, {categoryX}:{valueY}',
            labelText: '{name} : {valueY}',
          }),
        })
      );

      series1.strokes.template.setAll({
        strokeWidth: 3,
        stroke: am5.color('#92d050'),
      });

      series1.data.setAll(data);
      series1.appear(1000);
      series1.bullets.push(function () {
        return am5.Bullet.new(root, {
          sprite: am5.Circle.new(root, {
            radius: 6,
            fill: am5.color('#92d050'),
            stroke: am5.color('#92d050'),
            strokeWidth: 2,
          }),
        });
      });
      legend.data.push(series1);
    }

    //makeSeries('Utilization %', 'Utilization', '#5b9bd5');
    makeSeries('Planned', 'Planned', '#5b9bd5');
    makeSeries('Actual', 'Actual', '#3db13d');
    makeLineSeries();
    // makeLineSeries1();
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

    var scrollbarX = am5.Scrollbar.new(root, {
      orientation: 'horizontal',
    });

    chart.set('scrollbarX', scrollbarX);
    chart.bottomAxesContainer.children.push(scrollbarX);

    //Export chart
    let exporting = am5plugins_exporting.Exporting.new(root, {
      menu: am5plugins_exporting.ExportingMenu.new(root, {}),
    });
    debugger;
    let data = this.utilizationWWList;
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

    xRenderer.labels.template.setAll({
      rotation: -90,
      centerY: am5.p50,
      centerX: am5.p100,
      paddingRight: 15,
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
        min: 0,
        renderer: am5xy.AxisRendererY.new(root, {
          strokeOpacity: 0.1,
        }),
      })
    );

    /* paretoAxis */
    let paretoAxisRenderer = am5xy.AxisRendererY.new(root, { opposite: true });
    let paretoAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: paretoAxisRenderer,
        min: 0,
      })
    );

    paretoAxisRenderer.grid.template.set('forceHidden', true);
    paretoAxis.set('numberFormat', "#'%");

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    function makeSeries(name, fieldName, color) {
      let series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: name,
          stacked: true,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: fieldName,
          categoryXField: 'category',
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: 'horizontal',
            // labelText: '{name}, {categoryX}:{valueY}',
            labelText: '{name} : {valueY}',
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
      series.columns.template.onPrivate('height', function (height, target) {
        am5.array.each(target.dataItem.bullets, function (bullet) {
          if (height > 10) {
            bullet.get('sprite').show();
          } else {
            bullet.get('sprite').hide();
          }
        });
      });
      legend.data.push(series);
    }
    function makeLineSeries() {
      // let series = chart.series.push(
      //   am5xy.LineSeries.new(root, {
      //     /* minBulletDistance: 10, */
      //     name: 'Actual Utilization %',
      //     xAxis: xAxis,
      //     yAxis: yAxis,
      //     valueYField: 'Actual_Utilization_Percentage',
      //     categoryXField: 'category',
      //     fill: am5.color('#4472c4'),
      //     stroke: am5.color('#4472c4'),
      //     tooltip: am5.Tooltip.new(root, {
      //       pointerOrientation: 'horizontal',
      //       //labelText: '{name}, {categoryX}:{valueY}',
      //       labelText: '{name} : {valueY}',
      //     }),
      //   })
      // );

      // series.strokes.template.setAll({
      //   strokeWidth: 3,
      //   stroke: am5.color('#4472c4'),
      // });

      // series.data.setAll(data);
      // series.appear(1000);
      // series.bullets.push(function () {
      //   return am5.Bullet.new(root, {
      //     sprite: am5.Circle.new(root, {
      //       radius: 6,
      //       fill: am5.color('#4472c4'),
      //       stroke: am5.color('#4472c4'),
      //       strokeWidth: 2,
      //     }),
      //   });
      // });
      // legend.data.push(series);
      let paretoSeries = chart.series.push(
        am5xy.LineSeries.new(root, {
          name: 'Utilization %',
          xAxis: xAxis,
          yAxis: paretoAxis,
          valueYField: 'Utilization',
          categoryXField: 'category',
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: 'horizontal',
            //  labelText: '{name}, {categoryX} : {valueY}%',
            labelText: '{name} : {valueY}',
          }),
          /*  stroke: root.interfaceColors.get('alternativeBackground'),
            maskBullets: false, */
        })
      );
      paretoSeries.strokes.template.setAll({
        strokeWidth: 3,
        stroke: paretoSeries.get('fill'),
      });
      paretoSeries.bullets.push(function () {
        return am5.Bullet.new(root, {
          locationY: 1,
          sprite: am5.Circle.new(root, {
            radius: 5,
            fill: paretoSeries.get('fill'),
            stroke: root.interfaceColors.get('background'),
          }),
        });
      });
      paretoSeries.data.setAll(data);
      legend.data.push(paretoSeries);

      // let paretoSeries1 = chart.series.push(
      //   am5xy.LineSeries.new(root, {
      //     name: 'Utilization %',
      //     xAxis: xAxis,
      //     yAxis: paretoAxis,
      //     valueYField: 'Utilization_Percentage',
      //     categoryXField: 'category',
      //     tooltip: am5.Tooltip.new(root, {
      //       pointerOrientation: 'horizontal',
      //       //  labelText: '{name}, {categoryX} : {valueY}%',
      //       labelText: '{name} : {valueY}',
      //     }),
      //     /*  stroke: root.interfaceColors.get('alternativeBackground'),
      //       maskBullets: false, */
      //   })
      // );
      // paretoSeries1.strokes.template.setAll({
      //   strokeWidth: 3,
      //   stroke: paretoSeries1.get('fill'),
      // });
      // paretoSeries1.bullets.push(function () {
      //   return am5.Bullet.new(root, {
      //     locationY: 1,
      //     sprite: am5.Circle.new(root, {
      //       radius: 5,
      //       fill: paretoSeries1.get('fill'),
      //       stroke: root.interfaceColors.get('background'),
      //     }),
      //   });
      // });
      // paretoSeries1.data.setAll(data);
      // legend.data.push(paretoSeries1);
    }

    function makeLineSeries1() {
      let series1 = chart.series.push(
        am5xy.LineSeries.new(root, {
          /* minBulletDistance: 10, */
          name: 'Actual Utilization',
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: 'Actual Utilization',
          fill: am5.color('#92d050'),
          stroke: am5.color('#92d050'),
          categoryXField: 'category',
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: 'horizontal',
            //labelText: '{name}, {categoryX}:{valueY}',
            labelText: '{name} : {valueY}',
          }),
        })
      );

      series1.strokes.template.setAll({
        strokeWidth: 3,
        stroke: am5.color('#92d050'),
      });

      series1.data.setAll(data);
      series1.appear(1000);
      series1.bullets.push(function () {
        return am5.Bullet.new(root, {
          sprite: am5.Circle.new(root, {
            radius: 6,
            fill: am5.color('#92d050'),
            stroke: am5.color('#92d050'),
            strokeWidth: 2,
          }),
        });
      });
      legend.data.push(series1);
    }

    //makeSeries('Utilization %', 'Utilization', '#5b9bd5');
    makeSeries('Planned', 'Planned', '#5b9bd5');
    makeSeries('Actual', 'Actual', '#3db13d');
    makeLineSeries();
    // makeLineSeries1();
    chart.set('cursor', am5xy.XYCursor.new(root, {}));
    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    // series2.appear(1000, 100);
    chart.appear(1000, 100);
  }

  bench_summary_list = [
    {
      LAB_Name: 'CRD02',
      Planned_Utlization: '225.5',
      Actual_Utlization: '182.5',
      Utilization: '80.93% ',
    },
    {
      LAB_Name: 'CRD04',
      Planned_Utlization: '174.5',
      Actual_Utlization: '171.5',
      Utilization: '98.28% ',
    },
    {
      LAB_Name: 'CRD05',
      Planned_Utlization: '32',
      Actual_Utlization: '24',
      Utilization: '75.00% ',
    },
    {
      LAB_Name: 'CRD11',
      Planned_Utlization: '136.5',
      Actual_Utlization: '103.5',
      Utilization: '75.82% ',
    },
    {
      LAB_Name: 'CRD14',
      Planned_Utlization: '58',
      Actual_Utlization: '58',
      Utilization: '100.00% ',
    },
    {
      LAB_Name: 'CRD-15',
      Planned_Utlization: '20',
      Actual_Utlization: '18',
      Utilization: '90.00% ',
    },
    {
      LAB_Name: 'SRR2-CCG1',
      Planned_Utlization: '112',
      Actual_Utlization: '83',
      Utilization: '74.11% ',
    },
    {
      LAB_Name: 'SRR3-CCG - RF CHAMBER(7 th Floor)',
      Planned_Utlization: '18',
      Actual_Utlization: '18',
      Utilization: '100.00% ',
    },
    {
      LAB_Name: 'SRR4 9 Floor Mega LAB',
      Planned_Utlization: '39',
      Actual_Utlization: '13.5',
      Utilization: '34.62% ',
    },
    {
      LAB_Name: 'SRR2-CCG1(New)',
      Planned_Utlization: '6',
      Actual_Utlization: '6',
      Utilization: '100.00% ',
    },
    {
      LAB_Name: 'ECO-EC4-2B(2nd Floor)',
      Planned_Utlization: '100',
      Actual_Utlization: '43',
      Utilization: '43.00% ',
    },
    {
      LAB_Name: 'Grand Total',
      Planned_Utlization: '921.5',
      Actual_Utlization: '721',
      Utilization: '78.24% ',
    },
  ];

  /* Tab selection */
  typeChart = 'BenchSummary';
  Options(status: any) {
    if (status == 'BenchSummary') {
      this.typeChart = 'BenchSummary';
    } else if (status == 'PlannedVSActual') {
      this.typeChart = 'PlannedVSActual';
      this.AddRow();
      this.getBoardList();
    } else if (status == 'ProgramSummary') {
      this.typeChart = 'ProgramSummary';
    }
  }

  WorkWeekSummaryList: any;
  /* API call get WorkWeekSummary list */
  /*   getWorkWeekSummaryList() {
    this.labwiseChartLoader = false;
    this.dataSvc.getWorkWeekSummary().subscribe((res) => {
      if (res) {
        debugger;
        this.WorkWeekSummaryList = res;
        this.formatStructure();
        this.labwiseChartLoader = true;
      }
    });
  } */
  tableData: any = [];
  tempList: any[] = [];
  tableDataList: any[] = [
    'workweek',
    'Lab',
    'Location',
    'BenchData',
    'Program',
    'Sku',
    'Team',
    'Vendor',
    'Planned_Utilization',
    'Actual_Utilization',
    'Actual_utilization_in_percentage',
    'Utilization_Percentage',
    'Allocated_POC',
    'Createdby',
    'Remarks_Utilization',
  ];
  /* re structure  work week summary list*/
  formatStructure() {
    debugger;
    this.tableData = [];
    this.boardList.forEach((element) => {
      this.tempList = [];
      for (let key in element) {
        /*    if (isObject(element[key])) {
          for (let k in element[key]) {
            this.tempList.push({
              value: element[key][k],
              editing: false,
              properties: key,
              valueName: k,
            });
          }
        } else { */
        debugger;
        if (this.tableDataList.includes(key)) {
          if (key == 'Planned_Utilization' || key == 'Actual_Utilization') {
            this.tempList.push({
              value: element[key] == null ? 0 : element[key],
              editing: true,
              properties: key,
            });
          } else if (
            key == 'Actual_utilization_in_percentage' ||
            key == 'Utilization_Percentage'
          ) {
            this.tempList.push({
              value: element[key] == null ? 0 : element[key],
              editing: false,
              properties: key,
            });
          } else if (key == 'Allocated_POC') {
            this.tempList.push({
              value:
                element?.AllocatedTo == null
                  ? ''
                  : element?.AllocatedTo[0]?.Name,
              // value: element[key] == null ? '' : element[key],
              editing: true,
              properties: key,
            });
          } else if (key == 'Remarks_Utilization') {
            this.tempList.push({
              value: element[key] == null ? '' : element[key],
              editing: true,
              properties: key,
            });
          } else {
            this.tempList.push({
              value: element[key] == null ? '' : element[key],
              editing: false,
              properties: key,
            });
          }
        }
        /* } */
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
    // this.WorkWeekSummaryChart();
  }
  /* create work week summary chart */
  WorkWeekSummaryChart() {
    am5.array.each(am5.registry.rootElements, function (root) {
      if (root?.dom.id == 'chartdiv1') {
        root.dispose();
      }
    });
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
        panX: true,
        panY: true,
        wheelX: 'panX',
        wheelY: 'zoomX',
        pinchZoomX: true,
      })
    );

    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    let cursor = chart.set('cursor', am5xy.XYCursor.new(root, {}));
    cursor.lineY.set('visible', false);

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 20 });
    xRenderer.labels.template.setAll({
      rotation: -90,
      centerY: am5.p50,
      centerX: am5.p100,
      paddingRight: 15,
      maxWidth: 100,
    });

    xRenderer.grid.template.setAll({
      location: 1,
    });

    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0.3,
        categoryField: 'category',
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0.3,
        renderer: am5xy.AxisRendererY.new(root, {
          strokeOpacity: 0.1,
        }),
      })
    );

    // Create series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    let series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'Series 1',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'value',
        sequencedInterpolation: true,
        categoryXField: 'category',
        tooltip: am5.Tooltip.new(root, {
          labelText: '{valueY}',
        }),
      })
    );

    series.columns.template.setAll({
      cornerRadiusTL: 5,
      cornerRadiusTR: 5,
      strokeOpacity: 0,
    });
    series.columns.template.adapters.add('fill', function (fill, target) {
      return chart.get('colors').getIndex(series.columns.indexOf(target));
    });

    series.columns.template.adapters.add('stroke', function (stroke, target) {
      return chart.get('colors').getIndex(series.columns.indexOf(target));
    });
    // Set data
    let data = this.tempList;
    xAxis.data.setAll(data);
    series.data.setAll(data);

    /* series.columns.template.events.on('click', (ev) => {
      debugger;
      const categoryData: any = ev.target.dataItem.dataContext;
      if (categoryData.subdata != undefined) {
        series.data.setAll(categoryData.subdata);
        xAxis.data.setAll(categoryData.subdata);
        yAxis.data.setAll(categoryData.subdata);
        series.appear();
      }
    }); */
    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000);
    chart.appear(1000, 100);
  }

  /* Sorting functionality in table(ascending descending order)  */
  reverseMappedRelease: boolean = true;
  orderMappedRelease: string = '';
  setOrderRelease(value: string) {
    if (this.orderMappedRelease === value) {
      this.reverseMappedRelease = !this.reverseMappedRelease;
    }
    this.orderMappedRelease = value;
  }

  tollTipRef: any;
  showTestTrendSearch(tollTip: any) {
    this.tollTipRef = tollTip;
    tollTip.open();
  }

  hideTestTrendSearch() {
    this.tollTipRef.close();
  }
  /* download bench details */
  downloadallocatedListbench() {
    this.exportService1.exportExcel(this.tableData, 'Bench Details');
  }

  searchText = '';
  searchLocation = '';
  searchProgram = '';
  searchVendor = '';
  searchSku = '';
  searchAllocated = '';
  searchfromWW = '';
  searchtoWW: '';
  searchBench: '';
  searchTeam: '';
  searchDuration: '';
  searchApprovedBy: '';
  searchBenchDetails: '';
  clearInput() {
    this.searchLocation = '';
    this.searchProgram = '';
    this.searchVendor = '';
    this.searchSku = '';
    this.searchAllocated = '';
    this.searchfromWW = '';
    this.searchtoWW = '';
    this.searchBench = '';
    this.searchBenchDetails = '';
    this.searchTeam = '';
    this.searchDuration = '';
  }

  userInfo: any;
  ngOnInit(): void {
    this.labwiseChartLoader = false;
    /* API call get user info */
    this.dataSvc.GetUser().subscribe((res: any) => {
      console.log('userdeatils', res);
      this.userInfo = res;
    });
    // this.getWorkWeekSummaryList();
    /* API call get location list */
    this.dataSvc.GetLocations().subscribe((res) => {
      if (res) {
        this.locationList = res;
        this.labwiseChartLoader = true;
      }
    });
    /* API call get lab list */
    this.dataSvc.getLabList().subscribe((res) => {
      if (res) {
        this.get_lab_list = res;
        this.labwiseChartLoader = true;
      }
    });
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
    //  this.createHeadarColumns();
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
      this.monthsOfYear.push(month);
      for (let i = 0; i < 4; i++) {
        this.boardsHeaderColumns.push(this.boardsHeader[i]);
      }
    });
  }

  preSelectedYearAddForecast;
  addForecastYearList = [2020, 2021, 2022, 2023, 2024, 2025, 2026];
  get_lab_list: any;
  locationList: any;
  programList: any;
  skuList: any;
  vendorList: any;
  teamList: any;
  boardList: any;
  /* API call get board list */
  getBoardList() {
    /*  this.labwiseChartLoader = false;
    let payload = {
      Year: this.preSelectedYearAddForecast,
    };
    this.dataSvc.yearWiseutilization(payload).subscribe((res) => {
      if (res) {
        this.boardList = res;
        this.formatStructure();
        this.labwiseChartLoader = true;
      }
    }); */
  }

  onItemSelectedAddForecast() {
    this.getBoardList();
  }
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

  startEditingCell(rowIndex: number, colIndex: number): void {
    this.tableData[rowIndex][colIndex].editing = true;
  }

  onCellEditDone(rowIndex: number, colIndex: number): void {
    this.tableData[rowIndex][colIndex].editing = false;
  }

  /* update row  */
  EditRow(row, rowIndex) {
    debugger;
    let tempAddnewRow = this.boardList[rowIndex];
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
    debugger;
    console.log(formattedDateTime);
    let id = this.boardList[rowIndex]?.id;
    /*  tempAddnewRow['Createdby'] = this.boardList[rowIndex]?.createdBy;
    tempAddnewRow['CreatedDate'] = this.boardList[rowIndex]?.createdDate;
    tempAddnewRow['Modifiedby'] = this.userInfo?.name;
    tempAddnewRow['ModifiedDate'] = formattedDateTime;
    tempAddnewRow['Deletedby'] = this.boardList[rowIndex]?.deletedBy;
    tempAddnewRow['DeletedDate'] = this.boardList[rowIndex]?.deletedDate;
    tempAddnewRow['isDeleted'] = false; */
    //  tempAddnewRow['year'] = this.preSelectedYearAddForecast;
    tempAddnewRow['Deletedby'] = '';
    row.forEach((element) => {
      if (element.properties == 'Planned_Utilization') {
        tempAddnewRow.Planned_Utilization = element.value;
      } else if (element.properties == 'Actual_Utilization') {
        tempAddnewRow.Actual_Utilization = element.value;
      } else if (element.properties == 'Actual_utilization_in_percentage') {
        tempAddnewRow.Actual_utilization_in_percentage = element.value;
      } else if (element.properties == 'Utilization_Percentage') {
        tempAddnewRow.Utilization_Percentage = element.value;
      } else if (element.properties == 'Allocated_POC') {
        tempAddnewRow.Allocated_POC = element.value;
      } else if (element.properties == 'Remarks_Utilization') {
        tempAddnewRow.Remarks_Utilization = element.value;
      }
    });
    tempAddnewRow.Modifiedby = this.userInfo?.name;
    tempAddnewRow.ModifiedDate = formattedDateTime;
    let mergedObject: any = tempAddnewRow;
    // let mergedObject: any = { ...tempAddnewRow, ...tempStuctureAddNew };
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
      debugger;
      this.dataSvc.updatePlannedvsActual(id, mergedObject).subscribe((res) => {
        if (res) {
          this.toastrService.success(
            'Planned vs Actual Data Updated Successfully',
            'Success!'
          );
          this.AddRow();
          this.labwiseChartLoader = true;
        }
      });
    }
  }
  /* delete row already added from the board list*/
  DeleteRow(row, rowIndex) {
    this.labwiseChartLoader = false;
    this.boardList[rowIndex]?.id;
    this.dataSvc
      .deletePlannedvsActual(this.boardList[rowIndex]?.id)
      .subscribe((res) => {
        if (res) {
          this.toastrService.success(
            'Planned vs Actual Data Deleted Successfully',
            'Success!'
          );
          this.getBoardList();
          // this.boardList = res;
          this.AddRow();
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

    tempAddnewRow['Createdby'] = this.userInfo?.name;
    // tempAddnewRow['createdBy'] = 'SakthirajanX';
    tempAddnewRow['CreatedDate'] = formattedDateTime;
    tempAddnewRow['Modifiedby'] = '';
    tempAddnewRow['ModifiedDate'] = '';
    tempAddnewRow['Deletedby'] = '';
    tempAddnewRow['DeletedDate'] = '';
    tempAddnewRow['isDeleted'] = false;
    //  tempAddnewRow['year'] = this.preSelectedYearAddForecast;

    debugger;
    row.forEach((element) => {
      if (element.value != 'Add') {
        tempAddnewRow[element.properties] = element.value;
      }
      if (element.properties == 'Bench') {
        tempAddnewRow[element.properties] = [element.value];
      }
    });
    let mergedObject: any = tempAddnewRow;
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
      this.dataSvc.addPlannedvsActual(mergedObject).subscribe((res) => {
        if (res) {
          this.toastrService.success(
            'Planned vs Actual Data Added Successfully',
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
    if (this.fromformatWW == '') {
      this.toastrService.warning('Please select Work Week & Year', 'Warning');
    } else {
      this.labwiseChartLoader = false;
      /* let payload = {
        workweek: this.fromformatWW,
        Createdby:this.userInfo?.name
      }; */
      let payload = {
        payload: {
          workweek: this.fromformatWW,
          Createdby: this.userInfo?.name,
        },
      };
      this.dataSvc.UtilizationApi(payload).subscribe((res) => {
        if (res) {
          this.boardList = res;
          this.formatStructure();
          /*  this.toastrService.success(
            'Planned vs Actual Data Added Successfully',
            'Success!'
          );
          this.getBoardList(); */
          this.labwiseChartLoader = true;
        }
      });
    }
  }
  /* calculate total */
  arrayLength: any = 54;
  totalTempValueList: any;
  calculateTotalFromComponent() {
    debugger;
    this.totalTempValueList = Array.from({ length: this.arrayLength }, () => 0);
    this.tableData.forEach((element, index) => {
      let total = 0;
      element.forEach((ele, ind) => {
        if (
          ele.properties != 'Program' &&
          ele.properties != 'Sku' &&
          ele.properties != 'Team' &&
          ele.properties != 'Vendor' &&
          ele.properties != 'Action'
        ) {
          this.totalTempValueList[ind] += parseInt(ele.value);
        }
        //  this.totalTempValueList[ind] += total;
      });
    });
    console.log(this.totalTempValueList);
  }
  calculateTotal(column: string) {
    let total = 0;
    this.tableData.forEach((element) => {
      element.forEach((ele) => {
        if (ele.properties == column) {
          total += parseInt(ele.value);
        }
      });
    });

    return total;
  }
  calculateTotalMonth(column: string, valueName: string) {
    let total = 0;
    this.tableData.forEach((element) => {
      element.forEach((ele) => {
        if (ele.properties == column && ele.valueName == valueName) {
          total += parseInt(ele.value);
        }
      });
    });

    return total;
  }
  onRowTotalBoardCount(rowIndex: number, colIndex: number): void {
    debugger;
    /* calculate totalboard value */
    /*  let sumAllMonthList = [];
    this.columns.forEach((element) => {
      let sumAllMonth = 0;
      this.tableData[rowIndex].forEach((ele) => {
        if (element == ele.properties) {
          sumAllMonth += parseInt(ele.value);
        }
      });
      sumAllMonthList.push(sumAllMonth);
      console.log('sumAllMonth', sumAllMonth);
    }); */
    /* calculate max */
    /*  const maxNumber = sumAllMonthList.reduce(
      (max, current) => (current > max ? current : max),
      sumAllMonthList[0]
    );

    console.log('maxNumber', maxNumber);
    if (this.tableData[rowIndex][4]?.properties == 'TotalBoard') {
      this.tableData[rowIndex][4].value = maxNumber;
    } */
    this.tableData[rowIndex][9].value =
      (
        (this.tableData[rowIndex][8].value /
          this.tableData[rowIndex][7].value) *
        100
      ).toFixed(2) + '%';
  }
  onRowUtilizationPercentage(rowIndex: number, colIndex: number): void {
    debugger;
    this.tableData[rowIndex][10].value =
      (
        (this.tableData[rowIndex][8].value / this.tableData.length) *
        100
      ).toFixed(2) + '%';
  }
  userDetails: any;
  getUserDetails(allocatitedTo, rowIndex, colIndex) {
    /*     let flag = this.checkUserExists();
    if (this.modal.user === '' || this.modal.user === undefined) {
      this.alertService.showWarning(
        'Kindly enter WWID/Email/Username to search.'
      );
    } else { */
    /* if (flag) { */
    if (!/^\d+$/.test(allocatitedTo.trim())) {
      var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
      if (format.test(allocatitedTo.trim())) {
        var obj = {
          type: 'CorporateEmailTxt',
          values: allocatitedTo.trim(),
        };
      } else {
        var obj = {
          type: 'FullNm',
          values: allocatitedTo.trim(),
        };
      }
    }
    if (/^\d+$/.test(allocatitedTo.trim())) {
      var obj = {
        type: 'Wwid',
        values: allocatitedTo.trim(),
      };
    }
    this.labwiseChartLoader = false;
    this.dataSvc.getUserDetails(obj).subscribe((res) => {
      if (res['name'] === null || res['name'] === undefined) {
        this.labwiseChartLoader = true;
        this.toastrService.success(
          'No users found with entered details, Kindly enter correct details!',
          'Success!'
        );
        /*  this.alertService.showWarning(
          'No users found with entered details, Kindly enter correct details!'
        ); */
      } else {
        this.labwiseChartLoader = true;
        this.userDetails = res;
        this.tableData[rowIndex][colIndex].value = res['name'];
        // this.allocatitedTo = res['name'];
      }
      //  this.loadRoles();
    });
  }
  updateWorkWeek(workWeek, rowIndex, colIndex) {
    debugger;
    this.tableData[rowIndex][colIndex].value = this.fromworkweek;
  }

  DeleteAllRow() {
    if (this.fromformatWW == '') {
      this.toastrService.warning('Please select Work Week & Year', 'Warning');
    } else {
      this.labwiseChartLoader = false;
      /* let payload = {
        workweek: this.fromformatWW,
        Createdby:this.userInfo?.name
      }; */
      let payload = {
        workweek: this.fromformatWW,
        DeletedBy: this.userInfo?.name,
      };
      this.dataSvc.UtilizationApiDelete(payload).subscribe((res) => {
        if (res) {
          this.toastrService.success(
            'Planned vs Actual Data Deleted Successfully',
            'Success!'
          );
          this.boardList = res;
          /* this.AddRow();*/
          this.formatStructure();
          /*this.getBoardList(); */
          this.labwiseChartLoader = true;
        }
      });
    }
  }
}

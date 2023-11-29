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
@Component({
  selector: 'app-lab-efficiency-utilization',
  templateUrl: './lab-efficiency-utilization.component.html',
  styleUrls: ['./lab-efficiency-utilization.component.scss'],
})
export class LabEfficiencyUtilizationComponent implements OnInit {
  constructor(
    private dataSvc: SummaryService,
    private toastrService: ToastrService,
    private exportService1: ExportService
  ) {}
  labwiseChartLoader = true;

  ngAfterViewInit() {
    this.chartdiv();
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

    // Add scrollbar
    // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    chart.set(
      'scrollbarX',
      am5.Scrollbar.new(root, {
        orientation: 'horizontal',
      })
    );
    let data = [
      {
        LAB_Name: 'CRD02',
        Planned_Utlization: '225.5',
        Actual_Utlization: '182.5',
        Utilization: '80.93',
      },
      {
        LAB_Name: 'CRD04',
        Planned_Utlization: '174.5',
        Actual_Utlization: '171.5',
        Utilization: '98.28',
      },
      {
        LAB_Name: 'CRD05',
        Planned_Utlization: '32',
        Actual_Utlization: '24',
        Utilization: '75',
      },
      {
        LAB_Name: 'CRD11',
        Planned_Utlization: '136.5',
        Actual_Utlization: '103.5',
        Utilization: '75.82',
      },
      {
        LAB_Name: 'CRD14',
        Planned_Utlization: '58',
        Actual_Utlization: '58',
        Utilization: '100',
      },
      {
        LAB_Name: 'CRD-15',
        Planned_Utlization: '20',
        Actual_Utlization: '18',
        Utilization: '90',
      },
      {
        LAB_Name: 'SRR2-CCG1',
        Planned_Utlization: '112',
        Actual_Utlization: '83',
        Utilization: '74.11',
      },
      {
        LAB_Name: 'SRR3-CCG - RF CHAMBER(7 th Floor)',
        Planned_Utlization: '18',
        Actual_Utlization: '18',
        Utilization: '100',
      },
      {
        LAB_Name: 'SRR4 9 Floor Mega LAB',
        Planned_Utlization: '39',
        Actual_Utlization: '13.5',
        Utilization: '34.62',
      },
      {
        LAB_Name: 'SRR2-CCG1(New)',
        Planned_Utlization: '6',
        Actual_Utlization: '6',
        Utilization: '100',
      },
      {
        LAB_Name: 'ECO-EC4-2B(2nd Floor)',
        Planned_Utlization: '100',
        Actual_Utlization: '43',
        Utilization: '43',
      },
    ];

    /* let data = [
      {
        year: '2016',
        income: 23.5,
        expenses: 21.1,
      },
      {
        year: '2017',
        income: 26.2,
        expenses: 30.5,
      },
      {
        year: '2018',
        income: 30.1,
        expenses: 34.9,
      },
      {
        year: '2019',
        income: 29.5,
        expenses: 31.1,
      },
      {
        year: '2020',
        income: 30.6,
        expenses: 28.2,
        strokeSettings: {
          stroke: chart.get('colors').getIndex(1),
          strokeWidth: 3,
          strokeDasharray: [5, 5],
        },
      },
      {
        year: '2021',
        income: 34.1,
        expenses: 32.9,
        columnSettings: {
          strokeWidth: 1,
          strokeDasharray: [5],
          fillOpacity: 0.2,
        },
        info: '(projection)',
      },
    ]; */

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let xRenderer = am5xy.AxisRendererX.new(root, {});
    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: 'LAB_Name',
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
        extraMax: 0.1,
        renderer: am5xy.AxisRendererY.new(root, {
          strokeOpacity: 0.1,
        }),
      })
    );

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/

    let series1 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'Actual_Utlization',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'Actual_Utlization',
        categoryXField: 'LAB_Name',
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: 'horizontal',
          labelText: '{name} in {categoryX}: {valueY}',
        }),
      })
    );

    series1.columns.template.setAll({
      tooltipY: am5.percent(10),
      templateField: 'columnSettings',
    });

    series1.data.setAll(data);

    /* let series2 = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: 'Expenses',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'expenses',
        categoryXField: 'LAB_Name',
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: 'horizontal',
          labelText: '{name} in {categoryX}: {valueY} {info}',
        }),
      })
    );

    series2.strokes.template.setAll({
      strokeWidth: 3,
      templateField: 'strokeSettings',
    });

    series2.data.setAll(data);

    series2.bullets.push(function () {
      return am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, {
          strokeWidth: 3,
          stroke: series2.get('stroke'),
          radius: 5,
          fill: root.interfaceColors.get('background'),
        }),
      });
    }); */

    chart.set('cursor', am5xy.XYCursor.new(root, {}));

    // Add legend
    // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
    let legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
      })
    );
    legend.data.setAll(chart.series.values);

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 100);
    series1.appear();
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
  typeChart = 'WorkWeek chart';
  Options(status: any) {
    if (status == 'Allocation') {
      this.typeChart = 'Location chart';
    } else if (status == 'Deallocation') {
      this.typeChart = 'Program chart';
    } else if (status == 'WorkWeek') {
      this.typeChart = 'WorkWeek chart';
    }
  }

  WorkWeekSummaryList: any;
  /* API call get WorkWeekSummary list */
  getWorkWeekSummaryList() {
    this.labwiseChartLoader = false;
    this.dataSvc.getWorkWeekSummary().subscribe((res) => {
      if (res) {
        debugger;
        this.WorkWeekSummaryList = res;
        this.formatStructure();
        this.labwiseChartLoader = true;
      }
    });
  }
  tableData: any = [];
  tempList: any[] = [];
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
  /* re structure  wrk week summary list*/
  formatStructure() {
    debugger;
    this.tableData = [];
    this.tempList = [];
    let finalValue = 0;
    for (let key in this.WorkWeekSummaryList) {
      if (this.WorkWeekSummaryList[key].length > 0) {
        this.WorkWeekSummaryList[key].forEach((element) => {
          finalValue += element?.BenchData.length;
        });
        this.WorkWeekSummaryList[key].forEach((element) => {
          this.tableData.push(element);
        });
      } else if (this.WorkWeekSummaryList[key].length == 0) {
       // finalValue = 0;
      }
      this.tempList.push({
        category: key.slice(0, -4),
        value: finalValue,
        subdata: {
          category: key.slice(0, -4),
          value: finalValue,
          report: this.WorkWeekSummaryList[key],
        },
      });
    }
    console.log("data",this.tempList);
    this.WorkWeekSummaryChart();
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
      maxWidth:100
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

  ngOnInit(): void {
    this.getWorkWeekSummaryList();
  }
}

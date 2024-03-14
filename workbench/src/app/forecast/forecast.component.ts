import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Inject,
} from '@angular/core';
import { SummaryService } from '../shared/service';
import { any, find } from '@amcharts/amcharts5/.internal/core/util/Array';
import { ToastrService } from 'ngx-toastr';
// amCharts imports
// import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { Chart } from '@amcharts/amcharts5';
import * as am5plugins_exporting from '@amcharts/amcharts5/plugins/exporting';
import { fitAngleToRange } from '@amcharts/amcharts5/.internal/core/util/Math';
import * as am5percent from '@amcharts/amcharts5/percent';
import html2canvas from 'html2canvas';

// amCharts imports
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

import { ExcelService } from '../shared/excel.service';
import * as XLSX from 'xlsx';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { ExportService } from '../shared/export.service';
type AOA = any[][];
@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss'],
})
export class ForecastComponent implements OnInit {
  modalReference: any;
  yearList;
  preSelectedYear;
  preSelectedYearRVP;
  preSelectedQuarterRVP;
  preSelectedForecastTableSummary;
  preSelectedYearAddForecast;
  preSelectedQuarterRVPOptionList = 'Total';
  QuarterRVPOptionList = ['Total', 'Average'];
  preSelectedCompOptionList = 'Total';
  CompOptionList = ['Total', 'Average', 'Lowest'];
  elementRef: ElementRef;
  @ViewChild('myTable') myTable: ElementRef;
  constructor(
    private dataSvc: SummaryService,
    private toastrService: ToastrService,
    private excelService: ExcelService,
    private modalService: NgbModal,
    @Inject(ElementRef) elementRef: ElementRef,
    public activeModal: NgbActiveModal,
    private ExportService: ExportService,
    private ExcelService: ExcelService
  ) {
    // Get the current year
    this.preSelectedYear = new Date().getFullYear();
    this.preSelectedYearRVP = new Date().getFullYear();
    this.preSelectedQuarterRVP = new Date().getFullYear();
    this.preSelectedForecastTableSummary = new Date().getFullYear();
    this.preSelectedYearAddForecast = new Date().getFullYear();
    // Create an array of years from 2010 to the current year
    this.yearList = [];
    /* for (let year = 2023; year <= this.preSelectedYear; year++) {
      this.yearList.push(year);
    } */
    /* API call get year list */
    this.labwiseChartLoader = false;
    this.dataSvc.getYearList().subscribe((res) => {
      if (res) {
        for (let key in res) {
          this.yearList.push(Number(key));
        }
        this.labwiseChartLoader = true;
      }
    });
    console.log(this.yearList);
    this.elementRef = elementRef;
  }
  addForecastYearList = [2020, 2021, 2022, 2023, 2024, 2025, 2026];
  programList: any;
  skuList: any;
  vendorList: any;
  teamList: any;
  boardList: any;
  @ViewChild('chartdiv') contentToCapture!: ElementRef;
  @ViewChild('canvas') canvas!: ElementRef;
  private imageBlob: Blob | null = null;
  copyImageToolTip: any = 'Copy Image';
  copyCanvasToClipboard() {
    if (this.imageBlob) {
      const clipboardItem = new ClipboardItem({ 'image/png': this.imageBlob });

      // Use the Clipboard API to write the Blob to the clipboard
      navigator.clipboard
        .write([clipboardItem])
        .then(() => {
          console.log('Canvas copied to clipboard');
          this.copyImageToolTip = 'Copied';
          setTimeout(() => {
            this.copyImageToolTip = 'Copy Image';
          }, 3000);
        })
        .catch((err) => {
          console.error('Failed to copy canvas to clipboard', err);
        });
    } else {
      console.warn('No canvas content to copy. Capture the canvas first.');
    }
  }

  copyclipboard() {
    debugger;
    const content = this.contentToCapture.nativeElement;
    const canvasElement = this.canvas.nativeElement;

    html2canvas(content).then((canvas) => {
      // Clear previous content
      const ctx = canvasElement.getContext('2d');
      ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);

      // Draw the captured canvas onto the provided canvas element
      canvasElement.width = canvas.width;
      canvasElement.height = canvas.height;
      ctx.drawImage(canvas, 0, 0);

      // Store the canvas content as a Blob
      canvas.toBlob((blob) => {
        this.imageBlob = blob;
        this.copyCanvasToClipboard();
      });
    });
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
  labwiseChartLoader = false;
  /* API call get board list */
  getBoardList() {
    this.labwiseChartLoader = false;
    let payload = {
      year: this.preSelectedYearAddForecast,
    };
    this.dataSvc.getBoard(payload).subscribe((res) => {
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
  /*  benchDemand() {
    this.dataSvc.getBoard().subscribe((res) => {
      if (res) {
        this.boardList = res;
        this.formatStructure();
        this.labwiseChartLoader = true;
      }
    });
  } */
  /* allocated api call */
  allocatedAPICall_no_data_available = false;
  allocatedList;
  allocatedAPICall() {
    this.labwiseChartLoader = false;
    let payload = {
      year: this.preSelectedYear,
      Program: this.preSelectedprogramListSummary,
      Sku: this.preSelectedSKUListSummary,
    };
    this.dataSvc.allocatedAPICall(payload).subscribe((res) => {
      if (res) {
        this.allocatedList = res;
        if (this.allocatedList[this.preSelectedYear].length == 0) {
          this.allocatedAPICall_no_data_available = true;
        } else if (this.allocatedList[this.preSelectedYear].length > 0) {
          this.allocatedAPICall_no_data_available = false;
        }
        this.allocatedList[this.preSelectedYear].forEach((element) => {
          element['Ramp'] = element.intel + element.ODC;
        });
        this.chartdiv();
        this.labwiseChartLoader = true;
      }
    });
  }
  /* download forecast summary */
  downloadForecastSummary() {
    this.ExportService.downloadForecastSummary(
      this.allocatedList[this.preSelectedYear],
      'Forecast Summary Data'
    );
    /* this.excelService.downloadExcel(
      this.allocatedList[this.preSelectedYear],
      'Forecast Summary Data'
    ); */
  }
  /* rvp ramp yearly data API call */
  rvpYearList;
  rvpYear_no_data_available = false;
  rvpYear() {
    this.labwiseChartLoader = false;
    let payload = {
      year: this.preSelectedYear,
      Program: this.preSelectedprogramListSummary,
      Sku: this.preSelectedSKUListSummary,
    };
    this.dataSvc.rvpYearAPICall(payload).subscribe((res) => {
      if (res) {
        this.rvpYearList = res;
        if (this.rvpYearList[this.preSelectedYear].length == 0) {
          this.rvpYear_no_data_available = true;
        } else if (this.rvpYearList[this.preSelectedYear].length > 0) {
          this.rvpYear_no_data_available = false;
        }
        this.chartdiv2();
        this.labwiseChartLoader = true;
      }
    });
  }

  /* download rvp ramp yearly data */
  downloadRvpYear() {
    this.ExportService.downloadRvpYear(
      this.rvpYearList[this.preSelectedYear],
      'RVP Ramp Forecast Data'
    );
    /*  this.excelService.downloadExcel(
      this.rvpYearList[this.preSelectedYear],
      'RVP Ramp Forecast Data'
    ); */
  }

  /* rvp ramp quarterly data API call */
  rvpQuarterList;
  rvpQuarterList_no_data_available = false;
  rvpQuarter() {
    this.labwiseChartLoader = false;
    let payload = {
      year: this.preSelectedYear,
      Program: this.preSelectedprogramListSummary,
      Sku: this.preSelectedSKUListSummary,
    };
    this.dataSvc.rvpQuarterAPICall(payload).subscribe((res) => {
      if (res) {
        this.rvpQuarterList = res;
        if (this.rvpQuarterList[this.preSelectedYear].length == 0) {
          this.rvpQuarterList_no_data_available = true;
        } else if (this.rvpQuarterList[this.preSelectedYear].length > 0) {
          this.rvpQuarterList_no_data_available = false;
        }
        this.chartdiv1();
        this.labwiseChartLoader = true;
      }
    });
  }

  /* download rvp ramp quarterly data */
  downloadRvpRampQuarterly() {
    if (this.preSelectedQuarterRVPOptionList == 'Total') {
      this.ExportService.downloadRvpRampQuarterly(
        this.rvpQuarterList[this.preSelectedQuarterRVP],
        'RVP Forecast Quarterly Split Data',
        'Total'
      );
    } else if (this.preSelectedQuarterRVPOptionList == 'Average') {
      this.ExportService.downloadRvpRampQuarterly(
        this.rvpQuarterList[this.preSelectedQuarterRVP],
        'RVP Forecast Quarterly Split Data',
        'Average'
      );
    }
    /* this.excelService.downloadExcel(
      this.rvpQuarterList[this.preSelectedQuarterRVP],
      'RVP Forecast Quarterly Split Data'
    ); */
  }

  /* forecast Table Summary API call*/
  forecastTableSummaryList;
  forecastTableSummary() {
    this.labwiseChartLoader = false;
    let payload = {
      year: this.preSelectedYear,
      Program: this.preSelectedprogramListSummary,
      Sku: this.preSelectedSKUListSummary,
    };
    this.dataSvc.forecastTableSummary(payload).subscribe((res) => {
      if (res) {
        this.forecastTableSummaryList = res[this.preSelectedYear];
        this.forecastTableSummaryList.map(
          (data) => (data['GAP_Demand'] = data['GAP/Demand'])
        );
        this.labwiseChartLoader = true;
      }
    });
  }

  /* download forecast Table Summary data */
  downloadForecastTableSummaryList() {
    this.ExportService.downloadForecastTableSummaryList(
      this.forecastTableSummaryList,
      'Bench & Rack Demand @ Intel & ODC Data'
    );
  }

  onItemSelected() {
    this.programListForcastSummary();
    this.preSelectedprogramListSummary = 'All';
    this.allocatedAPICall();
    this.rvpYear();
    this.rvpQuarter();
    this.forecastTableSummary();
  }
  onItemSelectedrvpYear() {
    //  this.rvpYear();
  }
  onItemSelectedrvpQuarter() {
    // this.rvpQuarter();
  }
  onItemSelectedforecastTableSummary() {
    // this.forecastTableSummary();
  }
  onItemSelectedAddForecast() {
    this.getBoardList();
    this.searchProgram = '';
    this.searchSku = '';
    this.searchTeam = '';
    this.searchVendor = '';
    this.hideTestTrendSearchProgram();
    this.hideTestTrendSearchProgramSKU();
    this.hideTestTrendSearchTeam();
    this.hideTestTrendSearchVendor();
  }
  /* comapre tab year change event */
  preSelectedYearCompareFrom = '';
  preSelectedYearCompareTo = '';
  /*  onItemSelectedCompareFrom() {
    this.compareAllocateFrom(this.preSelectedYearCompareFrom);
  }
  onItemSelectedCompareTo() {
    this.compareAllocateTo(this.preSelectedYearCompareTo);
  } */
  clickEventComapreButton() {
    if (this.preSelectedYearCompareFrom != this.preSelectedYearCompareTo) {
      this.compareAllocateFrom(this.preSelectedYearCompareFrom);
      this.compareAllocateTo(this.preSelectedYearCompareTo);
      this.forecastTableSummaryFrom();
      this.forecastTableSummaryTo();
      this.programListForcastComaprision('All');
    } else {
      this.toastrService.warning('Please select different year', 'Warning');
    }
  }
  /* download forecast Table Summary data From*/
  downloadForecastTableSummaryListFrom() {
    this.ExportService.downloadForecastTableSummaryList(
      this.forecastTableSummaryListFrom,
      'Bench & Rack Demand @ Intel & ODC Data ' +
        this.preSelectedYearCompareFrom
    );
  }
  /* forecast Table Summary API call from*/
  forecastTableSummaryListFrom;
  forecastTableSummaryFrom() {
    this.labwiseChartLoader = false;
    let payload = {
      year: this.preSelectedYearCompareFrom,
      Program: this.preSelectedprogramListComparison,
      Sku: this.preSelectedSKUListComparison,
    };
    this.dataSvc.forecastTableSummary(payload).subscribe((res) => {
      if (res) {
        this.forecastTableSummaryListFrom =
          res[this.preSelectedYearCompareFrom];
        this.forecastTableSummaryListFrom.map(
          (data) => (data['GAP_Demand'] = data['GAP/Demand'])
        );
        this.labwiseChartLoader = true;
      }
    });
  }
  /* download forecast Table Summary data To*/
  downloadForecastTableSummaryListTo() {
    this.ExportService.downloadForecastTableSummaryList(
      this.forecastTableSummaryListTo,
      'Bench & Rack Demand @ Intel & ODC Data ' + this.preSelectedYearCompareTo
    );
  }
  /* forecast Table Summary API call To*/
  forecastTableSummaryListTo;
  forecastTableSummaryTo() {
    this.labwiseChartLoader = false;
    let payload = {
      year: this.preSelectedYearCompareTo,
      Program: this.preSelectedprogramListComparison,
      Sku: this.preSelectedSKUListComparison,
    };
    this.dataSvc.forecastTableSummary(payload).subscribe((res) => {
      if (res) {
        this.forecastTableSummaryListTo = res[this.preSelectedYearCompareTo];
        this.forecastTableSummaryListTo.map(
          (data) => (data['GAP_Demand'] = data['GAP/Demand'])
        );
        this.labwiseChartLoader = true;
      }
    });
  }
  fromAllocatedList;
  compareAllocateFrom(param) {
    this.labwiseChartLoader = false;
    let payload = {
      year: param,
      Program: this.preSelectedprogramListComparison,
      Sku: this.preSelectedSKUListComparison,
    };
    this.dataSvc.allocatedAPICall(payload).subscribe((res) => {
      if (res) {
        this.fromAllocatedList = res;
        this.formatComparisonData();
        this.comparisonChart();
        this.comparisonChartYearWise();
        this.labwiseChartLoader = true;
      }
    });
  }
  toAllocatedList;
  compareAllocateTo(param) {
    this.labwiseChartLoader = false;
    let payload = {
      year: param,
      Program: this.preSelectedprogramListComparison,
      Sku: this.preSelectedSKUListComparison,
    };
    this.dataSvc.allocatedAPICall(payload).subscribe((res) => {
      if (res) {
        this.toAllocatedList = res;
        this.formatComparisonData();
        this.comparisonChart();
        this.comparisonChartYearWise();
        this.labwiseChartLoader = true;
      }
    });
  }
  ngModelChangeComp() {
    if (this.preSelectedCompOptionList != '') {
      this.preSelectedCompOptionList = this.preSelectedCompOptionList;
      this.formatComparisonData();
      this.comparisonChartYearWise();
    }
  }
  /* format data for chart */
  formatedComparisonData = [];
  formatedComparisonYearData = [];
  formatComparisonData() {
    debugger;
    if (
      this.fromAllocatedList[this.preSelectedYearCompareFrom]?.length > 0 &&
      this.toAllocatedList[this.preSelectedYearCompareTo]?.length > 0
    ) {
      this.formatedComparisonData = [];
      this.formatedComparisonYearData = [];
      let fromYearTotalIntel = 0;
      let fromYearTotalODC = 0;
      let toYearTotalIntel = 0;
      let toYearTotalODC = 0;
      /* month wise data creation */
      this.fromAllocatedList[this.preSelectedYearCompareFrom].forEach(
        (element, index) => {
          let obj = {};
          obj['category'] = element.category;
          obj[this.preSelectedYearCompareFrom + '_' + 'intel'] = element.intel;
          obj[this.preSelectedYearCompareTo + '_' + 'intel'] =
            this.toAllocatedList[this.preSelectedYearCompareTo][index].intel;
          obj[this.preSelectedYearCompareFrom + '_' + 'ODC'] = element.ODC;
          obj[this.preSelectedYearCompareTo + '_' + 'ODC'] =
            this.toAllocatedList[this.preSelectedYearCompareTo][index].ODC;
          obj[this.preSelectedYearCompareFrom + '_' + 'Ramp'] =
            element.intel + element.ODC;
          obj[this.preSelectedYearCompareTo + '_' + 'Ramp'] =
            this.toAllocatedList[this.preSelectedYearCompareTo][index].intel +
            this.toAllocatedList[this.preSelectedYearCompareTo][index].ODC;
          /* fromYearTotal += element.intel + element.ODC;
          toYearTotal +=
            this.toAllocatedList[this.preSelectedYearCompareTo][index].intel +
            this.toAllocatedList[this.preSelectedYearCompareTo][index].ODC; */
          fromYearTotalIntel += element.intel;
          fromYearTotalODC += element.ODC;
          toYearTotalIntel +=
            this.toAllocatedList[this.preSelectedYearCompareTo][index].intel;
          toYearTotalODC +=
            this.toAllocatedList[this.preSelectedYearCompareTo][index].ODC;
          this.formatedComparisonData.push(obj);
        }
      );
      /* year data creation */
      if (this.preSelectedCompOptionList == 'Total') {
        /* let objYear = {};
        objYear['category'] = this.preSelectedYearCompareFrom.toString();
        objYear['value'] = this.fromAllocatedList?.TotalBoard;
        this.formatedComparisonYearData.push(objYear);
        objYear = {};
        objYear['category'] = this.preSelectedYearCompareTo.toString();
        objYear['value'] = this.toAllocatedList?.TotalBoard;
        this.formatedComparisonYearData.push(objYear);
        console.log('Year Data', this.formatedComparisonYearData);
        console.log('Data', this.formatedComparisonData); */
        let objYear = {};
        objYear['category'] = this.preSelectedYearCompareFrom.toString();
        objYear['intel'] = this.formatedComparisonData.reduce(
          (max, obj) =>
            obj[this.preSelectedYearCompareFrom + '_' + 'intel'] > max
              ? obj[this.preSelectedYearCompareFrom + '_' + 'intel']
              : max,
          -Infinity
        );
        objYear['ODC'] = this.formatedComparisonData.reduce(
          (max, obj) =>
            obj[this.preSelectedYearCompareFrom + '_' + 'ODC'] > max
              ? obj[this.preSelectedYearCompareFrom + '_' + 'ODC']
              : max,
          -Infinity
        );
        this.formatedComparisonYearData.push(objYear);
        objYear = {};
        objYear['category'] = this.preSelectedYearCompareTo.toString();
        objYear['intel'] = this.formatedComparisonData.reduce(
          (max, obj) =>
            obj[this.preSelectedYearCompareTo + '_' + 'intel'] > max
              ? obj[this.preSelectedYearCompareTo + '_' + 'intel']
              : max,
          -Infinity
        );
        objYear['ODC'] = this.formatedComparisonData.reduce(
          (max, obj) =>
            obj[this.preSelectedYearCompareTo + '_' + 'ODC'] > max
              ? obj[this.preSelectedYearCompareTo + '_' + 'ODC']
              : max,
          -Infinity
        );
        this.formatedComparisonYearData.push(objYear);
      } else if (this.preSelectedCompOptionList == 'Average') {
        let objYear = {};
        objYear['category'] = this.preSelectedYearCompareFrom.toString();
        //objYear['value'] = Math.round(fromYearTotal / 12);
        objYear['intel'] = Math.round(fromYearTotalIntel / 12);
        objYear['ODC'] = Math.round(fromYearTotalODC / 12);
        this.formatedComparisonYearData.push(objYear);
        objYear = {};
        objYear['category'] = this.preSelectedYearCompareTo.toString();
        // objYear['value'] = Math.round(toYearTotal / 12);
        objYear['intel'] = Math.round(toYearTotalIntel / 12);
        objYear['ODC'] = Math.round(toYearTotalODC / 12);
        this.formatedComparisonYearData.push(objYear);
        console.log('Year Data', this.formatedComparisonYearData);
        console.log('Data', this.formatedComparisonData);
      } else if (this.preSelectedCompOptionList == 'Lowest') {
        let fromYearList = [];
        let toYearList = [];
        this.formatedComparisonData.forEach((element) => {
          fromYearList.push(
            element[this.preSelectedYearCompareFrom + '_' + 'Ramp']
          );
          toYearList.push(
            element[this.preSelectedYearCompareTo + '_' + 'Ramp']
          );
        });
        /* let objYear = {};
        objYear['category'] = this.preSelectedYearCompareFrom.toString();
        objYear['value'] = Math.min(...fromYearList);
        this.formatedComparisonYearData.push(objYear);
        objYear = {};
        objYear['category'] = this.preSelectedYearCompareTo.toString();
        objYear['value'] = Math.min(...toYearList);
        this.formatedComparisonYearData.push(objYear); */
        let objYear = {};
        objYear['category'] = this.preSelectedYearCompareFrom.toString();
        objYear['intel'] = this.formatedComparisonData.reduce(
          (min, obj) =>
            obj[this.preSelectedYearCompareFrom + '_' + 'intel'] < min
              ? obj[this.preSelectedYearCompareFrom + '_' + 'intel']
              : min,
          Infinity
        );
        objYear['ODC'] = this.formatedComparisonData.reduce(
          (min, obj) =>
            obj[this.preSelectedYearCompareFrom + '_' + 'ODC'] < min
              ? obj[this.preSelectedYearCompareFrom + '_' + 'ODC']
              : min,
          Infinity
        );
        this.formatedComparisonYearData.push(objYear);
        objYear = {};
        objYear['category'] = this.preSelectedYearCompareTo.toString();
        objYear['intel'] = this.formatedComparisonData.reduce(
          (min, obj) =>
            obj[this.preSelectedYearCompareTo + '_' + 'intel'] < min
              ? obj[this.preSelectedYearCompareTo + '_' + 'intel']
              : min,
          Infinity
        );
        objYear['ODC'] = this.formatedComparisonData.reduce(
          (min, obj) =>
            obj[this.preSelectedYearCompareTo + '_' + 'ODC'] < min
              ? obj[this.preSelectedYearCompareTo + '_' + 'ODC']
              : min,
          Infinity
        );
        this.formatedComparisonYearData.push(objYear);
        console.log('Year Data', this.formatedComparisonYearData);
        console.log('Data', this.formatedComparisonData);
      }
      debugger;
    }
  }
  /* YOY Comparison chart year wise */
  comparisonChartYearWise() {
    this.showComparisonChart = true;
    am5.array.each(am5.registry.rootElements, function (root) {
      if (root?.dom.id == 'chartdiv5') {
        root.dispose();
      }
    });
    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    let root = am5.Root.new('chartdiv5');
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
    chart.get('colors').set('step', 5);
    // Add scrollbar
    // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    /* chart.set(
      'scrollbarX',
      am5.Scrollbar.new(root, {
        orientation: 'horizontal',
      })
    ); */

    let data = this.formatedComparisonYearData;

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let xRenderer = am5xy.AxisRendererX.new(root, {
      //  minorGridEnabled: true,
      /* cellStartLocation: 0.1,
      cellEndLocation: 0.9,
      maxWidth: 100, */
      minGridDistance: 20,
    });
    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: 'category',
        renderer: xRenderer,
        // tooltip: am5.Tooltip.new(root, {}),
      })
    );

    xRenderer.grid.template.setAll({
      location: 1,
    });

    xAxis.data.setAll(data);

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        //  max: 100,
        //  numberFormat: "#'%'",
        //strictMinMax: true,
        calculateTotals: true,
        renderer: am5xy.AxisRendererY.new(root, {
          strokeOpacity: 0.1,
        }),
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

    //Export chart
    let exporting = am5plugins_exporting.Exporting.new(root, {
      menu: am5plugins_exporting.ExportingMenu.new(root, {}),
    });

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    /* function makeSeries(name, fieldName, stacked, color) { */
    function makeSeries(name, fieldName, stacked, color) {
      let series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: name,
          stacked: stacked,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: fieldName,
          //  valueYShow: 'valueYTotalPercent',
          categoryXField: 'category',
          sequencedInterpolation: true,
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: 'horizontal',
            // labelText: '{name}, {categoryX}:{valueY}',
            labelText: '{name} : {valueY}',
          }),
        })
      );

      series.columns.template.setAll({
        /* tooltipText:
          "{name}, {categoryX}:{valueYTotalPercent.formatNumber('#.#')}%", */
        tooltipText: '{name} : {valueY}',
        width: am5.percent(90),
        //  tooltipY: am5.percent(10),
        fill: am5.color(color),
        stroke: am5.color(color),
      });
      series.data.setAll(data);

      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      series.appear();

      series.bullets.push(function () {
        return am5.Bullet.new(root, {
          sprite: am5.Label.new(root, {
            text: '{valueY}',
            fill: root.interfaceColors.get('alternativeText'),
            centerY: am5.p50,
            centerX: am5.p50,
            populateText: true,
          }),
        });
      });

      legend.data.push(series);
    }

    makeSeries('Intel', 'intel', false, '#5b9bd5');
    makeSeries('ODC', 'ODC', true, '#3db13d');
    /*  makeSeries(
      this.preSelectedYearCompareTo + ' ' + 'Intel',
      this.preSelectedYearCompareTo + '_' + 'intel',
      false,
      '#5b9bd5'
    );
    makeSeries(
      this.preSelectedYearCompareTo + ' ' + 'ODC',
      this.preSelectedYearCompareTo + '_' + 'ODC',
      true,
      '#3db13d'
    ); */

    /*  let series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'Year',
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
    series.data.setAll(data); */

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    /*  series.appear();

    series.bullets.push(function () {
      return am5.Bullet.new(root, {
        sprite: am5.Label.new(root, {
          text: '{valueY}',
          fill: root.interfaceColors.get('alternativeText'),
          centerY: am5.p50,
          centerX: am5.p50,
          populateText: true,
        }),
      });
    });

    legend.data.push(series); */
    /*  }

    makeSeries('Year', 'value', false, '#5b9bd5'); */
    // makeSeries(this.preSelectedYearCompareTo, 'value', false, '#ed7d31');

    chart.set('cursor', am5xy.XYCursor.new(root, {}));
    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 100);
  }
  /* Summary get program list */
  programListForcastSummary() {
    this.labwiseChartLoader = false;
    let payload = {
      year: this.preSelectedYear,
    };
    this.dataSvc.programListForcastSummary(payload).subscribe((res: any) => {
      if (res) {
        this.programListForecast = res;
        this.labwiseChartLoader = true;
      }
    });
  }
  /* YOY Comparison get program list */
  programListComparisonAll;
  programListForcastComaprision(selectedSKu) {
    this.labwiseChartLoader = false;
    let payload = {
      fromyear: this.preSelectedYearCompareFrom,
      toyear: this.preSelectedYearCompareTo,
      Program: this.preSelectedprogramListComparison,
      Sku: selectedSKu,
    };
    this.dataSvc
      .programListForcastComaprision(payload)
      .subscribe((res: any) => {
        if (res) {
          this.programListComparison = res;
          if (this.preSelectedprogramListComparison == 'All') {
            this.programListComparisonAll = this.programListComparison?.Program;
          }
          this.labwiseChartLoader = true;
        }
      });
  }
  programListForecast;
  programListComparison;
  preSelectedprogramListComparison = 'All';
  preSelectedSKUListComparison = 'All';
  preSelectedprogramListSummary = 'All';
  preSelectedSKUListSummary = 'All';
  onItemProgramSelectedSummary() {
    this.preSelectedSKUListSummary = 'All';
    this.allocatedAPICall();
    this.rvpYear();
    this.rvpQuarter();
    this.forecastTableSummary();
    this.getSKUList(this.preSelectedprogramListSummary);
  }
  onItemSKUSelectedSummary() {
    this.allocatedAPICall();
    this.rvpYear();
    this.rvpQuarter();
    this.forecastTableSummary();
  }
  onItemProgramSelectedComparison() {
    if (this.preSelectedYearCompareFrom != this.preSelectedYearCompareTo) {
      this.preSelectedSKUListComparison = 'All';
      this.programListForcastComaprision(this.preSelectedSKUListComparison);
      this.compareAllocateFrom(this.preSelectedYearCompareFrom);
      this.compareAllocateTo(this.preSelectedYearCompareTo);
      this.forecastTableSummaryFrom();
      this.forecastTableSummaryTo();
      this.allYearSummary();
    } else {
      this.toastrService.warning('Please select different year', 'Warning');
    }
  }
  onItemSkuSelectedComparison() {
    if (this.preSelectedYearCompareFrom != this.preSelectedYearCompareTo) {
      // this.programListForcastComaprision(this.preSelectedSKUListComparison);
      this.compareAllocateFrom(this.preSelectedYearCompareFrom);
      this.compareAllocateTo(this.preSelectedYearCompareTo);
      this.forecastTableSummaryFrom();
      this.forecastTableSummaryTo();
      this.allYearSummary();
    } else {
      this.toastrService.warning('Please select different year', 'Warning');
    }
  }
  /* YOY Comparison chart month wise */
  showComparisonChart = false;
  comparisonChart() {
    this.showComparisonChart = true;
    am5.array.each(am5.registry.rootElements, function (root) {
      if (root?.dom.id == 'chartdiv4') {
        root.dispose();
      }
    });
    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    let root = am5.Root.new('chartdiv4');
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
    chart.get('colors').set('step', 5);
    var scrollbarX = am5.Scrollbar.new(root, {
      orientation: 'horizontal',
    });

    chart.set('scrollbarX', scrollbarX);
    chart.bottomAxesContainer.children.push(scrollbarX);
    //Export chart
    am5plugins_exporting.Exporting.new(root, {
      menu: am5plugins_exporting.ExportingMenu.new(root, {}),
    });
    // Add scrollbar
    // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    /* chart.set(
      'scrollbarX',
      am5.Scrollbar.new(root, {
        orientation: 'horizontal',
      })
    ); */

    let data = this.formatedComparisonData;

    /* let data = [
      {
        year: '2021',
        europe: 2.5,
        namerica: 2.5,
        asia: 2.1,
        lamerica: 1,
        meast: 0.8,
        africa: 0.4,
      },
      {
        year: '2022',
        europe: 2.6,
        namerica: 2.7,
        asia: 2.2,
        lamerica: 0.5,
        meast: 0.4,
        africa: 0.3,
      },
      {
        year: '2023',
        europe: 2.8,
        namerica: 2.9,
        asia: 2.4,
        lamerica: 0.3,
        meast: 0.9,
        africa: 0.5,
      },
    ]; */

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let xRenderer = am5xy.AxisRendererX.new(root, {
      //  minorGridEnabled: true,
      cellStartLocation: 0.1,
      cellEndLocation: 0.9,
      maxWidth: 100,
      minGridDistance: 20,
    });
    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: 'category',
        renderer: xRenderer,
        // tooltip: am5.Tooltip.new(root, {}),
      })
    );

    xRenderer.grid.template.setAll({
      location: 1,
    });

    xAxis.data.setAll(data);

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        //  max: 100,
        //  numberFormat: "#'%'",
        //strictMinMax: true,
        calculateTotals: true,
        renderer: am5xy.AxisRendererY.new(root, {
          strokeOpacity: 0.1,
        }),
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

    //Export chart
    let exporting = am5plugins_exporting.Exporting.new(root, {
      menu: am5plugins_exporting.ExportingMenu.new(root, {}),
    });

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    function makeSeries(name, fieldName, stacked, color) {
      let series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: name,
          stacked: stacked,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: fieldName,
          //  valueYShow: 'valueYTotalPercent',
          categoryXField: 'category',
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: 'horizontal',
            // labelText: '{name}, {categoryX}:{valueY}',
            labelText: '{name} : {valueY}',
          }),
        })
      );

      series.columns.template.setAll({
        /* tooltipText:
          "{name}, {categoryX}:{valueYTotalPercent.formatNumber('#.#')}%", */
        tooltipText: '{name} : {valueY}',
        width: am5.percent(90),
        tooltipY: am5.percent(10),
        fill: am5.color(color),
        stroke: am5.color(color),
      });
      series.data.setAll(data);

      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      series.appear();

      series.bullets.push(function () {
        return am5.Bullet.new(root, {
          sprite: am5.Label.new(root, {
            text: '{valueY}',
            fill: root.interfaceColors.get('alternativeText'),
            centerY: am5.p50,
            centerX: am5.p50,
            populateText: true,
          }),
        });
      });

      legend.data.push(series);
    }

    makeSeries(
      this.preSelectedYearCompareFrom + ' ' + 'Intel',
      this.preSelectedYearCompareFrom + '_' + 'intel',
      false,
      '#5b9bd5'
    );
    makeSeries(
      this.preSelectedYearCompareFrom + ' ' + 'ODC',
      this.preSelectedYearCompareFrom + '_' + 'ODC',
      true,
      '#3db13d'
    );
    makeLineSeries(
      this.preSelectedYearCompareFrom + ' ' + 'Ramp',
      this.preSelectedYearCompareFrom + '_' + 'Ramp'
    );
    makeSeries(
      this.preSelectedYearCompareTo + ' ' + 'Intel',
      this.preSelectedYearCompareTo + '_' + 'intel',
      false,
      '#5b9bd5'
    );
    makeSeries(
      this.preSelectedYearCompareTo + ' ' + 'ODC',
      this.preSelectedYearCompareTo + '_' + 'ODC',
      true,
      '#3db13d'
    );
    function makeLineSeries(name, value) {
      /* preSelectedYearCompareFrom Ramp series line */
      let seriesIntel = chart.series.push(
        am5xy.LineSeries.new(root, {
          /* minBulletDistance: 10, */
          name: name,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: value,
          categoryXField: 'category',
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: 'horizontal',
            //labelText: '{name}, {categoryX}:{valueY}',
            labelText: '{name} : {valueY}',
          }),
        })
      );

      seriesIntel.strokes.template.setAll({
        strokeWidth: 3,
        stroke: am5.color(0xd7a700),
      });

      seriesIntel.data.setAll(data);
      seriesIntel.appear(1000);
      seriesIntel.bullets.push(function () {
        return am5.Bullet.new(root, {
          sprite: am5.Circle.new(root, {
            radius: 6,
            fill: seriesIntel.get('fill'),
            stroke: root.interfaceColors.get('background'),
            strokeWidth: 2,
          }),
        });
      });
      legend.data.push(seriesIntel);
    }
    makeLineSeries(
      this.preSelectedYearCompareTo + ' ' + 'Ramp',
      this.preSelectedYearCompareTo + '_' + 'Ramp'
    );
    /*  makeSeries('Middle East', 'meast');
    makeSeries('Africa', 'africa'); */
    chart.set('cursor', am5xy.XYCursor.new(root, {}));
    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 100);
  }

  /* download forecast summary comparison */
  downloadForecastSummaryComparison() {
    this.ExportService.downloadForecastSummaryComparison(
      this.formatedComparisonData,
      'Forecast Summary Comparison Data',
      this.preSelectedYearCompareFrom,
      this.preSelectedYearCompareTo
    );
  }

  /* download forecast summary year comparison */
  downloadForecastSummaryYearComparison() {
    this.ExportService.downloadForecastSummaryYearComparison(
      this.formatedComparisonYearData,
      'Forecast Summary Comparison Yearly Data'
    );
  }

  ngAfterViewInit() {
    this.programListForcastSummary();
    this.preSelectedprogramListSummary = 'All';
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

    var scrollbarX = am5.Scrollbar.new(root, {
      orientation: 'horizontal',
    });

    chart.set('scrollbarX', scrollbarX);
    chart.bottomAxesContainer.children.push(scrollbarX);

    //Export chart
    let exporting = am5plugins_exporting.Exporting.new(root, {
      menu: am5plugins_exporting.ExportingMenu.new(root, {}),
    });
    let data = this.allocatedList[this.preSelectedYear];

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
        //  tooltip: am5.Tooltip.new(root, {}),
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

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    function makeSeries(name, fieldName, color, tooltipTxt) {
      let series = chart.series.push(
        tooltipTxt == ''
          ? am5xy.ColumnSeries.new(root, {
              name: name,
              stacked: true,
              xAxis: xAxis,
              yAxis: yAxis,
              valueYField: fieldName,
              categoryXField: 'category',
              /*  tooltip: am5.Tooltip.new(root, {
            pointerOrientation: 'horizontal',
            // labelText: '{name}, {categoryX}:{valueY}',
            labelText: tooltipTxt,
          }), */
            })
          : am5xy.ColumnSeries.new(root, {
              name: name,
              stacked: true,
              xAxis: xAxis,
              yAxis: yAxis,
              valueYField: fieldName,
              categoryXField: 'category',
              tooltip: am5.Tooltip.new(root, {
                pointerOrientation: 'horizontal',
                // labelText: '{name}, {categoryX}:{valueY}',
                labelText: tooltipTxt,
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
      let series = chart.series.push(
        am5xy.LineSeries.new(root, {
          /* minBulletDistance: 10, */
          name: 'Ramp',
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: 'Ramp',
          categoryXField: 'category',
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: 'horizontal',
            //labelText: '{name}, {categoryX}:{valueY}',
            labelText: '{name} : {valueY}',
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

    makeSeries(
      'Intel',
      'intel',
      '#5b9bd5',
      '[font-size:14px;color:white] Bench : {Total_Bench_Intel} \n Rack :{Total_Rack_Intel}'
    );
    /*  makeSeries(
      'ODC',
      'ODC',
      '#3db13d',
      '[font-size:14px;color:white] Bench : {Bench_Demand_ODC} \n Rack :{Rack_Demand_ODC}'
    ); */
    makeSeries('ODC', 'ODC', '#3db13d', '');
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
  ngModelChangeQuarter() {
    if (this.preSelectedQuarterRVPOptionList != '') {
      this.preSelectedQuarterRVPOptionList =
        this.preSelectedQuarterRVPOptionList;
      this.chartdiv1();
    }
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
    chart.get('colors').set('step', 8);
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
    let data = this.rvpQuarterList[this.preSelectedYear];
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
        // tooltip: am5.Tooltip.new(root, {}),
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

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    function makeSeries(name, fieldName, color, tooltipTxt) {
      let series = chart.series.push(
        tooltipTxt == ''
          ? am5xy.ColumnSeries.new(root, {
              name: name,
              stacked: true,
              xAxis: xAxis,
              yAxis: yAxis,
              valueYField: fieldName,
              categoryXField: 'category',
              /* tooltip: am5.Tooltip.new(root, {
            pointerOrientation: 'horizontal',
            // labelText: '{name}, {categoryX}:{valueY}',
            // labelText: '{name} : {valueY}',
            labelText: tooltipTxt,
          }), */
            })
          : am5xy.ColumnSeries.new(root, {
              name: name,
              stacked: true,
              xAxis: xAxis,
              yAxis: yAxis,
              valueYField: fieldName,
              categoryXField: 'category',
              tooltip: am5.Tooltip.new(root, {
                pointerOrientation: 'horizontal',
                // labelText: '{name}, {categoryX}:{valueY}',
                // labelText: '{name} : {valueY}',
                labelText: tooltipTxt,
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
            // labelText: '{name}, {categoryX}:{valueY}',
            labelText: '{name} : {valueY}',
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
    if (this.preSelectedQuarterRVPOptionList == 'Total') {
      makeSeries(
        'Intel',
        'intel',
        '#5b9bd5',
        '[font-size:14px;color:white] Bench : {Total_Bench_Intel} \n Rack : {Total_Rack_Intel}'
      );
      /*  makeSeries(
        'ODC',
        'ODC',
        '#3db13d',
        '[font-size:14px;color:white] Bench : {Bench_Demand_ODC} \n Rack :{Rack_Demand_ODC}'
      ); */
      makeSeries('ODC', 'ODC', '#3db13d', '');
    } else if (this.preSelectedQuarterRVPOptionList == 'Average') {
      makeSeries(
        'Intel',
        'intel_average_value',
        '#5b9bd5',
        '{name} : {valueY}'
      );
      makeSeries('ODC', 'ODC_average_value', '#3db13d', '{name} : {valueY}');
    }

    // let paretoAxisRenderer = am5xy.AxisRendererY.new(root, { opposite: true });
    // let paretoAxis = chart.yAxes.push(
    //   am5xy.ValueAxis.new(root, {
    //     renderer: paretoAxisRenderer,
    //     min: 0,
    //     /*     max: 100,
    //     strictMinMax: true, */
    //   })
    // );

    // paretoAxisRenderer.grid.template.set('forceHidden', true);
    // paretoAxis.set('numberFormat', "#'%");
    // if (this.preSelectedQuarterRVPOptionList == 'Total') {
    //   // pareto series
    //   let paretoSeries = chart.series.push(
    //     am5xy.LineSeries.new(root, {
    //       name: 'Intel %',
    //       xAxis: xAxis,
    //       yAxis: paretoAxis,
    //       valueYField: 'intel_percentage',
    //       categoryXField: 'category',
    //       tooltip: am5.Tooltip.new(root, {
    //         pointerOrientation: 'horizontal',
    //         //  labelText: '{name}, {categoryX} : {valueY}%',
    //         labelText: '{name} : {valueY}%',
    //       }),
    //       /*  stroke: root.interfaceColors.get('alternativeBackground'),
    //         maskBullets: false, */
    //     })
    //   );
    //   paretoSeries.strokes.template.setAll({
    //     strokeWidth: 3,
    //     stroke: paretoSeries.get('fill'),
    //   });
    //   paretoSeries.bullets.push(function () {
    //     return am5.Bullet.new(root, {
    //       locationY: 1,
    //       sprite: am5.Circle.new(root, {
    //         radius: 5,
    //         fill: paretoSeries.get('fill'),
    //         stroke: root.interfaceColors.get('background'),
    //       }),
    //     });
    //   });
    //   paretoSeries.data.setAll(data);
    //   legend.data.push(paretoSeries);

    //   // pareto series1
    //   let paretoSeries1 = chart.series.push(
    //     am5xy.LineSeries.new(root, {
    //       name: 'ODC %',
    //       xAxis: xAxis,
    //       yAxis: paretoAxis,
    //       valueYField: 'ODC_percentage',
    //       categoryXField: 'category',
    //       tooltip: am5.Tooltip.new(root, {
    //         pointerOrientation: 'horizontal',
    //         // labelText: '{name}, {categoryX} : {valueY}%',
    //         labelText: '{name} : {valueY}%',
    //       }),
    //       /*  stroke: root.interfaceColors.get('alternativeBackground'),
    //     maskBullets: false, */
    //     })
    //   );
    //   paretoSeries1.strokes.template.setAll({
    //     strokeWidth: 3,
    //     stroke: paretoSeries1.get('fill'),
    //   });
    //   paretoSeries1.bullets.push(function () {
    //     return am5.Bullet.new(root, {
    //       locationY: 1,
    //       sprite: am5.Circle.new(root, {
    //         radius: 5,
    //         fill: paretoSeries1.get('fill'),
    //         stroke: root.interfaceColors.get('background'),
    //       }),
    //     });
    //   });
    //   paretoSeries1.data.setAll(data);
    //   legend.data.push(paretoSeries1);
    //   paretoSeries.appear(1000);
    //   paretoSeries1.appear(1000);
    // } else if (this.preSelectedQuarterRVPOptionList == 'Average') {
    //   // pareto series
    //   let paretoSeries2 = chart.series.push(
    //     am5xy.LineSeries.new(root, {
    //       name: 'Intel %',
    //       xAxis: xAxis,
    //       yAxis: paretoAxis,
    //       valueYField: 'intel_average_percentage',
    //       categoryXField: 'category',
    //       tooltip: am5.Tooltip.new(root, {
    //         pointerOrientation: 'horizontal',
    //         //  labelText: '{name}, {categoryX} : {valueY}%',
    //         labelText: '{name} : {valueY}%',
    //       }),
    //       /*  stroke: root.interfaceColors.get('alternativeBackground'),
    //         maskBullets: false, */
    //     })
    //   );
    //   paretoSeries2.strokes.template.setAll({
    //     strokeWidth: 3,
    //     stroke: paretoSeries2.get('fill'),
    //   });
    //   paretoSeries2.bullets.push(function () {
    //     return am5.Bullet.new(root, {
    //       locationY: 1,
    //       sprite: am5.Circle.new(root, {
    //         radius: 5,
    //         fill: paretoSeries2.get('fill'),
    //         stroke: root.interfaceColors.get('background'),
    //       }),
    //     });
    //   });
    //   paretoSeries2.data.setAll(data);
    //   legend.data.push(paretoSeries2);

    //   // pareto series1
    //   let paretoSeries3 = chart.series.push(
    //     am5xy.LineSeries.new(root, {
    //       name: 'ODC %',
    //       xAxis: xAxis,
    //       yAxis: paretoAxis,
    //       valueYField: 'ODC_average_percentage',
    //       categoryXField: 'category',
    //       tooltip: am5.Tooltip.new(root, {
    //         pointerOrientation: 'horizontal',
    //         // labelText: '{name}, {categoryX} : {valueY}%',
    //         labelText: '{name} : {valueY}%',
    //       }),
    //       /*  stroke: root.interfaceColors.get('alternativeBackground'),
    //     maskBullets: false, */
    //     })
    //   );
    //   paretoSeries3.strokes.template.setAll({
    //     strokeWidth: 3,
    //     stroke: paretoSeries3.get('fill'),
    //   });
    //   paretoSeries3.bullets.push(function () {
    //     return am5.Bullet.new(root, {
    //       locationY: 1,
    //       sprite: am5.Circle.new(root, {
    //         radius: 5,
    //         fill: paretoSeries3.get('fill'),
    //         stroke: root.interfaceColors.get('background'),
    //       }),
    //     });
    //   });
    //   paretoSeries3.data.setAll(data);
    //   legend.data.push(paretoSeries3);
    //   paretoSeries2.appear(1000);
    //   paretoSeries3.appear(1000);
    // }
    //  makeLineSeries();
    /*  makeSeries('Asia', 'asia');
    makeSeries('Latin America', 'lamerica');
    makeSeries('Middle East', 'meast');
    makeSeries('Africa', 'africa'); */
    chart.set('cursor', am5xy.XYCursor.new(root, {}));
    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    // series2.appear(1000, 100);
    /*  paretoSeries.appear(1000);
    paretoSeries1.appear(1000); */
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
    chart.get('colors').set('step', 5);
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
    let data = this.rvpYearList[this.preSelectedYear];

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
        // tooltip: am5.Tooltip.new(root, {}),
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

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    function makeSeries(name, fieldName, color, tooltipTxt) {
      let series = chart.series.push(
        tooltipTxt == ''
          ? am5xy.ColumnSeries.new(root, {
              name: name,
              stacked: true,
              xAxis: xAxis,
              yAxis: yAxis,
              valueYField: fieldName,
              categoryXField: 'category',
            })
          : am5xy.ColumnSeries.new(root, {
              name: name,
              stacked: true,
              xAxis: xAxis,
              yAxis: yAxis,
              valueYField: fieldName,
              categoryXField: 'category',
              tooltip: am5.Tooltip.new(root, {
                pointerOrientation: 'horizontal',
                //  labelText: '{name}, {categoryX}:{valueY}',
                // labelText: '{name} : {valueY}',
                labelText: tooltipTxt,
                /* labelText: '{name}', */
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
      /* Ramp line series */
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
            //labelText: '{name}, {categoryX}:{valueY}',
            labelText: '{name} : {valueY}',
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

    makeSeries(
      'Intel Bench',
      'Bench_Demand_Intel',
      '#5b9bd5',
      '[font-size:14px;color:white] Bench : {Total_Bench_Intel}'
    );
    makeSeries(
      'Intel Rack',
      'Rack_Demand_Intel',
      '#95c3ed',
      '[font-size:14px;color:white] Rack : {Total_Rack_Intel}'
    );
    makeSeries('ODC Bench', 'Bench_Demand_ODC', '#3db13d', '');
    makeSeries('ODC Rack', 'Rack_Demand_ODC', '#76cc76', '');
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
  roleName: any;
  ngOnInit(): void {
    this.labwiseChartLoader = false;
    /* API call get user info */
    this.dataSvc.GetUser().subscribe((res: any) => {
      console.log('userdeatils', res);
      this.userInfo = res;
      this.roleName = res?.Role;
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
    this.getSKUList('All');
    this.createHeadarColumns();
  }
  allYearSummaryList;
  allYearSummaryFormatedList = [];
  monthObjects: any;
  allYearXlHeader = ['Category'];
  allYearSummary() {
    this.labwiseChartLoader = false;
    let payload = {
      Program: this.preSelectedprogramListComparison,
      Sku: this.preSelectedSKUListComparison,
    };
    this.dataSvc.allYearSummary(payload).subscribe((res) => {
      if (res) {
        this.allYearSummaryList = res;
        debugger;
        const months = [
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

        this.monthObjects = [];

        for (const month of months) {
          const monthObject = {
            category: month,
          };
          this.monthObjects.push(monthObject);
        }
        this.allYearSummaryList.forEach((element) => {
          Object.keys(element).forEach((key) => {
            this.allYearXlHeader.push(key);
            element[key].forEach((ele) => {
              this.monthObjects.forEach((el) => {
                if (el.category == ele.category) {
                  el[key] = ele.Ramp_value;
                }
              });
            });
          });
        });
        this.allYearComparisonChart(this.monthObjects);
        this.labwiseChartLoader = true;
      }
    });
  }
  downloadForecastSummaryComparisonAllYear() {
    this.ExportService.downloadForecastSummaryComparisonAllYear(
      this.monthObjects,
      'Forecast Summary Comparison Data',
      this.allYearXlHeader
    );
    /*  this.ExcelService.exportAsExcelFile(
      this.monthObjects,
      'Forecast Summary Comparison Data'
    ); */
  }
  allYearComparisonChart(monthObjects: any) {
    am5.array.each(am5.registry.rootElements, function (root) {
      if (root?.dom.id == 'chartdiv6') {
        root.dispose();
      }
    });
    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    let root = am5.Root.new('chartdiv6');
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
    chart.get('colors').set('step', 7);
    var scrollbarX = am5.Scrollbar.new(root, {
      orientation: 'horizontal',
    });

    chart.set('scrollbarX', scrollbarX);
    chart.bottomAxesContainer.children.push(scrollbarX);
    //Export chart
    am5plugins_exporting.Exporting.new(root, {
      menu: am5plugins_exporting.ExportingMenu.new(root, {}),
    });
    // Add scrollbar
    // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    /* chart.set(
      'scrollbarX',
      am5.Scrollbar.new(root, {
        orientation: 'horizontal',
      })
    ); */

    let data = monthObjects;

    /* let data = [
      {
        year: '2021',
        europe: 2.5,
        namerica: 2.5,
        asia: 2.1,
        lamerica: 1,
        meast: 0.8,
        africa: 0.4,
      },
      {
        year: '2022',
        europe: 2.6,
        namerica: 2.7,
        asia: 2.2,
        lamerica: 0.5,
        meast: 0.4,
        africa: 0.3,
      },
      {
        year: '2023',
        europe: 2.8,
        namerica: 2.9,
        asia: 2.4,
        lamerica: 0.3,
        meast: 0.9,
        africa: 0.5,
      },
    ]; */

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let xRenderer = am5xy.AxisRendererX.new(root, {
      //  minorGridEnabled: true,
      cellStartLocation: 0.1,
      cellEndLocation: 0.9,
      maxWidth: 100,
      minGridDistance: 20,
    });
    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: 'category',
        renderer: xRenderer,
        // tooltip: am5.Tooltip.new(root, {}),
      })
    );

    xRenderer.grid.template.setAll({
      location: 1,
    });

    xAxis.data.setAll(data);

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        //  max: 100,
        //  numberFormat: "#'%'",
        //strictMinMax: true,
        calculateTotals: true,
        renderer: am5xy.AxisRendererY.new(root, {
          strokeOpacity: 0.1,
        }),
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

    //Export chart
    let exporting = am5plugins_exporting.Exporting.new(root, {
      menu: am5plugins_exporting.ExportingMenu.new(root, {}),
    });

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    function makeSeries(name, fieldName, stacked, color) {
      let series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: name,
          stacked: stacked,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: fieldName,
          //  valueYShow: 'valueYTotalPercent',
          categoryXField: 'category',
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: 'horizontal',
            // labelText: '{name}, {categoryX}:{valueY}',
            labelText: '{name} : {valueY}',
          }),
        })
      );

      series.columns.template.setAll({
        /* tooltipText:
          "{name}, {categoryX}:{valueYTotalPercent.formatNumber('#.#')}%", */
        tooltipText: '{name} : {valueY}',
        width: am5.percent(90),
        tooltipY: am5.percent(10),
        fill: am5.color(color),
        stroke: am5.color(color),
      });
      series.data.setAll(data);

      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      series.appear();

      series.bullets.push(function () {
        return am5.Bullet.new(root, {
          sprite: am5.Label.new(root, {
            text: '{valueY}',
            fill: root.interfaceColors.get('alternativeText'),
            centerY: am5.p50,
            centerX: am5.p50,
            populateText: true,
          }),
        });
      });

      legend.data.push(series);
    }

    /* makeSeries(
      this.preSelectedYearCompareFrom + ' ' + 'Intel',
      this.preSelectedYearCompareFrom + '_' + 'intel',
      false,
      '#5b9bd5'
    );
    makeSeries(
      this.preSelectedYearCompareFrom + ' ' + 'ODC',
      this.preSelectedYearCompareFrom + '_' + 'ODC',
      true,
      '#3db13d'
    ); */

    /* monthObjects.forEach((element) => { */
    Object.keys(monthObjects[0]).forEach((key) => {
      if (key != 'category') {
        makeLineSeries(key, key);
      }
    });
    /* }); */
    /*     makeSeries(
      this.preSelectedYearCompareTo + ' ' + 'Intel',
      this.preSelectedYearCompareTo + '_' + 'intel',
      false,
      '#5b9bd5'
    );
    makeSeries(
      this.preSelectedYearCompareTo + ' ' + 'ODC',
      this.preSelectedYearCompareTo + '_' + 'ODC',
      true,
      '#3db13d'
    ); */
    function makeLineSeries(name, value) {
      /* preSelectedYearCompareFrom Ramp series line */
      let seriesIntel = chart.series.push(
        am5xy.LineSeries.new(root, {
          /* minBulletDistance: 10, */
          name: name,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: value,
          categoryXField: 'category',
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: 'horizontal',
            //labelText: '{name}, {categoryX}:{valueY}',
            labelText: '{name} : {valueY}',
          }),
        })
      );

      seriesIntel.strokes.template.setAll({
        strokeWidth: 3,
        stroke: am5.color(0xd7a700),
      });

      seriesIntel.data.setAll(data);
      seriesIntel.appear(1000);
      seriesIntel.bullets.push(function () {
        return am5.Bullet.new(root, {
          sprite: am5.Circle.new(root, {
            radius: 6,
            fill: seriesIntel.get('fill'),
            stroke: root.interfaceColors.get('background'),
            strokeWidth: 2,
          }),
        });
      });
      seriesIntel.bullets.push(function () {
        return am5.Bullet.new(root, {
          locationX: 0.5,
          locationY: 1,
          sprite: am5.Label.new(root, {
            centerY: am5.p100,
            centerX: am5.p50,
            text: '{valueY}',
            fill: seriesIntel.get('fill'),
            populateText: true,
          }),
        });
      });

      legend.data.push(seriesIntel);
    }
    /* makeLineSeries(
      this.preSelectedYearCompareTo + ' ' + 'Ramp',
      this.preSelectedYearCompareTo + '_' + 'Ramp'
    ); */
    /*  makeSeries('Middle East', 'meast');
    makeSeries('Africa', 'africa'); */
    chart.set('cursor', am5xy.XYCursor.new(root, {}));
    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    chart.appear(1000, 100);
  }
  summarySKUList;
  getSKUList(program) {
    this.labwiseChartLoader = false;
    let payload = {
      year: this.preSelectedYear,
      Program: program,
    };
    this.dataSvc.getSKUList(payload).subscribe((res: any) => {
      if (res) {
        this.summarySKUList = res?.Sku;
        this.labwiseChartLoader = true;
      }
    });
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

  /* Tab selection */
  typeChart = 'Location chart';
  Options(status: any) {
    if (status == 'Allocation') {
      this.typeChart = 'Location chart';
      this.allocatedAPICall();
      this.rvpYear();
      this.rvpQuarter();
      this.forecastTableSummary();
    } else if (status == 'Deallocation') {
      this.typeChart = 'Program chart';
      this.getBoardList();
    } else if (status == 'YOY Comparison') {
      this.typeChart = 'YOY Comparison';
      this.allYearSummary();
      if (
        this.preSelectedYearCompareFrom != '' &&
        this.preSelectedYearCompareTo != ''
      ) {
        this.showComparisonChart = true;
      } else {
        this.showComparisonChart = false;
      }
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
  totalValueList = [];
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
      if (this.roleName == 'Admin') {
        this.tempList.push({
          value: 'Update',
          editing: false,
          properties: 'Action',
        });
      }
      this.tableData.push(this.tempList);
    });
    function isObject(variable) {
      return typeof variable === 'object' && variable !== null;
    }
    console.log(this.boardList);
    /* calculatue total value */
    this.totalValueList = [];
    this.calculateTotalFromComponent();
    /*  this.totalValueList.push(this.calculateTotal('TotalBoard'));

    this.totalValueList.push(
      this.calculateTotalMonth('January', 'boardsIntelBench')
    );
    this.totalValueList.push(
      this.calculateTotalMonth('January', 'boardIntelRack')
    );
    this.totalValueList.push(
      this.calculateTotalMonth('January', 'boardsODCBench')
    );
    this.totalValueList.push(
      this.calculateTotalMonth('January', 'boardsODCRack')
    );

    this.totalValueList.push(
      this.calculateTotalMonth('February', 'boardsIntelBench')
    );
    this.totalValueList.push(
      this.calculateTotalMonth('February', 'boardIntelRack')
    );
    this.totalValueList.push(
      this.calculateTotalMonth('February', 'boardsODCBench')
    );
    this.totalValueList.push(
      this.calculateTotalMonth('February', 'boardsODCRack')
    );

    this.totalValueList.push(
      this.calculateTotalMonth('March', 'boardsIntelBench')
    );
    this.totalValueList.push(
      this.calculateTotalMonth('March', 'boardIntelRack')
    );
    this.totalValueList.push(
      this.calculateTotalMonth('March', 'boardsODCBench')
    );
    this.totalValueList.push(
      this.calculateTotalMonth('March', 'boardsODCRack')
    );

    this.totalValueList.push(
      this.calculateTotalMonth('April', 'boardsIntelBench')
    );
    this.totalValueList.push(
      this.calculateTotalMonth('April', 'boardIntelRack')
    );
    this.totalValueList.push(
      this.calculateTotalMonth('April', 'boardsODCBench')
    );
    this.totalValueList.push(
      this.calculateTotalMonth('April', 'boardsODCRack')
    );

    this.totalValueList.push(
      this.calculateTotalMonth('May', 'boardsIntelBench')
    );
    this.totalValueList.push(this.calculateTotalMonth('May', 'boardIntelRack'));
    this.totalValueList.push(this.calculateTotalMonth('May', 'boardsODCBench'));
    this.totalValueList.push(this.calculateTotalMonth('May', 'boardsODCRack'));

    this.totalValueList.push(
      this.calculateTotalMonth('June', 'boardsIntelBench')
    );
    this.totalValueList.push(
      this.calculateTotalMonth('June', 'boardIntelRack')
    );
    this.totalValueList.push(
      this.calculateTotalMonth('June', 'boardsODCBench')
    );
    this.totalValueList.push(this.calculateTotalMonth('June', 'boardsODCRack'));

    this.totalValueList.push(
      this.calculateTotalMonth('July', 'boardsIntelBench')
    );
    this.totalValueList.push(
      this.calculateTotalMonth('July', 'boardIntelRack')
    );
    this.totalValueList.push(
      this.calculateTotalMonth('July', 'boardsODCBench')
    );
    this.totalValueList.push(this.calculateTotalMonth('July', 'boardsODCRack'));

    this.totalValueList.push(
      this.calculateTotalMonth('August', 'boardsIntelBench')
    );
    this.totalValueList.push(
      this.calculateTotalMonth('August', 'boardIntelRack')
    );
    this.totalValueList.push(
      this.calculateTotalMonth('August', 'boardsODCBench')
    );
    this.totalValueList.push(
      this.calculateTotalMonth('August', 'boardsODCRack')
    );

    this.totalValueList.push(
      this.calculateTotalMonth('September', 'boardsIntelBench')
    );
    this.totalValueList.push(
      this.calculateTotalMonth('September', 'boardIntelRack')
    );
    this.totalValueList.push(
      this.calculateTotalMonth('September', 'boardsODCBench')
    );
    this.totalValueList.push(
      this.calculateTotalMonth('September', 'boardsODCRack')
    );

    this.totalValueList.push(
      this.calculateTotalMonth('October', 'boardsIntelBench')
    );
    this.totalValueList.push(
      this.calculateTotalMonth('October', 'boardIntelRack')
    );
    this.totalValueList.push(
      this.calculateTotalMonth('October', 'boardsODCBench')
    );
    this.totalValueList.push(
      this.calculateTotalMonth('October', 'boardsODCRack')
    );

    this.totalValueList.push(
      this.calculateTotalMonth('November', 'boardsIntelBench')
    );
    this.totalValueList.push(
      this.calculateTotalMonth('November', 'boardIntelRack')
    );
    this.totalValueList.push(
      this.calculateTotalMonth('November', 'boardsODCBench')
    );
    this.totalValueList.push(
      this.calculateTotalMonth('November', 'boardsODCRack')
    );

    this.totalValueList.push(
      this.calculateTotalMonth('December', 'boardsIntelBench')
    );
    this.totalValueList.push(
      this.calculateTotalMonth('December', 'boardIntelRack')
    );
    this.totalValueList.push(
      this.calculateTotalMonth('December', 'boardsODCBench')
    );
    this.totalValueList.push(
      this.calculateTotalMonth('December', 'boardsODCRack')
    ); */
  }

  startEditingCell(rowIndex: number, colIndex: number): void {
    if (this.roleName == 'Admin') {
      this.tableData[rowIndex][colIndex].editing = true;
    }
  }

  onCellEditDone(rowIndex: number, colIndex: number): void {
    if (this.roleName == 'Admin') {
      this.tableData[rowIndex][colIndex].editing = false;
    }
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
    tempAddnewRow['year'] = this.preSelectedYearAddForecast;

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
      debugger;
      this.dataSvc.updateBoard(id, mergedObject).subscribe((res: any) => {
        if (res) {
          this.toastrService.success(res, 'Success!');
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
    tempAddnewRow['year'] = this.preSelectedYearAddForecast;

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
      this.dataSvc.addBoard(mergedObject).subscribe((res: any) => {
        if (res) {
          this.toastrService.success(res, 'Success!');
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
  /* show data from uploaded xl document */
  data: AOA = [[], []];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';
  theader: any;
  tbody: any;
  onFileChange(evt: any) {
    debugger;
    this.theader = [];
    this.tbody = [];
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>evt.target;
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOA>XLSX.utils.sheet_to_json(ws, { header: 1 });

      console.log('data:', this.data);
      this.data.map((res) => {
        if (res[0] === 'no') {
          console.log(res[0]);
        } else {
          console.log(res[0]);
        }
      });
      this.data.forEach((element, index) => {
        if (index <= 1) {
          this.theader.push(element);
        } else {
          this.tbody.push(element);
        }
      });
    };
    reader.readAsBinaryString(target.files[0]);
  }

  export(): void {
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

  // ***** open modal popup for upload forecast data ****** //
  UpdloadForecastDataPopUp(addmodal: any) {
    this.modalReference = this.modalService.open(addmodal, {
      size: 'xl',
      backdrop: 'static',
    });
  }
  /* save xl data */
  saveXLData() {
    debugger;
    this.labwiseChartLoader = false;
    const tableElement = this.myTable.nativeElement as HTMLTableElement;
    const elementById = tableElement.querySelector('#myTable');
    // const table = this.dataTable.nativeElement as HTMLTableElement;

    const headers = Array.from(tableElement.querySelectorAll('thead th')).map(
      (header) => header.textContent?.trim()
    );
    // Use slice to get the last 52 elements
    const newArray = headers.slice(-53);

    // 'newArray' now contains the last 52 elements of 'originalArray'
    console.log(newArray);

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
    const rows = Array.from(tableElement.querySelectorAll('tbody tr')).map(
      (row) => {
        const rowData = Array.from(row.querySelectorAll('td')).map((cell) =>
          cell.textContent?.trim()
        );
        return newArray.reduce((acc, header, index) => {
          acc = {
            createdBy: this.userInfo?.name,
            createdDate: formattedDateTime,
            modifiedBy: '',
            modifiedDate: '',
            deletedBy: '',
            deletedDate: '',
            isdeleted: false,
            year: this.preSelectedYearAddForecast,
            Program: rowData?.[0],
            Team: rowData?.[2],
            Vendor: rowData?.[3],
            TotalBoard:
              rowData?.[4] == ''
                ? 0
                : rowData?.[4] == undefined
                ? 0
                : rowData?.[4],
            Sku: rowData?.[1],
            January: {
              boardsIntelBench:
                rowData?.[5] == ''
                  ? 0
                  : rowData?.[5] == undefined
                  ? 0
                  : rowData?.[5],
              boardIntelRack:
                rowData?.[6] == ''
                  ? 0
                  : rowData?.[6] == undefined
                  ? 0
                  : rowData?.[6],
              boardsODCBench:
                rowData?.[7] == ''
                  ? 0
                  : rowData?.[7] == undefined
                  ? 0
                  : rowData?.[7],
              boardsODCRack:
                rowData?.[8] == ''
                  ? 0
                  : rowData?.[8] == undefined
                  ? 0
                  : rowData?.[8],
            },
            February: {
              boardsIntelBench:
                rowData?.[9] == ''
                  ? 0
                  : rowData?.[9] == undefined
                  ? 0
                  : rowData?.[9],
              boardIntelRack:
                rowData?.[10] == ''
                  ? 0
                  : rowData?.[10] == undefined
                  ? 0
                  : rowData?.[10],
              boardsODCBench:
                rowData?.[11] == ''
                  ? 0
                  : rowData?.[11] == undefined
                  ? 0
                  : rowData?.[11],
              boardsODCRack:
                rowData?.[12] == ''
                  ? 0
                  : rowData?.[12] == undefined
                  ? 0
                  : rowData?.[12],
            },
            March: {
              boardsIntelBench:
                rowData?.[13] == ''
                  ? 0
                  : rowData?.[13] == undefined
                  ? 0
                  : rowData?.[13],
              boardIntelRack:
                rowData?.[14] == ''
                  ? 0
                  : rowData?.[14] == undefined
                  ? 0
                  : rowData?.[14],
              boardsODCBench:
                rowData?.[15] == ''
                  ? 0
                  : rowData?.[15] == undefined
                  ? 0
                  : rowData?.[15],
              boardsODCRack:
                rowData?.[16] == ''
                  ? 0
                  : rowData?.[16] == undefined
                  ? 0
                  : rowData?.[16],
            },
            April: {
              boardsIntelBench:
                rowData?.[17] == ''
                  ? 0
                  : rowData?.[17] == undefined
                  ? 0
                  : rowData?.[17],
              boardIntelRack:
                rowData?.[18] == ''
                  ? 0
                  : rowData?.[18] == undefined
                  ? 0
                  : rowData?.[18],
              boardsODCBench:
                rowData?.[19] == ''
                  ? 0
                  : rowData?.[19] == undefined
                  ? 0
                  : rowData?.[19],
              boardsODCRack:
                rowData?.[20] == ''
                  ? 0
                  : rowData?.[20] == undefined
                  ? 0
                  : rowData?.[20],
            },
            May: {
              boardsIntelBench:
                rowData?.[21] == ''
                  ? 0
                  : rowData?.[21] == undefined
                  ? 0
                  : rowData?.[21],
              boardIntelRack:
                rowData?.[22] == ''
                  ? 0
                  : rowData?.[22] == undefined
                  ? 0
                  : rowData?.[22],
              boardsODCBench:
                rowData?.[23] == ''
                  ? 0
                  : rowData?.[23] == undefined
                  ? 0
                  : rowData?.[23],
              boardsODCRack:
                rowData?.[24] == ''
                  ? 0
                  : rowData?.[24] == undefined
                  ? 0
                  : rowData?.[24],
            },
            June: {
              boardsIntelBench:
                rowData?.[25] == ''
                  ? 0
                  : rowData?.[25] == undefined
                  ? 0
                  : rowData?.[25],
              boardIntelRack:
                rowData?.[26] == ''
                  ? 0
                  : rowData?.[26] == undefined
                  ? 0
                  : rowData?.[26],
              boardsODCBench:
                rowData?.[27] == ''
                  ? 0
                  : rowData?.[27] == undefined
                  ? 0
                  : rowData?.[27],
              boardsODCRack:
                rowData?.[28] == ''
                  ? 0
                  : rowData?.[28] == undefined
                  ? 0
                  : rowData?.[28],
            },
            July: {
              boardsIntelBench:
                rowData?.[29] == ''
                  ? 0
                  : rowData?.[29] == undefined
                  ? 0
                  : rowData?.[29],
              boardIntelRack:
                rowData?.[30] == ''
                  ? 0
                  : rowData?.[30] == undefined
                  ? 0
                  : rowData?.[30],
              boardsODCBench:
                rowData?.[31] == ''
                  ? 0
                  : rowData?.[31] == undefined
                  ? 0
                  : rowData?.[31],
              boardsODCRack:
                rowData?.[32] == ''
                  ? 0
                  : rowData?.[32] == undefined
                  ? 0
                  : rowData?.[32],
            },
            August: {
              boardsIntelBench:
                rowData?.[33] == ''
                  ? 0
                  : rowData?.[33] == undefined
                  ? 0
                  : rowData?.[33],
              boardIntelRack:
                rowData?.[34] == ''
                  ? 0
                  : rowData?.[34] == undefined
                  ? 0
                  : rowData?.[34],
              boardsODCBench:
                rowData?.[35] == ''
                  ? 0
                  : rowData?.[35] == undefined
                  ? 0
                  : rowData?.[35],
              boardsODCRack:
                rowData?.[36] == ''
                  ? 0
                  : rowData?.[36] == undefined
                  ? 0
                  : rowData?.[36],
            },
            September: {
              boardsIntelBench:
                rowData?.[37] == ''
                  ? 0
                  : rowData?.[37] == undefined
                  ? 0
                  : rowData?.[37],
              boardIntelRack:
                rowData?.[38] == ''
                  ? 0
                  : rowData?.[38] == undefined
                  ? 0
                  : rowData?.[38],
              boardsODCBench:
                rowData?.[39] == ''
                  ? 0
                  : rowData?.[39] == undefined
                  ? 0
                  : rowData?.[39],
              boardsODCRack:
                rowData?.[40] == ''
                  ? 0
                  : rowData?.[40] == undefined
                  ? 0
                  : rowData?.[40],
            },
            October: {
              boardsIntelBench:
                rowData?.[41] == ''
                  ? 0
                  : rowData?.[41] == undefined
                  ? 0
                  : rowData?.[41],
              boardIntelRack:
                rowData?.[42] == ''
                  ? 0
                  : rowData?.[42] == undefined
                  ? 0
                  : rowData?.[42],
              boardsODCBench:
                rowData?.[43] == ''
                  ? 0
                  : rowData?.[43] == undefined
                  ? 0
                  : rowData?.[43],
              boardsODCRack:
                rowData?.[44] == ''
                  ? 0
                  : rowData?.[44] == undefined
                  ? 0
                  : rowData?.[44],
            },
            November: {
              boardsIntelBench:
                rowData?.[45] == ''
                  ? 0
                  : rowData?.[45] == undefined
                  ? 0
                  : rowData?.[45],
              boardIntelRack:
                rowData?.[46] == ''
                  ? 0
                  : rowData?.[46] == undefined
                  ? 0
                  : rowData?.[46],
              boardsODCBench:
                rowData?.[47] == ''
                  ? 0
                  : rowData?.[47] == undefined
                  ? 0
                  : rowData?.[47],
              boardsODCRack:
                rowData?.[48] == ''
                  ? 0
                  : rowData?.[48] == undefined
                  ? 0
                  : rowData?.[48],
            },
            December: {
              boardsIntelBench:
                rowData?.[49] == ''
                  ? 0
                  : rowData?.[49] == undefined
                  ? 0
                  : rowData?.[49],
              boardIntelRack:
                rowData?.[50] == ''
                  ? 0
                  : rowData?.[50] == undefined
                  ? 0
                  : rowData?.[50],
              boardsODCBench:
                rowData?.[51] == ''
                  ? 0
                  : rowData?.[51] == undefined
                  ? 0
                  : rowData?.[51],
              boardsODCRack:
                rowData?.[52] == ''
                  ? 0
                  : rowData?.[52] == undefined
                  ? 0
                  : rowData?.[52],
            },
          };
          // acc[header as string] = rowData?.[index];
          return acc;
        }, {});
      }
    );

    //const jsonData = JSON.stringify(rows, null, 2);
    // console.log(jsonData);
    this.calculateTotalBoard(rows);
    if (rows?.length > 0) {
      this.modalReference.close();
      this.dataSvc.uploadBoardData(rows).subscribe((res: any) => {
        if (res) {
          this.toastrService.success(res, 'Success!');
          this.getBoardList();
          this.labwiseChartLoader = true;
        }
      });
    }
  }

  calculateTotalBoard(rows) {
    debugger;
    /*  this.columns.forEach((element) => {
      let sumAllMonth = 0; */
    rows.forEach((ele) => {
      let sumAllMonthList = [];
      for (var key in ele) {
        if (ele.hasOwnProperty(key)) {
          this.columns.forEach((element) => {
            let sumAllMonth = 0;
            if (element == key) {
              sumAllMonth =
                parseInt(ele[key]?.boardIntelRack) +
                parseInt(ele[key]?.boardsIntelBench) +
                parseInt(ele[key]?.boardsODCBench) +
                parseInt(ele[key]?.boardsODCRack);

              sumAllMonthList.push(sumAllMonth);
            }
          });
        }
      }
      /* calculate max */
      const maxNumber = sumAllMonthList.reduce(
        (max, current) => (current > max ? current : max),
        sumAllMonthList[0]
      );

      console.log('maxNumber', maxNumber);
      ele.TotalBoard = maxNumber;
    });
    /*   }); */

    /* if (this.tableData[rowIndex][4]?.properties == 'TotalBoard') {
      this.tableData[rowIndex][4].value = maxNumber;
    } */
  }

  /* search filter for add forecast data*/
  searchText = '';
  searchLocation = '';
  searchProgram = '';
  searchVendor = '';
  searchSku = '';
  searchAllocated = '';
  searchfromWW = '';
  searchtoWW = '';
  searchBench = '';
  searchTeam = '';
  searchDuration = '';
  searchApprovedBy = '';
  searchBenchDetails = '';
  searchRemarks = '';
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
    this.searchRemarks = '';
  }

  tollTipRef: any;
  showTestTrendSearch(tollTip: any) {
    this.tollTipRef = tollTip;
    tollTip.open();
  }
  @ViewChild('ts2') ts2: NgbTooltip;
  hideTestTrendSearchProgram() {
    if (this.ts2) {
      this.ts2.close();
    }
  }
  @ViewChild('ts3') ts3: NgbTooltip;
  hideTestTrendSearchProgramSKU() {
    if (this.ts3) {
      this.ts3.close();
    }
  }
  @ViewChild('ts10') ts10: NgbTooltip;
  hideTestTrendSearchTeam() {
    if (this.ts10) {
      this.ts10.close();
    }
  }
  @ViewChild('ts4') ts4: NgbTooltip;
  hideTestTrendSearchVendor() {
    if (this.ts4) {
      this.ts4.close();
    }
  }

  hideTestTrendSearch() {
    this.tollTipRef.close();
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

  /* filter Data For table bottom Total Count */
  filterDataForTotalCount() {
    let filteredData = this.tableData;
    if (this.searchTeam != '') {
      // Use Array.prototype.filter to filter the nested array
      filteredData = filteredData.filter((item) => {
        return this.nestedSearchRecursiveTeam(item, this.searchTeam, 'value');
      });
    }
    if (this.searchProgram != '') {
      filteredData = filteredData.filter((item) => {
        return this.nestedSearchRecursiveProgram(
          item,
          this.searchProgram,
          'value'
        );
      });
    }
    if (this.searchSku != '') {
      filteredData = filteredData.filter((item) => {
        return this.nestedSearchRecursiveSku(item, this.searchSku, 'value');
      });
    }
    if (this.searchVendor != '') {
      filteredData = filteredData.filter((item) => {
        return this.nestedSearchRecursiveVendor(
          item,
          this.searchVendor,
          'value'
        );
      });
    }
    debugger;
    console.log(filteredData);
    /* calculate total count bottom of the table */
    this.totalTempValueList = Array.from({ length: this.arrayLength }, () => 0);
    filteredData.forEach((element, index) => {
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
  /* Team child search */
  nestedSearchRecursiveTeam(
    item: any,
    searchTerm: string,
    property: string
  ): boolean {
    if (
      item[property] &&
      item[property].toString().toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return true;
    }

    if (Array.isArray(item)) {
      for (const child of item) {
        if (child?.properties == 'Team') {
          if (this.nestedSearchRecursiveTeam(child, searchTerm, 'value')) {
            return true;
          }
        }
      }
    }

    return false;
  }
  /* Program child search */
  nestedSearchRecursiveProgram(
    item: any,
    searchTerm: string,
    property: string
  ): boolean {
    if (
      item[property] &&
      item[property].toString().toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return true;
    }

    if (Array.isArray(item)) {
      for (const child of item) {
        if (child?.properties == 'Program') {
          if (this.nestedSearchRecursiveProgram(child, searchTerm, 'value')) {
            return true;
          }
        }
      }
    }

    return false;
  }
  /* SKU child search */
  nestedSearchRecursiveSku(
    item: any,
    searchTerm: string,
    property: string
  ): boolean {
    if (
      item[property] &&
      item[property].toString().toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return true;
    }

    if (Array.isArray(item)) {
      for (const child of item) {
        if (child?.properties == 'Sku') {
          if (this.nestedSearchRecursiveSku(child, searchTerm, 'value')) {
            return true;
          }
        }
      }
    }

    return false;
  }
  /* vendor child search */
  nestedSearchRecursiveVendor(
    item: any,
    searchTerm: string,
    property: string
  ): boolean {
    if (
      item[property] &&
      item[property].toString().toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return true;
    }

    if (Array.isArray(item)) {
      for (const child of item) {
        if (child?.properties == 'Vendor') {
          if (this.nestedSearchRecursiveVendor(child, searchTerm, 'value')) {
            return true;
          }
        }
      }
    }

    return false;
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
    /* calculate totalboard value */
    let sumAllMonthList = [];
    this.columns.forEach((element) => {
      let sumAllMonth = 0;
      this.tableData[rowIndex].forEach((ele) => {
        if (element == ele.properties) {
          sumAllMonth += parseInt(ele.value);
        }
      });
      sumAllMonthList.push(sumAllMonth);
      console.log('sumAllMonth', sumAllMonth);
    });
    /* calculate max */
    const maxNumber = sumAllMonthList.reduce(
      (max, current) => (current > max ? current : max),
      sumAllMonthList[0]
    );

    console.log('maxNumber', maxNumber);
    if (this.tableData[rowIndex][4]?.properties == 'TotalBoard') {
      this.tableData[rowIndex][4].value = maxNumber;
    }

    /*  this.tableData[rowIndex].forEach((element) => {
      this.columns.forEach((ele) => {
        if (ele == element.properties) { */
    /*   for (const key in element[ele]) {
            if (element[ele].hasOwnProperty(key)) { */
    /* sumAllMonth += parseInt(element.value); */
    /* }
          } */
    /*    }
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
  }

  @ViewChild('table1') table: ElementRef;

  fireEvent() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(
      this.table.nativeElement
    );
    debugger;
    /* new format */
    var fmt = '0.00';
    /* change cell format of range B2:D4 */
    var range = { s: { r: 1, c: 1 }, e: { r: 2, c: 100000 } };
    for (var R = range.s.r; R <= range.e.r; ++R) {
      for (var C = range.s.c; C <= range.e.c; ++C) {
        var cell = ws[XLSX.utils.encode_cell({ r: R, c: C })];
        if (!cell || cell.t != 'n') continue; // only format numeric cells
        //  cell.z = fmt;
      }
    }
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    var fmt = '@';
    wb.Sheets['Sheet1']['F'] = fmt;

    /* save to file */
    XLSX.writeFile(wb, 'RVP_Forecast_Data.xlsx');
  }

  /* scroll add forecast table */
  isHeaderSticky: boolean = false;

  onTableScroll(event: Event): void {
    debugger;
    // Check the scroll position to determine whether to make the header sticky
    this.isHeaderSticky = (event.target as HTMLElement).scrollLeft > 0;
  }
}

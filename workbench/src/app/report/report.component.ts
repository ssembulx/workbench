import { Component, OnInit } from '@angular/core';
import { ExportService } from '../shared/export.service';
import { SummaryService } from '../shared/service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
  orderMappedRelease: string = '';
  reverseMappedRelease: boolean = true;
  searchText = '';
  searchLocation = '';
  searchProgram = '';
  searchVendor = '';
  searchSku = '';
  searchAllocated = '';
  searchfromWW = '';
  tollTipRef: any;
  searchtoWW: '';
  searchBench: '';
  searchTeam: '';
  searchDuration: '';
  searchApprovedBy: '';
  searchBenchDetails: '';
  reportData: any;
  reportdataLoader = false;
  setIconPossition: boolean = true;
  fullScreenFlag = false;
  lab: string = 'SRR-1';
  program: string = 'All';
  vendor: string = 'All';
  prgmList: any;
  vendorList: any;
  ChartData1: any;
  labList: any;
  Labtype = 'Lab chart';

  constructor(
    private service: SummaryService,
    private exportService: ExportService
  ) {}

  //**** Static data for table ****//
  // reportsData = [
  //     { slno: 1, LabDetails: "SRR1-GF C Wing CRD 7 Lab", program: "MTL", SKU: "P", vendor: "Vendor 1", AllocateTo: "Srikanth Uppuluri", FromWW:"WW20-2022", ToWW:"WW50-2022",Bench:"15",Remarks:""},
  //     { slno: 2, LabDetails: "SRR1-GF C Wing VPG SWE DEV Lab1", program: "MTL", SKU: "S", vendor: "Vendor 1", AllocateTo: "Krishna Prasad M", FromWW:"WW33-2022", ToWW:"WW49-2022",Bench:"15",Remarks:""},
  //     { slno: 3, LabDetails: "SRR1-GF C Wing VPG SWE DEV Lab1", program: "MTL", SKU: "M", vendor: "Vendor 2", AllocateTo: "Vijay B R", FromWW:"WW25-2022", ToWW:"WW52-2022",Bench:"18",Remarks:""},
  //     { slno: 4, LabDetails: "SRR1-GF B Wing CRD 8 Lab", program: "MTL", SKU: "P", vendor: "Vendor 1", AllocateTo: "Srikanth Uppuluri", FromWW:"WW20-2022", ToWW:"WW50-2022",Bench:"15",Remarks:""},
  //     { slno: 5, LabDetails: "SRR1-GF A Wing SCR Room", program: "MTL", SKU: "S", vendor: "Vendor 1", AllocateTo: "Krishna Prasad M", FromWW:"WW33-2022", ToWW:"WW49-2022",Bench:"15",Remarks:""},
  //     { slno: 6, LabDetails: "SRR1-GF B Wing AD Lab DR1", program: "MTL", SKU: "M", vendor: "Vendor 2", AllocateTo: "Vijay B R", FromWW:"WW25-2022", ToWW:"WW52-2022",Bench:"18",Remarks:""},
  //     { slno: 7, LabDetails: "SRR1-GF B Wing TMSE CRD Lab DR 1", program: "MTL", SKU: "P", vendor: "Vendor 3", AllocateTo: "Srikanth Uppuluri", FromWW:"WW20-2022", ToWW:"WW50-2022",Bench:"15",Remarks:""},
  //     { slno: 8, LabDetails: "SRR1-1 C Wing CRD15 lab", program: "MTL", SKU: "S", vendor: "Vendor 4", AllocateTo: "Krishna Prasad M", FromWW:"WW33-2022", ToWW:"WW49-2022",Bench:"15",Remarks:""},
  //     { slno: 9, LabDetails: "SRR1-GF C Wing VTT SAS Lab DR2", program: "MTL", SKU: "M", vendor: "Vendor 1", AllocateTo: "Vijay B R", FromWW:"WW25-2022", ToWW:"WW52-2022",Bench:"18",Remarks:""},
  //     { slno: 10, LabDetails: "SRR1-1-M15 CRD2 - CSLP Lab1", program: "MTL", SKU: "P", vendor: "Vendor 6", AllocateTo: "Srikanth Uppuluri", FromWW:"WW20-2022", ToWW:"WW50-2022",Bench:"15",Remarks:""},
  //     { slno: 11, LabDetails: "SRR1-1-M15 CRD2 - CSLP Lab2", program: "MTL", SKU: "S", vendor: "Vendor 3", AllocateTo: "Krishna Prasad M", FromWW:"WW33-2022", ToWW:"WW49-2022",Bench:"15",Remarks:""},
  //     { slno: 12, LabDetails: "SRR1-1F B Wing ADL-N PO Lab", program: "MTL", SKU: "M", vendor: "Vendor 4", AllocateTo: "Vijay B R", FromWW:"WW25-2022", ToWW:"WW52-2022",Bench:"18",Remarks:""}
  //   ]

  ngOnInit(): void {
    this.getReportData();
    this.getLabDetails();
    this.getProgramDetails();
    this.getVendorDetails();
    this.LabwiseSummary();
  }

  //***** Calling Report Data API****//
  getReportData() {
    debugger;
    this.reportdataLoader = false;
    this.service.getReportData().subscribe((res) => {
      debugger;
      this.reportData = res;
      console.log(this.reportData);
      this.reportdataLoader = true;
    });
  }
  //**** Sorting functionality in table(ascending descending order) ****//
  setOrderRelease(value: string) {
    if (this.orderMappedRelease === value) {
      this.reverseMappedRelease = !this.reverseMappedRelease;
    }
    this.orderMappedRelease = value;
  }

  showTestTrendSearch(tollTip: any) {
    this.tollTipRef = tollTip;
    tollTip.open();
  }
  // showProgramSearch(tollTip:any){
  //   this.tollTipRef = tollTip;
  //   tollTip.open();
  // }
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

  LabchartData = [
    { slno: 1, labName: 'CRD1', allocated: '45', Free: '55' },
    { slno: 2, labName: 'CRD2', allocated: '20', Free: '30' },
    { slno: 3, labName: 'CRD3', allocated: '15', Free: '10' },
    { slno: 4, labName: 'CRD4', allocated: '30', Free: '15' },
    { slno: 5, labName: 'CRD5', allocated: '12', Free: '32' },
  ];

  labwiseChartLoader = false;

  //****Calling API for Labwsie summary chart ***//
  LabwiseSummary() {
    debugger;
    this.labwiseChartLoader = false;
    let req = { LabName: this.lab, Program: this.program, Vendor: this.vendor };

    this.service.LabwiseSummary(req).subscribe((res) => {
      debugger;
      this.ChartData1 = res.Location;
      console.log('stacked chart', this.ChartData1);
      // this.getLabwiseStackedChart();
      this.labwiseChartLoader = true;
    });
  }

  //**** Calling labdetails API for select drop down in labwise program chart ***//
  getLabDetails() {
    this.service.getLabDetail().subscribe((res) => {
      this.labList = res;
      console.log(this.labList, '****');
    });
  }

  //**** Calling program details API for select drop down in labwise program chart ***//
  getProgramDetails() {
    this.service.getPrgmDetail().subscribe((res) => {
      this.prgmList = res;
      // console.log(this.labList,"****")
    });
  }

  //**** Calling vendor details API for select drop down in labwise program chart ***//
  getVendorDetails() {
    this.service.getVendorDetail().subscribe((res) => {
      if (res) {
        this.vendorList = res;
      }
    });
  }

  //**** Change function for lab select drop down in labwise program chart ***//
  labChange() {
    this.LabwiseSummary();
  }

  //**** Change function for program select drop down in labwise program chart ***//
  programChange() {
    this.LabwiseSummary();
  }

  //**** Change function for vendor select drop down in labwise program chart ***//
  vendorChange() {
    this.LabwiseSummary();
  }

  // *** Labwise chart and table options according to click *** //
  ChangeOption(Status: any) {
    if (Status == 'Labchart') {
      debugger;
      this.Labtype = 'Lab chart';
    } else if (Status == 'Labtable') {
      this.Labtype = 'Lab table';
    }
  }

  hideTestTrendSearch() {
    this.tollTipRef.close();
  }

  exportFile() {
    this.exportService.exportExcel(this.reportData, 'ReportData');
  }

  toggleFullScreen() {
    this.fullScreenFlag = !this.fullScreenFlag;
    this.setIconPossition = !this.setIconPossition;
  }
}

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
  searchAllocatedDate='';
  searchProgram = '';
  searchVendor = '';
  searchSku = '';
  searchAllocated = '';
  searchfromWW = '';
  tollTipRef: any;
  searchtoWW = '';
  searchBench = '';
  searchTeam = '';
  searchDuration = '';
  searchRemarks = '';
  searchApprovedBy = '';
  searchRequestedBy = '';
  searchBenchDetails = '';
  reportData: any;
  reportDataAll: any;
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
    private exportService: ExportService,
    private dataSvc: SummaryService
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
  userInfo: any;
  ngOnInit(): void {
    this.dataSvc.GetUser().subscribe((res: any) => {
      console.log('userdeatils', res);
      this.userInfo = res;
    });
    this.getReportData();
    this.getLabDetails();
    this.getProgramDetails();
    //  this.getVendorDetails();
    this.LabwiseSummary();
  }

  //***** Calling Report Data API****//
  allocatedTotal = 0;
  getReportData() {
    this.reportdataLoader = false;
    this.service.getReportData().subscribe((res) => {
      this.reportDataAll = res;
      this.reportData = res;
      console.log(this.reportData);
      let allocatedDownloadData: any = [];
      if (this.reportData?.length > 0) {
        this.reportData.forEach((element: any) => {
          if (element.status == 'allocated') {
            debugger;
            this.allocatedTotal += element.BenchData?.length;
            allocatedDownloadData.push(element);
          }
        });
      }
      this.reportData = allocatedDownloadData;
      this.reportdataLoader = true;
    });
  }
  /* table search event  */
  valuechange() {
    if (this.reportData?.length > 0) {
      let allocatedDownloadData: any = [];
      this.reportData.forEach((element: any) => {
        if (element.status == 'allocated') {
          allocatedDownloadData.push(element);
        }
      });
      debugger;
      // Use the filter method to get a new array with filtered data
      let filteredData = allocatedDownloadData;
      if (this.searchLocation != '') {
        filteredData = filteredData.filter((val: any) => {
          return val.Location__Name === null
            ? val.Location__Name
            : val.Location__Name.toString()
                .trim()
                .toLowerCase()
                .includes(this.searchLocation.toString().trim().toLowerCase());
        });
      }
      if (this.searchAllocatedDate != '') {
        filteredData = filteredData.filter((val: any) => {
          return val.AllocatedDate === null
            ? val.AllocatedDate
            : val.AllocatedDate.toString()
                .trim()
                .toLowerCase()
                .includes(this.searchAllocatedDate.toString().trim().toLowerCase());
        });
      }
      if (this.searchTeam != '') {
        filteredData = filteredData.filter((val: any) => {
          return val.Team === null
            ? val.Team
            : val.Team.toString()
                .trim()
                .toLowerCase()
                .includes(this.searchTeam.toString().trim().toLowerCase());
        });
      }
      if (this.searchProgram != '') {
        filteredData = filteredData.filter((val: any) => {
          return val.Program === null
            ? val.Program
            : val.Program.toString()
                .trim()
                .toLowerCase()
                .includes(this.searchProgram.toString().trim().toLowerCase());
        });
      }
      if (this.searchSku != '') {
        filteredData = filteredData.filter((val: any) => {
          return val.Sku === null
            ? val.Sku
            : val.Sku.toString()
                .trim()
                .toLowerCase()
                .includes(this.searchSku.toString().trim().toLowerCase());
        });
      }
      if (this.searchVendor != '') {
        filteredData = filteredData.filter((val: any) => {
          return val.Vendor === null
            ? val.Vendor
            : val.Vendor.toString()
                .trim()
                .toLowerCase()
                .includes(this.searchVendor.toString().trim().toLowerCase());
        });
      }
      if (this.searchAllocated != '') {
        filteredData = filteredData.filter((val: any) => {
          return val.AllocatedTo[0].Name === null
            ? val.AllocatedTo[0].Name
            : val.AllocatedTo[0].Name.toString()
                .trim()
                .toLowerCase()
                .includes(this.searchAllocated.toString().trim().toLowerCase());
        });
      }
      if (this.searchfromWW != '') {
        filteredData = filteredData.filter((val: any) => {
          return val.FromWW === null
            ? val.FromWW
            : val.FromWW.toString()
                .trim()
                .toLowerCase()
                .includes(this.searchfromWW.toString().trim().toLowerCase());
        });
      }
      if (this.searchtoWW != '') {
        filteredData = filteredData.filter((val: any) => {
          return val.ToWW === null
            ? val.ToWW
            : val.ToWW.toString()
                .trim()
                .toLowerCase()
                .includes(this.searchtoWW.toString().trim().toLowerCase());
        });
      }
      if (this.searchBench != '') {
        filteredData = filteredData.filter((val: any) => {
          return val.BenchData === null
            ? val.BenchData
            : val.BenchData.toString()
                .trim()
                .toLowerCase()
                .includes(this.searchBench.toString().trim().toLowerCase());
        });
      }
      if (this.searchBenchDetails != '') {
        filteredData = filteredData.filter((val: any) => {
          return val.BenchData === null
            ? val.BenchData
            : val.BenchData.toString()
                .trim()
                .toLowerCase()
                .includes(
                  this.searchBenchDetails.toString().trim().toLowerCase()
                );
        });
      }
      if (this.searchDuration != '') {
        filteredData = filteredData.filter((val: any) => {
          return val.Duration === null
            ? val.Duration
            : val.Duration.toString()
                .trim()
                .toLowerCase()
                .includes(this.searchDuration.toString().trim().toLowerCase());
        });
      }
      if (this.searchRemarks != '') {
        filteredData = filteredData.filter((val: any) => {
          return val.Remarks === null
            ? val.Remarks
            : val.Remarks.toString()
                .trim()
                .toLowerCase()
                .includes(this.searchRemarks.toString().trim().toLowerCase());
        });
      }
      if (this.searchApprovedBy != '') {
        filteredData = filteredData.filter((val: any) => {
          return val.approvedBy === null
            ? val.approvedBy
            : val.approvedBy
                .toString()
                .trim()
                .toLowerCase()
                .includes(
                  this.searchApprovedBy.toString().trim().toLowerCase()
                );
        });
      }
      if (this.searchRequestedBy != '') {
        filteredData = filteredData.filter((val: any) => {
          return val.RequestedBy[0].Name === null
            ? val.RequestedBy[0].Name
            : val.RequestedBy[0].Name.toString()
                .trim()
                .toLowerCase()
                .includes(this.searchRequestedBy.toString().trim().toLowerCase());
        });
      }
      console.log(filteredData);
      this.allocatedTotal = 0;
      filteredData.forEach((element) => {
        this.allocatedTotal += element.BenchData?.length;
      });
    }
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
    this.searchAllocatedDate='';
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
    this.searchApprovedBy = '';
    this.searchRequestedBy='';
    /* reset count  */
    if (this.reportData?.length > 0) {
      this.allocatedTotal = 0;
      this.reportData.forEach((element: any) => {
        if (element.status == 'allocated') {
          this.allocatedTotal += element.BenchData?.length;
        }
      });
    }
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
    this.reportdataLoader = false;
    let req = { LabName: this.lab, Program: this.program, Vendor: this.vendor };

    this.service.LabwiseSummary(req).subscribe((res) => {
      this.ChartData1 = res.Location;
      console.log('stacked chart', this.ChartData1);
      // this.getLabwiseStackedChart();
      this.reportdataLoader = true;
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
    this.reportdataLoader = false;
    let payload = { location: this.lab };
    this.program = 'All';
    this.vendor = 'All';
    this.service.getPrgmDetailPost(payload).subscribe((res) => {
      this.reportdataLoader = true;
      let result = res?.Data;
      this.prgmList = result?.ProgramSkuList;
      this.vendorList = result?.VendorList;
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
    this.getProgramDetails();
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
      this.Labtype = 'Lab chart';
    } else if (Status == 'Labtable') {
      this.Labtype = 'Lab table';
    }
  }

  hideTestTrendSearch() {
    this.tollTipRef.close();
  }

  exportFile() {
    if (this.reportData?.length > 0) {
      let allocatedDownloadData: any = [];
      this.reportData.forEach((element: any) => {
        if (element.status == 'allocated') {
          allocatedDownloadData.push(element);
        }
      });
      debugger;
      // Use the filter method to get a new array with filtered data
      //   const filteredData = allocatedDownloadData.filter(conditions);
      let filteredData = allocatedDownloadData;
      if (this.searchLocation != '') {
        filteredData = filteredData.filter((val: any) => {
          return val.Location__Name === null
            ? val.Location__Name
            : val.Location__Name.toString()
                .trim()
                .toLowerCase()
                .includes(this.searchLocation.toString().trim().toLowerCase());
        });
      }
      if (this.searchAllocatedDate != '') {
        filteredData = filteredData.filter((val: any) => {
          return val.AllocatedDate === null
            ? val.AllocatedDate
            : val.AllocatedDate.toString()
                .trim()
                .toLowerCase()
                .includes(this.searchAllocatedDate.toString().trim().toLowerCase());
        });
      }
      if (this.searchTeam != '') {
        filteredData = filteredData.filter((val: any) => {
          return val.Team === null
            ? val.Team
            : val.Team.toString()
                .trim()
                .toLowerCase()
                .includes(this.searchTeam.toString().trim().toLowerCase());
        });
      }
      if (this.searchProgram != '') {
        filteredData = filteredData.filter((val: any) => {
          return val.Program === null
            ? val.Program
            : val.Program.toString()
                .trim()
                .toLowerCase()
                .includes(this.searchProgram.toString().trim().toLowerCase());
        });
      }
      if (this.searchSku != '') {
        filteredData = filteredData.filter((val: any) => {
          return val.Sku === null
            ? val.Sku
            : val.Sku.toString()
                .trim()
                .toLowerCase()
                .includes(this.searchSku.toString().trim().toLowerCase());
        });
      }
      if (this.searchVendor != '') {
        filteredData = filteredData.filter((val: any) => {
          return val.Vendor === null
            ? val.Vendor
            : val.Vendor.toString()
                .trim()
                .toLowerCase()
                .includes(this.searchVendor.toString().trim().toLowerCase());
        });
      }
      if (this.searchAllocated != '') {
        filteredData = filteredData.filter((val: any) => {
          return val.AllocatedTo[0].Name === null
            ? val.AllocatedTo[0].Name
            : val.AllocatedTo[0].Name.toString()
                .trim()
                .toLowerCase()
                .includes(this.searchAllocated.toString().trim().toLowerCase());
        });
      }
      if (this.searchfromWW != '') {
        filteredData = filteredData.filter((val: any) => {
          return val.FromWW === null
            ? val.FromWW
            : val.FromWW.toString()
                .trim()
                .toLowerCase()
                .includes(this.searchfromWW.toString().trim().toLowerCase());
        });
      }
      if (this.searchtoWW != '') {
        filteredData = filteredData.filter((val: any) => {
          return val.ToWW === null
            ? val.ToWW
            : val.ToWW.toString()
                .trim()
                .toLowerCase()
                .includes(this.searchtoWW.toString().trim().toLowerCase());
        });
      }
      if (this.searchBench != '') {
        filteredData = filteredData.filter((val: any) => {
          return val.BenchData === null
            ? val.BenchData
            : val.BenchData.toString()
                .trim()
                .toLowerCase()
                .includes(this.searchBench.toString().trim().toLowerCase());
        });
      }
      if (this.searchBenchDetails != '') {
        filteredData = filteredData.filter((val: any) => {
          return val.BenchData === null
            ? val.BenchData
            : val.BenchData.toString()
                .trim()
                .toLowerCase()
                .includes(
                  this.searchBenchDetails.toString().trim().toLowerCase()
                );
        });
      }
      if (this.searchDuration != '') {
        filteredData = filteredData.filter((val: any) => {
          return val.Duration === null
            ? val.Duration
            : val.Duration.toString()
                .trim()
                .toLowerCase()
                .includes(this.searchDuration.toString().trim().toLowerCase());
        });
      }
      if (this.searchRemarks != '') {
        filteredData = filteredData.filter((val: any) => {
          return val.Remarks === null
            ? val.Remarks
            : val.Remarks.toString()
                .trim()
                .toLowerCase()
                .includes(this.searchRemarks.toString().trim().toLowerCase());
        });
      }
      if (this.searchApprovedBy != '') {
        filteredData = filteredData.filter((val: any) => {
          return val.approvedBy === null
            ? val.approvedBy
            : val.approvedBy
                .toString()
                .trim()
                .toLowerCase()
                .includes(
                  this.searchApprovedBy.toString().trim().toLowerCase()
                );
        });
      }
      if (this.searchRequestedBy != '') {
        filteredData = filteredData.filter((val: any) => {
          return val.RequestedBy?.[0].Name === null
            ? val.RequestedBy?.[0].Name
            : val.RequestedBy?.[0].Name.toString()
                .trim()
                .toLowerCase()
                .includes(this.searchRequestedBy.toString().trim().toLowerCase());
        });
      }
      console.log(filteredData);
      this.exportService.exportExcel(filteredData, 'Allocated_Report_Data');
    }
  }

  exportDeallocatedFile() {
    if (this.reportDataAll?.length > 0) {
      let deallocatedDownloadData: any = [];
      this.reportDataAll.forEach((element: any) => {
        if (
          element.IsRequested == false &&
          element.IsAllocated == false &&
          element.status == 'complete'
        ) {
          deallocatedDownloadData.push(element);
        }
      });
      this.exportService.exportExcelDeallocated(
        deallocatedDownloadData,
        'Deallocated_Report_Data'
      );
    }
  }

  exportAllFile() {
    if (this.reportDataAll?.length > 0) {
      this.exportService.exportExcelAll(this.reportDataAll, 'All_Report_Data');
    }
  }

  exportRejectedFile() {
    if (this.reportDataAll?.length > 0) {
      let rejectedDownloadData: any = [];
      this.reportDataAll.forEach((element: any) => {
        if (element.status == 'rejected') {
          rejectedDownloadData.push(element);
        }
      });
      this.exportService.exportRejectedExcel(
        rejectedDownloadData,
        'Rejected_Report_Data'
      );
    }
  }

  toggleFullScreen() {
    this.fullScreenFlag = !this.fullScreenFlag;
    this.setIconPossition = !this.setIconPossition;
  }
}

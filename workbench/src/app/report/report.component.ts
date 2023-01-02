import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
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
  tollTipRef:any;
  searchtoWW: '';
  searchBench: '';

  constructor() { }
  
  //**** Static data for table ****//
  reportsData = [
      { slno: 1, LabDetails: "SRR1-GF C Wing CRD 7 Lab", program: "MTL", SKU: "P", vendor: "Vendor 1", AllocateTo: "Srikanth Uppuluri", FromWW:"WW20-2022", ToWW:"WW50-2022",Bench:"15",Remarks:""},
      { slno: 2, LabDetails: "SRR1-GF C Wing VPG SWE DEV Lab1", program: "MTL", SKU: "S", vendor: "Vendor 1", AllocateTo: "Krishna Prasad M", FromWW:"WW33-2022", ToWW:"WW49-2022",Bench:"15",Remarks:""},
      { slno: 3, LabDetails: "SRR1-GF C Wing VPG SWE DEV Lab1", program: "MTL", SKU: "M", vendor: "Vendor 2", AllocateTo: "Vijay B R", FromWW:"WW25-2022", ToWW:"WW52-2022",Bench:"18",Remarks:""},
      { slno: 4, LabDetails: "SRR1-GF B Wing CRD 8 Lab", program: "MTL", SKU: "P", vendor: "Vendor 1", AllocateTo: "Srikanth Uppuluri", FromWW:"WW20-2022", ToWW:"WW50-2022",Bench:"15",Remarks:""},
      { slno: 5, LabDetails: "SRR1-GF A Wing SCR Room", program: "MTL", SKU: "S", vendor: "Vendor 1", AllocateTo: "Krishna Prasad M", FromWW:"WW33-2022", ToWW:"WW49-2022",Bench:"15",Remarks:""},
      { slno: 6, LabDetails: "SRR1-GF B Wing AD Lab DR1", program: "MTL", SKU: "M", vendor: "Vendor 2", AllocateTo: "Vijay B R", FromWW:"WW25-2022", ToWW:"WW52-2022",Bench:"18",Remarks:""},
      { slno: 7, LabDetails: "SRR1-GF B Wing TMSE CRD Lab DR 1", program: "MTL", SKU: "P", vendor: "Vendor 3", AllocateTo: "Srikanth Uppuluri", FromWW:"WW20-2022", ToWW:"WW50-2022",Bench:"15",Remarks:""},
      { slno: 8, LabDetails: "SRR1-1 C Wing CRD15 lab", program: "MTL", SKU: "S", vendor: "Vendor 4", AllocateTo: "Krishna Prasad M", FromWW:"WW33-2022", ToWW:"WW49-2022",Bench:"15",Remarks:""},
      { slno: 9, LabDetails: "SRR1-GF C Wing VTT SAS Lab DR2", program: "MTL", SKU: "M", vendor: "Vendor 1", AllocateTo: "Vijay B R", FromWW:"WW25-2022", ToWW:"WW52-2022",Bench:"18",Remarks:""},
      { slno: 10, LabDetails: "SRR1-1-M15 CRD2 - CSLP Lab1", program: "MTL", SKU: "P", vendor: "Vendor 6", AllocateTo: "Srikanth Uppuluri", FromWW:"WW20-2022", ToWW:"WW50-2022",Bench:"15",Remarks:""},
      { slno: 11, LabDetails: "SRR1-1-M15 CRD2 - CSLP Lab2", program: "MTL", SKU: "S", vendor: "Vendor 3", AllocateTo: "Krishna Prasad M", FromWW:"WW33-2022", ToWW:"WW49-2022",Bench:"15",Remarks:""},
      { slno: 12, LabDetails: "SRR1-1F B Wing ADL-N PO Lab", program: "MTL", SKU: "M", vendor: "Vendor 4", AllocateTo: "Vijay B R", FromWW:"WW25-2022", ToWW:"WW52-2022",Bench:"18",Remarks:""}
    ]
  
  ngOnInit(): void {
  }

   //**** Sorting functionality in table(ascending descending order) ****//
   setOrderRelease(value: string) {
    if (this.orderMappedRelease === value) {
      this.reverseMappedRelease = !this.reverseMappedRelease;
    }
    this.orderMappedRelease = value;
  }

  showTestTrendSearch(tollTip:any){
    this.tollTipRef = tollTip;
    tollTip.open();
  }
  // showProgramSearch(tollTip:any){
  //   this.tollTipRef = tollTip;
  //   tollTip.open();
  // }
  clearInput(){
    this.searchLocation = "";
    this.searchProgram = "";
    this.searchVendor = "";
    this.searchSku = "";
    this.searchAllocated = "";
    this.searchfromWW = "";
    this.searchtoWW = "";
    this.searchBench = "";
  }

  hideTestTrendSearch(){
    this.tollTipRef.close();

  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.scss']
})
export class ApproveComponent implements OnInit {

  constructor() { }

  aproveData = [
    { slno: 1, LabDetails: "SRR1-GF C Wing CRD 7 Lab", program: "MTL", SKU: "P", vendor: "Vendor 1", AllocateTo: "Srikanth Uppuluri", FromWW:"WW20-2022", ToWW:"WW50-2022",Bench:"15",Remarks:""},
    { slno: 2, LabDetails: "SRR1-GF C Wing VPG SWE DEV Lab1", program: "MTL", SKU: "S", vendor: "Vendor 1", AllocateTo: "Krishna Prasad M", FromWW:"WW33-2022", ToWW:"WW49-2022",Bench:"15",Remarks:""}
    
  ]

  ngOnInit(): void {
  }
}

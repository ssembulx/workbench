import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SummaryService } from '../shared/service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.scss'],
})
export class ApproveComponent implements OnInit {
  orderMappedRelease: string = '';
  reverseMappedRelease: boolean = true;

  constructor(
    private dataSvc: SummaryService,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    config: NgbModalConfig
  ) {
    config.backdrop = 'static';
    config.size = 'md';
  }
  approvallist: any;
  viewApprovalRequests() {
    this.dataSvc.viewApprovalRequests().subscribe((res) => {
      if (res) {
        this.approvallist = res;
      }
    });
  }
  ngOnInit(): void {
    this.viewApprovalRequests();
  }
  //**** Sorting functionality in table(ascending descending order) ****//
  setOrderRelease(value: string) {
    if (this.orderMappedRelease === value) {
      this.reverseMappedRelease = !this.reverseMappedRelease;
    }
    this.orderMappedRelease = value;
  }
  reason = '';
  rejectBench() {
    let finalResult: any = {};
    this.finalResultList = [];
    this.approveBenchList.forEach((element: any, index: any) => {
      finalResult = {
        Program: element.Program,
        Sku: element.Sku,
        Vendor: element.Vendor,
        Team: element.Team,
        FromWW: element.FromWW,
        ToWW: element.ToWW,
        AllocatedTo: element.AllocatedTo,
        NotifyTo: element.NotifyTo,
        NumberOfBenches: element.NumberOfbenches,
        Remarks: element.Remarks,
        IsAllocated: false,
        IsRequested: true,
        LabName: element.Location__Name,
        BenchData: element.BenchData,
        Duration: element.Duration,
        id: element.id,
        Reason: this.reason,
      };
      // delete element['id'];
      this.finalResultList.push(finalResult);
    });
    this.dataSvc.rejectBenchList(this.finalResultList).subscribe((res) => {
      if (res) {
        this.closeReject();
        this.viewApprovalRequests();
        this.approveBenchList = [];
        this.toastrService.success(
          'Allocation Rejected Successfully',
          'Success!'
        );
      }
    });
  }
  finalResultList: any = [];

  approveBench() {
    let finalResult: any = {};
    this.finalResultList = [];
    this.approveBenchList.forEach((element: any, index: any) => {
      finalResult = {
        Program: element.Program,
        Sku: element.Sku,
        Vendor: element.Vendor,
        Team: element.Team,
        FromWW: element.FromWW,
        ToWW: element.ToWW,
        AllocatedTo: element.AllocatedTo,
        NotifyTo: element.NotifyTo,
        NumberOfBenches: element.NumberOfbenches,
        Remarks: element.Remarks,
        IsAllocated: true,
        IsRequested: false,
        LabName: element.Location__Name,
        BenchData: element.BenchData,
        Duration: element.Duration,
        id: element.id,
      };
      // delete element['id'];
      this.finalResultList.push(finalResult);
    });
    this.dataSvc.approveBenchList(this.finalResultList).subscribe((res) => {
      if (res) {
        this.viewApprovalRequests();
        this.approveBenchList = [];
        this.toastrService.success(
          'Allocation Approved Successfully',
          'Success!'
        );
      }
    });
  }
  approveBenchList: any = [];
  checkRow(data: any, id: any, event: any) {
    if (event.currentTarget.checked == true) {
      this.approveBenchList.push(data);
    } else if (event.currentTarget.checked == false) {
      this.approveBenchList.forEach((element: any, index: any) => {
        if (element.id == id) {
          this.approveBenchList.splice(index, 1);
        }
      });
    }
    /*   if (this.approveBenchList.length === 0) {
      this.approveBenchList.push(data);
    } else {
      this.approveBenchList.forEach((element: any, index: any) => {
        if (element.id == id) {
          this.approveBenchList.splice(index, 1);
        } else {
          this.approveBenchList.push(data);
        }
      });
    } */
    console.log(this.approveBenchList);
  }

  @ViewChild('rejectModel') rejectModel: ElementRef;
  modalReference: any;
  openReject() {
    this.modalReference = this.modalService.open(this.rejectModel);
  }

  closeReject() {
    this.reason = '';
    this.modalReference.close();
  }
}

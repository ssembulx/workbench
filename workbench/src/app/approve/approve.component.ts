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
      finalResult['Program'] = element.Program;
      finalResult['Sku'] = element.Sku;
      finalResult['Vendor'] = element.Vendor;
      finalResult['Team'] = element.Team;
      finalResult['FromWW'] = element.FromWW;
      finalResult['ToWW'] = element.ToWW;
      finalResult['AllocatedTo'] = element.AllocatedTo;
      finalResult['NumberOfBenches'] = element.NumberOfbenches;
      finalResult['Remarks'] = element.Remarks;
      finalResult['IsAllocated'] = false;
      finalResult['IsRequested'] = true;
      finalResult['LabName'] = element.Location__Name;
      finalResult['BenchData'] = element.BenchData;
      finalResult['Duration'] = element.Duration;
      finalResult['id'] = element.id;
      finalResult['Reason'] = this.reason;
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
      finalResult['Program'] = element.Program;
      finalResult['Sku'] = element.Sku;
      finalResult['Vendor'] = element.Vendor;
      finalResult['Team'] = element.Team;
      finalResult['FromWW'] = element.FromWW;
      finalResult['ToWW'] = element.ToWW;
      finalResult['AllocatedTo'] = element.AllocatedTo;
      finalResult['NumberOfBenches'] = element.NumberOfbenches;
      finalResult['Remarks'] = element.Remarks;
      finalResult['IsAllocated'] = true;
      finalResult['IsRequested'] = false;
      finalResult['LabName'] = element.Location__Name;
      finalResult['BenchData'] = element.BenchData;
      finalResult['Duration'] = element.Duration;
      finalResult['id'] = element.id;
      // delete element['id'];
      this.finalResultList.push(finalResult);
    });
    debugger;
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
  checkRow(data: any, id: any) {
    if (this.approveBenchList.length === 0) {
      this.approveBenchList.push(data);
    } else {
      this.approveBenchList.forEach((element: any, index: any) => {
        if (element.id == id) {
          this.approveBenchList.splice(index, 1);
        } else {
          this.approveBenchList.push(data);
        }
      });
    }
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

import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
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
    config: NgbModalConfig,
    private cd: ChangeDetectorRef
  ) {
    config.backdrop = 'static';
    config.size = 'md';
  }
  approvallist: any;
  labViewLoader = false;
  viewApprovalRequests() {
    this.dataSvc.viewApprovalRequests().subscribe((res) => {
      if (res) {
        this.labViewLoader = true;
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
    this.labViewLoader = false;
    let finalResult: any = {};
    this.finalResultList = [];
    /*  this.approveBenchList.forEach((element: any, index: any) => {
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
    }); */
    let requestIdList = {
      requestIdList: this.approveBenchList,
      Reason: this.reason,
    };
    this.closeReject();
    this.dataSvc.rejectBenchList(requestIdList).subscribe((res) => {
      if (res) {
        this.labViewLoader = true;
        // this.closeReject();
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
    this.labViewLoader = false;
    let finalResult: any = {};
    this.finalResultList = [];
    /*  this.approveBenchList.forEach((element: any, index: any) => {
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
    }); */
    let requestIdList = {
      requestIdList: this.approveBenchList,
    };
    this.dataSvc.approveBenchList(requestIdList).subscribe((res) => {
      if (res) {
        this.labViewLoader = true;
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
    debugger;
    if (event.currentTarget.checked == true) {
      // this.approveBenchList.push(data);
      this.approveBenchList.push(id);
      if (this.approvallist.length == this.approveBenchList.length) {
        this.isCheckedAll = true;
      } else {
        this.isCheckedAll = false;
      }
    } else if (event.currentTarget.checked == false) {
      this.approveBenchList.forEach((element: any, index: any) => {
        /* if (element.id == id) { */
        if (element == id) {
          this.approveBenchList.splice(index, 1);
        }
      });
      if (this.approvallist.length == this.approveBenchList.length) {
        this.isCheckedAll = true;
      } else {
        this.isCheckedAll = false;
      }
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

  isChecked = false;
  isCheckedAll = false;
  checkAll(event: any) {
    if (event.currentTarget.checked == true) {
      this.isChecked = false;
      this.cd.detectChanges();
      this.approveBenchList = [];
      this.approvallist.forEach((element: any) => {
        this.approveBenchList.push(element.id);
      });
      this.isChecked = true;
    } else if (event.currentTarget.checked == false) {
      this.isChecked = false;
      this.approveBenchList = [];
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { SummaryService } from '../shared/service';
import { ToastrService } from 'ngx-toastr';
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
    private toastrService: ToastrService
  ) {}
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
  rejectBench() {
    this.approveBenchList.forEach((element: any, index: any) => {
      let finalResult: any = {};
      this.finalResultList = [];
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
      finalResult['id'] = element.id;
      // delete element['id'];
      this.finalResultList.push(finalResult);
    });
    this.dataSvc.rejectBenchList(this.finalResultList).subscribe((res) => {
      if (res) {
        this.viewApprovalRequests();
        this.toastrService.success(
          'Allocation Rejected Successfully',
          'Success!'
        );
      }
    });
  }
  finalResultList: any = [];

  approveBench() {
    this.approveBenchList.forEach((element: any, index: any) => {
      let finalResult: any = {};
      this.finalResultList = [];
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
      finalResult['id'] = element.id;
      // delete element['id'];
      this.finalResultList.push(finalResult);
    });
    this.dataSvc.approveBenchList(this.finalResultList).subscribe((res) => {
      if (res) {
        this.viewApprovalRequests();
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
}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SummaryService } from '../shared/service';

@Component({
  selector: 'app-user-approve',
  templateUrl: './user-approve.component.html',
  styleUrls: ['./user-approve.component.scss']
})
export class UserApproveComponent implements OnInit {

  @ViewChild('rejectModel') rejectModel: ElementRef;
  modalReference: any;
  userdataLoader = false;
  userData :any;
  orderMappedRelease: string = '';
  reverseMappedRelease: boolean = true;
  userList: any = [];
  // finalResultList :any;
  finalResultList :any = [];
  reason = '';

  constructor(private service: SummaryService,private toastrService: ToastrService,private modalService:NgbModal,config: NgbModalConfig,) { }

  ngOnInit(): void {
    this.getuserData();
  }

    //**** Calling API for user data in table ****//
    getuserData(){
      this.userdataLoader = false;
      this.service.getUserNewData().subscribe((res:any) => {
        this.userData = res;
        console.log(this.userData,"user")
        this.userdataLoader = true;
      });
    }
  
  //****** Select a row for approval using checkbox ******//
  checkRow(data: any, wwid: any) {
    debugger
    if (this.userList.length === 0) {
      this.userList.push(data);
    } else {
      this.userList.forEach((element: any, index: any) => {
        if (element.wwid == wwid) {
          this.userList.splice(index, 1);
        } else {
          this.userList.push(data);
        }
      });
    }
    console.log(this.userList,"checked");
  }

  //**** Calling API for approved requset in user table ****//
  approveUser() {
    debugger
    let finalResult: any = {};
    this.finalResultList = [];
    let username: any = sessionStorage.getItem('display_name');
    this.userList.forEach((element: any) => {
      finalResult = {
        RequestId:element.RequestId,
        ApprovedBy:JSON.parse(username)
      };
      console.log(this.userList,"dsfds")
      // delete element['id'];
      this.finalResultList.push(finalResult);
    });
    // let obj = {
    //   RequestId:this.userList[0].RequestId,
    //   ApprovedBy:JSON.parse(username)
    // }
    this.service.userApproveList(this.finalResultList).subscribe((res) => {
      if (res) {
        // this.viewApprovalRequests();
        this.userList = [];
        this.toastrService.success(
          'Approved Successfully',
          'Success!'
        );
      }
      this.getuserData();
    });
    
  }

  //**** Calling API for reject requset in user table ****//
  rejectUser() {
    debugger
    let finalResult: any = {};
    this.finalResultList = [];
    let username: any = sessionStorage.getItem('display_name');
    
    // let obj = {
    //   RequestId:this.userList[0].RequestId,
    //   ApprovedBy:JSON.parse(username),
    //   Reason:this.reason
    // }
    this.userList.forEach((element: any, index: any) => {
      finalResult = {
        // wwid: element.wwid,
        // idsid: element.idsid,
        // name: element.name,
        // emailId: element.emailId,
        // displayName: element.displayName,
        // role: element.role,
        // employeeBadgeType: element.employeeBadgeType,
        RequestId:element.RequestId,
        ApprovedBy:JSON.parse(username),
        Reason:this.reason
      };
      console.log(this.userList,"dsfds")
      // delete element['id'];
      this.finalResultList.push(finalResult);
    });
    this.service.userRejectList(this.finalResultList).subscribe((res) => {
      if (res) {
        // this.viewApprovalRequests();
        this.closeReject();
        this.userList = [];
        this.toastrService.success(
          'Reject Request Successfully',
          'Success!'
        );
      }
      this.getuserData();
    });
  }
    
  openReject() {
    debugger
    this.modalReference = this.modalService.open(this.rejectModel);
  }

  closeReject() {
    this.reason = '';
    this.modalReference.close();
  }

  //**** Sorting functionality in table(ascending descending order) ****//
  setOrderRelease(value: string) {
  if (this.orderMappedRelease === value) {
    this.reverseMappedRelease = !this.reverseMappedRelease;
  }
  this.orderMappedRelease = value;
}

}

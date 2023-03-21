import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  constructor(private service: SummaryService,private toastrService: ToastrService,private modalService:NgbModal,config: NgbModalConfig,private cd: ChangeDetectorRef) { }

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
  approveUserList: any = [];
  checkRow(data: any, requestId: any, event: any) {
    debugger
    if (event.currentTarget.checked == true) {
      // this.approveBenchList.push(data);
      this.approveUserList.push(requestId);
      if (this.userData.length == this.approveUserList.length) {
        this.isCheckedAll = true;
      } else {
        this.isCheckedAll = false;
      }
    } else if (event.currentTarget.checked == false) {
      this.approveUserList.forEach((element: any, index: any) => {
        /* if (element.id == id) { */
        if (element == requestId) {
          this.approveUserList.splice(index, 1);
        }
      });
      if (this.userData.length == this.approveUserList.length) {
        this.isCheckedAll = true;
      } else {
        this.isCheckedAll = false;
      }
    }
    // if (this.userList.length === 0) {
    //   this.userList.push(data);
    // } else {
    //   this.userList.forEach((element: any, index: any) => {
    //     if (element.wwid == wwid) {
    //       this.userList.splice(index, 1);
    //     } else {
    //       this.userList.push(data);
    //     }
    //   });
    // }
    console.log(this.userList,"checked");
  }

  //**** Calling API for approved requset in user table ****//
  approveUser() {
    debugger
    let finalResult: any = {};
    this.finalResultList = [];
    let username: any = sessionStorage.getItem('display_name');
    this.approveUserList.forEach((element: any) => {
      finalResult = {
        RequestId:element,
        ApprovedBy:JSON.parse(username)
      };
      console.log(this.userList,"dsfds")
      // delete element['id'];
      this.finalResultList.push(finalResult);
    });
    this.service.userApproveList(this.finalResultList).subscribe((res) => {
      if (res) {
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
    this.approveUserList.forEach((element: any, index: any) => {
      finalResult = {
        RequestId:element,
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

  isChecked = false;
  isCheckedAll = false;
  checkAll(event: any) {
    debugger
    if (event.currentTarget.checked == true) {
      this.isChecked = false;
      this.cd.detectChanges();
     this.approveUserList = [];
      this.userData.forEach((element: any) => {
        this.approveUserList.push(element.RequestId);
      });
      this.isChecked = true;
    }
     else if (event.currentTarget.checked == false) {
      this.isChecked = false;
      this.approveUserList = [];
    }
  }
  //**** Sorting functionality in table(ascending descending order) ****//
  setOrderRelease(value: string) {
  if (this.orderMappedRelease === value) {
    this.reverseMappedRelease = !this.reverseMappedRelease;
  }
  this.orderMappedRelease = value;
}

}

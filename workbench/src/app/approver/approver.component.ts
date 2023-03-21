import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SummaryService } from '../shared/service';

@Component({
  selector: 'app-approver',
  templateUrl: './approver.component.html',
  styleUrls: ['./approver.component.scss'],
})
export class ApproverComponent implements OnInit {
  name = '';
  email = '';
  wwid = '';
  idsid = '';
  badge = '';
  displayname = '';
  orderMappedRelease: string = '';
  reverseMappedRelease: boolean = true;
  rowValue: any;
  modalReference: any;
  userDetails: any;
  role: any = '';
  roleList: any;
  userData: any;
  modal: any = {
    Name: '',
    wwid: '',
    displayname: '',
    IDSID: '',
    email: '',
    role: '',
    badge: '',
    lastloggedon: '',
  };
  userdataLoader = false;

  constructor(
    private modalService: NgbModal,
    config: NgbModalConfig,
    private service: SummaryService,
    private toastrService: ToastrService
  ) {
    config.backdrop = 'static';
    config.size = 'md';
  }

  ngOnInit(): void {
    this.getuserData();

    //**** Calling Role API for select drop down in add user modal popup ***//
    this.service.getRole().subscribe((res) => {
      this.roleList = res;
      console.log(this.roleList, '****');
    });
  }

  //**** Calling API for user data in table ****//
  getuserData() {
    this.userdataLoader = false;
    this.service.getApproverUserData().subscribe((res: any) => {
      this.userData = res;
      console.log(this.userData, 'user');
      this.userdataLoader = true;
    });
  }

  //*** calling add user data modal popup ****//
  AddRow(addmodal: any) {
    this.modalReference = this.modalService.open(addmodal);
  }

  //*** Add user data functionality****//
  AddUser() {
    //*** payload for add user data****//
    let req = {
      wwid: this.wwid,
      idsid: this.idsid,
      name: this.name,
      emailId: this.email,
      employeeBadgeType: this.badge,
      displayName: this.displayname,
    };

    // **** Calling Add row API***** //
    this.service.getAddApproverData(req).subscribe((res: any) => {
      this.getuserData();
    });
    this.modalReference.close();
    //*** To clearing existing values****//
    this.wwid = '';
    this.idsid = '';
    this.name = '';
    this.email = '';
    this.role = '';
    this.badge = '';
    this.displayname = '';
  }

  //***** Calling user details API ****//
  getUserDetails() {
    debugger;
    if (!/^\d+$/.test(this.wwid.trim())) {
      var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
      if (format.test(this.wwid.trim())) {
        var obj = {
          type: 'CorporateEmailTxt',
          values: this.wwid.trim(),
        };
      } else {
        var obj = {
          type: 'FullNm',
          values: this.wwid.trim(),
        };
      }
    }
    if (/^\d+$/.test(this.wwid.trim())) {
      var obj = {
        type: 'Wwid',
        values: this.wwid.trim(),
      };
    }

    this.service.getUserDetails(obj).subscribe((res) => {
      if (
        res['wwid'] === null ||
        res['wwid'] === undefined ||
        res['wwid'] != this.wwid
      ) {
        debugger;
        this.toastrService.warning(
          'No users found with entered details, Kindly enter correct details!',
          'Warning!'
        );
      } else {
        this.userDetails = res;
        this.name = res['name'];
        this.email = res['emailId'];
        this.wwid = res['wwid'];
        this.role = res['role'];
        this.idsid = res['idsid'];
        this.badge = res['employeeBadgeType'];
        this.displayname = res['displayName'];
      }
    });
  }

  //**** Edit Row functionality in table ****//
  EditRow(editmodal: any, wwid: any, roleName: any) {
    this.userData.forEach((element: any) => {
      if (element.WWID == wwid && element.Role__role_name == roleName) {
        this.modal['IDSID'] = element.Idsid;
        this.modal['displayname'] = element.DisplayName;
        this.modal['Name'] = element.Name;
        this.modal['wwid'] = element.WWID;
        this.modal['email'] = element.Email;
        this.modal['role'] = element.Role__role_name;
        this.modal['badge'] = element.Badge;
        this.modal['lastloggedon'] = element.LastLoggedOn;
      }
    });
    console.log(this.userData, 'dgfhjkl');
    this.modalReference = this.modalService.open(editmodal);
  }

  //**** Update Row functionality in table ****//
  UpdateTable() {
    let req = { WWID: this.modal.wwid, Role: this.modal.role };

    // **** Calling Update row API***** //
    this.service.getUserUpdateData(req).subscribe((res: any) => {
      this.getuserData();
    });
    this.modalReference.close();

    //*** To clearing existing values****//
    this.modal.wwid = '';
    this.modal.idsid = '';
    this.modal.Name = '';
    this.modal.email = '';
    this.modal.role = '';
    this.modal.badge = '';
    this.modal.lastloggedon = '';
    this.modal.displayname = '';
  }

  //**** Delete Row functionality in table ****//
  DeleteRow(deletemodal: any, wwid: any) {
    this.rowValue = wwid;
    this.modalReference = this.modalService.open(deletemodal);
  }

  //**** Confirm Delete Row functionality in table ****//
  ConfirmDelete() {
    let req = { WWID: this.rowValue };

    // **** Calling Delete row API***** //
    this.service.getApproverUserDelete(req).subscribe((res: any) => {
      this.getuserData();
    });
    // this.userData.splice(this.rowValue, 1);
    this.modalReference.close();
  }

  //***** to clear the input fields in add user modal popup****//
  clearInput() {
    debugger;
    this.wwid = '';
    this.idsid = '';
    this.name = '';
    this.email = '';
    this.role = '';
    this.badge = '';
    this.displayname = '';
  }

  //**** Sorting functionality in table(ascending descending order) ****//
  setOrderRelease(value: string) {
    if (this.orderMappedRelease === value) {
      this.reverseMappedRelease = !this.reverseMappedRelease;
    }
    this.orderMappedRelease = value;
  }
}

import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SummaryService } from '../shared/service';

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.scss'],
})
export class AccessDeniedComponent implements OnInit {
  roleList: any;
  modalReference: any;
  name = '';
  email = '';
  wwid = '';
  idsid = '';
  // badge = '';
  displayname = '';
  userDetails: any;
  role: any = '';
  userData: any;

  userName: any;
  roleName: any;
  userWWID: any;
  avatarURL: string;
  mailId: any;
  userIDSID: any;
  badge: any;
  userImage: any;
  token: any;
  userLoader = false;

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
    this.service.GetUser().subscribe((res: any) => {
      debugger;
      console.log('userdeatils', res);
      this.userName = res?.displayName;
      this.name = res?.name;
      this.idsid = res?.idsid;
      this.roleName = res?.Role;
      this.avatarURL = res?.avatarURL;
      this.userIDSID = res?.idsid;
      this.userWWID = res?.wwid;
      this.mailId = res?.emailId;
      this.badge = res?.employeeBadgeType;
      console.log(res);
      sessionStorage.setItem('display_name', JSON.stringify(this.userName));
    });

    //**** Calling Role API for select drop down in add user modal popup ***//
    this.service.getRole().subscribe((res) => {
      this.roleList = res;
      console.log(this.roleList, '****');
    });
  }

  //*** calling add user data modal popup ****//
  AddRow(addmodal: any) {
    this.modalReference = this.modalService.open(addmodal);
    this.getUserDetails();
  }
  //*** Add user data functionality****//
  AddNewUser() {
    //*** payload for add user data****//
    let req =  {"wwid":this.userWWID,"idsid":this.idsid,"name":this.name,"emailId":this.mailId,"role":this.role,"employeeBadgeType":this.badge,"displayName":this.userName}
  
    // **** Calling Add row API***** //
    this.service.getAddNewUserData(req).subscribe((res: any) => {
      debugger;
      this.userData = res;
      if (this.userData == 'Success') {
        this.toastrService.success(
          'Your request has been sent successfully.',
          'Success!'
        );
      } else if (this.userData == 'User Already Exists') {
        this.toastrService.success(
          'Your request has already been sent successfully.',
          'Success!'
        );
      }
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
    // ***** local code ***** //
    //   this.userDetails =  {
    //     "emailId": "arundathix.manjunath@intel.com",
    //     "name": "Manjunath, ArundathiX",
    //     "idsid": "arundatx",
    //     "wwid": 12035082,
    //     "employeeBadgeType": "GB",
    //     "avatarURL": "https://photos.intel.com/images/12035082.jpg",
    //     "role": null,
    //     "domain": null,
    //     "comments": null,
    //     "displayName": "Manjunath, ArundathiX",
    //     "isApplicationAccess": false,
    //     "programAccesses": null,
    //     "Role": null
    // }
    // this.userName = this.userDetails.displayName;
    // this.name= this.userDetails.name;
    // this.idsid = this.userDetails.idsid;
    // this.roleName = this.userDetails.Role;
    // this.avatarURL = this.userDetails.avatarURL;
    // this.userIDSID = this.userDetails.idsid;
    // this.userWWID = this.userDetails.wwid;
    // this.mailId = this.userDetails.emailId;
    // this.badge = this.userDetails.employeeBadgeType;
    // sessionStorage.setItem('display_name',JSON.stringify(this.userName));

    // **** Getting user details ***//
  }
}

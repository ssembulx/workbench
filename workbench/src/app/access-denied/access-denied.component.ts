import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SummaryService } from '../shared/service';

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.scss']
})
export class AccessDeniedComponent implements OnInit {

  roleList:any
  modalReference:any;
  name = '';
  email ='';
  wwid = '';
  idsid = '';
  // badge = '';
  displayname = '';
  userDetails: any;
  role:any;
  userData :any;


  userName: any;
  roleName: any;
  userWWID: any;
  avatarURL: string;
  mailId:any;
  userIDSID:any;
  badge:any;
  userImage:any;
  token:any;
  userLoader = false;
  

  constructor(private modalService:NgbModal,config: NgbModalConfig,  private service: SummaryService, private toastrService: ToastrService,) { 
    config.backdrop = 'static';
    config.size = 'md';
  }

  ngOnInit(): void {

      //**** Calling Role API for select drop down in add user modal popup ***//
      this.service.getRole().subscribe((res) => {
        this.roleList = res;
        console.log(this.roleList,"****")
    });

  }

   //*** calling add user data modal popup ****//
   AddRow(addmodal:any){
    this.modalReference=this.modalService.open(addmodal)  
    this.getUserDetails();
  }
    //*** Add user data functionality****//
    AddNewUser(){ 
      //*** payload for add user data****//
      let req =  {"wwid":this.userWWID,"idsid":this.idsid,"name":this.name,"emailId":this.mailId,"role":this.role,"employeeBadgeType":this.badge,"displayName":this.userName}
      
      // **** Calling Add row API***** //
     this.service.getAddNewUserData(req).subscribe((res:any) => {
      debugger
      this.userData = res;
      this.toastrService.success(
        'User request has been sent Successfully',
        'Success!'
      );
  
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
      debugger
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

    // **** Server Code ****** //  
   // **** Calling API for to get token and user details ***//
     this.userLoader = false;
    this.service.getWindowsAuth().subscribe((res: any) => {
      this.token = res.token;
      this.service.getUserDetail({ 'token': this.token }).subscribe((data: any) => {
        // this.userName = data.displayName;
        // this.userImage = data.avatarURL;
        // this.userIDSID = data.idsid;
        // this.roleName = data.Role;
        // this.userWWID = data.wwid;
        this.userName = data.displayName;
        this.name= data.name;
        this.idsid = data.idsid;
        this.roleName = data.Role;
        this.avatarURL = data.avatarURL;
        this.userIDSID = data.idsid;
        this.userWWID = data.wwid;
        this.mailId = data.emailId;
        this.badge = data.employeeBadgeType;
        console.log(data)
        sessionStorage.setItem('display_name',JSON.stringify(this.userName));
      })
      this.userLoader = true;
    })
    }
}

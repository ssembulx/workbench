import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SummaryService } from '../shared/service';
@Component({
  selector: 'cqi-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userDetails:any;
  changeText: boolean;
  RoleName:string;
  token:any;

  userName: any;
  roleName: any;
  userWWID: any;
  avatarURL: string;
  mailId:any;
  userIDSID:any;
  badge:any;
  userImage:any;

  constructor(private service: SummaryService,private router: Router) { }

  //*** Calling API for user details****//
  ngOnInit(): void {

    //***** comment while checking in local****//
    // this.GetUserDetails();
   
     //**** Getting user role in local code (static data) ****//
     //***** uncomment while checking in local****//
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
    //     "Role": "Admin"
    // }
    // this.userName = this.userDetails.displayName;
    // this.roleName = this.userDetails.Role;
    // this.avatarURL = this.userDetails.avatarURL;
    // this.userIDSID = this.userDetails.idsid;
    // this.userWWID = this.userDetails.wwid;
    // this.mailId = this.userDetails.emailId;
    // this.badge = this.userDetails.employeeBadgeType;
    // sessionStorage.setItem('display_name',JSON.stringify(this.userName));

    // this.RoleName = this.userDetails.Role;
    // if( this.RoleName != 'User'  &&  this.RoleName != 'Admin'){
    //   debugger
    //   this.router.navigate(['/access-ristrict']);
    //   console.log(this.userDetails.Role,"sfdghjk")
    // }
    // else{
    //   this.router.navigate(['']);
    // }

    // **** Server Code ****** //  
   // **** Calling API for to get token and user details ***//
    this.service.getWindowsAuth().subscribe((res: any) => {
      this.token = res.token;
      this.service.getUserDetail({ 'token': this.token }).subscribe((data: any) => {
        this.userName = data.displayName;
        this.userImage = data.avatarURL;
        this.userIDSID = data.idsid;
        this.roleName = data.Role;
        this.userWWID = data.wwid;
        console.log(data)
    sessionStorage.setItem('display_name',JSON.stringify(this.userName));
      })
    })
   
  }

   //**** Getting user role ****//
  // async GetUserDetails(){
    //**** Getting user role in deployment code ****//
    //***** comment while checking in local****//

    // const tokenData: any = await this.service.getWindowsAuth()
    // this.token = tokenData.token;

    // this.service.getWindowsAuth().subscribe((res:any) =>{
    //   debugger
    //   this.token = res.token;
    //   console.log(this.token,"Token ")
    // })

    //***** comment while checking in local****//
    // let req = {"token":this.token}

    //**** getting user role in Local code ****//
    //***** comment while checking in server****//
    // let req = {"token":"EAAAANbeAxlny4aGRfxaHrFYxIK0coxNYr5vHr28yqGZGDmX/1jc7aQ0oDahSu7g0kR9NN97UyK//vHdIreS//WfGt32zl7Z6ie0Tu/8qtKgqZiV1C50tBFKQWDOCcOcu4X1iQ=="}
    
    // this.service.getUserDetail(req).subscribe((res) => {
    //    debugger
    //   this.userDetails = res;
    //   this.RoleName = this.userDetails.Role;
    //   if(this.RoleName != 'User'  &&  this.RoleName != 'Admin' && this.RoleName != 'Manager' && this.userDetails == 'Null'){
    //     debugger
    //     this.router.navigate(['/access-ristrict']);
    //     console.log(this.userDetails.Role,"sfdghjk")
    //   }
    //   // else{
    //   //   this.router.navigate(['']);
    //   // }
    //   console.log("user details",this.userDetails)
    // });
  // }
  changeView() {
    this.changeText = false;
  }

}

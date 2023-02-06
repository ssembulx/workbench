import { Component, OnInit } from '@angular/core';
import { SummaryService } from '../shared/service';
@Component({
  selector: 'cqi-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  name : any;
  email : any;
  wwid : any;
  idsid : any;
  badge : any;
  displayname : any  ;
  role : any;

  userDetails: any;
  changeText: boolean;
  
  constructor(private service: SummaryService) { }

  ngOnInit(): void {
    var obj = {
      type: 'Wwid',
      values : this.userDetails?.wwid
    };
    this.service.getUserDetails(obj).subscribe((res) => {
       debugger
      this.userDetails = res;
      console.log("user details",this.userDetails)
        // this.name = res['name'];
        // this.email = res ['emailId'];
        // this.wwid = res ['wwid'];
        // this.role = res['role'];
        // this.idsid = res['idsid'];
        // this.badge = res['employeeBadgeType'];
        // this.displayname = res['displayName'];
      
    });
  }

  changeView() {
    this.changeText = false;
  }

}

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {LiveAnnouncer} from '@angular/cdk/a11y';

export interface userData {
  slno: number;
  wwid:string;
  idsid:string;
  displayName: string;
  email: string;
  role:string;
  badge: string;
  lastLoggedOn: string;
}

const ELEMENT_DATA: userData[] = [
  { slno: 1, wwid: "11445685", idsid: "bgurusam", displayName: "Gurusamy, Balaji", email: "balaji.gurusamy@intel.com", role: "view", badge:"BB", lastLoggedOn:"Not yet logged in"},
  { slno: 2, wwid: "11865087", idsid: "nairrath", displayName: "Nair, Ratheesh",   email: "ratheesh.nair@intel.com", role: "view" , badge:"BB", lastLoggedOn:"Not yet logged in" },
  { slno: 3, wwid: "11382988", idsid: "vbadam",   displayName: "Badam, Venkatesh", email: "venkatesh.badam@intel.com", role: "view", badge:"BB", lastLoggedOn:"Oct 18 2022 10:32AM" },
  { slno: 4, wwid: "11447352", idsid: "schandna", displayName: "Chandna, Shruti",  email: "shruti.chandna@intel.com", role: "view", badge:"BB", lastLoggedOn:"Oct 18 2022 9:53AM" },
  { slno: 5, wwid: "11593933", idsid: "sabarigi", displayName: "Radhakrishnan, Sabarigirish", email: "sabarigirish.radhakrishnan@intel.com", role: "view", badge:"BB", lastLoggedOn:"Oct 17 2022 6:36PM" },
  { slno: 6, wwid: "11486911", idsid: "sethiani", displayName: "Anil Sethi", email: "anil.kumar.sethi@intel.com", role: "view", badge:"BB", lastLoggedOn:"Nov 3 2022 1:35PM" },
  { slno: 7, wwid: "11421054", idsid: "mpsharma", displayName: "Munish Sharma", email: "munish.p.sharma@intel.com", role: "Manage", badge:"BB", lastLoggedOn:"Oct 21 2022 11:01AM" },
]

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  displayedColumns: string[] = ['slno', 'wwid', 'idsid', 'displayName','email','role','badge','lastLoggedOn'];
  // dataSource = new MatTableDataSource(ELEMENT_DATA);
  dataSource:any = new MatTableDataSource();

  constructor(private _liveAnnouncer: LiveAnnouncer) { }

  userData = [
    { slno: 1, wwid: "11445685", idsid: "bgurusam", displayName: "Gurusamy, Balaji", email: "balaji.gurusamy@intel.com", role: "view", badge:"BB", lastLoggedOn:"Not yet logged in"},
    { slno: 2, wwid: "11865087", idsid: "nairrath", displayName: "Nair, Ratheesh",   email: "ratheesh.nair@intel.com", role: "view" , badge:"BB", lastLoggedOn:"Not yet logged in" },
    { slno: 3, wwid: "11382988", idsid: "vbadam",   displayName: "Badam, Venkatesh", email: "venkatesh.badam@intel.com", role: "view", badge:"BB", lastLoggedOn:"Oct 18 2022 10:32AM" },
    { slno: 4, wwid: "11447352", idsid: "schandna", displayName: "Chandna, Shruti",  email: "shruti.chandna@intel.com", role: "view", badge:"BB", lastLoggedOn:"Oct 18 2022 9:53AM" },
    { slno: 5, wwid: "11593933", idsid: "sabarigi", displayName: "Radhakrishnan, Sabarigirish", email: "sabarigirish.radhakrishnan@intel.com", role: "view", badge:"BB", lastLoggedOn:"Oct 17 2022 6:36PM" },
    { slno: 6, wwid: "11486911", idsid: "sethiani", displayName: "Anil Sethi", email: "anil.kumar.sethi@intel.com", role: "view", badge:"BB", lastLoggedOn:"Nov 3 2022 1:35PM" },
    { slno: 7, wwid: "11421054", idsid: "mpsharma", displayName: "Munish Sharma", email: "munish.p.sharma@intel.com", role: "Manage", badge:"BB", lastLoggedOn:"Oct 21 2022 11:01AM" },
  ]

  // @ViewChild(MatSort) sort = new MatSort();
  // // @ViewChild(MatSort) sort: MatSort;

  // ngAfterViewInit() {
  //   // this.dataSource.data = new MatTableDataSource(ELEMENT_DATA);
  //   //this.dataSource.sort = this.sort;
  //   this.dataSource.sort = this.sort;
  // }

  // announceSortChange(sortState: Sort) {
  //   if (sortState.direction) {
  //     this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
  //   } else {
  //     this._liveAnnouncer.announce('Sorting cleared');
  //   }
  // }

  ngOnInit(): void {
    // this.dataSource.data = new MatTableDataSource(ELEMENT_DATA);
  }

}

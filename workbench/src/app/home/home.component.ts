import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userData = [
    { slno: 1, wwid: "MTL", idsid: "p", displayName: "Vendor 1", email: "Srikanth Uppuluri", role: "WW20-2022", badge: "WW50-2022", lastLoggedOn: "1" },
    { slno: 2, wwid: "MTL", idsid: "s", displayName: "Vendor 2", email: "Krishna Prasad M", role: "WW33-2022", badge: "WW49-2022", lastLoggedOn: "1" },
    { slno: 3, wwid: "MTL", idsid: "M", displayName: "Vendor 3", email: "Vijay B R", role: "WW25-2022", badge: "WW52-2022", lastLoggedOn: "1" },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}

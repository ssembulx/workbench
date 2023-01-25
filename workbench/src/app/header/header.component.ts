import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'cqi-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  changeText: boolean;
  
  constructor() { }

  ngOnInit(): void {
  }

  changeView() {
    this.changeText = false;
  }

}

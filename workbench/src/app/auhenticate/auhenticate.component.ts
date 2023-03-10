import { cos } from '@amcharts/amcharts4/.internal/core/utils/Math';
import { Component, OnInit } from '@angular/core';
import { SummaryService } from '../shared/service';

@Component({
  selector: 'cqi-auhenticate',
  templateUrl: './auhenticate.component.html',
  styleUrls: ['./auhenticate.component.css'],
})
export class AuhenticateComponent implements OnInit {
  // showMainContent: Boolean = true;
  authenticatorChartLoader = false;

  constructor(private service: SummaryService) {}
  //   ShowHideButton() {
  //     this.showMainContent = this.showMainContent ? false : true;
  //  }

  ngOnInit(): void {}
}

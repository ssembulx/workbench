import { Component, OnInit } from '@angular/core';
import { SummaryService } from '../shared/service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  orderMappedRelease: string = '';
  reverseMappedRelease: boolean = true;
  feedbackdataLoader = false;
  feedbackData:any;
  searchText = '';

  constructor(private service: SummaryService) { }

  ngOnInit(): void {
    this.getuserData();
  }

    //**** Calling API for user data in table ****//
    getuserData(){
      this.feedbackdataLoader = false;
      this.service.getFeedbackData().subscribe((res:any) => {
        this.feedbackData = res;
        console.log(this.feedbackData,"user")
        this.feedbackdataLoader = true;
      });
    }

  //**** Sorting functionality in table(ascending descending order) ****//
  setOrderRelease(value: string) {
    if (this.orderMappedRelease === value) {
      this.reverseMappedRelease = !this.reverseMappedRelease;
    }
    this.orderMappedRelease = value;
  }

}

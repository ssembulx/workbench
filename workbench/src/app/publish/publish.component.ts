import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.scss']
})
export class PublishComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  Start: any = '2022';
  End: any = '2024'
  title = 'RoadMap';

  SelectStartDate(data: any){
    debugger
    let value = data.value;
    if(value == '1' ){
      this.Start = '2022'
    }
    else{
      this.Start = '2023'
    }
  }

  SelectEndDate(data: any){
    debugger
    let value = data.value;
    if(value == '1' ){
      this.End = '2023'
    }
    else{
      this.End = '2024'
    }
    
  }
}

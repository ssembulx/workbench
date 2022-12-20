import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-allocation',
  templateUrl: './allocation.component.html',
  styleUrls: ['./allocation.component.scss']
})
export class AllocationComponent implements OnInit {

  userData = [
    { slno: 1, wwid: "MTL", idsid: "p", displayName: "Vendor 1", email: "Srikanth Uppuluri", role: "WW20-2022", badge: "WW50-2022", lastLoggedOn: "1" },
    { slno: 2, wwid: "MTL", idsid: "s", displayName: "Vendor 2", email: "Krishna Prasad M", role: "WW33-2022", badge: "WW49-2022", lastLoggedOn: "1" },
    { slno: 3, wwid: "MTL", idsid: "M", displayName: "Vendor 3", email: "Vijay B R", role: "WW25-2022", badge: "WW52-2022", lastLoggedOn: "1" },
  ]

  constructor(private modalService: NgbModal, config: NgbModalConfig) {
    config.backdrop = 'static';
    config.size = 'lg';
  }

  ngOnInit(): void {
  }
  isOk = true;
  deskList = [{
    id: 1,
    deskno: 1,
    status: 'not-available'
  }, {
    id: 2,
    deskno: 2,
    status: 'available'
  }, {
    id: 3,
    deskno: 3,
    status: 'available'
  }, {
    id: 4,
    deskno: 4,
    status: 'available'
  }, {
    id: 5,
    deskno: 5,
    status: 'not-available'
  }, {
    id: 6,
    deskno: 6,
    status: 'not-available'
  }, {
    id: 7,
    deskno: 7,
    status: 'available'
  }, {
    id: 8,
    deskno: 8,
    status: 'available'
  }, {
    id: 9,
    deskno: 9,
    status: 'available'
  }, {
    id: 10,
    deskno: 10,
    status: 'available'
  }];


  status: any
  clickEvent(desk: any) {
    if (desk.status == "available") {
      this.deskList.forEach((element, index) => {
        if (element.deskno == desk.deskno) {
          element.status = "booked";
        }
      });
      this.addSeatCount(desk.deskno);
      this.addSeat(desk.deskno);
    }
    else if (desk.status == "booked") {
      this.deskList.forEach((element, index) => {
        if (element.deskno == desk.deskno) {
          element.status = "available";
        }
      });
      this.minusSeatCount(desk.deskno);
      this.minusSeat(desk.deskno);
    }
  }
  seatNoCounter = 0;
  seatLabel: any = [];
  addSeatCount(deskno: any) {
    this.deskList.forEach((element, index) => {
      if (element.status == "booked" && element.deskno == deskno) {
        this.seatNoCounter = this.seatNoCounter + 1;
      }
    });
  }
  addSeat(deskno: any) {
    if (deskno < 10) {
      this.seatLabel.push("0" + deskno);
    } else {
      this.seatLabel.push("" + deskno);
    }
  }
  minusSeatCount(deskno: any) {
    this.deskList.forEach((element, index) => {
      if (element.status == "available" && element.deskno == deskno) {
        this.seatNoCounter = this.seatNoCounter - 1;
      }
    });
  }
  minusSeat(deskno: any) {
    if (deskno < 10) {
      deskno = "0" + deskno;
    } else {
      deskno = "" + deskno;
    }
    const index = this.seatLabel.indexOf(deskno);
    if (index > -1) { // only splice array when item is found
      this.seatLabel.splice(index, 1); // 2nd parameter means remove one item only
    }
  }

  modalReference: any;
  processBooking(addmodal: any) {
    this.modalReference = this.modalService.open(addmodal)
  }
  saveBooking(){
    
  }

  toggleClass(event: any, className: string) {
    const hasClass = event.target.classList.contains(className);

    if (hasClass) {
      //this.renderer.removeClass(event.target, className);
    } else {
      //this.renderer.addClass(event.target, className);
    }
  }
}

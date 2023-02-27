import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SummaryService } from '../shared/service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent implements OnInit {
  orderMappedRelease: string = '';
  reverseMappedRelease: boolean = true;
  feedbackdataLoader = false;
  feedbackData: any;
  searchText = '';

  userName: any;
  roleName: any;
  userWWID: any;

  modal: any = {
    wwid: '',
    Name: '',
    email: '',
    feedback: '',
    Created_date: '',
    Status: '',
    Resolved_date: '',
    Comments: '',
  };
  modalReference: any;

  constructor(
    private service: SummaryService,
    private modalService: NgbModal,
    config: NgbModalConfig,
    private toastrService: ToastrService
  ) {
    config.backdrop = 'static';
    config.size = 'md';
  }

  ngOnInit(): void {
    // **** Getting user details ***//
    this.service.GetUser().subscribe((res: any) => {
      console.log('userdeatils', res);
      this.userName = res?.displayName;
      this.roleName = res?.Role;
      this.userWWID = res?.wwid;
      console.log(res);
      sessionStorage.setItem('display_name', JSON.stringify(this.userName));
    });
    this.getfeedbackData();
  }

  //**** Calling API for feedback data in table ****//
  getfeedbackData() {
    let req = { wwid: this.userWWID, Role: this.roleName };
    this.feedbackdataLoader = false;
    this.service.getFeedbackData(req).subscribe((res: any) => {
      this.feedbackData = res;
      console.log(this.feedbackData, 'user');
      this.feedbackdataLoader = true;
    });
  }

  //**** Edit Row functionality in table ****//
  EditRow(editmodal: any, id: any) {
    debugger;
    this.feedbackData.forEach((element: any) => {
      if (element.id == id) {
        debugger;
        this.modal['id'] = element.id;
        this.modal['wwid'] = element.suggestion_by[0].WWID;
        this.modal['Name'] = element.suggestion_by[0].Name;
        this.modal['email'] = element.suggestion_by[0].Email;
        this.modal['feedback'] = element.suggestion;
        this.modal['Created_date'] = element.created_date;
        this.modal['Resolved_date'] = element.resolved_date;
        this.modal['Status'] = element.status;
        this.modal['Comments'] = element.comments;
      }
    });
    // console.log(this.userData,"dgfhjkl")
    this.modalReference = this.modalService.open(editmodal);
  }

  //**** Update Row functionality in table ****//
  UpdateTable() {
    debugger;
    let req: any = {
      id: this.modal.id,
      status: this.modal.Status,
      comments: this.modal.Comments,
    };

    // **** Calling Update row API***** //
    this.service.getFeedbackUpdateData(req).subscribe((res: any) => {
      this.toastrService.success('Feedback Updated Successfully', 'Success!');
      this.getfeedbackData();
    });
    this.modalReference.close();

    //*** To clearing existing values****//
    this.modal.wwid = '';
    this.modal.Name = '';
    this.modal.email = '';
    this.modal.feedback = '';
    this.modal.Created_date = '';
    this.modal.Resolved_date = '';
    this.modal.Status = '';
    this.modal.Comments = '';
  }

  //**** Sorting functionality in table(ascending descending order) ****//
  setOrderRelease(value: string) {
    if (this.orderMappedRelease === value) {
      this.reverseMappedRelease = !this.reverseMappedRelease;
    }
    this.orderMappedRelease = value;
  }
}

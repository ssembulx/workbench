import { Component, OnInit } from '@angular/core';

import { SummaryService } from '../shared/service';
import { ToastrService } from 'ngx-toastr';
import { ExportService } from '../shared/export.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.scss'],
})
export class PublishComponent implements OnInit {
  constructor(
    private modalService: NgbModal,
    private dataSvc: SummaryService,
    private toastrService: ToastrService,
    private ExportService: ExportService,
    config: NgbModalConfig,
    private fb: FormBuilder
  ) {
    config.backdrop = 'static';
    config.size = 'lg';
  }

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    width: 'auto',
    minWidth: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    sanitize: false,
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [['insertVideo']],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
  };

  configView: AngularEditorConfig = {
    editable: false,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    width: 'auto',
    minWidth: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    sanitize: false,
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [['insertVideo']],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
  };

  labwiseChartLoader = false;
  roleName: any;
  userInfo: any;
  ngOnInit(): void {
    this.labwiseChartLoader = false;
    /* API call get user info */
    this.dataSvc.GetUser().subscribe((res: any) => {
      debugger;
      console.log('userdeatils', res);
      this.userInfo = res;
      this.roleName = res?.Role;
    });
    this.getBroadcastList();
    this.getuserData();
  }
  userData: any;
  //**** Calling API for user data in table ****//
  getuserData() {
    this.labwiseChartLoader = false;
    this.dataSvc.getUserData().subscribe((res: any) => {
      this.userData = res;
      console.log(this.userData, 'user');
      this.labwiseChartLoader = true;
    });
  }
  broadcastList;
  getBroadcastList() {
    this.labwiseChartLoader = false;
    this.dataSvc.getBroadcastList().subscribe((res: any) => {
      if (res) {
        debugger;
        this.broadcastList = res;
        this.broadcastList.forEach((item) => (item['showFull'] = false));
        this.labwiseChartLoader = true;
      }
    });
  }
  downloadData() {
    this.ExportService.downloadBroadcastSummary(
      this.broadcastList,
      'Broadcast Summary Data'
    );
  }
  Subject = '';
  Content = '';
  modalReference: any;
  //*** calling add user data modal popup ****//
  AddRow(addmodal: any) {
    this.modalReference = this.modalService.open(addmodal);
  }

  /* open view broad cast message content */
  openEditorInfo(addmodal: any, data: any) {
    debugger;
    this.modalReference = this.modalService.open(addmodal);
    this.htmlContentView = data?.Content_with_html_tag;
  }

  userDetails: any;
  allocatitedTo = '';
  addedUserList = [];
  getUserDetails() {
    /*     let flag = this.checkUserExists();
    if (this.modal.user === '' || this.modal.user === undefined) {
      this.alertService.showWarning(
        'Kindly enter WWID/Email/Username to search.'
      );
    } else { */
    /* if (flag) { */
    const eightCharRegex = /(.{8})/;
    const matches = eightCharRegex.test(this.allocatitedTo.trim());
    if (matches) {
      if (!/^\d+$/.test(this.allocatitedTo.trim())) {
        var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        if (format.test(this.allocatitedTo.trim())) {
          var obj = {
            type: 'CorporateEmailTxt',
            values: this.allocatitedTo.trim(),
          };
        } else {
          var obj = {
            type: 'FullNm',
            values: this.allocatitedTo.trim(),
          };
        }
      }
      if (/^\d+$/.test(this.allocatitedTo.trim())) {
        var obj = {
          type: 'Wwid',
          values: this.allocatitedTo.trim(),
        };
      }

      /*    console.log('datatype', isNaN(this.allocatitedTo.trim()) === false);
      console.log('datatype', /^\d+$/.test(this.allocatitedTo.trim()));
      console.log('datatype', obj); */
      // let obj = {
      //   indentifier: this.modal.user.trim()
      // };
      this.labwiseChartLoader = false;
      this.dataSvc.getUserDetails(obj).subscribe(
        (res) => {
          debugger;
          if (res) {
            if (res['emailId'] === null || res['emailId'] === undefined) {
              this.labwiseChartLoader = true;
              this.toastrService.warning(
                'No users found with entered details, Kindly enter correct details!',
                'Warning'
              );
              /*  this.alertService.showWarning(
              'No users found with entered details, Kindly enter correct details!'
            ); */
            } else {
              this.labwiseChartLoader = true;
              this.userDetails = res;
              let result = {
                WWID: res['wwid'],
                Name: res['name'],
                Email: res['emailId'],
              };
              this.addedUserList.push(result);
              this.allocatitedTo = '';
            }
          } else {
            this.labwiseChartLoader = true;
            this.toastrService.warning(
              'No users found with entered details, Kindly enter correct details!',
              'Warning'
            );
          }
          //  this.loadRoles();
        },
        (error) => {
          debugger;
          this.labwiseChartLoader = true;
          if (error?.status === 204) {
            // Handle 204 No Content response
            //console.log('Received a 204 No Content response.');
            /* this.toastrService.warning(
              'Received a 204 No Content response.',
              'Warning'
            ); */
            this.toastrService.warning(
              'No users found with entered details, Kindly enter correct details!',
              'Warning'
            );
            this.labwiseChartLoader = true;
          } else if (error?.status === 404) {
            this.labwiseChartLoader = true;
            this.toastrService.warning(error?.message, 'Warning');
          } else {
            // Handle other errors
            // console.error('Error:', error);
            this.labwiseChartLoader = true;
            this.toastrService.warning(error?.message, 'Warning');
          }
        }
      );
    }
  }
  htmlContent = '';
  htmlContentView = '';
  AddUser() {
    let payload = {
      Subject: this.Subject,
      Content: this.htmlContent,
      BroadCast_by: [
        {
          WWID: this.userInfo?.wwid,
          Name: this.userInfo?.name,
          Email: this.userInfo?.emailId,
        },
      ],
      CreatedDate: '',
      NewUser: this.addedUserList,
    };
    debugger;
    this.modalReference.close();
    this.labwiseChartLoader = false;
    this.dataSvc.newBroadcastMail(payload).subscribe((res: any) => {
      if (res) {
        debugger;
        this.Subject = '';
        this.htmlContent = '';
        this.allocatitedTo = '';
        this.addedUserList = [];
        this.labwiseChartLoader = true;
        this.toastrService.success('Success!', 'Success!');
        this.getBroadcastList();
      }
    });
  }
  closeModal() {
    this.modalReference.close();
    this.Subject = '';
    this.htmlContent = '';
    this.allocatitedTo = '';
    this.addedUserList = [];
  }
  showFull = false;
  toggleReadMoreNew() {
    this.showFull = !this.showFull;
  }
  toggleReadMore(item: any) {
    item.showFull = !item.showFull;
  }
  removeTag(email, index) {
    this.addedUserList.splice(index, 1);
  }
}

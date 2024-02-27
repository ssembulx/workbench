import { Component, OnInit } from '@angular/core';

import { SummaryService } from '../shared/service';
import { ToastrService } from 'ngx-toastr';
import { ExportService } from '../shared/export.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
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
    config: NgbModalConfig
  ) {
    config.backdrop = 'static';
    config.size = 'lg';
  }
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
  AddUser() {
    let payload = {
      Subject: this.Subject,
      Content: this.Content,
      BroadCast_by: [
        {
          WWID: this.userInfo?.wwid,
          Name: this.userInfo?.name,
          Email: this.userInfo?.emailId,
        },
      ],
      CreatedDate: '',
    };
    debugger;
    
    this.modalReference.close();
    this.labwiseChartLoader = false;
    this.dataSvc.newBroadcastMail(payload).subscribe((res: any) => {
      if (res) {
        debugger;
        this.Subject = '';
        this.Content = '';
        this.labwiseChartLoader = true;
        this.toastrService.success('Success!', 'Success!');
        this.getBroadcastList();
      }
    });
  }
  toggleReadMore(item: any) {
    item.showFull = !item.showFull;
  }
}

import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { SummaryService } from '../shared/service';
import { ToastrService } from 'ngx-toastr';
import {
  NgbInputDatepicker,
  NgbModal,
  NgbModalConfig,
} from '@ng-bootstrap/ng-bootstrap';
import moment from 'moment';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.scss'],
})
export class ApproveComponent implements OnInit {
  orderMappedRelease: string = '';
  reverseMappedRelease: boolean = true;
  minDate: Date;
  maxDate: Date;
  constructor(
    private dataSvc: SummaryService,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    config: NgbModalConfig,
    private cd: ChangeDetectorRef,
    private fb: FormBuilder
  ) {
    config.backdrop = 'static';
    config.size = 'lg';
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate());

    this.maxDate = new Date(this.minDate);
    this.maxDate.setDate(this.minDate.getDate() + 365);
  }
  approvallist: any;
  labViewLoader = false;
  viewApprovalRequests() {
    this.dataSvc.viewApprovalRequests().subscribe((res) => {
      if (res) {
        this.labViewLoader = true;
        this.approvallist = res;
      }
    });
  }
  userName: any;
  roleName: any;
  userWWID: any;
  avatarURL: string;
  mailId: any;
  userIDSID: any;
  badge: any;
  userImage: any;
  userInfo: any;
  onChangeProgram(value: any) {
    this.dataSvc.getSKU({ ProgramShortName: value }).subscribe((res) => {
      if (res) {
        this.skuList = res;
      }
    });
  }
  form: FormGroup;
  @ViewChild('d') dp1: NgbInputDatepicker;

  toggle() {
    this.dp1.toggle();
  }
  ngOnInit(): void {
    this.form = this.fb.group({
      tag: [undefined],
    });
    this.dataSvc.GetUser().subscribe((res: any) => {
      console.log('userdeatils', res);
      this.userInfo = res;
      this.userName = res?.displayName;
      this.userImage = res?.avatarURL;
      this.userIDSID = res?.idsid;
      this.roleName = res?.Role;
      this.userWWID = res?.wwid;
      this.mailId = res?.emailId;
      console.log(res);
    });
    this.viewApprovalRequests();
    this.dataSvc.getProgram().subscribe((res) => {
      if (res) {
        this.programList = res;
      }
    });
    this.dataSvc.getVendor().subscribe((res) => {
      if (res) {
        this.vendorList = res;
      }
    });
    this.dataSvc.getTeam().subscribe((res) => {
      if (res) {
        this.teamList = res;
      }
    });
  }
  //**** Sorting functionality in table(ascending descending order) ****//
  setOrderRelease(value: string) {
    if (this.orderMappedRelease === value) {
      this.reverseMappedRelease = !this.reverseMappedRelease;
    }
    this.orderMappedRelease = value;
  }
  reason = '';
  rejectBench() {
    this.labViewLoader = false;
    let finalResult: any = {};
    this.finalResultList = [];
    /*  this.approveBenchList.forEach((element: any, index: any) => {
      finalResult = {
        Program: element.Program,
        Sku: element.Sku,
        Vendor: element.Vendor,
        Team: element.Team,
        FromWW: element.FromWW,
        ToWW: element.ToWW,
        AllocatedTo: element.AllocatedTo,
        NotifyTo: element.NotifyTo,
        NumberOfBenches: element.NumberOfbenches,
        Remarks: element.Remarks,
        IsAllocated: false,
        IsRequested: true,
        LabName: element.Location__Name,
        BenchData: element.BenchData,
        Duration: element.Duration,
        id: element.id,
        Reason: this.reason,
      };
      // delete element['id'];
      this.finalResultList.push(finalResult);
    }); */
    let requestIdList = {
      requestIdList: this.approveBenchList,
      Reason: this.reason,
      rejectedBy: this.userName,
    };
    this.closeReject();
    this.dataSvc.rejectBenchList(requestIdList).subscribe((res) => {
      if (res) {
        this.labViewLoader = true;
        // this.closeReject();
        this.viewApprovalRequests();
        this.approveBenchList = [];
        this.toastrService.success(
          'Allocation Rejected Successfully',
          'Success!'
        );
      }
    });
  }
  finalResultList: any = [];

  approveBench() {
    this.labViewLoader = false;
    let finalResult: any = {};
    this.finalResultList = [];
    /*  this.approveBenchList.forEach((element: any, index: any) => {
      finalResult = {
        Program: element.Program,
        Sku: element.Sku,
        Vendor: element.Vendor,
        Team: element.Team,
        FromWW: element.FromWW,
        ToWW: element.ToWW,
        AllocatedTo: element.AllocatedTo,
        NotifyTo: element.NotifyTo,
        NumberOfBenches: element.NumberOfbenches,
        Remarks: element.Remarks,
        IsAllocated: true,
        IsRequested: false,
        LabName: element.Location__Name,
        BenchData: element.BenchData,
        Duration: element.Duration,
        id: element.id,
      };
      // delete element['id'];
      this.finalResultList.push(finalResult);
    }); */
    let requestIdList = {
      requestIdList: this.approveBenchList,
      approvedBy: this.userName,
    };
    this.dataSvc.approveBenchList(requestIdList).subscribe((res) => {
      if (res) {
        this.labViewLoader = true;
        this.viewApprovalRequests();
        this.approveBenchList = [];
        this.toastrService.success(
          'Allocation Approved Successfully',
          'Success!'
        );
      }
    });
  }
  approveBenchList: any = [];
  checkRow(data: any, id: any, event: any) {
    debugger;
    if (event.currentTarget.checked == true) {
      // this.approveBenchList.push(data);
      this.approveBenchList.push(id);
      if (this.approvallist.length == this.approveBenchList.length) {
        this.isCheckedAll = true;
      } else {
        this.isCheckedAll = false;
      }
    } else if (event.currentTarget.checked == false) {
      this.approveBenchList.forEach((element: any, index: any) => {
        /* if (element.id == id) { */
        if (element == id) {
          this.approveBenchList.splice(index, 1);
        }
      });
      if (this.approvallist.length == this.approveBenchList.length) {
        this.isCheckedAll = true;
      } else {
        this.isCheckedAll = false;
      }
    }
    /*   if (this.approveBenchList.length === 0) {
      this.approveBenchList.push(data);
    } else {
      this.approveBenchList.forEach((element: any, index: any) => {
        if (element.id == id) {
          this.approveBenchList.splice(index, 1);
        } else {
          this.approveBenchList.push(data);
        }
      });
    } */
    console.log(this.approveBenchList);
  }

  @ViewChild('rejectModel') rejectModel: ElementRef;
  modalReference: any;
  openReject() {
    this.modalReference = this.modalService.open(this.rejectModel);
  }

  closeReject() {
    this.reason = '';
    this.modalReference.close();
  }

  isChecked = false;
  isCheckedAll = false;
  checkAll(event: any) {
    if (event.currentTarget.checked == true) {
      this.isChecked = false;
      this.cd.detectChanges();
      this.approveBenchList = [];
      this.approvallist.forEach((element: any) => {
        this.approveBenchList.push(element.id);
      });
      this.isChecked = true;
    } else if (event.currentTarget.checked == false) {
      this.isChecked = false;
      this.approveBenchList = [];
    }
  }

  @ViewChild('editApproveModel') editApproveModel: ElementRef;
  editdata: any;
  editView = false;
  cancelEditView() {
    this.editView = false;
  }
  openEditApprovalReject(data: any) {
    debugger;
    this.editView = true;
    this.editdata = data;
    this.dataSvc
      .getSKU({ ProgramShortName: this.editdata?.Program })
      .subscribe((res) => {
        if (res) {
          this.skuList = res;
          this.skuName = this.editdata?.Sku;
        }
      });
    this.teamName = this.editdata?.Team;
    this.programName = this.editdata?.Program;
    this.vendorName = this.editdata?.Vendor;
    this.duration = this.editdata?.Duration;
    this.remarks = this.editdata?.Remarks;
    debugger;
    /*  const weekNumber = this.editdata?.FromWW.slice(0, 2);
    const date = moment()
      .week(weekNumber)
      .startOf('isoWeek')
      .format('YYYY-MM-DD'); */
    this.fromworkweek =
      this.editdata?.FromWW.slice(0, 2) + "'" + this.editdata?.FromWW.slice(2);
    this.toworkweek =
      this.editdata?.ToWW.slice(0, 2) + "'" + this.editdata?.ToWW.slice(2);
    // this.modalReference = this.modalService.open(this.editApproveModel);
  }
  programList: any;
  skuList: any;
  vendorList: any;
  teamList: any;
  programName: any = '';
  skuName: any = '';
  vendorName: any = '';
  teamName: any = '';
  allocatitedTo = '';
  notifyTo = '';
  fromWW = '';
  toWW = '';
  remarks = '';

  editRow(data: any) {
    debugger;
  }

  updateBench() {
    if (this.teamName == '') {
      this.toastrService.warning('Please select Team', 'Warning');
    } else if (this.programName == '') {
      this.toastrService.warning('Please select Program', 'Warning');
    } else if (this.skuName == '') {
      this.toastrService.warning('Please select SKU', 'Warning');
    } else if (this.vendorName == '') {
      this.toastrService.warning('Please select Vendor', 'Warning');
    } else if (this.fromworkweek == '') {
      this.toastrService.warning('Please select From WW', 'Warning');
    } else if (this.toworkweek == '') {
      this.toastrService.warning('Please select To WW', 'Warning');
    } else if (this.durationNum < 0) {
      this.toastrService.warning(
        'The duration should not be negative',
        'Warning'
      );
    } else if (this.remarks == '') {
      this.toastrService.warning('Please enter remarks', 'Warning');
    } else {
      debugger;
      this.editdata.Team = this.teamName;
      this.editdata.Program = this.programName;
      this.editdata.Vendor = this.vendorName;
      this.editdata.Sku = this.skuName;
      this.editdata.FromWW = this.fromformatWW;
      this.editdata.ToWW = this.toformatWW;
      this.editdata.Duration = this.duration;
      this.editdata.Remarks = this.remarks;

      let requestIdList = [this.editdata];
      this.labViewLoader = false;
      this.dataSvc.editApprovalRequests(requestIdList).subscribe((res) => {
        if (res) {
          debugger;
          //this.modalReference.close();
          this.editView = false;
          this.labViewLoader = true;
          this.viewApprovalRequests();
          this.toastrService.success(
            'Approve Request Updated Successfully',
            'Success!'
          );
        }
      });
    }
  }

  /* work week calendar */
  fromworkweek: any = '';
  fromformatWW: any = '';

  selectedFromWorkWeek: Date;

  toworkweek: any = '';
  toworkweekExtend: any = '';
  toformatWW: any = '';
  toformatWWExtend: any = '';

  selectedToWorkWeek: Date;
  selectedToWorkWeekExtend: Date;

  bsValueFrom = new Date();
  bsRangeValueFrom: Date[];
  bsValueTo = new Date();
  bsRangeValueTo: Date[];
  bsValueToExtend = new Date();
  bsRangeValueToExtend: Date[];
  toselWeekExtend: any;
  fromselWeek: any;
  Durationextend: any = 0;
  durationNum: any;
  /*  onDateSelectToExtend(date: any) {
    debugger;
    this.toselWeekExtend = '';
    if (date !== undefined || date !== null || date !== '') {
      var selDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );
      let week = moment(selDate).week();
      let month = moment(selDate).month();
      let year = moment(selDate).year();
      
      if (week < 10) {
        this.toselWeekExtend = ('0' + week).slice(-2);
      } else {
        this.toselWeekExtend = week;
      }
      if (month === 11 && week === 1) {
        year = year + 1;
      }
      this.toworkweekExtend = this.toselWeekExtend + "'" + year.toString();
      this.toformatWWExtend = (this.toselWeekExtend + "'" + year)
        .toString()
        .split("'")
        .join()
        .replace(',', '');
    }
    this.Durationextend =
      this.toselWeekExtend -
      this.extendLabDetails[0]?.FromWW.slice(0, 2) +
      ' Week';
  } */
  onDateSelectFromDate: any;
  yearonDateSelectFrom: any;
  onDateSelectFrom(date: any) {
    this.fromselWeek = '';
    if (date !== undefined && date !== null) {
      this.onDateSelectFromDate = moment(date);
      var selDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );
      let week = moment(selDate).week();
      let month = moment(selDate).month();
      this.yearonDateSelectFrom = moment(selDate).year();
      /* let selWeek; */
      if (week < 10) {
        this.fromselWeek = ('0' + week).slice(-2);
      } else {
        this.fromselWeek = week;
      }
      if (month === 11 && week === 1) {
        this.yearonDateSelectFrom = this.yearonDateSelectFrom + 1;
      }
      this.fromworkweek =
        this.fromselWeek + "'" + this.yearonDateSelectFrom.toString();
      this.fromformatWW = (this.fromselWeek + "'" + this.yearonDateSelectFrom)
        .toString()
        .split("'")
        .join()
        .replace(',', '');
    }
  }
  duration: any;
  toselWeek: any;
  onDateSelectToDate: any;
  yearonDateSelectTo: any;
  onDateSelectTo(date: any) {
    debugger;
    this.toselWeek = '';
    if (date !== undefined && date !== null) {
      this.onDateSelectToDate = moment(date);
      var selDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );
      let week = moment(selDate).week();
      let month = moment(selDate).month();
      this.yearonDateSelectTo = moment(selDate).year();
      let day = moment(selDate).day();
      /* let selWeek; */
      if (week < 10) {
        this.toselWeek = ('0' + week).slice(-2);
      } else {
        this.toselWeek = week;
      }
      if (month === 11 && week === 1) {
        this.yearonDateSelectTo = this.yearonDateSelectTo + 1;
      }
      this.toworkweek =
        this.toselWeek + "'" + this.yearonDateSelectTo.toString();
      this.toformatWW = (this.toselWeek + "'" + this.yearonDateSelectTo)
        .toString()
        .split("'")
        .join()
        .replace(',', '');
    }
    if (this.yearonDateSelectFrom != undefined) {
      if (this.yearonDateSelectFrom != this.yearonDateSelectTo) {
        this.durationNum = this.toselWeek + this.fromselWeek;
        if (this.durationNum == 0) {
          this.duration = this.onDateSelectToDate.diff(
            this.onDateSelectFromDate,
            'days'
          );
          if (this.duration < 0) {
            this.toastrService.warning(
              'The duration should not be negative',
              'Warning'
            );
            this.toworkweek = '';
            this.duration = '';
          } else if (this.duration == 0) {
            this.duration = this.duration + 1 + ' day';
          } else {
            this.duration = this.duration + 1 + ' days';
          }
        } else if (this.durationNum < 0) {
          this.toastrService.warning(
            'The duration should not be negative',
            'Warning'
          );
        } else {
          this.duration =
            parseInt(this.toselWeek) + (52 - this.fromselWeek) + 1 + ' Week';
        }
      } else {
        this.durationNum = this.toselWeek - this.fromselWeek;
        if (this.durationNum == 0) {
          this.duration = this.onDateSelectToDate.diff(
            this.onDateSelectFromDate,
            'days'
          );
          if (this.duration < 0) {
            this.toastrService.warning(
              'The duration should not be negative',
              'Warning'
            );
            this.toworkweek = '';
            this.duration = '';
          } else if (this.duration == 0) {
            this.duration = this.duration + 1 + ' day';
          } else {
            this.duration = this.duration + 1 + ' days';
          }
        } else if (this.durationNum < 0) {
          this.toastrService.warning(
            'The duration should not be negative',
            'Warning'
          );
        } else {
          this.duration = this.toselWeek - this.fromselWeek + 1 + ' Week';
        }
      }
    }
  }
}

import { any } from '@amcharts/amcharts5/.internal/core/util/Array';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SummaryService } from '../shared/service';
import moment from 'moment';
@Component({
  selector: 'app-vpg-lab',
  templateUrl: './vpg-lab.component.html',
  styleUrls: ['./vpg-lab.component.scss'],
})
export class VPGLabComponent implements OnInit, OnChanges {
  @Input() defaultValue: string;
  public seatConfig: any = null;

  public seatmap: any = [];

  public seatChartConfig = {
    showRowsLabel: false,

    showRowWisePricing: false,

    newSeatNoForRow: false,
  };

  public cart: any = {
    selectedSeatsNo: [],
    selectedSeats: [],
    seatstoStore: [],
    seatsLabelNo: [],
    totalamount: 0,
    cartId: '',
    eventId: 0,
  };
  labViewLoader = false;
  title = 'seat-chart-generator';
  constructor(
    private modalService: NgbModal,
    config: NgbModalConfig,
    private toastrService: ToastrService,
    private dataSvc: SummaryService
  ) {
    this.labViewLoader = false;
    config.backdrop = 'static';
    config.size = 'lg';
  }
  /* parentLabDetails: any = {}; */
  @Output() parentLabDetailsCreated = new EventEmitter<any>();
  programList: any;
  skuList: any;
  vendorList: any;
  teamList: any;
  programName: any = '';
  skuName: any = '';
  vendorName: any = '';
  teamName: any = '';
  allocatitedTo = '';
  fromWW = '';
  toWW = '';
  remarks = '';
  onChangeProgram(value: any) {
    this.dataSvc.getSKU({ ProgramName: value }).subscribe((res) => {
      if (res) {
        this.skuList = res;
      }
    });
  }

  getLabDetails() {
    this.labViewLoader = false;
    this.dataSvc
      .getLabDetails({ LabName: this.defaultValue })
      .subscribe((res) => {
        if (res) {
          this.labViewLoader = true;
          let response: any = res;
          this.parentLabDetailsCreated.emit(response);
          this.seatmap = response.BenchDetails;
        }
      });
  }
  ngOnChanges(changes: SimpleChanges) {
    debugger;
    this.labViewLoader = true;
    let lab = changes?.['defaultValue']?.['currentValue'];
    if (lab.toString() == 'SRR-2-CRD16') {
      this.seatmap = [];
      this.seatConfig = [
        {
          seat_price: 250,
          seat_map: [
            {
              seat_label: 'A',
              layout: 'gggg_ggggg',
              direction: 'dddddddddd',
              labelNo: 'C9,C8,C7,C6,_,C5,C4,C3,C2,C1',
              Team: 'SIV,SIV,SIV,SIV,_,SIV,SIV,SIV,SIV,SIV',
            },
            {
              seat_label: 'B',
              layout: 'gggggggggg',
              direction: 'dddddddddd',
              labelNo: 'B20,B19,B18,B17,B16,B15,B14,B13,B12,B11',
              Team: 'SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV',
            },
            {
              seat_label: 'C',
              layout: 'gggggggggg',
              direction: 'dddddddddd',
              labelNo: 'B10,B9,B8,B7,B6,B5,B4,B3,B2,B1',
              Team: 'SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV',
            },
            {
              seat_label: 'D',
              layout: 'gggggggggg',
              direction: 'dddddddddd',
              labelNo: 'A10,A9,A8,A7,A6,A5,A4,A3,A2,A1',
              Team: 'SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV',
            },
          ],
        },
      ];
      this.processSeatChart(this.seatConfig);
    } else if (lab.toString() == 'SRR-2-CRD 5') {
      this.seatmap = [];
      this.seatConfig = [
        {
          seat_price: 250,
          seat_map: [
            {
              seat_label: 'A',
              layout: 'gggggggg',
              direction: 'dddddddd',
              labelNo: 'A8,A7,A6,A5,A4,A3,A2,A1',
              Team: 'SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV',
            },
            {
              seat_label: 'B',
              layout: 'gggggggg',
              direction: 'dddddddd',
              labelNo: 'A9,A10,A11,A12,A13,A14,A15,A16',
              Team: 'SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV',
            },
          ],
        },
      ];
      this.processSeatChart(this.seatConfig);
    } else if (lab.toString() == 'SRR2-1F CRD-4-BA-SRR2') {
      // this.getLabDetails();
    } else if (lab.toString() == 'SRR-1-CRD15_ VPG LINUX') {
      this.seatmap = [];
      this.seatConfig = [
        {
          seat_price: 250,
          seat_map: [
            {
              seat_label: 'A',
              layout: 'gggg_g',
              direction: 'dddddd',
              labelNo: 'A4,A3,A2,A1,_,A10',
              Team: 'SIV,SIV,SIV,SIV,_,SIV',
            },
            {
              seat_label: 'B',
              layout: 'gggg_g',
              direction: 'dddddd',
              labelNo: 'A5,A6,A7,A8,_,A9',
              Team: 'SIV,SIV,SIV,SIV,_,SIV',
            },
          ],
        },
      ];
      this.processSeatChart(this.seatConfig);
    }
  }
  ngOnInit(): void {
    // this.getLabDetails();
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
    this.seatConfig = [
      {
        seat_price: 250,
        seat_map: [
          {
            seat_label: 'A',
            layout: 'gggggggg___',
            direction: 'dddddddd___',
            labelNo: 'A8,A7,A6,A5,A4,A3,A2,A1,_,_,_',
            Team: 'Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,_,_,_',
          },
          {
            seat_label: 'B',
            layout: 'gggggggg___',
            direction: 'uuuuuuuu___',
            labelNo: 'A9,A10,A11,A12,A13,A14,A15,A16,_,_,_',
            Team: 'Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,_,_,_',
          },
          {
            seat_label: 'C',
            layout: 'ggggggggg__',
            direction: 'uuuuuuuuu__',
            labelNo: 'B9,B8,B7,B6,B5,B4,B3,B2,B1,_,_',
            Team: 'Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,_,_',
          },
          {
            seat_label: 'D',
            layout: 'ggggggggggg',
            direction: 'ddddddddddd',
            labelNo: 'B10,B11,B12,B13,B14,B15,B16,B17,B18,B19,B20',
            Team: 'Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV',
          },
          {
            seat_label: 'E',
            layout: 'ggggg_ggggg',
            direction: 'uuuuu_uuuuu',
            labelNo: 'C9,C8,C7,C6,C5,_,C4,C3,C2,C1,C0',
            Team: 'Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,_,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV',
          },
          {
            seat_label: 'F',
            layout: 'ggggggggggg',
            direction: 'ddddddddddd',
            labelNo: 'C10,C11,C12,C13,C14,C15,C16,C17,C18,C19,C20',
            Team: 'Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,SIV,SIV,SIV,SIV,SIV,SIV',
          },
          {
            seat_label: 'G',
            layout: 'ggggggggggg',
            direction: 'ddddddddddd',
            labelNo: 'D10,D9,D8,D7,D6,D5,D4,D3,D2,D1,D0',
            Team: 'SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV',
          },
          {
            seat_label: 'H',
            layout: 'ggggggggggg',
            direction: 'uuuuuuuuuuu',
            labelNo: 'D11,D12,D13,D14,D15,D16,D17,D18,D19,D20,D21',
            Team: 'SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV',
          },
          {
            seat_label: 'I',
            layout: 'ggggg______',
            direction: 'uuuuu______',
            labelNo: 'D22,D23,D24,D25,D26,_,_,_,_,_,_',
            Team: 'SIV,SIV,SIV,SIV,SIV,_,_,_,_,_,_',
          },
          {
            seat_label: 'J',
            layout: 'gggg_gggggg',
            direction: 'dddd_dddddd',
            labelNo: 'E11,E10,E9,E8,_,E6,E5,E4,E3,E2,E1',
            Team: 'SIV,SIV,SIV,SIV,_,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV',
          },
          {
            seat_label: 'K',
            layout: 'ggggggggggg',
            direction: 'ddddddddddd',
            labelNo: 'E12,E13,E14,E15,E16,E17,E18,E19,E20,E21,E22',
            Team: 'SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV',
          },
          {
            seat_label: 'L',
            layout: 'ggggggggggg',
            direction: 'ddddddddddd',
            labelNo: 'F11,F10,F9,F8,F7,F6,F5,F4,F3,F2,F1',
            Team: 'SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV',
          },
          {
            seat_label: 'M',
            layout: 'ggggg_ggggg',
            direction: 'ddddd_ddddd',
            labelNo: 'F12,F13,F14,F15,F16,_,F17,F18,F19,F20,F21',
            Team: 'SIV,SIV,SIV,SIV,SIV,_,SIV,SIV,SIV,SIV,SIV',
          },
          {
            seat_label: 'N',
            layout: 'ggggggggggg',
            direction: 'ddddddddddd',
            labelNo: 'G11,G10,G9,G8,G7,G6,G5,G4,G3,G2,G1',
            Team: 'SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV',
          },

          {
            seat_label: 'O',
            layout: 'ggggggggggg',
            direction: 'ddddddddddd',
            labelNo: 'G12,G13,G14,G15,G16,G17,G18,G19,G20,G21,G22',
            Team: 'SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV',
          },
          {
            seat_label: 'P',
            layout: 'ggggggggggg',
            direction: 'ddddddddddd',
            labelNo: 'H11,H10,H9,H8,H7,H6,H5,H4,H3,H2,H1',
            Team: 'SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV',
          },
          {
            seat_label: 'Q',
            layout: 'ggggggggggg',
            direction: 'ddddddddddd',
            labelNo: 'H12,H13,H14,H15,H16,H17,H18,H19,H20,H21,H22',
            Team: 'SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV',
          },
        ],
      },
    ];
    this.processSeatChart(this.seatConfig);
    /* this.blockSeats('A_1,C_6,F_7');
    this.blockSeatsNonSiv('D_4,D_6,G_9'); */
  }

  public processSeatChart(map_data: any[]) {
    if (map_data.length > 0) {
      var seatNoCounter = 1;
      for (let __counter = 0; __counter < map_data.length; __counter++) {
        var row_label = '';
        var item_map = map_data[__counter].seat_map;

        //Get the label name and price
        /*         row_label = "Row " + item_map[0].seat_label + " - ";
                if (item_map[item_map.length - 1].seat_label != " ") {
                  row_label += item_map[item_map.length - 1].seat_label;
                } else {
                  row_label += item_map[item_map.length - 2].seat_label;
                }
                row_label += " : Rs. " + map_data[__counter].seat_price; */

        item_map.forEach((map_element: any) => {
          var mapObj: any = {
            seatRowLabel: map_element.seat_label,
            seats: [],
          };
          row_label = '';
          var seatValArr = map_element.layout.split('');

          var seatDirArr = map_element.direction.split('');

          var labelNoArr = map_element.labelNo.split(',');
          var teamArr = map_element.Team.split(',');

          if (this.seatChartConfig.newSeatNoForRow) {
            seatNoCounter = 1; //Reset the seat label counter for new row
          }
          var totalItemCounter = 1;
          seatValArr.forEach((item: any, index: any) => {
            var seatObj: any = {
              key: map_element.seat_label + '_' + totalItemCounter,
              BenchName: map_element.seat_label + '_' + totalItemCounter,
              /* price: map_data[__counter]["seat_price"], */
              status: 'available',
              IsAllocated: false,
              IsRequested: false,
              AllocationData: null,
              /*  labelNo: '',
              team: '', */
            };

            if (item != '_') {
              seatObj['seatLabel'] =
                map_element.seat_label + ' ' + seatNoCounter;
              seatObj['BenchName'] =
                map_element.seat_label + '_' + totalItemCounter;
              seatObj['dir'] = seatDirArr[index];
              /*   if (seatNoCounter < 10) {
                seatObj['seatNo'] = '0' + seatNoCounter;
              } else { */
              seatObj['seatNo'] = '' + seatNoCounter;
              /* } */

              seatObj['labelNo'] = labelNoArr[index];
              seatObj['team'] = teamArr[index];

              seatNoCounter++;
            } else {
              seatObj['seatLabel'] = '';
              seatObj['BenchName'] = '';
              seatObj['dir'] = '';
              seatObj['seatNo'] = '';
              seatObj['labelNo'] = '';
              seatObj['team'] = '';
            }
            totalItemCounter++;

            /*  seatDirArr.forEach((element:any,index:any) => {
               if (element != "_") {
                 seatObj["dir"]=element;
               }
             }); */
            mapObj['seats'].push(seatObj);
          });
          console.log(' \n\n\n Seat Objects ', mapObj);

          this.seatmap.push(mapObj);
        });
      }
    }
    console.log('total1', this.seatmap);
  }

  public selectSeat(seatObject: any) {
    console.log('Seat to block: ', seatObject);
    if (
      seatObject.status != 'selected' &&
      seatObject.IsAllocated === false &&
      seatObject.IsRequested === false
    ) {
      seatObject.status = 'selected';
      this.cart.selectedSeats.push(seatObject.seatLabel);
      this.cart.selectedSeatsNo.push(seatObject.seatNo);
      this.cart.seatstoStore.push(seatObject.key);
      this.cart.seatsLabelNo.push(seatObject.labelNo);
      this.cart.totalamount += seatObject.price;
    } else if (
      seatObject.status == 'selected' &&
      seatObject.IsAllocated === false &&
      seatObject.IsRequested === false
    ) {
      seatObject.status = 'available';
      var seatIndex = this.cart.selectedSeats.indexOf(seatObject.seatLabel);
      if (seatIndex > -1) {
        this.cart.selectedSeats.splice(seatIndex, 1);
        this.cart.selectedSeatsNo.splice(seatIndex, 1);
        this.cart.seatstoStore.splice(seatIndex, 1);
        this.cart.seatsLabelNo.splice(seatIndex, 1);
        this.cart.totalamount -= seatObject.price;
      }
    }
  }

  public blockSeats(seatsToBlock: string) {
    if (seatsToBlock != '') {
      var seatsToBlockArr = seatsToBlock.split(',');
      for (let index = 0; index < seatsToBlockArr.length; index++) {
        var seat = seatsToBlockArr[index] + '';
        var seatSplitArr = seat.split('_');
        console.log('Split seat: ', seatSplitArr);
        for (let index2 = 0; index2 < this.seatmap.length; index2++) {
          const element = this.seatmap[index2];
          if (element.seatRowLabel == seatSplitArr[0]) {
            var seatObj = element.seats[parseInt(seatSplitArr[1]) - 1];
            if (seatObj) {
              console.log('\n\n\nFount Seat to block: ', seatObj);
              seatObj['status'] = 'unavailable';
              this.seatmap[index2]['seats'][parseInt(seatSplitArr[1]) - 1] =
                seatObj;
              console.log('\n\n\nSeat Obj', seatObj);
              console.log(
                this.seatmap[index2]['seats'][parseInt(seatSplitArr[1]) - 1]
              );
              break;
            }
          }
        }
      }
    }
  }

  public blockSeatsNonSiv(seatsToBlock: string) {
    if (seatsToBlock != '') {
      var seatsToBlockArr = seatsToBlock.split(',');
      for (let index = 0; index < seatsToBlockArr.length; index++) {
        var seat = seatsToBlockArr[index] + '';
        var seatSplitArr = seat.split('_');
        console.log('Split seat: ', seatSplitArr);
        for (let index2 = 0; index2 < this.seatmap.length; index2++) {
          const element = this.seatmap[index2];
          if (element.seatRowLabel == seatSplitArr[0]) {
            var seatObj = element.seats[parseInt(seatSplitArr[1]) - 1];
            if (seatObj) {
              console.log('\n\n\nFount Seat to block: ', seatObj);
              seatObj['status'] = 'non-siv';
              this.seatmap[index2]['seats'][parseInt(seatSplitArr[1]) - 1] =
                seatObj;
              console.log('\n\n\nSeat Obj', seatObj);
              console.log(
                this.seatmap[index2]['seats'][parseInt(seatSplitArr[1]) - 1]
              );
              break;
            }
          }
        }
      }
    }
  }

  callSingleTop(i: any, j: any) {
    if (i == 1) {
      return j == 0 || j == 1 || j == 2 ? true : false;
    } else if (i == 0) {
      return j == 3 || j == 4 ? true : false;
    } else {
      return false;
    }
  }
  callSingleLeft(i: any, j: any) {
    if (i == 0) {
      return j == 3 ? true : false;
    } else {
      return false;
    }
  }
  callSingleTopDashed(i: any, j: any) {
    if (i == 0) {
      return j == 5 ? true : false;
    } else {
      return false;
    }
  }

  modalReference: any;
  processBooking(addmodal: any) {
    this.programName = '';
    this.skuName = '';
    this.vendorName = '';
    this.allocatitedTo = '';
    this.fromWW = '';
    this.toWW = '';
    this.remarks = '';
    this.modalReference = this.modalService.open(addmodal);
  }
  saveBooking() {
    let bookingData = {
      Program: this.programName,

      LabName: this.defaultValue,

      Sku: this.skuName,

      Vendor: this.vendorName,

      AllocatedTo: this.userDetails,

      FromWW: this.fromformatWW,

      ToWW: this.toformatWW,

      Remarks: this.remarks,

      IsAllocated: false,

      IsRequested: true,

      NumberOfBenches: this.cart?.selectedSeats?.length,

      BenchData: this.cart.seatstoStore,

      Team: this.teamName,

      Duration: this.duration,
    };
    this.dataSvc.saveBooking(bookingData).subscribe((res) => {
      if (res) {
        //  this.skuList = res;
        //  this.modalReference.close();
        this.toastrService.success(
          'Allocation Request Added Successfully',
          'Success!'
        );
        this.getLabDetails();
        this.cart = {
          selectedSeatsNo: [],

          selectedSeats: [],

          seatstoStore: [],

          seatsLabelNo: [],

          totalamount: 0,

          cartId: '',

          eventId: 0,
        };
        this.closePopup();
      }
    });
  }
  closePopup() {
    //  this.modalReference.close();
    this.programName = '';
    this.skuName = '';
    this.vendorName = '';
    this.allocatitedTo = '';
    this.fromWW = '';
    this.toWW = '';
    this.remarks = '';
    this.toworkweek = '';
    this.fromworkweek = '';
  }
  trackByIds(index: number, item: any) {
    return item.id;
  }
  /* work week calendar */
  fromworkweek: any = '';
  fromformatWW: any = '';

  selectedFromWorkWeek: Date;

  toworkweek: any = '';
  toformatWW: any = '';

  selectedToWorkWeek: Date;

  bsValueFrom = new Date();
  bsRangeValueFrom: Date[];
  bsValueTo = new Date();
  bsRangeValueTo: Date[];
  fromselWeek: any;
  onDateSelectFrom(date: any) {
    this.fromselWeek = '';
    if (date !== undefined && date !== null) {
      var selDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );
      let week = moment(selDate).week();
      let month = moment(selDate).month();
      let year = moment(selDate).year();
      /* let selWeek; */
      if (week < 10) {
        this.fromselWeek = ('0' + week).slice(-2);
      } else {
        this.fromselWeek = week;
      }
      if (month === 11 && week === 1) {
        year = year + 1;
      }
      this.fromworkweek = this.fromselWeek + "'" + year.toString();
      this.fromformatWW = (this.fromselWeek + "'" + year)
        .toString()
        .split("'")
        .join()
        .replace(',', '');
    }
  }
  duration: any;
  toselWeek: any;
  onDateSelectTo(date: any) {
    this.toselWeek = '';
    if (date !== undefined && date !== null) {
      var selDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );
      let week = moment(selDate).week();
      let month = moment(selDate).month();
      let year = moment(selDate).year();
      /* let selWeek; */
      if (week < 10) {
        this.toselWeek = ('0' + week).slice(-2);
      } else {
        this.toselWeek = week;
      }
      if (month === 11 && week === 1) {
        year = year + 1;
      }
      this.toworkweek = this.toselWeek + "'" + year.toString();
      this.toformatWW = (this.toselWeek + "'" + year)
        .toString()
        .split("'")
        .join()
        .replace(',', '');
    }
    this.duration = this.toselWeek - this.fromselWeek + ' Week';
  }
  modal: any = {
    flag: '',
    userId: '',
    fk_RoleId: '',
    emailId: '',
    name: '',
    idsid: '',
    employeeBadgeType: '',
    wwid: '',
    createdBy: '',
  };
  /*   checkUserExists() {
    let flag = true;
    this.userList.forEach(el => {
      if (this.modal.user.trim() === el.wwid.toString() || this.modal.user.trim() === el.idsid || this.modal.user.trim() === el.emailId) {
        flag = false;
      }
    });
    return flag;
  } */
  userDetails:any;
  getUserDetails() {
    /*     let flag = this.checkUserExists();
    if (this.modal.user === '' || this.modal.user === undefined) {
      this.alertService.showWarning(
        'Kindly enter WWID/Email/Username to search.'
      );
    } else { */
    /* if (flag) { */
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

    this.dataSvc.getUserDetails(obj).subscribe((res) => {
      if (res['name'] === null || res['name'] === undefined) {
        this.toastrService.success(
          'No users found with entered details, Kindly enter correct details!',
          'Success!'
        );
        /*  this.alertService.showWarning(
          'No users found with entered details, Kindly enter correct details!'
        ); */
      } else {
        this.userDetails = res;
        this.allocatitedTo = res['name'];
      }
      //  this.loadRoles();
    });
  }
}

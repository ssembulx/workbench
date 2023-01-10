import { any } from '@amcharts/amcharts5/.internal/core/util/Array';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SummaryService } from '../shared/service';
import moment from 'moment';
@Component({
  selector: 'app-vpg-lab',
  templateUrl: './vpg-lab.component.html',
  styleUrls: ['./vpg-lab.component.scss'],
})
export class VPGLabComponent implements OnInit {
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
  ngOnInit(): void {
    this.getLabDetails();
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
    /*  this.seatConfig = [
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
            layout: '___________',
            direction: '___________',
            labelNo: '_,_,_,_,_,_,_,_,_,_,_',
            Team: '_,_,_,_,_,_,_,_,_,_,_',
          },
          {
            seat_label: 'D',
            layout: 'ggggggggg__',
            direction: 'uuuuuuuuu__',
            labelNo: 'B9,B8,B7,B6,B5,B4,B3,B2,B1,_,_',
            Team: 'Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,_,_',
          },
          {
            seat_label: 'E',
            layout: 'ggggggggggg',
            direction: 'ddddddddddd',
            labelNo: 'B10,B11,B12,B13,B14,B15,B16,B17,B18,B19,B20',
            Team: 'Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV',
          },
          {
            seat_label: 'F',
            layout: '___________',
            direction: '___________',
            labelNo: '_,_,_,_,_,_,_,_,_,_,_',
            Team: '_,_,_,_,_,_,_,_,_,_,_',
          },
          {
            seat_label: 'G',
            layout: 'ggggg_ggggg',
            direction: 'uuuuu_uuuuu',
            labelNo: 'C9,C8,C7,C6,C5,_,C4,C3,C2,C1,C0',
            Team: 'Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,_,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV',
          },
          {
            seat_label: 'H',
            layout: 'ggggggggggg',
            direction: 'ddddddddddd',
            labelNo: 'C10,C11,C12,C13,C14,C15,C16,C17,C18,C19,C20',
            Team: 'Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,SIV,SIV,SIV,SIV,SIV,SIV',
          },
          {
            seat_label: 'I',
            layout: '___________',
            direction: '___________',
            labelNo: '_,_,_,_,_,_,_,_,_,_,_',
            Team: '_,_,_,_,_,_,_,_,_,_,_',
          },
          {
            seat_label: 'J',
            layout: 'ggggggggggg',
            direction: 'ddddddddddd',
            labelNo: 'D10,D9,D8,D7,D6,D5,D4,D3,D2,D1,D0',
            Team: 'SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV',
          },
          {
            seat_label: 'K',
            layout: 'ggggggggggg',
            direction: 'uuuuuuuuuuu',
            labelNo: 'D11,D12,D13,D14,D15,D16,D17,D18,D19,D20,D21',
            Team: 'SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV',
          },
          {
            seat_label: 'L',
            layout: '___________',
            direction: '___________',
            labelNo: '_,_,_,_,_,_,_,_,_,_,_',
            Team: '_,_,_,_,_,_,_,_,_,_,_',
          },
          {
            seat_label: 'M',
            layout: 'ggggg______',
            direction: 'uuuuu______',
            labelNo: 'D22,D23,D24,D25,D26,_,_,_,_,_,_',
            Team: 'SIV,SIV,SIV,SIV,SIV,_,_,_,_,_,_',
          },
          {
            seat_label: 'N',
            layout: '___________',
            direction: '___________',
            labelNo: '_,_,_,_,_,_,_,_,_,_,_',
            Team: '_,_,_,_,_,_,_,_,_,_,_',
          },
          {
            seat_label: 'O',
            layout: 'gggg_gggggg',
            direction: 'dddd_dddddd',
            labelNo: 'E11,E10,E9,E8,_,E6,E5,E4,E3,E2,E1',
            Team: 'SIV,SIV,SIV,SIV,_,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV',
          },
          {
            seat_label: 'P',
            layout: 'ggggggggggg',
            direction: 'ddddddddddd',
            labelNo: 'E12,E13,E14,E15,E16,E17,E18,E19,E20,E21,E22',
            Team: 'SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV',
          },
          {
            seat_label: 'Q',
            layout: '___________',
            direction: '___________',
            labelNo: '_,_,_,_,_,_,_,_,_,_,_',
            Team: '_,_,_,_,_,_,_,_,_,_,_',
          },
          {
            seat_label: 'R',
            layout: 'ggggggggggg',
            direction: 'ddddddddddd',
            labelNo: 'F11,F10,F9,F8,F7,F6,F5,F4,F3,F2,F1',
            Team: 'SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV',
          },
          {
            seat_label: 'S',
            layout: 'ggggg_ggggg',
            direction: 'ddddd_ddddd',
            labelNo: 'F12,F13,F14,F15,F16,_,F17,F18,F19,F20,F21',
            Team: 'SIV,SIV,SIV,SIV,SIV,_,SIV,SIV,SIV,SIV,SIV',
          },

          {
            seat_label: 'T',
            layout: '___________',
            direction: '___________',
            labelNo: '_,_,_,_,_,_,_,_,_,_,_',
            Team: '_,_,_,_,_,_,_,_,_,_,_',
          },

          {
            seat_label: 'U',
            layout: 'ggggggggggg',
            direction: 'ddddddddddd',
            labelNo: 'G11,G10,G9,G8,G7,G6,G5,G4,G3,G2,G1',
            Team: 'SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV',
          },

          {
            seat_label: 'V',
            layout: 'ggggggggggg',
            direction: 'ddddddddddd',
            labelNo: 'G12,G13,G14,G15,G16,G17,G18,G19,G20,G21,G22',
            Team: 'SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV',
          },
          {
            seat_label: 'W',
            layout: '___________',
            direction: '___________',
            labelNo: '_,_,_,_,_,_,_,_,_,_,_',
            Team: '_,_,_,_,_,_,_,_,_,_,_',
          },

          {
            seat_label: 'X',
            layout: 'ggggggggggg',
            direction: 'ddddddddddd',
            labelNo: 'H11,H10,H9,H8,H7,H6,H5,H4,H3,H2,H1',
            Team: 'SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV',
          },

          {
            seat_label: 'Y',
            layout: 'ggggggggggg',
            direction: 'ddddddddddd',
            labelNo: 'H12,H13,H14,H15,H16,H17,H18,H19,H20,H21,H22',
            Team: 'SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV',
          },
        ],
      },
    ];
    this.processSeatChart(this.seatConfig); */
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

      AllocatedTo: this.allocatitedTo,

      FromWW: this.fromformatWW,

      ToWW: this.toformatWW,

      Remarks: this.remarks,

      IsAllocated: false,

      IsRequested: true,

      NumberOfBenches: this.cart?.selectedSeats?.length,

      BenchData: this.cart.seatstoStore,

      Team: this.teamName,
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
  onDateSelectFrom(date: any) {
    if (date !== undefined && date !== null) {
      var selDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );
      let week = moment(selDate).week();
      let month = moment(selDate).month();
      let year = moment(selDate).year();
      let selWeek;
      if (week < 10) {
        selWeek = ('0' + week).slice(-2);
      } else {
        selWeek = week;
      }
      if (month === 11 && week === 1) {
        year = year + 1;
      }
      this.fromworkweek = selWeek + "'" + year.toString();
      this.fromformatWW = (selWeek + "'" + year)
        .toString()
        .split("'")
        .join()
        .replace(',', '');
    }
  }
  onDateSelectTo(date: any) {
    if (date !== undefined && date !== null) {
      var selDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );
      let week = moment(selDate).week();
      let month = moment(selDate).month();
      let year = moment(selDate).year();
      let selWeek;
      if (week < 10) {
        selWeek = ('0' + week).slice(-2);
      } else {
        selWeek = week;
      }
      if (month === 11 && week === 1) {
        year = year + 1;
      }
      this.toworkweek = selWeek + "'" + year.toString();
      this.toformatWW = (selWeek + "'" + year)
        .toString()
        .split("'")
        .join()
        .replace(',', '');
    }
  }
}

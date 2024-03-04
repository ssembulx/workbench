import { any } from '@amcharts/amcharts5/.internal/core/util/Array';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SummaryService } from '../shared/service';
import moment from 'moment';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
  reason: any = '';
  minDate: Date;
  maxDate: Date;
  constructor(
    private modalService: NgbModal,
    config: NgbModalConfig,
    private toastrService: ToastrService,
    private dataSvc: SummaryService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.labViewLoader = false;
    config.backdrop = 'static';
    config.size = 'lg';
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate());

    this.maxDate = new Date(this.minDate);
    this.maxDate.setDate(this.minDate.getDate() + 365);
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
  notifyTo = '';
  fromWW = '';
  toWW = '';
  remarks = '';
  onChangeProgram(value: any) {
    this.dataSvc.getSKU({ ProgramShortName: value }).subscribe((res) => {
      if (res) {
        this.skuList = res;
      }
    });
  }
  allocationBlock = false;
  labId: any;
  getLabDetails() {
    this.labViewLoader = false;
    this.allocationBlock = false;
    this.dataSvc.getLabDetails({ LabName: this.defaultValue }).subscribe(
      (res) => {
        if (res != 'Info! Lab Does Not Exist') {
          this.labViewLoader = true;
          this.allocationBlock = true;
          let response: any = res;
          this.parentLabDetailsCreated.emit(response);
          this.seatmap = response.BenchDetails;
          this.labId = response?.id;
        }
      },
      (error: HttpErrorResponse) => {
        // Handle error
        // Use if conditions to check` error code, this depends on your api, how it sends error messages
        if (error?.error == 'Info! Lab Does Not Exist') {
          this.labViewLoader = true;
          this.seatmap = [];
        }
      }
    );
  }
  ngOnChanges(changes: SimpleChanges) {
    debugger;
    if (!changes?.['defaultValue']?.['firstChange']) {
      this.cart = {
        selectedSeatsNo: [],

        selectedSeats: [],

        seatstoStore: [],

        seatsLabelNo: [],

        totalamount: 0,

        cartId: '',

        eventId: 0,
      };
      this.contact.SIVExecutionTeamList = [];
      this.closePopup();
      this.reason = '';
      this.deAllocateBenchList = [];
      this.deAllocateBenchLabelList = [];
      this.getLabDetails();
    }
    /* this.labViewLoader = true;
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
    }  */
    /* else if (lab.toString() == 'SRR-2-CRD 5') {
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
    } */
    /*   else if (lab.toString() == 'SRR-2-CRD-4') {
       this.getLabDetails();
    } */
    /* let lab = changes?.['defaultValue']?.['currentValue'];
    if (lab.toString() == 'SRR-ECO-EC04_2B') {
      this.labViewLoader = true;
      this.seatmap = [];
      this.seatConfig = [
        {
          seat_price: 250,
          seat_map: [
            {
              seat_label: 'A',
              layout: '___gggggggg__',
              direction: 'ddddddddddddd',
              labelNo:
                '_,_,_,A1,A2,A3,A4,A5,A6,A7,A8,_,_',
              Team: '_,_,_,SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV,_,_',
              IsSpace: true,
            },
            {
              seat_label: 'B',
               layout: '___gggggggg__',
              direction: 'ddddddddddddd',
              labelNo:
                '_,_,_,B1,B2,B3,B4,B5,_,_,B6,_,_',
              Team: '_,_,_,SIV,SIV,SIV,SIV,SIV,_,_,SIV,_,_',
              IsSpace: false,
            },
            {
              seat_label: 'C',
              layout: '___gggggggg__',
              direction: 'ddddddddddddd',
              labelNo:
                '_,_,_,B14,B13,B12,B11,B10,B9,B8,B7,_,_',
              Team: '_,_,_,SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV,_,_',
              IsSpace: true,
            },
            {
              seat_label: 'D',
             layout: '___gggggggg__',
              direction: 'ddddddddddddd',
              labelNo:
                '_,_,_,C1,C2,C3,C4,C5,C6,C7,C8,_,_',
              Team: '_,_,_,SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV,_,_',
              IsSpace: false,
            },
            {
              seat_label: 'E',
             layout: '___gggggggg__',
              direction: 'ddddddddddddd',
              labelNo:
                '_,_,_,C16,C15,C14,C13,C12,C11,C10,C9,_,_',
              Team: '_,_,_,SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV,_,_',
              IsSpace: true,
            },
            {
              seat_label: 'F',
             layout: '___gggggggg__',
              direction: 'ddddddddddddd',
              labelNo:
                '_,_,_,D1,D2,D3,D4,D5,D6,D7,D8,_,_',
              Team: '_,_,_,SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV,_,_',
              IsSpace: false,
            },
            {
              seat_label: 'G',
              layout: '___gggggggg__',
              direction: 'ddddddddddddd',
              labelNo:
                '_,_,_,D16,D15,D14,D13,D12,D11,D10,D9,_,_',
              Team: '_,_,_,SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV,_,_',
              IsSpace: true,
            },
            {
              seat_label: 'H',
               layout: '___gggggggg__',
              direction: 'ddddddddddddd',
              labelNo:
                '_,_,_,E1,E2,E3,E4,E5,E6,E7,E8,_,_',
              Team: '_,_,_,SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV,_,_',
              IsSpace: false,
            },
            {
              seat_label: 'I',
              layout: '___gggggggg__',
              direction: 'ddddddddddddd',
              labelNo:
                '_,_,_,E13,E12,E11,E10,E9,_,_,_,_,_',
              Team: '_,_,_,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,_,_,_,_,_',
              IsSpace: true,
            },
            {
              seat_label: 'J',
              layout: 'ggggggg_ggggggggg',
              direction: 'ddddddddddddddddd',
              labelNo:
                'O2390,O2391,O2392,O2393,O2394,O2395,O2396,_,O2397,O2398,O2399,O2400,O2401,O2402,O2403,O2081,O2084',
              Team: 'Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,_,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV',
              IsSpace: true,
            },
            {
              seat_label: 'K',
              layout: 'ggggggg_ggggggggg',
              direction: 'ddddddddddddddddd',
              labelNo:
                'N2389,N2388,N2387,N2386,N2385,N2384,N2383,_,N2382,N2381,N2380,N2379,N2378,N2377,N2376,N2077,N2080',
              Team: 'Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,_,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV',
              IsSpace: false,
            },
            {
              seat_label: 'L',
              layout: '_______________gg',
              direction: 'ddddddddddddddddd',
              labelNo: '_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,N2076,N2079',
              Team: '_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,Non-SIV,Non-SIV',
              IsSpace: false,
            },
            {
              seat_label: 'M',
              layout: 'ggggggg_ggggggggg',
              direction: 'ddddddddddddddddd',
              labelNo:
                'N2362,N2363,N2364,N2365,N2366,N2367,N2368,_,N2369,N2370,N2371,N2372,N2373,N2374,N2375,N2075,N2078',
              Team: 'Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,_,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV',
              IsSpace: true,
            },
            {
              seat_label: 'N',
              layout: 'ggggggg_ggggggggg',
              direction: 'ddddddddddddddddd',
              labelNo:
                'M2361,M2360,M2359,M2358,M2357,M2356,M2355,_,M2354,M2353,M2352,M2351,M2350,M2349,M2348,M2071,M2074',
              Team: 'Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,_,SIV,SIV,SIV,SIV,SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV',
              IsSpace: false,
            },
            {
              seat_label: 'O',
              layout: '_______________gg',
              direction: 'ddddddddddddddddd',
              labelNo: '_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,M2070,M2073',
              Team: '_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,Non-SIV,Non-SIV',
              IsSpace: false,
            },

            {
              seat_label: 'P',
              layout: 'ggggggg_ggggggggg',
              direction: 'ddddddddddddddddd',
              labelNo:
                'M2334,M2335,M2336,M2337,M2338,M2339,M2340,_,M2341,M2342,M2343,M2344,M2345,M2346,M2347,M2069,M2072',
              Team: 'Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,_,SIV,SIV,SIV,SIV,SIV,SIV,Non-SIV,Non-SIV,Non-SIV',
              IsSpace: true,
            },
            {
              seat_label: 'Q',
              layout: 'ggggggg_ggggggggg',
              direction: 'ddddddddddddddddd',
              labelNo:
                'L2333,L2332,L2331,L2330,L2329,L2328,L2327,_,L2326,L2325,L2324,L2323,L2322,L2321,L2320,L2065,L2068',
              Team: 'Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,_,SIV,SIV,SIV,SIV,SIV,SIV,SIV,Non-SIV,Non-SIV',
              IsSpace: false,
            },
            {
              seat_label: 'R',
              layout: '_______________gg',
              direction: 'ddddddddddddddddd',
              labelNo: '_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,L2064,L2067',
              Team: '_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,Non-SIV,Non-SIV',
              IsSpace: false,
            },

            {
              seat_label: 'S',
              layout: 'ggggggg_ggggggggg',
              direction: 'ddddddddddddddddd',
              labelNo:
                'L2306,L2307,L2308,L2309,L2310,L2311,L2312,_,L2313,L2314,L2315,L2316,L2317,L2318,L2319,L2063,L2066',
              Team: 'Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,_,SIV,SIV,SIV,SIV,SIV,SIV,SIV,Non-SIV,Non-SIV',
              IsSpace: true,
            },
            {
              seat_label: 'T',
              layout: 'ggggggg_ggggggggg',
              direction: 'ddddddddddddddddd',
              labelNo:
                'K2305,K2304,K2303,K2302,K2301,K2300,K2299,_,Printer,K2298,K2297,K2296,K2295,K2294,K2293,K2059,K2062',
              Team: 'Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,_,Non-SIV,SIV,SIV,SIV,SIV,SIV,SIV,Non-SIV,Non-SIV',
              IsSpace: false,
            },
            {
              seat_label: 'U',
              layout: '_______________gg',
              direction: 'ddddddddddddddddd',
              labelNo: '_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,K2058,K2061',
              Team: '_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,Non-SIV,Non-SIV',
              IsSpace: false,
            },

            {
              seat_label: 'V',
              layout: 'ggggggg_ggggggggg',
              direction: 'ddddddddddddddddd',
              labelNo:
                'K2279,K2280,K2281,K2282,K2283,K2284,K2285,_,K2286,K2287,K2288,K2289,K2290,K2291,K2292,K2057,K2060',
              Team: 'Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,_,SIV,SIV,SIV,SIV,Non-SIV,SIV,SIV,Non-SIV,Non-SIV',
              IsSpace: true,
            },
            {
              seat_label: 'W',
              layout: 'ggggggg_ggggggggg',
              direction: 'ddddddddddddddddd',
              labelNo:
                'J2278,J2277,J2276,J2275,J2274,J2273,J2272,_,J2271,J2270,J2269,J2268,J2267,J2266,J2265,J2253,J2256',
              Team: 'Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,_,SIV,SIV,SIV,SIV,SIV,SIV,SIV,Non-SIV,Non-SIV',
              IsSpace: false,
            },
            {
              seat_label: 'X',
              layout: '_______________gg',
              direction: 'ddddddddddddddddd',
              labelNo: '_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,O,O',
              Team: '_,_,_,_,_,_,_,_,_,_,_,_,_,_,_,Non-SIV,Non-SIV',
              IsSpace: false,
            },
            {
              seat_label: 'Y',
              layout: 'ggggggg_ggggggggg',
              direction: 'ddddddddddddddddd',
              labelNo:
                'J2251,J2252,J2253,J2254,J2255,J2256,J2257,_,J2258,J2259,J2260,J2261,J2262,J2263,J2264,J2254,J2255',
              Team: 'Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,_,SIV,SIV,Non-SIV,SIV,SIV,SIV,SIV,Non-SIV,Non-SIV',
              IsSpace: true,
            },
          ],
        },
      ];
      this.processSeatChart(this.seatConfig);
    } */
  }
  extendBenchApply() {
    let payload = {
      id: this.extendLabDetails[0]?.id,
      LabName: this.extendLabDetails[0]?.Location__Name,
      ToWW: this.toformatWWExtend,
      Duration: this.Durationextend,
      Remarks: this.remarksExtend,
    };
    this.dataSvc.extendBenchApply(payload).subscribe(
      (res) => {
        debugger;
        if (res == 'Success') {
          this.toastrService.success(
            'Bench Extend Request Added Successfully',
            'Success!'
          );
          this.modalReference.close();
          this.toworkweekExtend = '';
          this.Durationextend = 0;
          this.remarksExtend = '';
        }
      },
      (error: HttpErrorResponse) => {
        // Handle error
        // Use if conditions to check` error code, this depends on your api, how it sends error messages
      }
    );
  }
  extendLabDetails: any;
  benchDataExtend: any;
  userInfo: any;
  remarksExtend: any = '';
  form: FormGroup;
  ngOnInit(): void {
    this.form = this.fb.group({
      tag: [undefined],
    });
    this.dataSvc.GetUser().subscribe((res: any) => {
      console.log('userdeatils', res);
      debugger;
      this.userInfo = res;
    });
    this.route.queryParamMap.subscribe((params) => {
      let extendID = this.route.snapshot.queryParams['id'];
      if (extendID != undefined) {
        let payload = {
          id: extendID,
        };
        this.dataSvc.getExtandLabDetails(payload).subscribe(
          (res) => {
            debugger;
            this.extendLabDetails = res;
            if (
              this.userInfo?.wwid ==
              this.extendLabDetails[0].AllocatedTo[0].WWID
            ) {
              this.openExtendBench();
              this.benchDataExtend = this.extendLabDetails[0]?.BenchData;
              this.remarksExtend = this.extendLabDetails[0]?.Remarks;
              this.toworkweekExtend = '';
              this.Durationextend = 0;
            } else {
              this.toastrService.error(
                'Bench can only be extended by owner',
                'Error'
              );
              this.router.navigate(['/allocation']);
            }
          },
          (error: HttpErrorResponse) => {
            // Handle error
            // Use if conditions to check` error code, this depends on your api, how it sends error messages
          }
        );
      }
    });
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
    this.seatConfig = [
      {
        seat_price: 250,
        seat_map: [
          {
            seat_label: 'A',
            layout: '___gggggggg___',
            direction: 'dddddddddddddd',
            labelNo: '_,_,_,A1,A2,A3,A4,A5,A6,A7,A8,_,_,_',
            Team: '_,_,_,SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV,_,_,_',
            IsSpace: true,
          },
          {
            seat_label: 'B',
            layout: '___ggggg__g___',
            direction: 'dddddddddddddd',
            labelNo: '_,_,_,B1,B2,B3,B4,B5,_,_,B6,_,_,_',
            Team: '_,_,_,SIV,SIV,SIV,SIV,SIV,_,_,SIV,_,_,_',
            IsSpace: false,
          },
          {
            seat_label: 'C',
            layout: '___gggggggg___',
            direction: 'dddddddddddddd',
            labelNo: '_,_,_,B14,B13,B12,B11,B10,B9,B8,B7,_,_,_',
            Team: '_,_,_,SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV,_,_,_',
            IsSpace: true,
          },
          {
            seat_label: 'D',
            layout: '___gggggggg___',
            direction: 'dddddddddddddd',
            labelNo: '_,_,_,C1,C2,C3,C4,C5,C6,C7,C8,_,_,_',
            Team: '_,_,_,SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV,_,_,_',
            IsSpace: false,
          },
          {
            seat_label: 'E',
            layout: '___gggggggg___',
            direction: 'dddddddddddddd',
            labelNo: '_,_,_,C16,C15,C14,C13,C12,C11,C10,C9,_,_,_',
            Team: '_,_,_,SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV,_,_,_',
            IsSpace: true,
          },
          {
            seat_label: 'F',
            layout: '___gggggggg___',
            direction: 'dddddddddddddd',
            labelNo: '_,_,_,D1,D2,D3,D4,D5,D6,D7,D8,_,_,_',
            Team: '_,_,_,SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV,_,_,_',
            IsSpace: false,
          },
          {
            seat_label: 'G',
            layout: '___gggggggg___',
            direction: 'dddddddddddddd',
            labelNo: '_,_,_,D16,D15,D14,D13,D12,D11,D10,D9,_,_,_',
            Team: '_,_,_,SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV,_,_,_',
            IsSpace: true,
          },
          {
            seat_label: 'H',
            layout: '___gggggggg___',
            direction: 'dddddddddddddd',
            labelNo: '_,_,_,E1,E2,E3,E4,E5,E6,E7,E8,_,_,_',
            Team: '_,_,_,SIV,SIV,SIV,SIV,SIV,SIV,SIV,SIV,_,_,_',
            IsSpace: false,
          },
          {
            seat_label: 'I',
            layout: '___ggggg______',
            direction: 'dddddddddddddd',
            labelNo: '_,_,_,E13,E12,E11,E10,E9,_,_,_,_,_,_',
            Team: '_,_,_,Non-SIV,Non-SIV,Non-SIV,Non-SIV,Non-SIV,_,_,_,_,_,_',
            IsSpace: true,
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
            IsRowSpace: map_element.IsSpace,
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
    this.notifyTo = '';
    this.fromWW = '';
    this.toWW = '';
    this.remarks = '';
    this.duration = '';
    this.modalReference = this.modalService.open(addmodal);
  }
  isDisabledBooking: boolean = false;
  saveBooking() {
    let notifyToArray: any[] = [];
    if (
      this.contact.SIVExecutionTeamList != undefined ||
      this.contact.SIVExecutionTeamList.length != 0
    ) {
      this.contact.SIVExecutionTeamList.forEach((element: any) => {
        notifyToArray.push(element.sivListMails);
      });
    }
    if (this.cart?.selectedSeats?.length == 0) {
      this.toastrService.warning('Please select Bench', 'Warning');
    } else if (this.teamName == '') {
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
    } else if (this.userDetails == undefined) {
      this.toastrService.warning(
        'Please enter valid WWID/Email/Username and click search button',
        'Warning'
      );
    } else {
      this.labViewLoader = false;
      this.isDisabledBooking = true;
      let bookingData = {
        Program: this.programName,

        LabName: this.defaultValue,

        Sku: this.skuName,

        Vendor: this.vendorName,

        AllocatedTo: [
          {
            WWID: this.userDetails?.wwid,
            Name: this.userDetails?.name,
            Email: this.userDetails?.emailId,
          },
        ],
        NotifyTo: notifyToArray,
        /*   NotifyTo:
          this.notifyUserDetails == undefined
            ? null
            : [
                {
                  WWID: this.notifyUserDetails?.wwid,
                  Name: this.notifyUserDetails?.name,
                  Email: this.notifyUserDetails?.emailId,
                },
              ], */

        FromWW: this.fromformatWW,

        ToWW: this.toformatWW,

        Remarks: this.remarks,

        IsAllocated: false,

        IsRequested: true,

        NumberOfBenches: this.cart?.selectedSeats?.length,

        BenchData: this.cart.seatsLabelNo,

        Team: this.teamName,

        Duration: this.duration,
        RequestedBy: [
          {
            WWID: this.userInfo?.wwid,
            Name: this.userInfo?.name,
            Email: this.userInfo?.emailId,
          },
        ],
        RequestedDate: '',
        DeallocatedBy: '',
        DeallocatedDate: '',
      };
      this.dataSvc.saveBooking(bookingData).subscribe((res) => {
        if (res) {
          this.labViewLoader = true;
          this.isDisabledBooking = false;
          if (res == 'Benches Not Available') {
            this.toastrService.warning('Benches Not Available', 'Warning!');
            this.router.navigate(['/allocation']);
          } else {
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
            this.contact.SIVExecutionTeamList = [];
            this.closePopup();
          }
        }
      });
    }
  }
  closePopup() {
    //  this.modalReference.close();
    this.teamName = '';
    this.programName = '';
    this.skuName = '';
    this.vendorName = '';
    this.allocatitedTo = '';
    this.notifyTo = '';
    this.fromWW = '';
    this.toWW = '';
    this.remarks = '';
    this.toworkweek = '';
    this.fromworkweek = '';
    this.duration = '';
  }
  trackByIds(index: number, item: any) {
    return item.id;
  }

  @ViewChild('extendBench') rejectModel: ElementRef;
  openExtendBench() {
    this.modalReference = this.modalService.open(this.rejectModel);
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
  onDateSelectToExtend(date: any) {
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
      /* let selWeek; */
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
  }
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
  userDetails: any;
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
    this.labViewLoader = false;
    this.dataSvc.getUserDetails(obj).subscribe((res) => {
      if (res['name'] === null || res['name'] === undefined) {
        this.labViewLoader = true;
        this.toastrService.success(
          'No users found with entered details, Kindly enter correct details!',
          'Success!'
        );
        /*  this.alertService.showWarning(
          'No users found with entered details, Kindly enter correct details!'
        ); */
      } else {
        this.labViewLoader = true;
        this.userDetails = res;
        this.allocatitedTo = res['name'];
      }
      //  this.loadRoles();
    });
  }
  notifyUserDetails: any;
  getNotifyUserDetails() {
    /*     let flag = this.checkUserExists();
    if (this.modal.user === '' || this.modal.user === undefined) {
      this.alertService.showWarning(
        'Kindly enter WWID/Email/Username to search.'
      );
    } else { */
    /* if (flag) { */
    if (!/^\d+$/.test(this.notifyTo.trim())) {
      var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
      if (format.test(this.notifyTo.trim())) {
        var obj = {
          type: 'CorporateEmailTxt',
          values: this.notifyTo.trim(),
        };
      } else {
        var obj = {
          type: 'FullNm',
          values: this.notifyTo.trim(),
        };
      }
    }
    if (/^\d+$/.test(this.notifyTo.trim())) {
      var obj = {
        type: 'Wwid',
        values: this.notifyTo.trim(),
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
        this.notifyUserDetails = res;
        this.notifyTo = res['name'];
      }
      //  this.loadRoles();
    });
  }
  deAllocateBenchList: any = [];
  deAllocateBenchLabelList: any = [];
  deSelectBenchAllocationList: any = [];
  deSelectSeat(seatObject: any) {
    debugger;
    if (this.userInfo?.Role == 'User' || this.userInfo?.Role == 'Lead') {
      if (seatObject?.AllocationData[0]?.Who[0]?.WWID == this.userInfo?.wwid) {
        this.deSelectSeatFunclogic(seatObject);
      }
    } else if (this.userInfo?.Role == 'Admin') {
      this.deSelectSeatFunclogic(seatObject);
    }
  }
  deSelectSeatFunclogic(seatObject: any) {
    if (seatObject.status != 'deselected' && seatObject.IsAllocated === true) {
      seatObject.status = 'deselected';

      this.deAllocateBenchList.push(seatObject?.BenchName);
      this.deAllocateBenchLabelList.push(seatObject?.labelNo);
      this.deSelectBenchAllocationList.push(seatObject?.AllocationData[0]?.id);
      /*  this.deSelectBenchList.push({
        id: seatObject?.AllocationData[0]?.id,
        LabName: this.defaultValue,
        Reason: this.reason,
        BenchData: [seatObject?.labelNo],
      }); */
    } else if (
      seatObject.status == 'deselected' &&
      seatObject.IsAllocated === true
    ) {
      seatObject.status = 'selected';
      const index = this.deAllocateBenchList.indexOf(seatObject?.BenchName);
      if (index > -1) {
        // only splice array when item is found
        this.deAllocateBenchList.splice(index, 1); // 2nd parameter means remove one item only
        this.deAllocateBenchLabelList.splice(index, 1); // 2nd parameter means remove one item only
        this.deSelectBenchAllocationList.splice(index, 1);
      }
    }
  }
  deSelectBenchList: any = [];
  isDisabledDeallocation: boolean = false;
  deallocateBooking() {
    debugger;
    /*  let deallocationData = [
      {
        id: this.labId,
        LabName: this.defaultValue,
        BenchData: this.deAllocateBenchLabelList,
        Reason: this.reason,
      },
    ]; */
    if (this.deAllocateBenchLabelList?.length == 0) {
      this.toastrService.warning(
        'To deallocate the desk, please select the allocated desk',
        'Warning'
      );
    } else if (this.reason == '') {
      this.toastrService.warning(
        'Please provide a reason for the deallocation of the desk',
        'Warning'
      );
    } else {
      this.labViewLoader = false;
      this.isDisabledDeallocation = true;
      this.deAllocateBenchLabelList.forEach((element: any, index: any) => {
        this.deSelectBenchList.push({
          id: this.deSelectBenchAllocationList[index],
          LabName: this.defaultValue,
          Reason: this.reason,
          BenchData: [element],
          DeallcationUserInfo: this.userInfo,
          DateandTime: new Date().toLocaleString(),
        });
      });
      this.dataSvc
        .deallocationBooking(this.deSelectBenchList)
        .subscribe((res) => {
          this.labViewLoader = true;
          this.isDisabledDeallocation = false;
          if (res) {
            this.toastrService.success(
              'Deallocation Request Added Successfully',
              'Success!'
            );
            this.reason = '';
            this.deAllocateBenchList = [];
            this.deAllocateBenchLabelList = [];
            this.closePopup();
            this.getLabDetails();
          }
        });
    }
  }
  typeChart = 'Location chart';
  // *** chart options according to click *** //
  Options(status: any) {
    if (status == 'Allocation') {
      this.typeChart = 'Location chart';
    } else if (status == 'Deallocation') {
      this.typeChart = 'Program chart';
    }
    /* else if (status == 'vendor') {
      this.typeChart = 'Vendor chart';
    } */
  }

  /* search mail id */
  extractEmails(text: any) {
    return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
  }
  getUserDet(arg: any) {
    let promise: any = new Promise((resolve, reject) => {
      var email = null;
      /* let obj = {
        indentifier: arg,
      }; */
      /*  var obj = {
        type: 'CorporateEmailTxt',
        values: arg,
      }; */
      var obj = { mail: arg };
      this.labViewLoader = false;
      this.dataSvc
        .ValidateUserMail(obj)
        .toPromise()
        .then(
          (res: any) => {
            debugger;
            this.labViewLoader = true;
            email = res['emailId'];
            resolve(email);
          },
          (err: any) => {
            this.labViewLoader = true;
            this.toastrService.warning(
              'No users found with entered details, Kindly enter correct details!',
              'Warning'
            );
            reject(err);
          }
        );
    });
    return promise;

    // .subscribe(res => {
    //   if (res['Name'] === null || res['Name'] === undefined) {
    //     this.pageService.showWarning('No users found with entered details, Kindly enter correct details!');
    //   } else {
    //     debugger;
    //     email = res['EmailId'];
    //   };
    // });
  }
  contact: any = {
    publishReportDistributionList: '',
    SIVExecutionTeamList: [],
    IntermediateList: '',
  };
  checkDuplicateEmailTag(tag: any, index: any, type: any) {
    let flag = false;
    if (type === 'publish') {
      this.contact.publishReportDistributionList.forEach((el: any) => {
        if (el.publishListMails === tag.toString().trim()) {
          flag = true;
        }
      });
      return flag;
    } else if (type === 'siv') {
      debugger;
      if (this.contact.SIVExecutionTeamList.length == 0) {
        return flag;
      } else {
        this.contact.SIVExecutionTeamList.forEach((el: any) => {
          if (el.sivListMails === tag.toString().trim()) {
            flag = true;
          }
        });
        return flag;
      }
    } else if (type === 'interm') {
      this.contact.IntermediateList.forEach((el: any) => {
        if (el.IntermediatetMails === tag.toString().trim()) {
          flag = true;
        }
      });
      return flag;
    }
  }
  addTag(tag: string, index: any, type: any): void {
    if (tag[tag.length - 1] === ',' || tag[tag.length - 1] === ' ') {
      if (type === 'publish') {
        this.contact.publishReportDistributionList[index].slice(0, -1);
      } else if (type === 'siv') {
        this.contact.SIVExecutionTeamList[index].slice(0, -1);
      } else if (type === 'interm') {
        this.contact.IntermediateList[index].slice(0, -1);
      }
    }
    if (tag.length > 0) {
      if (type === 'publish') {
        this.contact.publishReportDistributionList.push({
          publishListMails: tag.toString().trim(),
        });
      } else if (type === 'siv') {
        this.contact.SIVExecutionTeamList.push({
          sivListMails: tag.toString().trim(),
        });
      } else if (type === 'interm') {
        this.contact.IntermediateList.push({
          IntermediatetMails: tag.toString().trim(),
        });
      }
    }
  }
  onKeyUp(event: KeyboardEvent, index: any, type: any): void {
    debugger;
    let emailRegex =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const inputValue = this.form.controls['tag'].value.trim().toString();
    if (event.code === 'Backspace' && !inputValue) {
      this.removeTag(inputValue, index, type);
      return;
    } else if ((event.ctrlKey || event.metaKey) && event.code === 'KeyV') {
      let emails = this.extractEmails(inputValue);
      if (emails === null || emails === undefined) {
        this.getUserDet(inputValue).then((data: string) => {
          let flag = this.checkDuplicateEmailTag(data, index, type);
          if (data === null || data === '' || data === undefined) {
            this.toastrService.warning(
              'No users found with entered details, Kindly enter correct details!',
              'Warning'
            );
          } else if (flag) {
            this.toastrService.warning('Duplicate Email id.', 'Warning');
            this.form.controls['tag'].setValue('');
          } else {
            this.addTag(data, index, type);
            this.form.controls['tag'].setValue('');
          }
        });
      } else {
        let invalidMailList: any = [];
        emails.forEach((el: any) => {
          this.getUserDet(el).then((data: any) => {
            if (data !== null) {
              let flag = this.checkDuplicateEmailTag(data, index, type);
              if (flag) {
                this.toastrService.warning('Duplicate Email id.', 'Warning');
                this.form.controls['tag'].setValue('');
              } else {
                this.addTag(data, index, type);
                this.form.controls['tag'].setValue('');
              }
            } else {
              // this.pageService.showWarning('No users found with entered details, Kindly enter correct details!');
              invalidMailList.push(el);
              this.toastrService.warning(
                'No users found with entered detail : ' +
                  invalidMailList +
                  ', Kindly enter correct details!',
                'Warning'
              );
            }
          });
        });
      }
      this.form.controls['tag'].setValue('');
    } else if (event.code === 'Space' || event.code === 'Enter') {
      let validEmail = emailRegex.test(inputValue);
      if (validEmail) {
        let flag = this.checkDuplicateEmailTag(inputValue, index, type);
        if (flag) {
          this.toastrService.warning('Duplicate Email id.', 'Warning');
          this.form.controls['tag'].setValue('');
        } else {
          this.getUserDet(inputValue).then((data: string) => {
            if (data === null || data === '' || data === undefined) {
              this.toastrService.warning(
                'No users found with entered details, Kindly enter correct details!',
                'Warning'
              );
            } else {
              this.addTag(data, index, type);
              this.form.controls['tag'].setValue('');
            }
          });
          this.form.controls['tag'].setValue('');
        }
      } else {
        this.getUserDet(inputValue).then((data: any) => {
          if (data !== null) {
            let flag = this.checkDuplicateEmailTag(data, index, type);
            if (flag) {
              this.toastrService.warning('Duplicate Email id.', 'Warning');
              this.form.controls['tag'].setValue('');
            } else {
              this.addTag(data, index, type);
              this.form.controls['tag'].setValue('');
            }
          } else {
            this.toastrService.warning(
              'No users found with entered details, Kindly enter correct details!',
              'Warning'
            );
          }
        });
        this.form.controls['tag'].setValue('');
      }
    }
  }
  indexItem: any;
  listIndex(index: any) {
    this.indexItem = index;
  }
  /*Changes Flag*/
  projectDefChangeFlag: boolean = false;
  highLevelTargetChangeFlag: boolean = false;
  componentBreakupChangeFlag: boolean = false;
  voltageRailGroupChangeFlag: boolean = false;
  pathToGoalChangeFlag: boolean = false;
  keyContactChangeFlag: boolean = false;
  valueChange(arg: string) {
    if (arg === 'KPI') {
      this.projectDefChangeFlag = true;
    } else if (arg === 'Type') {
      // this.projectDefChangeFlag = true;
    } else if (arg === 'UOMName') {
      this.projectDefChangeFlag = true;
    } else if (arg === 'Comments') {
      this.projectDefChangeFlag = true;
    } else if (
      arg === 'HLT Target' ||
      arg === 'HLT UOMName' ||
      arg === 'HLT VRConstant' ||
      arg === 'HLT JellyBeans' ||
      arg === 'HLT Comments'
    ) {
      this.highLevelTargetChangeFlag = true;
    } else if (
      arg === 'CB Target' ||
      arg === 'CB UOMName' ||
      arg === 'CB Comments'
    ) {
      this.componentBreakupChangeFlag = true;
    } else if (
      arg === 'VRG Component' ||
      arg === 'VRG Alias' ||
      arg === 'VRG Check'
    ) {
      this.voltageRailGroupChangeFlag = true;
    } else if (arg === 'PTG Power Save') {
      this.pathToGoalChangeFlag = true;
    } else if (
      arg === 'SIV Team' ||
      arg === 'IPDL Team' ||
      arg === 'FPDL Team'
    ) {
      this.keyContactChangeFlag = true;
    }
  }

  removeTag(tag: any, index: any, type: string): void {
    if (!!tag) {
      if (type === 'publish') {
        this.contact.publishReportDistributionList.splice(index, 1);
      } else if (type === 'siv') {
        this.contact.SIVExecutionTeamList.splice(index, 1);
      } else if (type === 'interm') {
        this.contact.IntermediateList.splice(index, 1);
      }
    } else {
      if (type === 'publish') {
        this.contact.publishReportDistributionList.splice(-1);
      } else if (type === 'siv') {
        this.contact.SIVExecutionTeamList.splice(-1);
      } else if (type === 'interm') {
        this.contact.IntermediateList.splice(-1);
      }
    }
  }
}

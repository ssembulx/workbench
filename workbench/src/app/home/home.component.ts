import { AfterViewInit, Component, OnInit } from '@angular/core';
// amCharts imports
// import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { Chart } from '@amcharts/amcharts5';

// amCharts imports
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5percent from '@amcharts/amcharts5/percent';
import { SummaryService } from '../shared/service';
import { fitAngleToRange } from '@amcharts/amcharts5/.internal/core/util/Math';
import { left, right } from '@popperjs/core';

import * as am5plugins_exporting from '@amcharts/amcharts5/plugins/exporting';
import { ToastrService } from 'ngx-toastr';
import { is, number, string } from '@amcharts/amcharts4/core';
import { ExcelService } from '../shared/excel.service';
import { ExportService } from '../shared/export.service';
interface dataForBarChart {
  category: string;
  subdata: any[];
  value: number;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  orderMappedRelease: string = '';
  reverseMappedRelease: boolean = true;
  typeChart = 'Location chart';
  //typeChart = 'Lab Chart';
  // typeChart:any
  fullScreenFlag = false;
  fullScreenBack: boolean = false;
  smallscreen = true;
  ChartData: any;
  ChartData1: any;
  changestatus: any;
  type = 'pie chart';
  Labtype = 'Lab chart';
  Loctype = 'Loc chart';
  Prgtype = 'Prg chart';
  Ventype = 'Ven chart';
  semiType = 'Semi chart';
  pieChartLoader = false;
  semicircle: any = false;
  fullcircle: any = false;
  setIconPossition: boolean = true;
  labList: any;
  lab: string = 'SRR-1';
  program: string = 'All';
  prgmList: any;
  vendorList: any;
  vendor: string = 'All';
  sliceHide: any = false;
  Value: any = false;
  // ChartData:any;
  labwiseChartLoader = false;
  SIVtoggle: boolean = true;
  ChartTitle: any;
  Count: any = 0;
  team_program: any = false;
  chartlength: any = true;
  constructor(
    private service: SummaryService,
    private toastrService: ToastrService,
    private exportService: ExcelService,
    private exportService1: ExportService
  ) {}

  chartData = [
    { slno: 1, data: 'Non-SIV Allocated', value: '50' },
    { slno: 2, data: 'Allocated', value: '30' },
    { slno: 3, data: 'Free', value: '20' },
  ];

  semiChartData = [
    { slno: 2, data: 'Allocated', value: '30' },
    { slno: 3, data: 'Free', value: '20' },
  ];

  LabchartData = [
    { slno: 1, labName: 'CRD1', allocated: '45', Free: '55' },
    { slno: 2, labName: 'CRD2', allocated: '20', Free: '30' },
    { slno: 3, labName: 'CRD3', allocated: '15', Free: '10' },
    { slno: 4, labName: 'CRD4', allocated: '30', Free: '15' },
    { slno: 5, labName: 'CRD5', allocated: '12', Free: '32' },
  ];

  LocationchartData = [
    { slno: 1, location: 'SRR1', allocated: '45', Free: '55' },
    { slno: 2, location: 'SRR2', allocated: '30', Free: '70' },
    { slno: 3, location: 'SRR3', allocated: '20', Free: '80' },
    { slno: 4, location: 'SRR4', allocated: '85', Free: '15' },
    { slno: 5, location: 'SRR5', allocated: '12', Free: '88' },
  ];

  ProgramchartData = [
    { slno: 1, program: 'ADL-P', value: '45' },
    { slno: 2, program: 'MTL_P', value: '65' },
    { slno: 3, program: 'RKL-S', value: '70' },
    { slno: 4, program: 'GLK-S', value: '65' },
    { slno: 5, program: 'RPL-T', value: '75' },
    { slno: 6, program: 'MTL-S', value: '70' },
    { slno: 7, program: 'RTL-S', value: '80' },
    { slno: 8, program: 'TGL-R', value: '60' },
    { slno: 9, program: 'CFL-H', value: '60' },
    { slno: 10, program: 'WHL-U', value: '50' },
  ];

  VendorchartData = [
    { slno: 1, vendor: 'UST', value: '45' },
    { slno: 2, vendor: 'Wipro', value: '55' },
    { slno: 3, vendor: 'Infosys', value: '50' },
  ];

  ngOnInit() {
    // this.LabOverallSummary();
    this.getCheckbox();
    // this.getLabDetails();
    // this.getProgramDetails();
    // this.getVendorDetails();
    // this.LabwiseSummary();
    //this.Locationchart()

    // this.lab = "SRR1";
    // this.program = "All";
    // this.vendor = "All";

    // this.getSemiPiechart();
  }

  //**** Calling labdetails API for select drop down in labwise program chart ***//
  getLabDetails() {
    this.service.getLabDetail().subscribe((res) => {
      this.labList = res;
      console.log(this.labList, '****');
    });
  }

  //**** Calling program details API for select drop down in labwise program chart ***//
  getProgramDetails() {
    this.service.getPrgmDetail().subscribe((res) => {
      this.prgmList = res;
      // console.log(this.labList,"****")
    });
  }

  //**** Calling vendor details API for select drop down in labwise program chart ***//
  getVendorDetails() {
    this.service.getVendorDetail().subscribe((res) => {
      if (res) {
        this.vendorList = res;
      }
    });
  }

  //**** Change function for lab select drop down in labwise program chart ***//
  labChange() {
    this.LabwiseSummary();
  }

  //**** Change function for program select drop down in labwise program chart ***//
  programChange() {
    this.LabwiseSummary();
  }

  //**** Change function for vendor select drop down in labwise program chart ***//
  vendorChange() {
    this.LabwiseSummary();
  }

  //****Calling API for Labwsie summary chart ***//
  LabwiseSummary() {
    this.labwiseChartLoader = false;
    let req = { LabName: this.lab, Program: this.program, Vendor: this.vendor };

    this.service.LabwiseSummary(req).subscribe((res) => {
      this.ChartData1 = res.Location;
      console.log('stacked chart', this.ChartData1);
      // this.getLabwiseStackedChart();
      this.labwiseChartLoader = true;
    });
  }
  //****Calling API for summary pie chart ***//
  removeNonSIV = false;
  charttype: any;
  OverallAvailability(charttype: any) {
    this.labwiseChartLoader = false;
    // this.service.OverallAvailability().subscribe((res) => {
    //   //this.ChartData = res.Data;
    //   console.log('pie chart', this.ChartData);
    //   //this.getSemiPiechart();
    //   //this.getFullPiechart();
    //   //this.pieChartLoader = true;
    // });
    debugger;
    this.charttype = charttype;
    if (charttype == 'Location chart') {
      this.Count = this.Count + 1;
      this.labwiseChartLoader = false;
      this.service.getDrillDownChartData().subscribe((res) => {
        this.labwiseChartLoader = true;
        if (this.sliceHide) {
          let arr: any = [];
          arr = res;
          let arr1: any = [];
          debugger;
          for (let i = 0, j = 0; i < arr.length; i++) {
            if (arr[i].category != 'Non-SIV') {
              this.removeNonSIV = true;
              arr1[j] = arr[i];
              j++;
            }
          }
          this.ChartData = arr1;
          if (this.ChartData.length == 0) {
            this.chartlength = false;
          } else {
            this.chartlength = true;
          }

          let obj: any = [];
          var totalCount: any = 0;
          for (let i = 0; i < this.ChartData.length; i++) {
            if (this.ChartData[i].category != 'All') {
              obj[i] = this.ChartData[i].value;
              totalCount = totalCount + obj[i];
            }
          }
          for (let i = 0; i < this.ChartData.length; i++) {
            if (this.ChartData[i].category == 'All') {
              this.ChartData[i].value = totalCount;
            }
          }

          //making JSON format for right side bar chart drill down data
          this.ChartData.forEach((element: any, index: any) => {
            debugger;
            if (element.category == 'Free') {
              this.freeTotal=element?.value;
              for (let key in element?.Report) {
                let tempList = element?.Report[key][0];
                let tempArr: any = [];

                for (let k in tempList) {
                  element?.breakdown.forEach((ele: any, ind: any) => {
                    if (ele.category == key) {
                      let temp = {
                        /* location: key, */
                        category: k,
                        value: tempList[k]?.length,
                        subdata: [
                          {
                            category: k,
                            value: tempList[k]?.length,
                          },
                        ],
                      };
                      tempArr.push(temp);
                      ele['subdata'] = tempArr;
                    }
                  });
                }
              }
            } else if (element.category == 'Non-WSE') {
              this.nonwseTotal=element?.value;
              for (let key in element?.Report) {
                let tempList = element?.Report[key][0];
                let tempArr: any = [];

                for (let k in tempList) {
                  element?.breakdown.forEach((ele: any, ind: any) => {
                    if (ele.category == key) {
                      let temp = {
                        /* location: key, */
                        category: k,
                        value: tempList[k]?.length,
                        subdata: [
                          {
                            category: k,
                            value: tempList[k]?.length,
                          },
                        ],
                      };
                      tempArr.push(temp);
                      ele['subdata'] = tempArr;
                    }
                  });
                }
              }
            } else if (element.category == 'Allocated') {
              debugger;
              this.allocatedTotal=element?.value;
              const groupedData = element?.Report.reduce(
                (acc: any, obj: any) => {
                  const key = obj.Location__Name;

                  if (!acc[key]) {
                    acc[key] = [];
                  }

                  acc[key].push(obj);

                  return acc;
                },
                {}
              );

              console.log(groupedData);
              for (let k in groupedData) {
                let Count = 0;
                groupedData[k].forEach((element: any) => {
                  Count = Count + element?.BenchData?.length;
                });
                groupedData[k] = {
                  category: k,
                  value: Count,
                  subdata: [
                    {
                      category: k,
                      value: Count,
                    },
                  ],
                };
              }
              console.log(groupedData);
              element?.breakdown.forEach((elem: any) => {
                let tempArr: any = [];
                for (let key in groupedData) {
                  if (key.includes(elem.category)) {
                    tempArr.push(groupedData[key]);
                  }
                }
                elem['subdata'] = tempArr;
              });
            }
          });

          this.getFullPiechart(totalCount, this.typeChart);
        } else {
          this.ChartData = res;
          this.removeNonSIV = false;
          if (this.ChartData.length == 0) {
            this.chartlength = false;
          } else {
            this.chartlength = true;
          }
          let obj: any = [];
          var totalCount: any = 0;
          for (let i = 0; i < this.ChartData.length; i++) {
            if (this.ChartData[i].category != 'All') {
              obj[i] = this.ChartData[i].value;
              totalCount = totalCount + obj[i];
            }
            if (this.ChartData[i].category == 'Non-SIV') {
              this.ChartData[i].category = 'Non-WSE';
            }
          }
          //making JSON format for right side bar chart drill down data
          this.ChartData.forEach((element: any, index: any) => {
            debugger;
            if (element.category == 'Free') {
              this.freeTotal=element?.value;
              for (let key in element?.Report) {
                let tempList = element?.Report[key][0];
                let tempArr: any = [];

                for (let k in tempList) {
                  element?.breakdown.forEach((ele: any, ind: any) => {
                    if (ele.category == key) {
                      let temp = {
                        /* location: key, */
                        category: k,
                        value: tempList[k]?.length,
                        subdata: [
                          {
                            category: k,
                            value: tempList[k]?.length,
                          },
                        ],
                      };
                      tempArr.push(temp);
                      ele['subdata'] = tempArr;
                    }
                  });
                }
              }
            } else if (element.category == 'Non-WSE') {
              this.nonwseTotal=element?.value;
              for (let key in element?.Report) {
                let tempList = element?.Report[key][0];
                let tempArr: any = [];

                for (let k in tempList) {
                  element?.breakdown.forEach((ele: any, ind: any) => {
                    if (ele.category == key) {
                      let temp = {
                        /* location: key, */
                        category: k,
                        value: tempList[k]?.length,
                        subdata: [
                          {
                            category: k,
                            value: tempList[k]?.length,
                          },
                        ],
                      };
                      tempArr.push(temp);
                      ele['subdata'] = tempArr;
                    }
                  });
                }
              }
            } else if (element.category == 'Allocated') {
              debugger;
              this.allocatedTotal=element?.value;
              const groupedData = element?.Report.reduce(
                (acc: any, obj: any) => {
                  const key = obj.Location__Name;

                  if (!acc[key]) {
                    acc[key] = [];
                  }

                  acc[key].push(obj);

                  return acc;
                },
                {}
              );

              console.log(groupedData);
              for (let k in groupedData) {
                let Count = 0;
                groupedData[k].forEach((element: any) => {
                  Count = Count + element?.BenchData?.length;
                });
                groupedData[k] = {
                  category: k,
                  value: Count,
                  subdata: [
                    {
                      category: k,
                      value: Count,
                    },
                  ],
                };
              }
              console.log(groupedData);
              element?.breakdown.forEach((elem: any) => {
                let tempArr: any = [];
                for (let key in groupedData) {
                  if (key.includes(elem.category)) {
                    tempArr.push(groupedData[key]);
                  }
                }
                elem['subdata'] = tempArr;
              });
            }
          });

          this.getFullPiechart(totalCount, this.typeChart);
        }
      });
    } else if (charttype == 'Program chart') {
      this.ProgramChart();
    } else if (charttype == 'Vendor chart') {
      this.LabVendorSummary();
    } else if (charttype == 'Team chart') {
      this.TeamChart();
    } else if (charttype == 'Team/Program chart') {
      this.Count = this.Count + 1;
      this.LabProgramSummary();
    }
  }
  nonsivLabSearchM = '';
  nonsivLabBenchSearchM = '';
  nonsivLabBenchNoSearchM = '';
  nonsivLabBenchLabelSearchM = '';
  freeLabSearchM = '';
  freeLabBenchSearchM = '';
  freeLabBenchNoSearchM = '';
  freeLabBenchLabelSearchM = '';
  //**** Sorting functionality in table(ascending descending order) ****//
  setOrderRelease(value: string) {
    if (this.orderMappedRelease === value) {
      this.reverseMappedRelease = !this.reverseMappedRelease;
    }
    this.orderMappedRelease = value;
  }

  showTestTrendSearch(tollTip: any) {
    this.tollTipRef = tollTip;
    tollTip.open();
  }
  hideTestTrendSearch() {
    this.tollTipRef.close();
  }
  // showProgramSearch(tollTip:any){
  //   this.tollTipRef = tollTip;
  //   tollTip.open();
  // }
  searchText = '';
  searchLocation = '';
  searchProgram = '';
  searchVendor = '';
  searchSku = '';
  searchAllocated = '';
  searchfromWW = '';
  tollTipRef: any;
  searchtoWW: '';
  searchBench: '';
  searchTeam: '';
  searchDuration: '';
  searchApprovedBy: '';
  searchBenchDetails: '';
  clearInput() {
    this.searchLocation = '';
    this.searchProgram = '';
    this.searchVendor = '';
    this.searchSku = '';
    this.searchAllocated = '';
    this.searchfromWW = '';
    this.searchtoWW = '';
    this.searchBench = '';
    this.searchBenchDetails = '';
    this.searchTeam = '';
    this.searchDuration = '';
  }

  allocatedList: any;
  freeList: any;
  nonSIVList: any;
  typeSubTable: string;
  reportSummary(param: any, type?: string) {
    debugger;
    this.allocatedList = [];
    this.freeList = [];
    this.nonSIVList = [];
    this.typeSubTable = type;
    if (this.typeChart != 'Location chart') {
      this.allocatedList = param;
    } else if (this.typeChart == 'Location chart' && type == 'All') {
      for (let key in param) {
        //console.log(key, yourobject[key]);
        if (key == 'Allocated') {
          this.allocatedList = param[key];
        } else if (key == 'Free') {
          //  this.freeList =
          let tempList = param[key][0];
          let tempArr = [];
          for (let k in tempList) {
            for (let ke in tempList[k][0]) {
              let temp = {
                location: k,
                lab: ke,
                value: tempList[k][0][ke],
              };
              tempArr.push(temp);
            }
          }
          console.log('tempArr', tempArr);
          this.freeList = tempArr;
        } else if (key == 'Non-SIV') {
          let tempList = param[key][0];
          let tempArr = [];
          for (let k in tempList) {
            for (let ke in tempList[k][0]) {
              let temp = {
                location: k,
                lab: ke,
                value: tempList[k][0][ke],
              };
              tempArr.push(temp);
            }
          }
          console.log('tempArr', tempArr);
          this.nonSIVList = tempArr;
        }
      }
    } else if (this.typeChart == 'Location chart' && type == 'Free') {
      let tempArr = [];
      for (let key in param) {
        let tempList = param[key][0];
        for (let k in tempList) {
          let temp = {
            location: key,
            lab: k,
            value: tempList[k],
          };
          tempArr.push(temp);
        }
        console.log('tempArr', tempArr);
      }
      this.freeList = tempArr;
    } else if (this.typeChart == 'Location chart' && type == 'Allocated') {
      /*  let tempArr = [];
      for (let key in param) {
        let tempList = param[key][0];
        for (let k in tempList) {
          let temp = {
            location: key,
            lab: k,
            value: tempList[k],
          };
          tempArr.push(temp);
        }
        console.log('tempArr', tempArr);
      }
      this.allocatedList = tempArr; */
      this.allocatedList = param;
    } else if (this.typeChart == 'Location chart' && type == 'Non-WSE') {
      let tempArr = [];
      for (let key in param) {
        let tempList = param[key][0];
        for (let k in tempList) {
          let temp = {
            location: key,
            lab: k,
            value: tempList[k],
          };
          tempArr.push(temp);
        }
        console.log('tempArr', tempArr);
      }
      this.nonSIVList = tempArr;
    }
  }
  // **** Calling Location Chart API ****//
  Locationchart() {
    this.labwiseChartLoader = false;
    this.service.LabProgramVendorSummary().subscribe((res) => {
      this.Value = true;
      //breakdown = res.Location;
      this.labwiseChartLoader = true;
      this.ChartData = res.Location;
      if (this.ChartData.length == 0) {
        this.chartlength = false;
      } else {
        this.chartlength = true;
      }
      let obj: any = [];
      var totalCount: any = 0;
      for (let i = 0; i < this.ChartData.length; i++) {
        obj[i] = this.ChartData[i].value;
        totalCount = totalCount + obj[i];
      }
      this.getFullPiechart(totalCount, this.typeChart);
    });
  }

  // **** Calling Team/Program API ****//

  LabProgramSummary() {
    //this.programChartLoader = false;
    this.labwiseChartLoader = false;
    this.service.LabProgramSummary().subscribe((res) => {
      this.ChartData = res;
      this.labwiseChartLoader = true;
      if (this.ChartData.length == 0) {
        this.chartlength = false;
      } else {
        this.chartlength = true;
      }
      console.log('stacked chart', this.ChartData);
      // this.ChartTitle = "Program/Team Wise Chart";
      let obj: any = [];
      var totalCount: any = 0;
      for (let i = 0; i < this.ChartData.length; i++) {
        if (this.ChartData[i].category != 'All') {
          obj[i] = this.ChartData[i].value;
          totalCount = totalCount + obj[i];
        }
      }
      this.getFullPiechart(totalCount, this.typeChart);
      this.ProgramVendorSummary();
      this.ProgramLocationSummary();
    });
  }

  //*** Calling program v/s location chart ****/
  isProgramLocation = false;
  ProgramLocationSummary() {
    //this.programChartLoader = false;
    this.labwiseChartLoader = false;
    this.service.getProgramChartData().subscribe((res) => {
      this.isProgramLocation = true;
      this.ChartData = res;
      this.labwiseChartLoader = true;
      if (this.ChartData.length == 0) {
        this.chartlength = false;
      } else {
        this.chartlength = true;
      }
      console.log('stacked chart', this.ChartData);
      // this.ChartTitle = "Program/Location Wise Chart";
      let obj: any = [];
      var totalCount: any = 0;
      for (let i = 0; i < this.ChartData.length; i++) {
        if (this.ChartData[i].category != 'All') {
          obj[i] = this.ChartData[i].value;
          totalCount = totalCount + obj[i];
        }
      }
      //making JSON format for right side bar chart drill down data
      this.ChartData.forEach((element: any, index: any) => {
        debugger;
        /* if (element.category == 'Allocated') { */
          debugger;
          if(element.category == 'All'){
            this.allocatedTotal=element?.value;
          }
          const groupedData = element?.Report.reduce((acc: any, obj: any) => {
            const key = obj.Location__Name;

            if (!acc[key]) {
              acc[key] = [];
            }

            acc[key].push(obj);

            return acc;
          }, {});

          console.log(groupedData);
          for (let k in groupedData) {
            let Count = 0;
            groupedData[k].forEach((element: any) => {
              Count = Count + element?.BenchData?.length;
            });
            groupedData[k] = {
              category: k,
              value: Count,
              subdata: [
                {
                  category: k,
                  value: Count,
                },
              ],
            };
          }
          console.log(groupedData);
          element?.breakdown.forEach((elem: any) => {
            let tempArr: any = [];
            for (let key in groupedData) {
              if (key.includes(elem.category)) {
                tempArr.push(groupedData[key]);
              }
            }
            elem['subdata'] = tempArr;
          });
        /* } */
      });
      this.getFullPiechartLocation(totalCount);
    });
  }

  //*** Calling program v/s Vendor chart ****/
  ProgramVendorSummary() {
    //this.programChartLoader = false;
    this.labwiseChartLoader = false;
    this.service.ProgramVendorSummary().subscribe((res) => {
      this.ChartData = res;
      this.labwiseChartLoader = true;
      if (this.ChartData.length == 0) {
        this.chartlength = false;
      } else {
        this.chartlength = true;
      }
      console.log('stacked chart', this.ChartData);
      // this.ChartTitle = "Program/Vendor Wise Chart";
      let obj: any = [];
      var totalCount: any = 0;
      for (let i = 0; i < this.ChartData.length; i++) {
        if (this.ChartData[i].category != 'All') {
          obj[i] = this.ChartData[i].value;
          totalCount = totalCount + obj[i];
        }
      }
      this.getFullPiechartVendor(totalCount);
    });
  }

  // **** Vendor API ****//
  isVendor = false;
  LabVendorSummary() {
    this.labwiseChartLoader = false;
    this.service.LabVendorSummary().subscribe((res) => {
      this.isVendor = true;
      this.ChartData = res;
      this.labwiseChartLoader = true;
      if (this.ChartData.length == 0) {
        this.chartlength = false;
      } else {
        this.chartlength = true;
      }
      let obj: any = [];
      var totalCount: any = 0;
      for (let i = 0; i < this.ChartData.length; i++) {
        if (this.ChartData[i].category != 'All') {
          obj[i] = this.ChartData[i].value;
          totalCount = totalCount + obj[i];
        }
      }
         //making JSON format for right side bar chart drill down data
         this.ChartData.forEach((element: any, index: any) => {
          debugger;
          /* if (element.category == 'Allocated') { */
            debugger;
            if(element.category == 'All'){
              this.allocatedTotal=element?.value;
            }
            const groupedData = element?.Report.reduce((acc: any, obj: any) => {
              const key = obj.Location__Name;
  
              if (!acc[key]) {
                acc[key] = [];
              }
  
              acc[key].push(obj);
  
              return acc;
            }, {});
  
            console.log(groupedData);
            for (let k in groupedData) {
              let Count = 0;
              groupedData[k].forEach((element: any) => {
                Count = Count + element?.BenchData?.length;
              });
              groupedData[k] = {
                category: k,
                value: Count,
                subdata: [
                  {
                    category: k,
                    value: Count,
                  },
                ],
              };
            }
            console.log(groupedData);
            element?.breakdown.forEach((elem: any) => {
              let tempArr: any = [];
              for (let key in groupedData) {
                if (key.includes(elem.category)) {
                  tempArr.push(groupedData[key]);
                }
              }
              elem['subdata'] = tempArr;
            });
          /* } */
        });
      this.getFullPiechart(totalCount, this.typeChart);
      //console.log('stacked chart', this.ChartData);
      //this.getFullPiechart();
    });
  }

  // **** Calling Team Chart API ****//
  isTeam = false;
  TeamChart() {
    this.labwiseChartLoader = false;
    this.service.getTeamChartData().subscribe((res) => {
      this.isTeam = true;
      this.ChartData = res;
      this.labwiseChartLoader = true;
      if (this.ChartData.length == 0) {
        this.chartlength = false;
      } else {
        this.chartlength = true;
      }
      //console.log("stacked chart",this.ChartData)
      let obj: any = [];
      var totalCount: any = 0;
      for (let i = 0; i < this.ChartData.length; i++) {
        if (this.ChartData[i].category != 'All') {
          obj[i] = this.ChartData[i].value;
          totalCount = totalCount + obj[i];
        }
      }
      console.log('TotalCount', totalCount);
      //making JSON format for right side bar chart drill down data
      this.ChartData.forEach((element: any, index: any) => {
        debugger;
        /* if (element.category == 'Allocated') { */
          debugger;
          if(element.category == 'All'){
            this.allocatedTotal=element?.value;
          }
          const groupedData = element?.Report.reduce((acc: any, obj: any) => {
            const key = obj.Location__Name;

            if (!acc[key]) {
              acc[key] = [];
            }

            acc[key].push(obj);

            return acc;
          }, {});

          console.log(groupedData);
          for (let k in groupedData) {
            let Count = 0;
            groupedData[k].forEach((element: any) => {
              Count = Count + element?.BenchData?.length;
            });
            groupedData[k] = {
              category: k,
              value: Count,
              subdata: [
                {
                  category: k,
                  value: Count,
                },
              ],
            };
          }
          console.log(groupedData);
          element?.breakdown.forEach((elem: any) => {
            let tempArr: any = [];
            for (let key in groupedData) {
              if (key.includes(elem.category)) {
                tempArr.push(groupedData[key]);
              }
            }
            elem['subdata'] = tempArr;
          });
        /* } */
      });
      this.getFullPiechart(totalCount, this.typeChart);
    });
  }

  // **** Calling Program API ****//
  isProgram = false;
  ProgramChart() {
    this.labwiseChartLoader = false;
    this.service.getProgramChartData().subscribe((res) => {
      this.isProgram = true;
      this.ChartData = res;
      this.labwiseChartLoader = true;
      if (this.ChartData.length == 0) {
        this.chartlength = false;
      } else {
        this.chartlength = true;
      }
      //console.log("stacked chart",this.ChartData)
      let obj: any = [];
      var totalCount: any = 0;
      for (let i = 0; i < this.ChartData.length; i++) {
        if (this.ChartData[i].category != 'All') {
          obj[i] = this.ChartData[i].value;
          totalCount = totalCount + obj[i];
        }
      }
        //making JSON format for right side bar chart drill down data
        this.ChartData.forEach((element: any, index: any) => {
          debugger;
          /* if (element.category == 'Allocated') { */
            debugger;
            if(element.category == 'All'){
              this.allocatedTotal=element?.value;
            }
            const groupedData = element?.Report.reduce((acc: any, obj: any) => {
              const key = obj.Location__Name;
  
              if (!acc[key]) {
                acc[key] = [];
              }
  
              acc[key].push(obj);
  
              return acc;
            }, {});
  
            console.log(groupedData);
            for (let k in groupedData) {
              let Count = 0;
              groupedData[k].forEach((element: any) => {
                Count = Count + element?.BenchData?.length;
              });
              groupedData[k] = {
                category: k,
                value: Count,
                subdata: [
                  {
                    category: k,
                    value: Count,
                  },
                ],
              };
            }
            console.log(groupedData);
            element?.breakdown.forEach((elem: any) => {
              let tempArr: any = [];
              for (let key in groupedData) {
                if (key.includes(elem.category)) {
                  tempArr.push(groupedData[key]);
                }
              }
              elem['subdata'] = tempArr;
            });
          /* } */
        });
      this.getFullPiechart(totalCount, this.typeChart);
    });
  }

  /* download xl */
  downloadnonSIVList() {
    let dataList: any = [];
    this.nonSIVList.forEach((element: any) => {
      let temp = {
        Lab: element.location,
        Lab_Details: element.lab,
        Bench: element.value?.length,
        Bench_Details: element.value.join(','),
      };
      dataList.push(temp);
    });
    this.exportService.exportAsExcelFile(dataList, 'Non WSE Bench Details');
  }

  downloadfreeList() {
    debugger;
    let dataList: any = [];
    this.freeList.forEach((element: any) => {
      let temp = {
        Lab: element.location,
        Lab_Details: element.lab,
        Bench: element.value?.length,
        Bench_Details: element.value.join(','),
      };
      dataList.push(temp);
    });
    this.exportService.exportAsExcelFile(dataList, 'Free Bench Details');
  }

  downloadallocatedList() {
    this.exportService1.exportExcel(
      this.allocatedList,
      'Allocated Bench Details'
    );
  }

  downloadallocatedListbench() {
    this.exportService1.exportExcel(this.allocatedList, 'Bench Details');
  }

  // **** Full Pie-Chart Function ****//
  reportData: any;
  allocatedTotal:any;
  freeTotal:any;
  nonwseTotal:any;
  getFullPiechart(totalCount: any, chartType: any) {
    am5.array.each(am5.registry.rootElements, function (root) {
      if (root?.dom.id == 'chartdiv') {
        root.dispose();
      }
    });

    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    let root = am5.Root.new('chartdiv');
    root._logo.dispose();

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)]);

    //Number Format for both Pie and Bar Chart
    root.numberFormatter.setAll({
      numberFormat: '#,###.',
      numericFields: ['valueY'],
    });

    // Create wrapper container
    let container = root.container.children.push(
      am5.Container.new(root, {
        width: am5.p100,
        height: am5.percent(90),
        //x: am5.percent(100),

        layout: root.horizontalLayout,
      })
    );

    // ==============================================
    // Column chart start
    // ==============================================

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    let columnChart = container.children.push(
      am5xy.XYChart.new(root, {
        width: am5.p50,
        panX: false,
        panY: false,
        wheelX: 'none',
        wheelY: 'none',
        layout: root.verticalLayout,
        reverseChildren: true,
        x: am5.percent(50),
        //inverted : true
        //rotation: 120
      })
    );

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let yRenderer = am5xy.AxisRendererY.new(root, {});
    let yAxis = columnChart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: 'category',
        renderer: yRenderer,
        y: am5.percent(0),
      })
    );
    yRenderer.grid.template.setAll({
      location: 0,
    });

    let xAxis = columnChart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        renderer: am5xy.AxisRendererX.new(root, {
          strokeOpacity: 0.1,
        }),
      })
    );

    function createSeries(
      name: any,
      fiels: any,
      data: any,
      color: any,
      All: any
    ) {
      // Add series
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
      let columnSeries = columnChart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: name,
          xAxis: xAxis,
          yAxis: yAxis,
          stacked: true,
          valueXField: fiels,
          categoryYField: 'category',
          // reverseChildren: true
        })
      );

      //Bar chart Tooltip text
      columnSeries.columns.template.setAll({
        tooltipText: '{name}: {valueX}',
        /* tooltipText: "{categoryY}: {name} - {valueX}", */
        // minHeight: 150
      });
      if (All == false) {
        //Bar chart bullet
        columnSeries.bullets.push(function () {
          return am5.Bullet.new(root, {
            locationX: 1,
            locationY: 0.5,
            sprite: am5.Label.new(root, {
              text: '{valueX}',
              // fill: root.interfaceColors.get("alternativeText"),
              centerY: am5.p50,
              // centerX: am5.p50,
              populateText: true,
              fill: am5.color('#000000'),
            }),
          });
        });
      } else {
        columnSeries.bullets.push(function () {
          return am5.Bullet.new(root, {
            sprite: am5.Label.new(root, {
              text: '{valueX}',
              fill: root.interfaceColors.get('alternativeText'),
              centerY: am5.p50,
              centerX: am5.p50,
              populateText: true,
            }),
          });
        });
      }

      // let color = slice.get("fill")
      columnSeries.columns.template.setAll({
        fill: color,
        stroke: color,
      });

      columnSeries.data.setAll(data);
      return columnSeries;
    }

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/

    columnChart.appear(1000, 100);

    // ==============================================
    // Column chart end
    // ==============================================

    // ==============================================
    // Pie chart start
    // ==============================================

    //Create wrapper container

    let pieChart = container.children.push(
      am5percent.PieChart.new(root, {
        width: am5.percent(50),
        x: am5.percent(0),
        y: am5.percent(-5.8),
        innerRadius: am5.percent(50),
        radius: am5.percent(65),
      })
    );

    // Create series
    let pieSeries = pieChart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: 'value',
        categoryField: 'category',
        legendValueText: '', // legend text format
      })
    );

    //Create title
    pieSeries.children.unshift(
      am5.Label.new(root, {
        text: this.ChartTitle,
        fontSize: 18,
        fontWeight: '400',
        textAlign: 'center',
        x: am5.percent(0),
        y: am5.percent(-7),
        centerX: am5.percent(50),
        paddingTop: -160,
        paddingBottom: 0,
        fill: am5.color('#9eacb4'),
        //paddingRight: 950
      })
    );

    //Color code for pie slices
    if (this.removeNonSIV == true) {
      pieSeries
        .get('colors')
        .set('colors', [
          am5.color(0xdc4534),
          am5.color(0xd7a700),
          am5.color(0x68ad5c),
        ]);
    } else {
      pieSeries
        .get('colors')
        .set('colors', [
          am5.color('#a4b0be'),
          am5.color(0xdc4534),
          am5.color(0xd7a700),
          am5.color(0x68ad5c),
          am5.color('#12CBC4'),
          am5.color('#FDA7DF'),
          am5.color('#ED4C67'),
          am5.color('#1289A7'),
          am5.color('#D980FA'),
          am5.color('#B53471'),
          am5.color('#0652DD'),
          am5.color('#9980FA'),
          am5.color('#833471'),
          am5.color('#1B1464'),
          am5.color('#5758BB'),
          am5.color('#6F1E51'),
          am5.color('#006266'),
          am5.color('#40407a'),
          am5.color('#ffda79'),
          am5.color('#cd6133'),
          am5.color('#218c74'),
          am5.color('#227093'),
          am5.color('#b8e994'),
          am5.color('#f8c291'),
          am5.color('#be2edd'),
        ]);
    }

    //Pie-chart tooltip
    pieSeries.slices.template.setAll({
      templateField: 'colors',
      strokeOpacity: 0,
      tooltipText:
        "{category} ({value}) : {valuePercentTotal.formatNumber('0.00')}%",
    });

    // Pre-select first slice
    pieSeries.events.on('datavalidated', function () {
      pieSeries.slices.getIndex(0).set('active', false);
      //   pieSeries.get("legendDataItem").get("itemContainer").hide();
      pieSeries.dataItems[0].hide(0);
    });

    //pieSeries.slices.getIndex(0).set();

    //Pie chart and bar chart integrating area
    let currentSlice: am5.Slice;
    pieSeries.slices.template.on('active', (active, slice: any) => {
      debugger;
      if (currentSlice && currentSlice != slice && active) {
        currentSlice.set('active', false);
      }

      let color = slice.get('fill');

      label1.setAll({
        fill: color,
        text: totalCount,
      });

      // label2.set("text", slice.dataItem.get("category"));
      label2.set('text', 'Total');
      if (
        this.isTeam == true ||
        this.isProgram == true ||
        this.isVendor == true ||
        this.isProgramLocation == true
      ) {
        if (slice.dataItem.dataContext.category == 'All') {
          if (columnChart.series.length >= 1) {
            columnChart.series.clear();
          }
          /* remove zero */
          slice.dataItem.dataContext.breakdown.forEach(
            (element: any, index: any) => {
              Object.keys(element).forEach(function (key, index) {
                //console.log(key, obj[key]);
                if (key == 'category') {
                } else {
                  if (element[key] == 0) {
                    element[key] = null;
                  }
                }
              });
            }
          );
          /* create series first time */
          let keyList: any = [];
          slice.dataItem.dataContext.breakdown.forEach(
            (element: any, index: any) => {
              Object.keys(element).forEach(function (key, index) {
                //console.log(key, obj[key]);
                if (key == 'category') {
                } else {
                  keyList.push(key);
                }
              });
            }
          );
          let uniqeKeyList = [...new Set(keyList)];
          uniqeKeyList.forEach(
            //Object.keys(slice.dataItem.dataContext.breakdown[0]).forEach(
            function (key, index) {
              //console.log(key, obj[key]);
              if (key == 'category') {
              } else {
                let color = pieSeries.get('colors').get('colors')[index];
                createSeries(
                  key,
                  key,
                  slice.dataItem.dataContext.breakdown,
                  color,
                  true
                );
              }
            }
          );
          this.reportData = slice.dataItem.dataContext.Report;
          debugger;
          this.reportSummary(this.reportData);
        } else {
          if (columnChart.series.length >= 1) {
            columnChart.series.clear();
          }
          /*  createSeries(
            'value',
            'value',
            slice.dataItem.dataContext.breakdown,
            slice.get('fill'),
            false
          ); */
          this.allocatedTotal=slice.dataItem.dataContext.value;
          this.reportData = slice.dataItem.dataContext.Report;
          debugger;
          this.reportSummary(this.reportData);
          let allBoolean = false;
          // Add series
          // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
          let columnSeries = columnChart.series.push(
            am5xy.ColumnSeries.new(root, {
              name: 'value',
              xAxis: xAxis,
              yAxis: yAxis,
              stacked: true,
              valueXField: 'value',
              categoryYField: 'category',
              // reverseChildren: true
            })
          );

          //Bar chart Tooltip text
          columnSeries.columns.template.setAll({
            tooltipText: '{name}: {valueX}',
            /* tooltipText: "{categoryY}: {name} - {valueX}", */
            // minHeight: 150
          });
          if (allBoolean == false) {
            //Bar chart bullet
            columnSeries.bullets.push(function () {
              return am5.Bullet.new(root, {
                locationX: 1,
                locationY: 0.5,
                sprite: am5.Label.new(root, {
                  text: '{valueX}',
                  // fill: root.interfaceColors.get("alternativeText"),
                  centerY: am5.p50,
                  // centerX: am5.p50,
                  populateText: true,
                  fill: am5.color('#000000'),
                }),
              });
            });
          } else {
            columnSeries.bullets.push(function () {
              return am5.Bullet.new(root, {
                sprite: am5.Label.new(root, {
                  text: '{valueX}',
                  fill: root.interfaceColors.get('alternativeText'),
                  centerY: am5.p50,
                  centerX: am5.p50,
                  populateText: true,
                }),
              });
            });
          }

          // let color = slice.get("fill")
          columnSeries.columns.template.setAll({
            fill: slice.get('fill'),
            stroke: slice.get('fill'),
          });

          columnSeries.columns.template.events.on('click', (ev) => {
            debugger;
            const categoryData: any = ev.target.dataItem.dataContext;
            if (categoryData.subdata != undefined) {
              columnSeries.data.setAll(categoryData.subdata);
              xAxis.data.setAll(categoryData.subdata);
              yAxis.data.setAll(categoryData.subdata);
              this.allocatedTotal=categoryData.value;
              this.allocatedList = this.allocatedList.filter(
                (item: any) =>
                  item.Location__Name.toLowerCase().includes(
                    categoryData.category.toLowerCase()
                  )
                /*  if (key.includes(elem.category)) {
                  tempArr.push(groupedData[key]);sss
                } */
                /*  item.Location__Name.toLowerCase() ===
                    categoryData.category.toLowerCase()  */
              );
              // filterData(categoryData.category);
              columnSeries.appear();
            }
          });
          columnSeries.data.setAll(slice.dataItem.dataContext.breakdown);
          //  return columnSeries;
        }
      } else {
        this.isTeam = false;
        this.isProgram = false;
        this.isVendor = false;
        this.isProgramLocation = false;
        if (slice.dataItem.dataContext.category == 'All') {
          if (columnChart.series.length >= 1) {
            columnChart.series.clear();
          }
          if (this.removeNonSIV == false) {
            createSeries(
              'Non-WSE',
              'Non-SIV',
              slice.dataItem.dataContext.breakdown,
              am5.color('#0xdc4534'),
              true
            );
          }
          createSeries(
            'Allocated',
            'Allocated',
            slice.dataItem.dataContext.breakdown,
            am5.color('#0xd7a700'),
            true
          );
          createSeries(
            'Free',
            'Free',
            slice.dataItem.dataContext.breakdown,
            am5.color('#0x68ad5c'),
            true
          );

          this.reportData = slice.dataItem.dataContext.Report[0];
          debugger;
          this.reportSummary(this.reportData, 'All');
        } else if (slice.dataItem.dataContext.category == 'Non-WSE') {
          if (columnChart.series.length >= 1) {
            columnChart.series.clear();
          }
          /*  createSeries(
            'value',
            'value',
            slice.dataItem.dataContext.breakdown,
            am5.color('#0xdc4534'),
            false
          );
 */
          this.nonwseTotal=slice.dataItem.dataContext.value;
          this.reportData = slice.dataItem.dataContext.Report;
          debugger;
          this.reportSummary(this.reportData, 'Non-WSE');
          let allBoolean = false;
          // Add series
          // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
          let columnSeries = columnChart.series.push(
            am5xy.ColumnSeries.new(root, {
              name: 'value',
              xAxis: xAxis,
              yAxis: yAxis,
              stacked: true,
              valueXField: 'value',
              categoryYField: 'category',
              // reverseChildren: true
            })
          );

          //Bar chart Tooltip text
          columnSeries.columns.template.setAll({
            tooltipText: '{name}: {valueX}',
            /* tooltipText: "{categoryY}: {name} - {valueX}", */
            // minHeight: 150
          });
          if (allBoolean == false) {
            //Bar chart bullet
            columnSeries.bullets.push(function () {
              return am5.Bullet.new(root, {
                locationX: 1,
                locationY: 0.5,
                sprite: am5.Label.new(root, {
                  text: '{valueX}',
                  // fill: root.interfaceColors.get("alternativeText"),
                  centerY: am5.p50,
                  // centerX: am5.p50,
                  populateText: true,
                  fill: am5.color('#000000'),
                }),
              });
            });
          } else {
            columnSeries.bullets.push(function () {
              return am5.Bullet.new(root, {
                sprite: am5.Label.new(root, {
                  text: '{valueX}',
                  fill: root.interfaceColors.get('alternativeText'),
                  centerY: am5.p50,
                  centerX: am5.p50,
                  populateText: true,
                }),
              });
            });
          }

          // let color = slice.get("fill")
          columnSeries.columns.template.setAll({
            fill: am5.color('#0xdc4534'),
            stroke: am5.color('#0xdc4534'),
          });

          columnSeries.columns.template.events.on('click', (ev) => {
            debugger;
            const categoryData: any = ev.target.dataItem.dataContext;
            if (categoryData.subdata != undefined) {
              columnSeries.data.setAll(categoryData.subdata);
              xAxis.data.setAll(categoryData.subdata);
              yAxis.data.setAll(categoryData.subdata);
              this.nonwseTotal=categoryData.value;
              this.nonSIVList = this.nonSIVList.filter(
                (item: any) =>
                  item.location.toLowerCase() ===
                    categoryData.category.toLowerCase() ||
                  item.lab.toLowerCase() === categoryData.category.toLowerCase()
              );
              // filterData(categoryData.category);
              columnSeries.appear();
            }
          });
          columnSeries.data.setAll(slice.dataItem.dataContext.breakdown);
          //  return columnSeries;
        } else if (slice.dataItem.dataContext.category == 'Allocated') {
          if (columnChart.series.length >= 1) {
            columnChart.series.clear();
          }
          /*  createSeries(
            'value',
            'value',
            slice.dataItem.dataContext.breakdown,
            am5.color('#0xd7a700'),
            false
          ); */
          this.allocatedTotal=slice.dataItem.dataContext.value;
          this.reportData = slice.dataItem.dataContext.Report;
          debugger;
          this.reportSummary(this.reportData, 'Allocated');
          let allBoolean = false;
          // Add series
          // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
          let columnSeries = columnChart.series.push(
            am5xy.ColumnSeries.new(root, {
              name: 'value',
              xAxis: xAxis,
              yAxis: yAxis,
              stacked: true,
              valueXField: 'value',
              categoryYField: 'category',
              // reverseChildren: true
            })
          );

          //Bar chart Tooltip text
          columnSeries.columns.template.setAll({
            tooltipText: '{name}: {valueX}',
            /* tooltipText: "{categoryY}: {name} - {valueX}", */
            // minHeight: 150
          });
          if (allBoolean == false) {
            //Bar chart bullet
            columnSeries.bullets.push(function () {
              return am5.Bullet.new(root, {
                locationX: 1,
                locationY: 0.5,
                sprite: am5.Label.new(root, {
                  text: '{valueX}',
                  // fill: root.interfaceColors.get("alternativeText"),
                  centerY: am5.p50,
                  // centerX: am5.p50,
                  populateText: true,
                  fill: am5.color('#000000'),
                }),
              });
            });
          } else {
            columnSeries.bullets.push(function () {
              return am5.Bullet.new(root, {
                sprite: am5.Label.new(root, {
                  text: '{valueX}',
                  fill: root.interfaceColors.get('alternativeText'),
                  centerY: am5.p50,
                  centerX: am5.p50,
                  populateText: true,
                }),
              });
            });
          }

          // let color = slice.get("fill")
          columnSeries.columns.template.setAll({
            fill: am5.color('#0xd7a700'),
            stroke: am5.color('#0xd7a700'),
          });

          columnSeries.columns.template.events.on('click', (ev) => {
            debugger;
            const categoryData: any = ev.target.dataItem.dataContext;
            if (categoryData.subdata != undefined) {
              columnSeries.data.setAll(categoryData.subdata);
              xAxis.data.setAll(categoryData.subdata);
              yAxis.data.setAll(categoryData.subdata);
              this.allocatedTotal=categoryData.value;
              this.allocatedList = this.allocatedList.filter(
                (item: any) =>
                  item.Location__Name.toLowerCase().includes(
                    categoryData.category.toLowerCase()
                  )
                /*  if (key.includes(elem.category)) {
                  tempArr.push(groupedData[key]);sss
                } */
                /*  item.Location__Name.toLowerCase() ===
                    categoryData.category.toLowerCase()  */
              );
              // filterData(categoryData.category);
              columnSeries.appear();
            }
          });
          columnSeries.data.setAll(slice.dataItem.dataContext.breakdown);
          //  return columnSeries;
        } else if (slice.dataItem.dataContext.category == 'Free') {
          if (columnChart.series.length >= 1) {
            columnChart.series.clear();
          }
          /*  createSeries(
            'value',
            'value',
            slice.dataItem.dataContext.breakdown,
            am5.color('#0x68ad5c'),
            false
          ); */
          this.freeTotal=slice.dataItem.dataContext.value;
          this.reportData = slice.dataItem.dataContext.Report;
          debugger;
          this.reportSummary(this.reportData, 'Free');
          let allBoolean = false;
          // Add series
          // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
          let columnSeries = columnChart.series.push(
            am5xy.ColumnSeries.new(root, {
              name: 'value',
              xAxis: xAxis,
              yAxis: yAxis,
              stacked: true,
              valueXField: 'value',
              categoryYField: 'category',
              // reverseChildren: true
            })
          );

          //Bar chart Tooltip text
          columnSeries.columns.template.setAll({
            tooltipText: '{name}: {valueX}',
            /* tooltipText: "{categoryY}: {name} - {valueX}", */
            // minHeight: 150
          });
          if (allBoolean == false) {
            //Bar chart bullet
            columnSeries.bullets.push(function () {
              return am5.Bullet.new(root, {
                locationX: 1,
                locationY: 0.5,
                sprite: am5.Label.new(root, {
                  text: '{valueX}',
                  // fill: root.interfaceColors.get("alternativeText"),
                  centerY: am5.p50,
                  // centerX: am5.p50,
                  populateText: true,
                  fill: am5.color('#000000'),
                }),
              });
            });
          } else {
            columnSeries.bullets.push(function () {
              return am5.Bullet.new(root, {
                sprite: am5.Label.new(root, {
                  text: '{valueX}',
                  fill: root.interfaceColors.get('alternativeText'),
                  centerY: am5.p50,
                  centerX: am5.p50,
                  populateText: true,
                }),
              });
            });
          }

          // let color = slice.get("fill")
          columnSeries.columns.template.setAll({
            fill: am5.color('#0x68ad5c'),
            stroke: am5.color('#0x68ad5c'),
          });

          columnSeries.columns.template.events.on('click', (ev) => {
            debugger;
            const categoryData: any = ev.target.dataItem.dataContext;
            if (categoryData.subdata != undefined) {
              columnSeries.data.setAll(categoryData.subdata);
              xAxis.data.setAll(categoryData.subdata);
              yAxis.data.setAll(categoryData.subdata);
              this.freeTotal=categoryData.value;
              this.freeList = this.freeList.filter(
                (item: any) =>
                  item.location.toLowerCase() ===
                    categoryData.category.toLowerCase() ||
                  item.lab.toLowerCase() === categoryData.category.toLowerCase()
              );
              // filterData(categoryData.category);
              columnSeries.appear();
            }
          });
          columnSeries.data.setAll(slice.dataItem.dataContext.breakdown);
          //  return columnSeries;
        }
      }
      /*  columnSeries.columns.template.setAll({
          fill: color,
          stroke: slice.get("fill")
        });
        
        columnSeries.data.setAll(slice.dataItem.dataContext.breakdown); */

      yAxis.data.setAll(slice.dataItem.dataContext.breakdown);
      currentSlice = slice;
    });

    if (chartType != 'Location chart') {
      //pie-chart label
      pieSeries.labels.template.setAll({
        text: "{category} ({value}) : {valuePercentTotal.formatNumber('0.00')}%",
        inside: true,
        textType: 'adjusted',
        radius: 10,
      });
    } else {
      pieSeries.labels.template.set('forceHidden', true);
      pieSeries.ticks.template.set('forceHidden', true);
    }

    // pieSeries.labels.template.set("forceHidden", true);
    // pieSeries.ticks.template.set("forceHidden", true);

    //pieSeries.data.setAll(data);
    //pieSeries.data.setAll(this.ChartData);
    pieSeries.data.setAll(this.ChartData);

    // Add label
    let label1 = pieChart.seriesContainer.children.push(
      am5.Label.new(root, {
        text: '',
        fontSize: 35,
        fontWeight: 'bold',
        centerX: am5.p50,
        centerY: am5.p50,
      })
    );

    let label2 = pieChart.seriesContainer.children.push(
      am5.Label.new(root, {
        text: '',
        fontSize: 12,
        centerX: am5.p50,
        centerY: am5.p50,
        dy: 30,
      })
    );

    // **** Add legend ****//
    if (this.ChartData.length <= 1) {
      var legend = pieSeries.children.push(
        am5.Legend.new(root, {
          nameField: 'Category',
          // centerX: am5.percent(-175),
          x: am5.percent(10),
          y: am5.percent(44),
        })
      );
    } else if (this.ChartData.length == 2) {
      var legend = pieSeries.children.push(
        am5.Legend.new(root, {
          nameField: 'Category',
          // centerX: am5.percent(-175),
          x: am5.percent(-14),
          y: am5.percent(44),
        })
      );
    } else if (this.ChartData.length == 3) {
      var legend = pieSeries.children.push(
        am5.Legend.new(root, {
          /* nameField: 'Category', */
          nameField: 'name',
          fillField: 'color',
          strokeField: 'color',
          // centerX: am5.percent(-175),
          x: am5.percent(-15),
          y: am5.percent(44),
        })
      );
    } else if (this.ChartData.length == 4) {
      var legend = pieSeries.children.push(
        am5.Legend.new(root, {
          //nameField: 'Category',
          nameField: 'name',
          fillField: 'color',
          strokeField: 'color',
          // centerX: am5.percent(-175),
          x: am5.percent(-25),
          y: am5.percent(44),
          layout: am5.GridLayout.new(root, {
            maxColumns: 3,
            fixedWidthGrid: true,
          }),
        })
      );
    } else {
      var legend = pieSeries.children.push(
        am5.Legend.new(root, {
          nameField: 'Category',
          // centerX: am5.percent(-175),
          x: am5.percent(-30),
          y: am5.percent(40),
          layout: am5.GridLayout.new(root, {
            maxColumns: 3,
            fixedWidthGrid: true,
          }),
        })
      );
    }

    /*     legend.labels.template.adapters.add('text', function (text, target,index) {
      debugger;
      if (target.dataItem) {
        return '<5%';
      }
      return text;
    });
 */
    if (chartType == 'Location chart') {
      var legendDataItem = [...pieSeries.dataItems];
      //legend.data.setAll(legendDataItem);
      if (this.sliceHide) {
        legend.data.setAll([
          {
            name: 'Allocated',
            color: am5.color(0xd7a700),
          },
          {
            name: 'Free',
            color: am5.color(0x68ad5c),
          },
        ]);
      } else {
        legend.data.setAll([
          {
            name: 'Non-WSE',
            color: am5.color(0xdc4534),
          },
          {
            name: 'Allocated',
            color: am5.color(0xd7a700),
          },
          {
            name: 'Free',
            color: am5.color(0x68ad5c),
          },
        ]);
      }
      //legend.dataItem.hide(0);
    }

    // legend.data.setAll(chart.series.values);
    pieSeries.appear(1000, 100);

    // **** for (download)exporting chart **** //
    if (this.chartlength) {
      var exporting = am5plugins_exporting.Exporting.new(root, {
        menu: am5plugins_exporting.ExportingMenu.new(root, {}),
      });
    }
  }
  // var exporting = am5plugins_exporting.Exporting.new(root, {
  //   menu: am5plugins_exporting.ExportingMenu.new(root, {}),
  //  });
  // }

  // **** Full Pie-Chart Function ****//
  getFullPiechartLocation(totalCount: any) {
    am5.array.each(am5.registry.rootElements, function (root) {
      if (root?.dom.id == 'chartdiv2') {
        root.dispose();
      }
    });
    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    let root = am5.Root.new('chartdiv2');
    root._logo.dispose();

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)]);

    //Number Format for both Pie and Bar Chart
    root.numberFormatter.setAll({
      numberFormat: '#,###.',
      numericFields: ['valueY'],
    });

    // Create wrapper container
    let container = root.container.children.push(
      am5.Container.new(root, {
        width: am5.p100,
        height: am5.percent(90),
        //x: am5.percent(100),

        layout: root.horizontalLayout,
      })
    );

    // ==============================================
    // Column chart start
    // ==============================================

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    let columnChart = container.children.push(
      am5xy.XYChart.new(root, {
        width: am5.p50,
        panX: false,
        panY: false,
        wheelX: 'none',
        wheelY: 'none',
        layout: root.verticalLayout,
        reverseChildren: true,
        x: am5.percent(50),
        //inverted : true
        //rotation: 120
      })
    );

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let yRenderer = am5xy.AxisRendererY.new(root, {});
    let yAxis = columnChart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: 'category',
        renderer: yRenderer,
        y: am5.percent(0),
      })
    );

    yRenderer.grid.template.setAll({
      location: 0,
    });

    let xAxis = columnChart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        min: 0,
        renderer: am5xy.AxisRendererX.new(root, {
          strokeOpacity: 0.1,
        }),
      })
    );

    function createSeries(
      name: any,
      fiels: any,
      data: any,
      color: any,
      All: any
    ) {
      // Add series
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
      let columnSeries = columnChart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: name,
          xAxis: xAxis,
          yAxis: yAxis,
          stacked: true,
          valueXField: fiels,
          categoryYField: 'category',
          // reverseChildren: true
        })
      );

      //Bar chart Tooltip text
      columnSeries.columns.template.setAll({
        tooltipText: '{name}: {valueX}',
        /* tooltipText: "{categoryY}: {name} - {valueX}", */
        // minHeight: 150
      });
      if (All == false) {
        //Bar chart bullet
        columnSeries.bullets.push(function () {
          return am5.Bullet.new(root, {
            locationX: 1,
            locationY: 0.5,
            sprite: am5.Label.new(root, {
              text: '{valueX}',
              // fill: root.interfaceColors.get("alternativeText"),
              centerY: am5.p50,
              // centerX: am5.p50,
              populateText: true,
              fill: am5.color('#000000'),
            }),
          });
        });
      } else {
        columnSeries.bullets.push(function () {
          return am5.Bullet.new(root, {
            sprite: am5.Label.new(root, {
              text: '{valueX}',
              fill: root.interfaceColors.get('alternativeText'),
              centerY: am5.p50,
              centerX: am5.p50,
              populateText: true,
            }),
          });
        });
      }

      // let color = slice.get("fill")
      columnSeries.columns.template.setAll({
        fill: color,
        stroke: color,
      });

      columnSeries.data.setAll(data);
      return columnSeries;
    }
    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/

    columnChart.appear(1000, 100);

    // ==============================================
    // Column chart end
    // ==============================================

    // ==============================================
    // Pie chart start
    // ==============================================

    //Create wrapper container

    let pieChart = container.children.push(
      am5percent.PieChart.new(root, {
        width: am5.percent(50),
        x: am5.percent(0),
        y: am5.percent(-5.8),
        innerRadius: am5.percent(50),
        radius: am5.percent(65),
      })
    );

    // Create series
    let pieSeries = pieChart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: 'value',
        categoryField: 'category',
        legendValueText: '', // legend text format
      })
    );

    //Create title
    pieSeries.children.unshift(
      am5.Label.new(root, {
        text: this.ChartTitle,
        fontSize: 18,
        fontWeight: '400',
        textAlign: 'center',
        x: am5.percent(0),
        y: am5.percent(-3),
        centerX: am5.percent(50),
        paddingTop: -160,
        paddingBottom: 0,
        fill: am5.color('#9eacb4'),
        //paddingRight: 950
      })
    );

    //Color code for pie slices
    pieSeries
      .get('colors')
      .set('colors', [
        am5.color('#a4b0be'),
        am5.color(0xdc4534),
        am5.color(0xd7a700),
        am5.color(0x68ad5c),
        am5.color('#12CBC4'),
        am5.color('#FDA7DF'),
        am5.color('#ED4C67'),
        am5.color('#1289A7'),
        am5.color('#D980FA'),
        am5.color('#B53471'),
        am5.color('#0652DD'),
        am5.color('#9980FA'),
        am5.color('#833471'),
        am5.color('#1B1464'),
        am5.color('#5758BB'),
        am5.color('#6F1E51'),
        am5.color('#006266'),
        am5.color('#40407a'),
        am5.color('#ffda79'),
        am5.color('#cd6133'),
        am5.color('#218c74'),
        am5.color('#227093'),
        am5.color('#b8e994'),
        am5.color('#f8c291'),
        am5.color('#be2edd'),
      ]);

    //Pie-chart tooltip
    pieSeries.slices.template.setAll({
      templateField: 'colors',
      strokeOpacity: 0,
      tooltipText:
        "{category} ({value}) : {valuePercentTotal.formatNumber('0.00')}%",
    });

    // Pre-select first slice
    pieSeries.events.on('datavalidated', function () {
      pieSeries.slices.getIndex(0).set('active', false);
      pieSeries.dataItems[0].hide(0);
    });

    //pieSeries.slices.getIndex(0).set();

    //Pie chart and bar chart integrating area
    let currentSlice: am5.Slice;
    pieSeries.slices.template.on('active', function (active, slice: any) {
      if (currentSlice && currentSlice != slice && active) {
        currentSlice.set('active', false);
      }

      let color = slice.get('fill');

      // label1.setAll({
      //   fill: color,
      //   text: slice.dataItem.get("value"),
      // });

      // label2.set("text", slice.dataItem.get("category"));

      label1.setAll({
        fill: color,
        text: totalCount,
      });
      debugger;
      // label2.set("text", slice.dataItem.get("category"));
      label2.set('text', 'Total');
      if (slice.dataItem.dataContext.category == 'All') {
        if (columnChart.series.length >= 1) {
          columnChart.series.clear();
        }
        /* remove zero */
        slice.dataItem.dataContext.breakdown.forEach(
          (element: any, index: any) => {
            Object.keys(element).forEach(function (key, index) {
              //console.log(key, obj[key]);
              if (key == 'category') {
              } else {
                if (element[key] == 0) {
                  element[key] = null;
                }
              }
            });
          }
        );
        /* create series first time */
        let keyList: any = [];
        slice.dataItem.dataContext.breakdown.forEach(
          (element: any, index: any) => {
            Object.keys(element).forEach(function (key, index) {
              //console.log(key, obj[key]);
              if (key == 'category') {
              } else {
                keyList.push(key);
              }
            });
          }
        );
        let uniqeKeyList = [...new Set(keyList)];
        uniqeKeyList.forEach(function (key, index) {
          //console.log(key, obj[key]);
          if (key == 'category') {
          } else {
            let color = pieSeries.get('colors').get('colors')[index];
            createSeries(
              key,
              key,
              slice.dataItem.dataContext.breakdown,
              color,
              true
            );
          }
        });
      } else {
        if (columnChart.series.length >= 1) {
          columnChart.series.clear();
        }
       /*  createSeries(
          'value',
          'value',
          slice.dataItem.dataContext.breakdown,
          slice.get('fill'),
          false
        ); */
        // Add series
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
      let allBoolean = false;
      let columnSeries = columnChart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: 'value',
          xAxis: xAxis,
          yAxis: yAxis,
          stacked: true,
          valueXField: 'value',
          categoryYField: 'category',
          // reverseChildren: true
        })
      );

      //Bar chart Tooltip text
      columnSeries.columns.template.setAll({
        tooltipText: '{name}: {valueX}',
        /* tooltipText: "{categoryY}: {name} - {valueX}", */
        // minHeight: 150
      });
      if (allBoolean == false) {
        //Bar chart bullet
        columnSeries.bullets.push(function () {
          return am5.Bullet.new(root, {
            locationX: 1,
            locationY: 0.5,
            sprite: am5.Label.new(root, {
              text: '{valueX}',
              // fill: root.interfaceColors.get("alternativeText"),
              centerY: am5.p50,
              // centerX: am5.p50,
              populateText: true,
              fill: am5.color('#000000'),
            }),
          });
        });
      } else {
        columnSeries.bullets.push(function () {
          return am5.Bullet.new(root, {
            sprite: am5.Label.new(root, {
              text: '{valueX}',
              fill: root.interfaceColors.get('alternativeText'),
              centerY: am5.p50,
              centerX: am5.p50,
              populateText: true,
            }),
          });
        });
      }

      // let color = slice.get("fill")
      columnSeries.columns.template.setAll({
        fill: slice.get('fill'),
        stroke: slice.get('fill'),
      });

      columnSeries.columns.template.events.on('click', (ev) => {
        debugger;
        const categoryData: any = ev.target.dataItem.dataContext;
        if (categoryData.subdata != undefined) {
          columnSeries.data.setAll(categoryData.subdata);
          xAxis.data.setAll(categoryData.subdata);
          yAxis.data.setAll(categoryData.subdata);
        /*   this.freeList = this.freeList.filter(
            (item: any) =>
              item.location.toLowerCase() ===
                categoryData.category.toLowerCase() ||
              item.lab.toLowerCase() === categoryData.category.toLowerCase()
          ); */
          // filterData(categoryData.category);
          columnSeries.appear();
        }
      });

      columnSeries.data.setAll(slice.dataItem.dataContext.breakdown);
     // return columnSeries;
      }

      /*   columnSeries.columns.template.setAll({
        fill: color,
        stroke: slice.get('fill'),
      });

      columnSeries.data.setAll(slice.dataItem.dataContext.breakdown); */
      yAxis.data.setAll(slice.dataItem.dataContext.breakdown);
      currentSlice = slice;
    });

    //pie-chart label
    pieSeries.labels.template.setAll({
      text: "{category} ({value}) : {valuePercentTotal.formatNumber('0.00')}%",
      inside: true,
      textType: 'adjusted',
      radius: 10,
    });

    // pieSeries.labels.template.set("forceHidden", true);
    // pieSeries.ticks.template.set("forceHidden", true);

    //pieSeries.data.setAll(data);
    pieSeries.data.setAll(this.ChartData);

    // Add label
    let label1 = pieChart.seriesContainer.children.push(
      am5.Label.new(root, {
        text: '',
        fontSize: 35,
        fontWeight: 'bold',
        centerX: am5.p50,
        centerY: am5.p50,
      })
    );

    let label2 = pieChart.seriesContainer.children.push(
      am5.Label.new(root, {
        text: '',
        fontSize: 12,
        centerX: am5.p50,
        centerY: am5.p50,
        dy: 30,
      })
    );

    // **** Add legend ****//
    if (this.ChartData.length <= 1) {
      var legend = pieSeries.children.push(
        am5.Legend.new(root, {
          nameField: 'Category',
          // centerX: am5.percent(-175),
          x: am5.percent(10),
          y: am5.percent(44),
        })
      );
    } else if (this.ChartData.length == 2) {
      var legend = pieSeries.children.push(
        am5.Legend.new(root, {
          nameField: 'Category',
          // centerX: am5.percent(-175),
          x: am5.percent(-14),
          y: am5.percent(44),
        })
      );
    } else if (this.ChartData.length == 3) {
      var legend = pieSeries.children.push(
        am5.Legend.new(root, {
          nameField: 'Category',
          // centerX: am5.percent(-175),
          x: am5.percent(-24),
          y: am5.percent(44),
        })
      );
    } else if (this.ChartData.length == 4) {
      var legend = pieSeries.children.push(
        am5.Legend.new(root, {
          nameField: 'Category',
          // centerX: am5.percent(-175),
          x: am5.percent(-15),
          y: am5.percent(44),
          layout: am5.GridLayout.new(root, {
            maxColumns: 2,
            fixedWidthGrid: true,
          }),
        })
      );
    } else {
      var legend = pieSeries.children.push(
        am5.Legend.new(root, {
          nameField: 'Category',
          // centerX: am5.percent(-175),
          x: am5.percent(-30),
          y: am5.percent(40),
          layout: am5.GridLayout.new(root, {
            maxColumns: 3,
            fixedWidthGrid: true,
          }),
        })
      );
    }

    // legend.data.setAll(pieSeries.dataItems);

    // legend.data.setAll(chart.series.values);
    pieSeries.appear(1000, 100);

    // **** for (download)exporting chart **** //
    if (this.chartlength) {
      var exporting = am5plugins_exporting.Exporting.new(root, {
        menu: am5plugins_exporting.ExportingMenu.new(root, {}),
      });
    }
  }

  // **** Full Pie-Chart Function ****//
  getFullPiechartVendor(totalCount: any) {
    am5.array.each(am5.registry.rootElements, function (root) {
      if (root?.dom.id == 'chartdiv1') {
        root.dispose();
      }
    });
    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    let root = am5.Root.new('chartdiv1');
    root._logo.dispose();

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)]);

    //Number Format for both Pie and Bar Chart
    root.numberFormatter.setAll({
      numberFormat: '#,###.',
      numericFields: ['valueY'],
    });

    // Create wrapper container
    let container = root.container.children.push(
      am5.Container.new(root, {
        width: am5.p100,
        height: am5.percent(90),
        //x: am5.percent(100),

        layout: root.horizontalLayout,
      })
    );

    // ==============================================
    // Column chart start
    // ==============================================

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    let columnChart = container.children.push(
      am5xy.XYChart.new(root, {
        width: am5.p50,
        panX: false,
        panY: false,
        wheelX: 'none',
        wheelY: 'none',
        layout: root.verticalLayout,
        reverseChildren: true,
        x: am5.percent(50),
        //inverted : true
        //rotation: 120
      })
    );

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let yRenderer = am5xy.AxisRendererY.new(root, {});
    let yAxis = columnChart.yAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: 'category',
        renderer: yRenderer,
        y: am5.percent(0),
      })
    );
    yRenderer.grid.template.setAll({
      location: 0,
    });

    let xAxis = columnChart.xAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, {
          strokeOpacity: 0.1,
        }),
      })
    );

    function createSeriesVendor(
      name: any,
      fiels: any,
      data: any,
      color: any,
      All: any
    ) {
      // Add series
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
      let columnSeries = columnChart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: name,
          xAxis: xAxis,
          yAxis: yAxis,
          stacked: true,
          valueXField: fiels,
          categoryYField: 'category',
          // reverseChildren: true
        })
      );

      //Bar chart Tooltip text
      columnSeries.columns.template.setAll({
        tooltipText: '{name}: {valueX}',
        /* tooltipText: "{categoryY}: {name} - {valueX}", */
        // minHeight: 150
      });
      if (All == false) {
        //Bar chart bullet
        columnSeries.bullets.push(function () {
          return am5.Bullet.new(root, {
            locationX: 1,
            locationY: 0.5,
            sprite: am5.Label.new(root, {
              text: '{valueX}',
              // fill: root.interfaceColors.get("alternativeText"),
              centerY: am5.p50,
              // centerX: am5.p50,
              populateText: true,
              fill: am5.color('#000000'),
            }),
          });
        });
      } else {
        columnSeries.bullets.push(function () {
          return am5.Bullet.new(root, {
            sprite: am5.Label.new(root, {
              text: '{valueX}',
              fill: root.interfaceColors.get('alternativeText'),
              centerY: am5.p50,
              centerX: am5.p50,
              populateText: true,
            }),
          });
        });
      }

      // let color = slice.get("fill")
      columnSeries.columns.template.setAll({
        fill: color,
        stroke: color,
      });

      columnSeries.data.setAll(data);
      return columnSeries;
    }

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/

    columnChart.appear(1000, 100);

    // ==============================================
    // Column chart end
    // ==============================================

    // ==============================================
    // Pie chart start
    // ==============================================

    //Create wrapper container

    let pieChart = container.children.push(
      am5percent.PieChart.new(root, {
        width: am5.percent(50),
        x: am5.percent(0),
        y: am5.percent(-5.8),
        innerRadius: am5.percent(50),
        radius: am5.percent(65),
      })
    );

    // Create series
    let pieSeries = pieChart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: 'value',
        categoryField: 'category',
        legendValueText: '', // legend text format
      })
    );

    //Create title
    pieSeries.children.unshift(
      am5.Label.new(root, {
        text: this.ChartTitle,
        fontSize: 18,
        fontWeight: '400',
        textAlign: 'center',
        x: am5.percent(0),
        y: am5.percent(-3),
        centerX: am5.percent(50),
        paddingTop: -160,
        paddingBottom: 0,
        fill: am5.color('#9eacb4'),
        //paddingRight: 950
      })
    );

    //Color code for pie slices
    pieSeries
      .get('colors')
      .set('colors', [
        am5.color('#a4b0be'),
        am5.color(0xdc4534),
        am5.color(0xd7a700),
        am5.color(0x68ad5c),
        am5.color('#12CBC4'),
        am5.color('#FDA7DF'),
        am5.color('#ED4C67'),
        am5.color('#1289A7'),
        am5.color('#D980FA'),
        am5.color('#B53471'),
        am5.color('#0652DD'),
        am5.color('#9980FA'),
        am5.color('#833471'),
        am5.color('#1B1464'),
        am5.color('#5758BB'),
        am5.color('#6F1E51'),
        am5.color('#006266'),
        am5.color('#40407a'),
        am5.color('#ffda79'),
        am5.color('#cd6133'),
        am5.color('#218c74'),
        am5.color('#227093'),
        am5.color('#b8e994'),
        am5.color('#f8c291'),
        am5.color('#be2edd'),
      ]);

    //Pie-chart tooltip
    pieSeries.slices.template.setAll({
      templateField: 'colors',
      strokeOpacity: 0,
      tooltipText:
        "{category} ({value}) : {valuePercentTotal.formatNumber('0.00')}%",
    });

    // Pre-select first slice
    pieSeries.events.on('datavalidated', function () {
      pieSeries.slices.getIndex(0).set('active', false);
      pieSeries.dataItems[0].hide(0);
    });

    //pieSeries.slices.getIndex(0).set();

    //Pie chart and bar chart integrating area
    let currentSlice: am5.Slice;
    pieSeries.slices.template.on('active', function (active, slice: any) {
      if (currentSlice && currentSlice != slice && active) {
        currentSlice.set('active', false);
      }

      let color = slice.get('fill');

      label1.setAll({
        fill: color,
        text: totalCount,
      });
      debugger;
      // label2.set("text", slice.dataItem.get("category"));
      if (slice.dataItem.dataContext.category == 'All') {
        if (columnChart.series.length >= 1) {
          columnChart.series.clear();
        }
        /* remove zero */
        slice.dataItem.dataContext.breakdown.forEach(
          (element: any, index: any) => {
            Object.keys(element).forEach(function (key, index) {
              //console.log(key, obj[key]);
              if (key == 'category') {
              } else {
                if (element[key] == 0) {
                  element[key] = null;
                }
              }
            });
          }
        );
        /* create series first time */
        let keyList: any = [];
        slice.dataItem.dataContext.breakdown.forEach(
          (element: any, index: any) => {
            Object.keys(element).forEach(function (key, index) {
              //console.log(key, obj[key]);
              if (key == 'category') {
              } else {
                keyList.push(key);
              }
            });
          }
        );
        let uniqeKeyList = [...new Set(keyList)];
        uniqeKeyList.forEach(function (key, index) {
          //console.log(key, obj[key]);
          if (key == 'category') {
          } else {
            let color = pieSeries.get('colors').get('colors')[index];
            createSeriesVendor(
              key,
              key,
              slice.dataItem.dataContext.breakdown,
              color,
              true
            );
          }
        });
      } else {
        if (columnChart.series.length >= 1) {
          columnChart.series.clear();
        }
        createSeriesVendor(
          'value',
          'value',
          slice.dataItem.dataContext.breakdown,
          slice.get('fill'),
          false
        );
      }
      /*   label2.set('text', 'Total');

      columnSeries.columns.template.setAll({
        fill: color,
        stroke: slice.get('fill'),
      }); 

      columnSeries.data.setAll(slice.dataItem.dataContext.breakdown);*/
      yAxis.data.setAll(slice.dataItem.dataContext.breakdown);
      currentSlice = slice;
    });

    //pie-chart label
    pieSeries.labels.template.setAll({
      text: "{category} ({value}) : {valuePercentTotal.formatNumber('0.00')}%",
      inside: true,
      textType: 'adjusted',
      radius: 10,
    });

    // pieSeries.labels.template.set("forceHidden", true);
    // pieSeries.ticks.template.set("forceHidden", true);

    //pieSeries.data.setAll(data);
    pieSeries.data.setAll(this.ChartData);

    // Add label
    let label1 = pieChart.seriesContainer.children.push(
      am5.Label.new(root, {
        text: '',
        fontSize: 35,
        fontWeight: 'bold',
        centerX: am5.p50,
        centerY: am5.p50,
      })
    );

    let label2 = pieChart.seriesContainer.children.push(
      am5.Label.new(root, {
        text: '',
        fontSize: 12,
        centerX: am5.p50,
        centerY: am5.p50,
        dy: 30,
      })
    );

    // **** Add legend ****//
    if (this.ChartData.length <= 1) {
      var legend = pieSeries.children.push(
        am5.Legend.new(root, {
          nameField: 'Category',
          // centerX: am5.percent(-175),
          x: am5.percent(10),
          y: am5.percent(44),
        })
      );
    } else if (this.ChartData.length == 2) {
      var legend = pieSeries.children.push(
        am5.Legend.new(root, {
          nameField: 'Category',
          // centerX: am5.percent(-175),
          x: am5.percent(-14),
          y: am5.percent(44),
        })
      );
    } else if (this.ChartData.length == 3) {
      var legend = pieSeries.children.push(
        am5.Legend.new(root, {
          nameField: 'Category',
          // centerX: am5.percent(-175),
          x: am5.percent(-24),
          y: am5.percent(44),
        })
      );
    } else if (this.ChartData.length == 4) {
      var legend = pieSeries.children.push(
        am5.Legend.new(root, {
          nameField: 'Category',
          // centerX: am5.percent(-175),
          x: am5.percent(-15),
          y: am5.percent(44),
          layout: am5.GridLayout.new(root, {
            maxColumns: 2,
            fixedWidthGrid: true,
          }),
        })
      );
    } else {
      var legend = pieSeries.children.push(
        am5.Legend.new(root, {
          nameField: 'Category',
          // centerX: am5.percent(-175),
          x: am5.percent(-30),
          y: am5.percent(40),
          layout: am5.GridLayout.new(root, {
            maxColumns: 3,
            fixedWidthGrid: true,
          }),
        })
      );
    }

    // legend.data.setAll(pieSeries.dataItems);

    // legend.data.setAll(chart.series.values);
    pieSeries.appear(1000, 100);

    // **** for (download)exporting chart **** //
    if (this.chartlength) {
      var exporting = am5plugins_exporting.Exporting.new(root, {
        menu: am5plugins_exporting.ExportingMenu.new(root, {}),
      });
    }
  }

  //**** Chart data ****//
  //  getSemiPiechart() {
  //   var root = am5.Root.new('chartdiv');
  //   //****** removing chart logo *****//
  //   root._logo.dispose();
  //   // Set themes
  //   root.setThemes([am5themes_Animated.new(root)]);

  //   // Create chart
  //   // start and end angle must be set both for chart and series
  //   var chart = root.container.children.push(
  //     am5percent.PieChart.new(root, {
  //       startAngle: 180,
  //       endAngle: 360,
  //       layout: root.verticalLayout,
  //       innerRadius: am5.percent(50),
  //     })
  //   );

  //   // Create series
  //   // start and end angle must be set both for chart and series
  //   var series = chart.series.push(
  //     am5percent.PieSeries.new(root, {
  //       startAngle: 180,
  //       endAngle: 360,
  //       valueField: 'values',
  //       categoryField: 'Category',
  //       alignLabels: false,
  //     })
  //   );

  //   series.states.create('hidden', {
  //     startAngle: 180,
  //     endAngle: 180,
  //   });

  //   series.slices.template.setAll({
  //     cornerRadius: 5,
  //     strokeWidth: 2,
  //   });

  //   //**** for transperent color(opacity) ***//
  //   series.slices.template.adapters.add("fillOpacity", function(fillOpacity, target:any) {
  //     if (target.dataItem.get("category") == "Free") {
  //         return 0.1;
  //       }
  //     }
  //   );

  //   //**** for dotted border ***//
  //   series.slices.template.adapters.add("strokeDasharray", function(strokeDasharray, target:any) {
  //     if (target.dataItem.get("category") == "Free") {
  //         return [8,4];
  //     }
  //    }
  //   );

  //   //**** custom color for slices****//
  //   series.slices.template.adapters.add("fill", function(fill, target:any) {
  //     // if (target.dataItem.get("category") == "Non-SIV") {
  //     //     return am5.color('#6794dc');
  //     // }
  //      if(target.dataItem.get("category") == "Allocated") {
  //       // return am5.color('#67b7dc')
  //       return am5.color('#FD7272')
  //     }
  //     else if(target.dataItem.get("category") == "Free") {
  //       return am5.color('#FD7272')
  //     }
  //   });

  //   //**** custom color for border(stroke)****//
  //   series.slices.template.adapters.add("stroke", function(fill, target:any) {
  //     // if (target.dataItem.get("category") == "Non-SIV") {
  //     //   return am5.color('#6794dc');
  //     // }
  //     if(target.dataItem.get("category") == "Allocated") {
  //       return am5.color('#FD7272')
  //     }
  //     else if(target.dataItem.get("category") == "Free") {
  //       return am5.color('#FD7272')
  //     }
  //   });

  //   series.ticks.template.setAll({
  //     forceHidden: true,
  //   });

  //   //**** for removing % from labels ***//
  //   series.labels.template.set('text', '{Category}:{values}');

  //   //**** for removing % from tooltip ***//
  //   series.slices.template.set('tooltipText', '{Category}:{values}');

  //   //**** chart data ****//
  //   series.data.setAll(this.ChartData);
  //   // Set data
  //   // series.data.setAll([
  //   //   // { Value: 50, Category: "Non-Siv"},
  //   //   { Value: 30, Category: "Allocated" },
  //   //   { Value: 20, Category: "Free" }
  //   // ]);

  //   // **** Add legend ****//
  //   var legend = chart.children.push(
  //     am5.Legend.new(root, {
  //       nameField: 'Category',
  //       centerX: am5.percent(50),
  //       x: am5.percent(55),
  //     })
  //   );

  //   legend.data.setAll(series.dataItems);
  //   // legend.data.setAll(chart.series.values);

  //   // let legend = chart.children.push(am5.Legend.new(root, {}));
  //   // let legend = chart.children.push(am5.Legend.new(root, {
  //   //   nameField: "name",
  //   //   fillField: "color",
  //   //   strokeField: "color",
  //   //   centerX: am5.percent(50),
  //   //   x: am5.percent(50)
  //   // }));

  //   // legend.data.setAll([{
  //   //   name: "Allocated",
  //   //   color: am5.color('#67b7dc')
  //   // }, {
  //   //   name: "Free",
  //   //   color: am5.color('#67b7dc'),
  //   //   fillOpacity: 0.7,
  //   //   strokeWidth: 3,
  //   //   strokeDasharray: [10, 5, 2, 5],
  //   // }]);

  //   series.appear(1000, 100);
  // }
  //   getSemiPiechart(){
  //     debugger
  //     var root = am5.Root.new("chartdiv6");
  //  //****** removing chart logo *****//
  //     root._logo.dispose();

  // // Set themes
  // // https://www.amcharts.com/docs/v5/concepts/themes/
  // root.setThemes([
  //   am5themes_Animated.new(root)
  // ]);

  // // Create chart
  // // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/
  // // start and end angle must be set both for chart and series
  // var chart = root.container.children.push(am5percent.PieChart.new(root, {
  //   startAngle: 180,
  //   endAngle: 360,
  //   layout: root.verticalLayout,
  //   innerRadius: am5.percent(50)
  // }));

  // // Create series
  // // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
  // // start and end angle must be set both for chart and series
  // var series = chart.series.push(am5percent.PieSeries.new(root, {
  //   startAngle: 180,
  //   endAngle: 360,
  //   valueField: "value",
  //   categoryField: "category",
  //   alignLabels: false
  // }));

  // series.states.create("hidden", {
  //   startAngle: 180,
  //   endAngle: 180
  // });

  // series.slices.template.setAll({
  //   cornerRadius: 5
  // });

  // series.ticks.template.setAll({
  //   forceHidden: true
  // });

  //  //**** for removing % from labels ***//
  //     series.labels.template.set('text', '{category}:{value}');

  //     //**** for removing % from tooltip ***//
  //     series.slices.template.set('tooltipText', '{category}:{value}');

  // // Set data
  // // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
  // series.data.setAll([
  //  { value: 30, category: "SIV Allocated"},
  //  { value: 20, category: "SIV Free" }
  // ]);

  //     // **** Add legend ****//
  //     var legend = chart.children.push(
  //       am5.Legend.new(root, {
  //         nameField: 'category',
  //         centerX: am5.percent(50),
  //         x: am5.percent(55),
  //       })
  //     );

  //     legend.data.setAll(series.dataItems);

  // series.appear(1000, 100);
  //   }

  // // Themes begin
  // am4core.useTheme(am4themes_animated);
  // // Themes end

  // // Create chart instance
  // var chart = am4core.create("chartdiv", am4charts.XYChart);
  // chart.colors.list = this.colors;

  // color list for chart and legend
  // chart.colors.list = [
  //   am4core.color('#2ecc71'),
  //   am4core.color('#e74c3c'),
  //   // am4core.color('#6c5ce7'),
  //   // am4core.color('#e84393'),
  //   am4core.color('#f39c12'),
  //   am4core.color('#b2bec3')
  // ];

  // // Add data
  // chart.data = [{
  //  status: "Available",
  //       value: 50
  //     }, {
  //       status: "Booked",
  //       value:4
  //     }, {
  //       status: "Siv",
  //       value: 64
  //     }, {
  //       status: "Non-siv",
  //       value: 64
  // }];

  // // Create axes

  // var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
  // categoryAxis.dataFields.category = "status";
  // categoryAxis.renderer.grid.template.location = 0;
  // categoryAxis.renderer.minGridDistance = 30;

  // // categoryAxis.renderer.labels.template.adapter.add("dy", function(dy, target) {
  // //   if (target.dataItem && target.dataItem.index & 2 == 2) {
  // //     return dy + 25;
  // //   }
  // //   return dy;
  // // });

  // var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

  // //*****x-axis scrollbar*****//
  // chart.scrollbarX = new am4core.Scrollbar();
  //     chart.scrollbarX.parent = chart.bottomAxesContainer;
  //     chart.scrollbarX.width = am4core.percent(99);
  //     // chart.scrollbarX.minHeight = 4;
  //     chart.scrollbarX.thumb.background.fillOpacity = 0.2;
  //     chart.scrollbarX.thumb.background.strokeWidth = 1;
  //     chart.scrollbarX.background.fill = am4core.color("#d9d9d9");
  //     chart.scrollbarX.thumb.background.fill = am4core.color("#d9d9d9");
  //     chart.scrollbarX.startGrip.background.fill = am4core.color("#d9d9d9");
  //     chart.scrollbarX.endGrip.background.fill = am4core.color("#d9d9d9");
  //     chart.scrollbarX.stroke = am4core.color("#d9d9d9");

  // // Create series
  // var series = chart.series.push(new am4charts.ColumnSeries());
  // series.dataFields.valueY = "value";
  // series.dataFields.categoryX = "status";
  // series.name = "Available";
  // series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
  // series.columns.template.fillOpacity = 0.8;
  // // series.columns.template.fillOpacity = .8;

  // var columnTemplate = series.columns.template;
  // columnTemplate.strokeWidth = 0;
  // columnTemplate.strokeOpacity = 1;

  //     //*** different color for every bar ***//
  //     series.columns.template.adapter.add("fill", function (fill, target:any) {
  //       return chart.colors.getIndex(target.dataItem.index);
  //     });

  //     chart.legend = new am4charts.Legend()
  //     // var legend = new am4charts.Legend();
  //     chart.legend.parent = chart.chartContainer;
  //     //legend.itemContainers.template.togglable = false;
  //     chart.legend.marginTop = 20;

  //     series.events.on("ready", function (ev) {
  //       var legenddata:any = [];
  //       series.columns.each(function (column:any) {
  //         legenddata.push({
  //           name: column.dataItem.categoryX,
  //           fill: column.fill,
  //           columnDataItem: column.dataItem
  //         });
  //       });
  //       chart.legend.data = legenddata;
  //     });

  //     chart.legend.itemContainers.template.events.on("hit", function (ev:any) {
  //       if (!ev.target.isActive) {
  //         ev.target.dataItem.dataContext.columnDataItem.hide();
  //       }
  //       else {
  //         ev.target.dataItem.dataContext.columnDataItem.show();
  //       }
  //     });

  //     chart.legend.itemContainers.template.events.on("over", function (ev:any) {
  //       ev.target.dataItem.dataContext.columnDataItem.column.isHover = true;
  //       ev.target.dataItem.dataContext.columnDataItem.column.showTooltip();
  //     });

  //     chart.legend.itemContainers.template.events.on("out", function (ev:any) {
  //       ev.target.dataItem.dataContext.columnDataItem.column.isHover = false;
  //       ev.target.dataItem.dataContext.columnDataItem.column.hideTooltip();
  //     });

  //****** Semicircle Pie Chart ******//
  // getSemiCirclePiechart(){
  //      // Themes begin
  //   am4core.useTheme(am4themes_animated);
  //   // Themes end

  //   var chart = am4core.create("chartdiv", am4charts.PieChart);
  //   chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

  //   chart.data = [
  //     {
  //       status: "Non-Siv Allocated",
  //       value: 20
  //     },
  //     {
  //       status: "SIV Allocated",
  //       value: 50,

  //     },
  //     {
  //       status: "SIV UnAllocated",
  //       value: 20,
  //     }

  //     // {
  //     //   status: "Non-Siv UnAllocated",
  //     //   value: 30,

  //     // }

  //   ];
  //   chart.radius = am4core.percent(70);
  //   chart.innerRadius = am4core.percent(40);
  //   chart.startAngle = 180;
  //   chart.endAngle = 360;

  //   var series = chart.series.push(new am4charts.PieSeries());
  //   series.dataFields.value = "value";
  //   series.dataFields.category = "status";

  //   series.slices.template.cornerRadius = 10;
  //   series.slices.template.innerCornerRadius = 7;
  //   series.slices.template.draggable = true;
  //   series.slices.template.inert = true;
  //   series.alignLabels = false;

  //   // series.slices.template._systemValidateLayouts({fillopacity:0.9})

  //   series.hiddenState.properties.startAngle = 90;
  //   series.hiddenState.properties.endAngle = 90;

  //   series.colors.list = [
  //     // am4core.color("#FF9671"),
  //    am4core.color("#6794dc") ,
  //     am4core.color("#67b7dc"),
  //     am4core.color("#67b7dc").lighten(0.9),
  //     // am4core.color("#FF6F91"),

  //     // am4core.color("#FFC75F"),
  //     // am4core.color("#F9F871"),
  //   ];

  //   chart.legend = new am4charts.Legend();

  //   // **** Removing % from legend values ****//
  //   chart.legend.valueLabels.template.disabled = true;

  //   // **** Removing % from values ****//
  //   series.labels.template.text = "{category}: {value.value}";
  //   series.slices.template.tooltipText = "{category}: {value.value}";
  //   chart.legend.valueLabels.template.text = "{value.value}";

  //    //**** for dotted outline line ****//
  //   //  chart.data.forEach(element => {
  //   //    debugger
  //   //   if(element.status == "SIV UnAllocated"){

  //   //     series.stroke = am4core.color("blue").lighten(0.5);
  //   //     series.strokeDasharray="3,3"

  //   //   }
  //   //   // else if(element.status == "Non-Siv UnAllocated"){

  //   //   //   series.stroke = am4core.color("blue").lighten(0.5);
  //   //   //   series.strokeDasharray="3,3"

  //   //   // }

  //   // });
  // }

  //**** Sorting functionality in table(ascending descending order) ****//
  /*  setOrderRelease(value: string) {
    if (this.orderMappedRelease === value) {
      this.reverseMappedRelease = !this.reverseMappedRelease;
    }
    this.orderMappedRelease = value;
  } */

  // *** chart options according to click *** //
  // Options(status: any) {
  //   if (status == 'location') {
  //     this.typeChart = 'Location chart';
  //   } else if (status == 'program') {
  //     this.typeChart = 'Program chart';
  //   } else if (status == 'vendor') {
  //     this.typeChart = 'Vendor chart';
  //   }
  // }

  // *** chart options according to click *** //

  Options(status: any) {
    if (status == 'team' && this.fullcircle) {
      this.typeChart = 'Team chart';
      // this.ChartTitle = "Team Wise Chart";
      this.SIVtoggle = false;
      this.team_program = false;

      this.isTeam = true;
      this.isProgram = false;
      this.isVendor = false;
      this.isProgramLocation = false;
      this.removeNonSIV = false;
      this.TeamChart();
    } else if (status == 'team/program' && this.fullcircle) {
      this.typeChart = 'Team/Program chart';
      this.Count = 0;
      // this.ChartTitle = "Program/Team Wise Chart";
      this.SIVtoggle = false;
      this.team_program = true;

      this.isTeam = false;
      this.isProgram = false;
      this.isVendor = false;
      this.isProgramLocation = true;
      this.removeNonSIV = false;
      this.LabProgramSummary();
      // this.ProgramLocationSummary();
    } else if (status == 'location') {
      this.typeChart = 'Location chart';
      // this.ChartTitle = "Location Wise Chart";
      this.SIVtoggle = true;
      this.team_program = false;

      this.isTeam = false;
      this.isProgram = false;
      this.isVendor = false;
      this.isProgramLocation = false;
      this.removeNonSIV = false;
      this.OverallAvailability(this.typeChart);
    } else if (status == 'program' && this.fullcircle) {
      this.typeChart = 'Program chart';
      // this.ChartTitle = "Program Wise Chart";
      this.SIVtoggle = false;
      this.team_program = false;

      this.isTeam = false;
      this.isProgram = true;
      this.isVendor = false;
      this.isProgramLocation = false;
      this.removeNonSIV = false;
      this.ProgramChart();
    } else if (status == 'vendor' && this.fullcircle) {
      this.typeChart = 'Vendor chart';
      // this.ChartTitle = "Vendor Wise Chart";
      this.team_program = false;
      this.SIVtoggle = false;

      this.isTeam = false;
      this.isProgram = false;
      this.isVendor = true;
      this.isProgramLocation = false;
      this.removeNonSIV = false;
      this.LabVendorSummary();
    } else {
      // alert("please turn on siv toggle")
      this.toastrService.info(
        'Please toggle WSE button to view this feature'
        // 'Warning!'
      );
    }
  }

  // *** checkbox click functionality *** //
  // getCheckbox(){
  //   debugger
  //   console.log("checked",this.semicircle)
  //   if(!this.semicircle){
  //     // this.getSemiPiechart()
  //     setTimeout(() => {
  //       debugger
  //       this.OverallAvailability();
  //     }, 100);
  //   }
  //   else{
  //     this.ToggleOptions(this.changestatus);
  //    }
  // }

  // *** checkbox click functionality for fullPiechart *** //
  getCheckbox() {
    console.log('checked', this.semicircle);
    if (!this.fullcircle) {
      // this.getSemiPiechart()
      this.sliceHide = false;
      this.typeChart = 'Location chart';
      // this.OverallAvailability(this.typeChart);
      setTimeout(() => {
        this.OverallAvailability(this.typeChart);
      }, 100);
    } else {
      // this.ToggleOptions(this.changestatus);
      this.sliceHide = true;
      this.fullcircle = true;
      this.type = 'pie chart';
      if (this.team_program == false) {
        this.OverallAvailability('Location chart');
      } else {
        this.OverallAvailability(this.typeChart);
      }

      //this.OverallAvailability();
    }
  }

  // *** Pie chart and table options according to click *** //
  ToggleOptions(changestatus: any) {
    if (changestatus == 'chart') {
      this.type = 'pie chart';
    } else if (changestatus == 'table') {
      this.type = 'pie table';
    }
  }

  // *** Labwise chart and table options according to click *** //
  ChangeOption(Status: any) {
    if (Status == 'Labchart') {
      this.Labtype = 'Lab chart';
    } else if (Status == 'Labtable') {
      this.Labtype = 'Lab table';
    }
  }

  // *** Location chart and table options according to click *** //
  LocationOptions(LocStatus: any) {
    if (LocStatus == 'LocChart') {
      this.Loctype = 'Loc chart';
    } else if (LocStatus == 'LocTable') {
      this.Loctype = 'Loc table';
    }
  }

  // ***Program  chart and table options according to click *** //
  ProgramOptions(PrgStatus: any) {
    if (PrgStatus == 'PrgChart') {
      this.Prgtype = 'Prg chart';
    } else if (PrgStatus == 'PrgTable') {
      this.Prgtype = 'Prg table';
    }
  }

  // ***Vendor chart and table options according to click *** //
  VendorOptions(VenStatus: any) {
    if (VenStatus == 'VenChart') {
      this.Ventype = 'Ven chart';
    } else if (VenStatus == 'VenTable') {
      this.Ventype = 'Ven table';
    }
  }

  toggleFullScreen() {
    this.fullScreenFlag = !this.fullScreenFlag;
    this.setIconPossition = !this.setIconPossition;
  }
}

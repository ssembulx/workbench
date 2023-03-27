import { AfterViewInit, Component, OnInit, ViewChild, ElementRef, Input, SimpleChanges, OnChanges } from '@angular/core';
// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

// //******removing amchart symbol*****//
am4core.options.commercialLicense = true;
am4core.options.autoSetClassName = true;

import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SummaryService } from '../shared/service';

@Component({
  selector: 'app-labwise-alloted-chart-component',
  templateUrl: './labwise-alloted-chart-component.component.html',
  styleUrls: ['./labwise-alloted-chart-component.component.scss']
})
export class LabwiseAllotedChartComponentComponent implements OnInit{
  colors: any;
  ChartData1:any;
  // labwiseChartLoader = false;
  labList:any;
  chartData:any;

  @ViewChild('bookingmodalHome') bookingmodalHome: ElementRef;

  constructor(private modalService: NgbModal, config: NgbModalConfig, private toastrService: ToastrService, private service:SummaryService) {
    config.backdrop = 'static';
    config.size = 'lg';
  }
  // ngAfterViewInit(): void {
  //   this.getLabwiseStackedChart();
  //   console.log("ngAfterViewInit", this.bookingmodalHome);
  // }
    @Input() widget: any;
  
  
  ngOnInit(): void {
    console.log("ngOnInit", this.bookingmodalHome);
    // this.LabwiseSummary();
    // this.chartData = this.widget
    console.log("widget ----",this.chartData)
    this.getLabwiseStackedChart();
  }

 //**** Passing the chart data for labwise program chart ***//
ngOnChanges(changes: SimpleChanges) {
  this.chartData = this.widget
  this.getLabwiseStackedChart();
}

  //****Chart data****/
  getLabwiseStackedChart() {
    // this.ChartData = this.widget
    am4core.useTheme(am4themes_animated);
    // Themes end

    var chart = am4core.create("chartdiv2", am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
    // chart.colors.list = this.colors;

    // color list for chart and legend
    chart.colors.list = [
      // am4core.color('#67b7dc'),
      // am4core.color('#67b7dc'),
      am4core.color('#786fa6'),
      am4core.color('#786fa6')
    ];

    //****chart data***//
    chart.data = this.chartData;
    // chart.data =
    //  [{"Category":"CRD-14","Allocated":100,"Free":52},
    //  {"Category":"CRD-15-VPG_LINUX","Allocated":10,"Free":0},
    //  {"Category":"CRD-2","Allocated":120,"Free":10}]

    console.log("labwsie +++++++++++=",chart.data)
   
    chart.colors.step = 2;
    // chart.padding(30, 30, 10, 30);
    chart.legend = new am4charts.Legend();

    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "Category";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    // valueAxis.max = 100;
    valueAxis.strictMinMax = true;
    valueAxis.calculateTotals = true;
    valueAxis.renderer.minWidth = 50;



    var series1 = chart.series.push(new am4charts.ColumnSeries());
    series1.columns.template.width = am4core.percent(80);
    series1.columns.template.tooltipText =
      "{name}: {valueY.formatNumber('#')}";
    series1.name = "Allocated";
    series1.dataFields.categoryX = "Category";
    series1.dataFields.valueY = "Allocated";
    // series1.dataFields.valueYShow = "totalPercent";
    // series1.dataItems.template.locations.categoryX = 0.5;
    series1.stacked = true;
    // series1.tooltip.pointerOrientation = "vertical";
    series1.opacity = 0.1;

    var bullet1 = series1.bullets.push(new am4charts.LabelBullet());
    bullet1.interactionsEnabled = false;
    bullet1.label.text = "{valueY.formatNumber('#')}";
    bullet1.label.fill = am4core.color("#ffffff");
    bullet1.locationY = 0.5;

    var myEvent = series1.columns.template.events.on("hit", function (ev) {
      console.log("clicked on ", ev.target.dataItem.dataContext);
    /*   this.processBooking(this.bookingmodalHome);
      this.openPopUp(); */
    }, this);

    var series2 = chart.series.push(new am4charts.ColumnSeries());
    series2.columns.template.width = am4core.percent(80);
    series2.columns.template.tooltipText =
      "{name}: {valueY.formatNumber('#')}";

    series2.name = "Free";
    series2.dataFields.categoryX = "Category";
    series2.dataFields.valueY = "Free";
    // series2.dataFields.valueYShow = "totalPercent";
    // series2.dataItems.template.locations.categoryX = 0.5;
    series2.stacked = true;

    //**** for transperncy color***//
    series2.fillOpacity = 0.1;

    //**** for dotted outline border ****//
    series2.stroke = am4core.color("#786fa6").lighten(0.5);
    series2.strokeDasharray = "8,4"


    var bullet2 = series2.bullets.push(new am4charts.LabelBullet());
    bullet2.interactionsEnabled = false;
    bullet2.label.text = "{valueY.formatNumber('#')}";
    bullet2.locationY = 0.5;
    bullet2.label.fill = am4core.color("black");

    var columnTemplate = series2.columns.template;
    columnTemplate.strokeWidth = 2;
    columnTemplate.strokeOpacity = 1;


    //*****x-axis scrollbar*****//
    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarX.parent = chart.bottomAxesContainer;
    chart.scrollbarX.width = am4core.percent(99);
    // chart.scrollbarX.minHeight = 4;
    chart.scrollbarX.thumb.background.fillOpacity = 0.2;
    chart.scrollbarX.thumb.background.strokeWidth = 1;
    chart.scrollbarX.background.fill = am4core.color("#d9d9d9");
    chart.scrollbarX.thumb.background.fill = am4core.color("#d9d9d9");
    chart.scrollbarX.startGrip.background.fill = am4core.color("#d9d9d9");
    chart.scrollbarX.endGrip.background.fill = am4core.color("#d9d9d9");
    chart.scrollbarX.stroke = am4core.color("#d9d9d9");
  }

  modalReference: any;
  processBooking(addmodal: any) {
    // this.modalReference = this.modalService.open(addmodal)
    this.modalReference = this.modalService.open(addmodal, { centered: true, windowClass : "booking-modal" });
  }

  saveBooking() {
    this.modalReference.close();
  }


  /* booking code */

  public seatConfig: any = null;

  public seatmap: any = [];

  public seatChartConfig = {

    showRowsLabel: false,

    showRowWisePricing: false,

    newSeatNoForRow: false

  };

  public cart: any = {

    selectedSeatsNo: [],

    selectedSeats: [],

    seatstoStore: [],

    totalamount: 0,

    cartId: "",

    eventId: 0

  };

  title = "seat-chart-generator";
  openPopUp() {

    this.seatConfig = [
      {
        seat_price: 250,
        seat_map: [
          {
            seat_label: "A",
            layout: "g___________",
            direction: "l___________"
          },
          {
            seat_label: "B",
            layout: "g___________",
            direction: "l___________"
          },
          {
            seat_label: "C",
            layout: "_gggggggg___",
            direction: "_dddddddd___"
          },
          {
            seat_label: "D",
            layout: "_gggggggg___",
            direction: "_uuuuuuuu___"
          }, {
            seat_label: "E",
            layout: "____________",
            direction: "____________"
          }, {
            seat_label: "F",
            layout: "_ggggggggg__",
            direction: "_ddddddddd__"
          }, {
            seat_label: "G",
            layout: "_ggggggggggg",
            direction: "_uuuuuuuuuuu"
          }, {
            seat_label: "H",
            layout: "____________",
            direction: "____________"
          }, {
            seat_label: "I",
            layout: "_ggggg_ggggg",
            direction: "_ddddd_ddddd"
          }, {
            seat_label: "J",
            layout: "_ggggggggggg",
            direction: "_uuuuuuuuuuu"
          }, {
            seat_label: "K",
            layout: "____________",
            direction: "____________"
          }, {
            seat_label: "L",
            layout: "_ggggggggggg",
            direction: "_ddddddddddd"
          }, {
            seat_label: "M",
            layout: "_ggggggggggg",
            direction: "_uuuuuuuuuuu"
          }, {
            seat_label: "N",
            layout: "____________",
            direction: "____________"
          }, {
            seat_label: "O",
            layout: "________gggg",
            direction: "________uuuu"
          }, {
            seat_label: "P",
            layout: "_ggggg______",
            direction: "_uuuuu______"
          }, {
            seat_label: "Q",
            layout: "____________",
            direction: "____________"
          }, {
            seat_label: "R",
            layout: "_ggggggggggg",
            direction: "_ddddddddddd"
          }, {
            seat_label: "S",
            layout: "_ggggggggggg",
            direction: "_uuuuuuuuuuu"
          }, {
            seat_label: "T",
            layout: "____________",
            direction: "____________"
          }, {
            seat_label: "U",
            layout: "_ggggggggggg",
            direction: "_ddddddddddd"
          }, {
            seat_label: "V",
            layout: "_ggggg_ggggg",
            direction: "_uuuuu_uuuuu"
          }, {
            seat_label: "W",
            layout: "____________",
            direction: "____________"
          }, {
            seat_label: "X",
            layout: "_ggggggggggg",
            direction: "_ddddddddddd"
          }, {
            seat_label: "Y",
            layout: "_ggggggggggg",
            direction: "_uuuuuuuuuuu"
          }, {
            seat_label: "Z",
            layout: "____________",
            direction: "____________"
          }, {
            seat_label: "AA",
            layout: "_ggggggggggg",
            direction: "_ddddddddddd"
          }, {
            seat_label: "AB",
            layout: "_ggggggggggg",
            direction: "_uuuuuuuuuuu"
          },
        ]
      }
    ];
    this.processSeatChart(this.seatConfig);
    this.blockSeats("A_1,C_6,F_7");
    this.blockSeatsNonSiv("D_4,D_6,G_9")

  }
  public processSeatChart(map_data: any[]) {
    if (map_data.length > 0) {
      var seatNoCounter = 1;
      for (let __counter = 0; __counter < map_data.length; __counter++) {
        var row_label = "";
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
          row_label = "";
          var seatValArr = map_element.layout.split("");

          var seatDirArr = map_element.direction.split("");

          if (this.seatChartConfig.newSeatNoForRow) {
            seatNoCounter = 1; //Reset the seat label counter for new row
          }
          var totalItemCounter = 1;
          seatValArr.forEach((item: any, index: any) => {
            var seatObj: any = {
              key: map_element.seat_label + "_" + totalItemCounter,
              /* price: map_data[__counter]["seat_price"], */
              status: "available"
            };

            if (item != "_") {
              seatObj["seatLabel"] =
                map_element.seat_label + " " + seatNoCounter;
              seatObj["dir"] = seatDirArr[index];
              if (seatNoCounter < 10) {
                seatObj["seatNo"] = "0" + seatNoCounter;
              } else {
                seatObj["seatNo"] = "" + seatNoCounter;
              }

              seatNoCounter++;
            } else {
              seatObj["seatLabel"] = "";
            }
            totalItemCounter++;

            /*  seatDirArr.forEach((element:any,index:any) => {
               if (element != "_") {
                 seatObj["dir"]=element;
               }
             }); */
            mapObj["seats"].push(seatObj);
          });
          console.log(" \n\n\n Seat Objects ", mapObj);

          this.seatmap.push(mapObj);
        });
      }
    }
    console.log("total", this.seatmap);
  }

  public selectSeat(seatObject: any) {
    console.log("Seat to block: ", seatObject);
    if (seatObject.status == "available") {
      seatObject.status = "booked";
      this.cart.selectedSeats.push(seatObject.seatLabel);
      this.cart.selectedSeatsNo.push(seatObject.seatNo);
      this.cart.seatstoStore.push(seatObject.key);
      this.cart.totalamount += seatObject.price;
    } else if ((seatObject.status = "booked")) {
      seatObject.status = "available";
      var seatIndex = this.cart.selectedSeats.indexOf(seatObject.seatLabel);
      if (seatIndex > -1) {
        this.cart.selectedSeats.splice(seatIndex, 1);
        this.cart.selectedSeatsNo.splice(seatIndex, 1);
        this.cart.seatstoStore.splice(seatIndex, 1);
        this.cart.totalamount -= seatObject.price;
      }
    }
  }

  public blockSeats(seatsToBlock: string) {
    if (seatsToBlock != "") {
      var seatsToBlockArr = seatsToBlock.split(",");
      for (let index = 0; index < seatsToBlockArr.length; index++) {
        var seat = seatsToBlockArr[index] + "";
        var seatSplitArr = seat.split("_");
        console.log("Split seat: ", seatSplitArr);
        for (let index2 = 0; index2 < this.seatmap.length; index2++) {
          const element = this.seatmap[index2];
          if (element.seatRowLabel == seatSplitArr[0]) {
            var seatObj = element.seats[parseInt(seatSplitArr[1]) - 1];
            if (seatObj) {
              console.log("\n\n\nFount Seat to block: ", seatObj);
              seatObj["status"] = "unavailable";
              this.seatmap[index2]["seats"][
                parseInt(seatSplitArr[1]) - 1
              ] = seatObj;
              console.log("\n\n\nSeat Obj", seatObj);
              console.log(
                this.seatmap[index2]["seats"][parseInt(seatSplitArr[1]) - 1]
              );
              break;
            }
          }
        }
      }
    }
  }

  public blockSeatsNonSiv(seatsToBlock: string) {
    if (seatsToBlock != "") {
      var seatsToBlockArr = seatsToBlock.split(",");
      for (let index = 0; index < seatsToBlockArr.length; index++) {
        var seat = seatsToBlockArr[index] + "";
        var seatSplitArr = seat.split("_");
        console.log("Split seat: ", seatSplitArr);
        for (let index2 = 0; index2 < this.seatmap.length; index2++) {
          const element = this.seatmap[index2];
          if (element.seatRowLabel == seatSplitArr[0]) {
            var seatObj = element.seats[parseInt(seatSplitArr[1]) - 1];
            if (seatObj) {
              console.log("\n\n\nFount Seat to block: ", seatObj);
              seatObj["status"] = "non-siv";
              this.seatmap[index2]["seats"][
                parseInt(seatSplitArr[1]) - 1
              ] = seatObj;
              console.log("\n\n\nSeat Obj", seatObj);
              console.log(
                this.seatmap[index2]["seats"][parseInt(seatSplitArr[1]) - 1]
              );
              break;
            }
          }
        }
      }
    }
  }
}

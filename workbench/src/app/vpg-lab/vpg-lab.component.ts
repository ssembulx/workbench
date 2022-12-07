import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vpg-lab',
  templateUrl: './vpg-lab.component.html',
  styleUrls: ['./vpg-lab.component.scss']
})
export class VPGLabComponent implements OnInit {

  public seatConfig: any = null;
  public seatmap: any = [];
  public seatChartConfig = {
    showRowsLabel: false,
    showRowWisePricing: false,
    newSeatNoForRow: false
  };
  public cart: any = {
    selectedSeats: [],
    seatstoStore: [],
    totalamount: 0,
    cartId: "",
    eventId: 0
  };

  title = "seat-chart-generator";
  processBooking() {

  }
  ngOnInit(): void {
    //Process a simple bus layout
    this.seatConfig = [
      {
        seat_price: 250,
        seat_map: [
          {
            seat_label: "1",
            layout: "___g__",
            direction: "___u__"
          },
          {
            seat_label: "2",
            layout: "ggg__g",
            direction: "uuu__r"
          },
          {
            seat_label: "3",
            layout: "gggg_g",
            direction: "dddd_r"
          }
        ]
      }
    ];
    this.processSeatChart(this.seatConfig);
    this.blockSeats("1_4,2_6,3_1");
  }

  public processSeatChart(map_data: any[]) {
    if (map_data.length > 0) {
      var seatNoCounter = 1;
      for (let __counter = 0; __counter < map_data.length; __counter++) {
        var row_label = "";
        var item_map = map_data[__counter].seat_map;

        //Get the label name and price
        row_label = "Row " + item_map[0].seat_label + " - ";
        if (item_map[item_map.length - 1].seat_label != " ") {
          row_label += item_map[item_map.length - 1].seat_label;
        } else {
          row_label += item_map[item_map.length - 2].seat_label;
        }
        row_label += " : Rs. " + map_data[__counter].seat_price;

        item_map.forEach((map_element: any) => {
          var mapObj: any = {
            seatRowLabel: map_element.seat_label,
            seats: [],
            seatPricingInformation: row_label
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
              price: map_data[__counter]["seat_price"],
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
  }

  public selectSeat(seatObject: any) {
    console.log("Seat to block: ", seatObject);
    if (seatObject.status == "available") {
      seatObject.status = "booked";
      this.cart.selectedSeats.push(seatObject.seatLabel);
      this.cart.seatstoStore.push(seatObject.key);
      this.cart.totalamount += seatObject.price;
    } else if ((seatObject.status = "booked")) {
      seatObject.status = "available";
      var seatIndex = this.cart.selectedSeats.indexOf(seatObject.seatLabel);
      if (seatIndex > -1) {
        this.cart.selectedSeats.splice(seatIndex, 1);
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

  callSingleTop(i: any, j: any) {
    if (i == 1) {
      return j == 0 || j == 1 || j == 2 ? true : false;
    }
    else if (i == 0) {
      return j == 3 || j == 4 || j == 5 ? true : false;
    }
    else {
      return false;
    }
  }
  callSingleLeft(i: any, j: any) {
    if (i == 0) {
      return j == 3 ? true : false;
    }
    else {
      return false;
    }
  }

}

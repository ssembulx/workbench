import { any } from '@amcharts/amcharts5/.internal/core/util/Array';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { SummaryService } from '../shared/service';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {

  orderMappedRelease: string = '';
  reverseMappedRelease: boolean = true;
  modalReference:any;
  rowValue:any;
  modal:any={
    id:'',
    program:'',
    sku:'',
    vendor:'',
    team:''
  };
  programdataLoader = false;
  programskuData: any;
  vendordataLoader = false;
  vendorData: any;
  teamdataLoader = false;
  teamData:any;
  
  constructor(private modalService:NgbModal,config: NgbModalConfig, private service: SummaryService,) { 
    config.backdrop = 'static';
    config.size = 'md';
  }

  //**** Static data for table ****//
  masterPlatformData = [
    { slno: 1, program: "ADL-P", sku: "M"},
    { slno: 2, program: "MTL-S", sku: "S"},
    { slno: 3, program: "RKL-S", sku: "T"},
  ]

  masterVendorData = [
    { slno: 1, vendor: "UST"},
    { slno: 2, vendor: "Wipro"},
    { slno: 3, vendor: "Infosys"},
  ]

  masterTeamData = [
    { slno: 1, team: "Domain"},
    { slno: 2, team: "Debug"},
    { slno: 3, team: "Domain"},
  ]


  ngOnInit(): void {
    this.getProgramSkuData();
    this.getVendorData();
    this.getTeamData();
  }

  //***** Calling program SKU Data API****//
  getProgramSkuData(){
    this.programdataLoader = false;
    // this.service.getProgramSkuData().subscribe((res) => {
    //   debugger;
    //   this.programskuData = res;
    //   console.log(this.programskuData)
    //   this.programdataLoader = true;
    // });
  }

  // ***** open modal popup for platform and sku ****** //
  AddRow(addmodal:any){
    this.modalReference=this.modalService.open(addmodal)  
  }

  // ***** Add functionality for platform and sku ****** //
  AddPlatform(){
    debugger;
    let req = {"ProgramName":this.modal.program,"Sku":[this.modal.sku]}

    // this.service.getProgramSkuAddData(req).subscribe((res) => {
    //   this.programskuData.push({
    //     ProgramName:this.modal.program,
    //     Sku:this.modal.sku
    //   })
    //   console.log(this.programskuData,"fdghj")
    // });
    
    this.modalReference.close();
    // **** to clearing the values *** //
    // this.modal.program = '';
    // this.modal.sku = '';
  }
   
  //***** Calling Vendor Data API****//
  getVendorData(){
    this.vendordataLoader = false;
    this.service.getVendorData().subscribe((res) => {
      debugger;
      this.vendorData = res;
      this.vendordataLoader = true;
    });
  }

  // ***** open modal popup for Vendor ****** //
  AddVendorRow(addvendormodal:any){
    this.modalReference=this.modalService.open(addvendormodal)  
  }
  
  // ***** Add functionality for vendor****** //
  AddVendor(){
    let req = {"VendorName":this.modal.vendor}

    this.service.getVendorAddData(req).subscribe((res) => {
      this.vendorData.push({
        VendorName:this.modal.vendor
      })
    });
   
    this.modalReference.close();
    // **** to clearing the values *** //
    this.modal.vendor = '';
  }

  //**** Edit Row functionality for vendor ****//
  EditVendorRow(editmodal:any,id:any){
    this.vendorData.forEach((ele:any) => {
      if(ele.id == id){
        this.modal.id = ele.id,
       this.modal.vendor=ele.VendorName
      }
    });
     this.modalReference=this.modalService.open(editmodal)  
   }
 
   //**** Update Row functionality vendor ****//
   UpdateVendorTable(){
    let req = {"id":this.modal.id,"VendorName":this.modal.vendor}

    this.service.getVendorUpdateData(req).subscribe((res) => {
      // // this.AddVendor();
      // this.vendorData.forEach((ele: any)=>{
      //   if(this.modal.id==ele.id){
      //     ele.id = this.modal.id,
      //     ele.VendorName = this.modal.vendor
      //   }
      // })
      this.getVendorData();
    });
     this.modalReference.close();
     // **** to clearing the values *** //
     this.modal.vendor = '';
   }

    //***** Calling Vendor Data API****//
    getTeamData(){
      this.teamdataLoader = false;
      this.service.getTeamData().subscribe((res) => {
        debugger;
        this.teamData = res;
        this.teamdataLoader = true;
      });
    }

  // ***** open modal popup for Team ****** //
  AddTeamRow(addteammodal:any){
    this.modalReference=this.modalService.open(addteammodal)  
  }
 
  // ***** Add functionality for team****** //
  AddTeam(){
    let req = {"TeamName":this.modal.team}

    this.service.getTeamAddData(req).subscribe((res) => {
      this.teamData.push({
        TeamName:this.modal.team
      })
    })
    
    this.modalReference.close();
    // **** to clearing the values *** //
    this.modal.team = '';
  }

    
   //**** Edit Row functionality for team table ****//
   EditTeamRow(editmodal:any,id:any){
    this.teamData.forEach((ele: any) => {
      if(ele.id == id){
       this.modal.id = ele.id,
       this.modal.team=ele.TeamName
      }
    });
     this.modalReference=this.modalService.open(editmodal)  
   }
 
   //**** Update Row functionality for team table ****//
   UpdateTeamTable(){
    let req = {"id":this.modal.id,"TeamName":this.modal.team}

    this.service.getTeamUpdateData(req).subscribe((res) => {
      this.getTeamData();
    })
    //  this.masterTeamData.forEach(ele=>{
    //    if(this.modal.slno==ele.slno){
    //      ele.team = this.modal.team
    //    }
    //  })
     this.modalReference.close();
       // **** to clearing the values *** //
       this.modal.team = '';
   }


  //**** Delete Row functionality platform and  sku table ****//
  DeleteRow(deletemodal:any,index:any) {
    this.rowValue = index;
    this.modalReference=this.modalService.open(deletemodal)
  }

  //**** Confirm Delete Row functionality for platform annd sku table ****//
  ConfirmDelete()
  {
    this.masterPlatformData.splice(this.rowValue, 1);
    this.modalReference.close();
  }

   //**** Delete Row functionality for vendor table ****//
   DeleteVendorRow(deletevendormodal:any,index:any) {
    this.rowValue = index;
    this.modalReference=this.modalService.open(deletevendormodal)
  }

  //**** Confirm Delete Row functionality for vendor table ****//
  ConfirmVendorDelete()
  {
    this.masterVendorData.splice(this.rowValue, 1);
    this.modalReference.close();
  }

   //**** Delete Row functionality in table ****//
   DeleteTeamRow(deleteteammodal:any,index:any) {
    this.rowValue = index;
    this.modalReference=this.modalService.open(deleteteammodal)
  }

  //**** Confirm Delete Row functionality for team table ****//
  ConfirmTeamDelete()
  {
    this.masterTeamData.splice(this.rowValue, 1);
    this.modalReference.close();
  }

  //**** Edit Row functionality in table ****//
  EditRow(editmodal:any,slno:any){
   this.masterPlatformData.forEach(element => {
     if(element.slno == slno){
      this.modal['program']=element.program
      this.modal['sku']=element.sku
     }
   });
    this.modalReference=this.modalService.open(editmodal)  
  }

  //**** Update Row functionality in table ****//
  UpdateTable(){
    debugger
    this.masterPlatformData.forEach(ele=>{
      if(this.modal.slno==ele.slno){
        ele.program = this.modal.program
        ele.sku = this.modal.sku
      }
    })
    this.modalReference.close();
    // **** to clearing the values *** //
    this.modal.program = '';
    this.modal.sku = '';
  }

  //**** Sorting functionality in table(ascending descending order) ****//
   setOrderRelease(value: string) {
    if (this.orderMappedRelease === value) {
      this.reverseMappedRelease = !this.reverseMappedRelease;
    }
    this.orderMappedRelease = value;
  }

}

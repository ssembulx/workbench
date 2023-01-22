import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

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
    program:'',
    sku:'',
    vendor:'',
    team:''
  };

  constructor(private modalService:NgbModal,config: NgbModalConfig) { 
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
  }

   //**** Sorting functionality in table(ascending descending order) ****//
   setOrderRelease(value: string) {
    if (this.orderMappedRelease === value) {
      this.reverseMappedRelease = !this.reverseMappedRelease;
    }
    this.orderMappedRelease = value;
  }


  AddRow(addmodal:any){
    this.modalReference=this.modalService.open(addmodal)  
  }
  AddPlatform(){
    this.masterPlatformData.push({
      slno:this.modal.slno,
      program:this.modal.program,
      sku:this.modal.sku
    })
    this.modalReference.close();
    // **** to clearing the values *** //
    this.modal.program = '';
    this.modal.sku = '';
  }

  AddVendorRow(addvendormodal:any){
    this.modalReference=this.modalService.open(addvendormodal)  
  }
  
  AddVendor(){
    this.masterVendorData.push({
      slno:this.modal.slno,
      vendor:this.modal.vendor
    })
    this.modalReference.close();
    // **** to clearing the values *** //
    this.modal.vendor = '';
  }

  AddTeamRow(addteammodal:any){
    this.modalReference=this.modalService.open(addteammodal)  
  }
 
  AddTeam(){
    this.masterTeamData.push({
      slno:this.modal.slno,
      team:this.modal.team
    })
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
  }


  //**** Edit Row functionality in table ****//
  EditVendorRow(editmodal:any,slno:any){
    this.masterVendorData.forEach(element => {
      if(element.slno == slno){
       this.modal['vendor']=element.vendor
      }
    });
     this.modalReference=this.modalService.open(editmodal)  
   }
 
   //**** Update Row functionality in table ****//
   UpdateVendorTable(){
     this.masterVendorData.forEach(ele=>{
       if(this.modal.slno==ele.slno){
         ele.vendor = this.modal.vendor
       }
     })
     this.modalReference.close();
   }

   
   //**** Edit Row functionality in table ****//
  EditTeamRow(editmodal:any,slno:any){
    this.masterTeamData.forEach(element => {
      if(element.slno == slno){
       this.modal['team']=element.team
      }
    });
     this.modalReference=this.modalService.open(editmodal)  
   }
 
   //**** Update Row functionality in table ****//
   UpdateTeamTable(){
     this.masterTeamData.forEach(ele=>{
       if(this.modal.slno==ele.slno){
         ele.team = this.modal.team
       }
     })
     this.modalReference.close();
   }
 

}

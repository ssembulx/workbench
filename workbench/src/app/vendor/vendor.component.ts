import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { SummaryService } from '../shared/service';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss']
})
export class VendorComponent implements OnInit {

  orderMappedRelease: string = '';
  reverseMappedRelease: boolean = true;
  modalReference:any;
  rowValue:any;
  modal:any={
    id:'',
    vendor:'',
  };
  vendordataLoader = false;
  vendorData: any;

  constructor(private modalService:NgbModal,config: NgbModalConfig, private service: SummaryService,) { 
    config.backdrop = 'static';
    config.size = 'md';
  }

  ngOnInit(): void {
    this.getVendorData();
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

    // **** Calling Add row API***** //
    this.service.getVendorAddData(req).subscribe((res) => {
      this.vendorData.push({
        VendorName:this.modal.vendor
      })
    });
   
    this.modalReference.close();
    // **** to clearing the values *** //
    this.modal.vendor = '';
  }
  buttonClicked: boolean = false;

  //**** Edit Row functionality for vendor ****//
  EditVendorRow(editmodal:any,id:any){  
    // window.location.reload(); 
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

    // **** Calling Update row API***** //
    this.service.getVendorUpdateData(req).subscribe((res) => {
      this.getVendorData();
    });
     this.modalReference.close();
     // **** to clearing the values *** //
     this.modal.vendor = '';
   }

    //**** Delete Row functionality for vendor table ****//
    DeleteVendorRow(deletevendormodal:any,id:any) {
      this.rowValue = id;
      this.modalReference=this.modalService.open(deletevendormodal)
    }
  
    //**** Confirm Delete Row functionality for vendor table ****//
    ConfirmVendorDelete()
    {
      debugger
      let req = {"id":this.rowValue}
      // **** Calling Delete row API***** //
      this.service.getVendordelete(req).subscribe((res)=> {
        // this.vendorData.splice(this.rowValue);
        this.getVendorData();
      })
     
      this.modalReference.close();
    }

   //**** Sorting functionality in table(ascending descending order) ****//
   setOrderRelease(value: string) {
    if (this.orderMappedRelease === value) {
      this.reverseMappedRelease = !this.reverseMappedRelease;
    }
    this.orderMappedRelease = value;
  }
}

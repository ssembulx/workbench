import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
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

  Addpopupmsg:any;
  AddErrorpopupmsg:any;
  isAddpopupmsg:boolean = false;
  isAddErrorpopupmsg:boolean = false;

  Updatepopupmsg:any;
  UpdateErrorpopupmsg:any;
  isUpdatepopupmsg:boolean = false;
  isUpdateErrorpopupmsg:boolean = false;

  Deletepopupmsg:any;
  DeleteErrorpopupmsg:any;
  isDeletepopupmsg:boolean = false;
  isDeleteErrorpopupmsg:boolean = false;

  constructor(private modalService:NgbModal,config: NgbModalConfig, private service: SummaryService,private toastrService: ToastrService) { 
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
      // this.toastrService.success('Vendor Added Successfully', 'Success!');
      if(res.result.status == false){
        this.AddErrorpopupmsg = res.result.message;
        this.isAddErrorpopupmsg = true;
       }
       else{
        this.Addpopupmsg = res.result.message;
        this.isAddpopupmsg = true; 
        setTimeout(() =>{
          this.isAddpopupmsg = false; 
          this.modalReference.close();
         },3000); 
         
       }
      this.getVendorData();
      // this.vendorData.push({
      //   VendorName:this.modal.vendor
      // })
    });
   this.closeResponseMessage();
    // this.modalReference.close();
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
      // this.toastrService.success('Vendor Updated Successfully', 'Success!');
      if(res.result.status == false){
        this.UpdateErrorpopupmsg = res.result.message;
        this.isUpdateErrorpopupmsg = true;
        setTimeout(() =>{
          this.isUpdateErrorpopupmsg = false; 
          this.modalReference.close();
         },3000);
       }
     
       else{
        this.isUpdatepopupmsg = true; 
        this.Updatepopupmsg = res.result.message;
        setTimeout(() =>{
          this.isUpdatepopupmsg = false; 
          this.modalReference.close();
         },3000); 
       
       }
      this.getVendorData();
    });
    this.closeResponseMessage();
    //  this.modalReference.close();
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
        // this.toastrService.success('Vendor Deleted Successfully', 'Success!');
        if(res.result.status == false){
          this.DeleteErrorpopupmsg = res.result.message;
          this.isDeleteErrorpopupmsg = true;
          setTimeout(() =>{
            this.isDeleteErrorpopupmsg = false; 
            this.modalReference.close();
           },3000); 
         }
         else{
          this.isDeletepopupmsg = true; 
          this.Deletepopupmsg = res.result.message;
          setTimeout(() =>{
            this.isDeletepopupmsg = false; 
            this.modalReference.close();
           },3000); 
         
         }
        this.getVendorData();
      })
      this.closeResponseMessage();
      // this.modalReference.close();
    }

    //**** Close response message method****//
   closeResponseMessage(){
    setTimeout(() =>{
      this.isAddpopupmsg = false; 
      this.isAddErrorpopupmsg = false;
      this.isUpdatepopupmsg = false;
      this.isUpdateErrorpopupmsg = false;
      this.isDeletepopupmsg = false;
      this.isDeleteErrorpopupmsg = false;
     //  this.modalReference.close()
     },3000); 
    }


   //**** Sorting functionality in table(ascending descending order) ****//
   setOrderRelease(value: string) {
    if (this.orderMappedRelease === value) {
      this.reverseMappedRelease = !this.reverseMappedRelease;
    }
    this.orderMappedRelease = value;
  }
}

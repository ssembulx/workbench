import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SummaryService } from '../shared/service';

@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.scss']
})
export class PlatformComponent implements OnInit {
  CreatePlatform = new FormGroup({
    platform : new FormControl('', [Validators.required])
  })

  orderMappedRelease: string = '';
  reverseMappedRelease: boolean = true;
  modalReference:any;
  rowValue:any;
  modal:any={
    id:'',
    programName:'',
    programShortName:'',
    platformShortName:'',
    skuName:''
  };
  programdataLoader = false;
  programData: any;
  skudataLoader = false;
  skuData: any;


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

  AddSkupopupmsg:any;
  AddSkuErrorpopupmsg:any;
  isAddSkupopupmsg:boolean = false;
  isAddSkuErrorpopupmsg:boolean = false;

  UpdateSkupopupmsg:any;
  UpdateSkuErrorpopupmsg:any;
  isUpdateSkupopupmsg:boolean = false;
  isUpdateSkuErrorpopupmsg:boolean = false;

  DeleteSkupopupmsg:any;
  DeleteSkuErrorpopupmsg:any;
  isDeleteSkupopupmsg:boolean = false;
  isDeleteSkuErrorpopupmsg:boolean = false;

  
  constructor(private modalService:NgbModal,config: NgbModalConfig, private service: SummaryService,private toastrService: ToastrService) { 
    config.backdrop = 'static';
    config.size = 'md';
  }

  //**** Static data for table ****//
  // masterPlatformData = [
  //   { slno: 1, programName: "Alder Lake", platform:"ADL", createdBy:"Sembulingam, SakthirajanX"},
  //   { slno: 2, programName: "Meteor", platform:"MTL", createdBy:"Govindaiah, ManoharX"},
  //   { slno: 3, programName: "Rocket Lake", platform:"RKL", createdBy:"Manjunath, ArundathiX"},
  //   { slno: 3, programName: "Raptor Lake", platform:"RPL", createdBy:"Rajagopal, SaravananX"},
  // ]

  ngOnInit(): void {
    this.getProgramData();
    this.getSkuData();
  }

   //***** Calling program Data API****//
   getProgramData(){
    this.programdataLoader = false;
    this.service.getProgramData().subscribe((res:any) => {
      this.programData = res;
      console.log(this.programData)
      this.programdataLoader = true;
    });
  }

  // ***** open modal popup for platform and sku ****** //
  AddRow(addmodal:any){
    this.modalReference=this.modalService.open(addmodal)  
  }

  // ***** Add functionality for platform and sku ****** //
  AddPlatform(){
    const regex = /^[a-zA-Z]+$/;
   if (this.modal.programShortName != null && this.modal.programName != null) {

    let req = {"ProgramShortName":this.modal.programShortName,"ProgramName":this.modal.programName}

    // **** Calling Add row API***** //
    this.service.getProgramAddData(req).subscribe((res:any) => {
      // this.toastrService.success('Platform Added Successfully', 'Success!');
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
      this.getProgramData();
      // this.programData.push({
      //   ProgramShortName:this.modal.programShortName,
      //   ProgramName:this.modal.programName,
      // })
      console.log(this.programData,"fdghj")
    });
    this.closeResponseMessage();
    // this.modalReference.close();
    // **** to clearing the values *** //
    this.modal.programName = '';
    this.modal.programShortName = '';
   }
  }

   //**** Edit Row functionality in platform table ****//
   EditPlatformRow(editmodal:any,id:any){
    this.programData.forEach((element:any) => {
      if(element.id == id){
        this.modal.id = element.id,
        this.modal.programShortName=element.ProgramShortName,
       this.modal.programName=element.ProgramName
      }
    });
     this.modalReference=this.modalService.open(editmodal)  
   }
 
   //**** Update Row functionality in platform table ****//
   UpdatePlatformTable(){
     let req = {"id":this.modal.id,"ProgramName":this.modal.programName,"ProgramShortName":this.modal.programShortName}

     // **** Calling Update row API***** //
     this.service.getProgramUpdateData(req).subscribe((res:any)=>{
      // this.toastrService.success('Platform Updated Successfully', 'Success!');
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
        this.getProgramData();
     });
     this.closeResponseMessage();
    //  this.modalReference.close();
     // **** to clearing the values *** //
     this.modal.programName = '';
    this.modal.programShortName = '';
   }

   
  //**** Delete Row functionality platform table ****//
  DeletePlatformRow(deletemodal:any,id:any) {
    this.rowValue = id;
    this.modalReference=this.modalService.open(deletemodal)
  }

  //**** Confirm Delete Row functionality for platform annd sku table ****//
  ConfirmPlatformDelete()
  {
    let req = {"id":this.rowValue}

    // **** Calling Delete row API***** //
    this.service.getProgramDeleteData(req).subscribe((res:any)=>{
      // this.toastrService.success('Platform Deleted Successfully', 'Success!');
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
       this.getProgramData();
       this.getSkuData();
    });
    this.closeResponseMessage();
    // this.modalReference.close();
  }

  // *********Sku Data******** // 
  getSkuData(){
    this.skudataLoader = false;
    this.service.getSkuData().subscribe((res:any) => {
      this.skuData = res;
      console.log(this.skuData)
      this.skudataLoader = true;
    });
  }
  // ***** open modal popup for sku****** //
  AddSkuRow(addskumodal:any){
    this.modalReference=this.modalService.open(addskumodal)  
  }

  // ***** Add functionality for sku ****** //
  AddSku(){
    let req = {"ProgramShortName":this.modal.platformShortName,"SkuName":this.modal.skuName}
     // **** Calling Add row API***** //
    this.service.getSkuAddData(req).subscribe((res:any) => {
      // this.toastrService.success('SKU Added Successfully', 'Success!');
      if(res.result.status == false){
        this.AddSkuErrorpopupmsg = res.result.message;
        this.isAddSkuErrorpopupmsg = true;
        // setTimeout(() =>{
        //   this.isAddErrorpopupmsg = false; 
        //   this.modalReference.close();
        //  },3000);
       }
       else{
        this.AddSkupopupmsg = res.result.message;
        this.isAddSkupopupmsg = true; 
        setTimeout(() =>{
          this.isAddSkupopupmsg = false; 
          this.modalReference.close();
         },3000); 
         
       }
      this.getSkuData();
      console.log(this.skuData,"fdghj")
    });
    this.closeResponseMessage();
    // this.modalReference.close();
    // **** to clearing the values *** //
    this.modal.platformShortName = '';
    this.modal.skuName = '';
  }

  //**** Edit Row functionality sku table ****//
  EditSkuRow(editskumodal:any,id:any){
    this.skuData.forEach((element:any) => {
      if(element.id == id){
        this.modal.id = element.id,
        this.modal.platformShortName=element.ProgramName__ProgramShortName,
        this.modal.skuName=element.SkuName
      }
    });
     this.modalReference=this.modalService.open(editskumodal)  
   }
 
   //**** Update Row functionality for sku table ****//
   UpdateSkuTable(){
     let req = {"id":this.modal.id,"SkuName":this.modal.skuName,"ProgramShortName":this.modal.platformShortName}
     // **** Calling Update row API***** //
     this.service.getSkuUpdateData(req).subscribe((res:any)=>{
      // this.toastrService.success('SKU Updated Successfully', 'Success!');
      if(res.result.status == false){
        this.UpdateSkuErrorpopupmsg = res.result.message;
        this.isUpdateSkuErrorpopupmsg = true;
        setTimeout(() =>{
          this.isUpdateErrorpopupmsg = false; 
          this.modalReference.close();
         },3000);
       }
     
       else{
        this.isUpdateSkupopupmsg = true; 
        this.UpdateSkupopupmsg = res.result.message;
        setTimeout(() =>{
          this.isUpdateSkupopupmsg = false; 
          this.modalReference.close();
         },3000); 
       
       }
        this.getSkuData();
     });
    //  this.modalReference.close();
    this.closeResponseMessage()
     // **** to clearing the values *** //
     this.modal.platformShortName = '';
     this.modal.skuName = '';
   }

   
  //**** Delete Row functionality  sku table ****//
  DeleteSkuRow(deleteskumodal:any,id:any) {
    this.rowValue = id;
    this.modalReference=this.modalService.open(deleteskumodal)
  }

  //**** Confirm Delete Row functionality for sku table ****//
  ConfirmSkuDelete()
  {
    let req = {"id":this.rowValue}

    // **** Calling Delete row API***** //
    this.service.getSkuDeleteData(req).subscribe((res:any)=>{
      // this.toastrService.success('SKU Deleted Successfully', 'Success!');
      if(res.result.status == false){
        this.DeleteSkuErrorpopupmsg = res.result.message;
        this.isDeleteSkuErrorpopupmsg = true;
        setTimeout(() =>{
          this.isDeleteSkuErrorpopupmsg = false; 
          this.modalReference.close();
         },3000); 
       }
       else{
        this.isDeleteSkupopupmsg = true; 
        this.DeleteSkupopupmsg = res.result.message;
        setTimeout(() =>{
          this.isDeleteSkupopupmsg = false; 
          this.modalReference.close();
         },3000); 
       
       }
       this.getSkuData();
    });
    // this.modalReference.close();
    this.closeResponseMessage();
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
      this.isAddSkupopupmsg = false; 
      this.isAddSkuErrorpopupmsg = false;
      this.isUpdateSkupopupmsg = false;
      this.isUpdateSkuErrorpopupmsg = false;
      this.isDeleteSkupopupmsg = false;
      this.isDeleteSkuErrorpopupmsg = false;
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

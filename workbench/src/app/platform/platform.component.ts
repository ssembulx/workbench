import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { SummaryService } from '../shared/service';

@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.scss']
})
export class PlatformComponent implements OnInit {

  orderMappedRelease: string = '';
  reverseMappedRelease: boolean = true;
  modalReference:any;
  rowValue:any;
  modal:any={
    programName:'',
    platform:''
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
    { slno: 1, programName: "Alder Lake", platform:"ADL", createdBy:"Sembulingam, SakthirajanX"},
    { slno: 2, programName: "Meteor", platform:"MTL", createdBy:"Govindaiah, ManoharX"},
    { slno: 3, programName: "Rocket Lake", platform:"RKL", createdBy:"Manjunath, ArundathiX"},
    { slno: 3, programName: "Raptor Lake", platform:"RPL", createdBy:"Rajagopal, SaravananX"},
  ]

  ngOnInit(): void {
    this.getProgramSkuData();
  }

   //***** Calling program SKU Data API****//
   getProgramSkuData(){
    this.programdataLoader = false;
    this.service.getProgramSkuData().subscribe((res) => {
      debugger;
      this.programskuData = res;
      console.log(this.programskuData)
      this.programdataLoader = true;
    });
  }

  // ***** open modal popup for platform and sku ****** //
  AddRow(addmodal:any){
    this.modalReference=this.modalService.open(addmodal)  
  }

  // ***** Add functionality for platform and sku ****** //
  AddPlatform(){
    debugger;
    // let req = {"ProgramName":this.modal.program,"Sku":[this.modal.sku]}

    // this.service.getProgramSkuAddData(req).subscribe((res) => {
      this.masterPlatformData.push({
        slno:this.modal.slno,
        programName:this.modal.programName,
        platform:this.modal.platform,
        createdBy:this.modal.createdBy
      // console.log(this.programskuData,"fdghj")
    });
    
    this.modalReference.close();
    // **** to clearing the values *** //
    // this.modal.program = '';
    // this.modal.sku = '';
  }

   //**** Edit Row functionality in table ****//
   EditRow(editmodal:any,slno:any){
    this.masterPlatformData.forEach(element => {
      if(element.slno == slno){
       this.modal['programName']=element.programName
       this.modal['platform']=element.platform
      }
    });
     this.modalReference=this.modalService.open(editmodal)  
   }
 
   //**** Update Row functionality in table ****//
   UpdateTable(){
     debugger
     this.masterPlatformData.forEach(ele=>{
       if(this.modal.slno==ele.slno){
         ele.programName = this.modal.programName
         ele.platform = this.modal.platform
       }
     })
     this.modalReference.close();
     // **** to clearing the values *** //
     this.modal.programName = '';
     this.modal.platform = '';
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

   //**** Sorting functionality in table(ascending descending order) ****//
   setOrderRelease(value: string) {
    if (this.orderMappedRelease === value) {
      this.reverseMappedRelease = !this.reverseMappedRelease;
    }
    this.orderMappedRelease = value;
  }


}

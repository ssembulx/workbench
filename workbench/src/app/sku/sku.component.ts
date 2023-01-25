import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { SummaryService } from '../shared/service';

@Component({
  selector: 'app-sku',
  templateUrl: './sku.component.html',
  styleUrls: ['./sku.component.scss']
})
export class SkuComponent implements OnInit {

  orderMappedRelease: string = '';
  reverseMappedRelease: boolean = true;
  modalReference:any;
  rowValue:any;
  modal:any={
    sku:'',
    
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
   masterSkuData = [
    { slno: 1, SKU:"S", createdBy:"Sembulingam, SakthirajanX"},
    { slno: 2, SKU: "M",  createdBy:"Govindaiah, ManoharX"},
    { slno: 3, SKU: "N", createdBy:"Manjunath, ArundathiX"},
    { slno: 3, SKU: "P",  createdBy:"Rajagopal, SaravananX"},
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
        this.masterSkuData.push({
          slno:this.modal.slno,
          SKU:this.modal.sku,
          // platform:this.modal.platform,
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
      this.masterSkuData.forEach(element => {
        if(element.slno == slno){
         this.modal['sku']=element.SKU

        }
      });
       this.modalReference=this.modalService.open(editmodal)  
     }
   
     //**** Update Row functionality in table ****//
     UpdateTable(){
       debugger
       this.masterSkuData.forEach(ele=>{
         if(this.modal.slno==ele.slno){
           ele.SKU = this.modal.sku
          //  ele.platform = this.modal.platform
         }
       })
       this.modalReference.close();
       // **** to clearing the values *** //
       this.modal.sku = '';
      //  this.modal.platform = '';
     }
  
     
    //**** Delete Row functionality platform and  sku table ****//
    DeleteRow(deletemodal:any,index:any) {
      this.rowValue = index;
      this.modalReference=this.modalService.open(deletemodal)
    }
  
    //**** Confirm Delete Row functionality for platform annd sku table ****//
    ConfirmDelete()
    {
      this.masterSkuData.splice(this.rowValue, 1);
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

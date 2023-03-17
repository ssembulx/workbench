import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SummaryService } from '../shared/service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  orderMappedRelease: string = '';
  reverseMappedRelease: boolean = true;
  modalReference:any;
  rowValue:any;
  modal:any={
    id:'',
    team:''
  };
  
  teamdataLoader = false;
  teamData:any;

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
    this.getTeamData();
  }

  //***** Calling team Data API****//
  getTeamData(){
    this.teamdataLoader = false;
    this.service.getTeamData().subscribe((res) => {
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

  // **** Calling Add row API***** //
  this.service.getTeamAddData(req).subscribe((res) => {
    // this.toastrService.success('Team Added Successfully', 'Success!');
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
    this.getTeamData();
    // this.teamData.push({
    //   TeamName:this.modal.team
    // })
  })
  this.closeResponseMessage();
  // this.modalReference.close();
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

  // **** Calling Update row API***** //
  this.service.getTeamUpdateData(req).subscribe((res) => {
    // this.toastrService.success('Team Updated Successfully', 'Success!');
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
    this.getTeamData();
  })
  this.closeResponseMessage();
  //  this.modalReference.close();
     // **** to clearing the values *** //
     this.modal.team = '';
 }

   //**** Delete Row functionality in table ****//
   DeleteTeamRow(deleteteammodal:any,id:any) {
    this.rowValue = id;
    this.modalReference=this.modalService.open(deleteteammodal)
  }

  //**** Confirm Delete Row functionality for team table ****//
  ConfirmTeamDelete()
  {
    let req = {"id":this.rowValue}

    // **** Calling Delete row API***** //
    this.service.getTeamDelete(req).subscribe((res) =>{
      // this.toastrService.success('Team Deleted Successfully', 'Success!');
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
      this.getTeamData();
    })
    // this.teamData.splice(this.rowValue);
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

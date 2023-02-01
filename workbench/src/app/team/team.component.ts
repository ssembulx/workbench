import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
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
  
  constructor(private modalService:NgbModal,config: NgbModalConfig, private service: SummaryService,) { 
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
    this.getTeamData();
    // this.teamData.push({
    //   TeamName:this.modal.team
    // })
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

  // **** Calling Update row API***** //
  this.service.getTeamUpdateData(req).subscribe((res) => {
    this.getTeamData();
  })
   this.modalReference.close();
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
      this.getTeamData();
    })
    // this.teamData.splice(this.rowValue);
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

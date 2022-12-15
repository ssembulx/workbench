import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  orderMappedRelease: string = '';
  reverseMappedRelease: boolean = true;
  rowValue:any;
  modalReference:any;
  modal:any={
    name:'',
    wwid:'',
    idsid:'',
    email:'',
    role:'',
    badge:'',
    lastloggedon:''
  };

  constructor(private modalService:NgbModal,config: NgbModalConfig) { 
    config.backdrop = 'static';
    config.size = 'lg';
  }

  //**** Static data for table ****//
  userData = [
    { slno: 1, wwid: "11445685", idsid: "bgurusam", displayName: "Gurusamy, Balaji", email: "balaji.gurusamy@intel.com", role: "view", badge:"BB", lastLoggedOn:"Not yet logged in"},
    { slno: 2, wwid: "11865087", idsid: "nairrath", displayName: "Nair, Ratheesh",   email: "ratheesh.nair@intel.com", role: "view" , badge:"BB", lastLoggedOn:"Not yet logged in" },
    { slno: 3, wwid: "11382988", idsid: "vbadam",   displayName: "Badam, Venkatesh", email: "venkatesh.badam@intel.com", role: "view", badge:"BB", lastLoggedOn:"Oct 18 2022 10:32AM" },
    { slno: 4, wwid: "11447352", idsid: "schandna", displayName: "Chandna, Shruti",  email: "shruti.chandna@intel.com", role: "view", badge:"BB", lastLoggedOn:"Oct 18 2022 9:53AM" },
    { slno: 5, wwid: "11593933", idsid: "sabarigi", displayName: "Radhakrishnan, Sabarigirish", email: "sabarigirish.radhakrishnan@intel.com", role: "view", badge:"BB", lastLoggedOn:"Oct 17 2022 6:36PM" },
    { slno: 6, wwid: "11486911", idsid: "sethiani", displayName: "Anil Sethi", email: "anil.kumar.sethi@intel.com", role: "view", badge:"BB", lastLoggedOn:"Nov 3 2022 1:35PM" },
    { slno: 7, wwid: "11421054", idsid: "mpsharma", displayName: "Munish Sharma", email: "munish.p.sharma@intel.com", role: "Manage", badge:"BB", lastLoggedOn:"Oct 21 2022 11:01AM" },
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

  //**** Delete Row functionality in table ****//
  DeleteRow(deletemodal:any,index:any) {
    this.rowValue = index;
    this.modalReference=this.modalService.open(deletemodal)
  }

  //**** Confirm Delete Row functionality in table ****//
  ConfirmDelete()
  {
    this.userData.splice(this.rowValue, 1);
    this.modalReference.close();
  }

  //**** Edit Row functionality in table ****//
  EditRow(editmodal:any,wwid:any){
   this.userData.forEach(element => {
     if(element.wwid == wwid){
      this.modal['idsid']=element.idsid
      this.modal['name']=element.displayName
      this.modal['wwid']=element.wwid
      this.modal['email']=element.email
      this.modal['role']=element.role
      this.modal['badge']=element.badge
      this.modal['lastloggedon']=element.lastLoggedOn
     }
   });
    this.modalReference=this.modalService.open(editmodal)  
  }

  //**** Update Row functionality in table ****//
  UpdateTable(){
    this.userData.forEach(ele=>{
      if(this.modal.wwid==ele.wwid){
        ele.displayName = this.modal.name
        ele.idsid = this.modal.idsid
        ele.email = this.modal.email
        ele.role = this.modal.role
        ele.badge = this.modal.badge
        ele.lastLoggedOn = this.modal.lastloggedon
      }
    })
    this.modalReference.close();
  }

  AddRow(addmodal:any){
    this.modalReference=this.modalService.open(addmodal)  
  }

  AddUser(){
    this.userData.push({
      slno:this.modal.slno,
      wwid:this.modal.wwid,
      idsid:this.modal.idsid,
      displayName:this.modal.name,
      email: this.modal.email,
      role: this.modal.role,
      badge: this.modal.badge,
      lastLoggedOn: this.modal.lastLoggedOn
    })
    this.modalReference.close();
  }
}

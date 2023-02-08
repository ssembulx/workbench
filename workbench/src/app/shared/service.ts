import { any } from '@amcharts/amcharts5/.internal/core/util/Array';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SummaryService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
  });

  userAuth: any;

  private ServiceURL = environment.ServiceURL;

  private options = { headers: this.headers };

  constructor(private http: HttpClient) {}

  //**** Location Chart API  ****//
  public LabProgramVendorSummary(): Observable<any> {
    return this.http.get(
      this.ServiceURL + 'home/LabProgramVendorSummary/Location'
    );
  }

  //**** Program Chart API  ****//
  public LabProgramSummary(): Observable<any> {
    return this.http.get(
      this.ServiceURL + 'home/LabProgramVendorSummary/Program'
    );
  }

  //**** Vendor Chart API  ****//
  public LabVendorSummary(): Observable<any> {
    return this.http.get(
      this.ServiceURL + 'home/LabProgramVendorSummary/Vendor'
    );
  }

  // ***** Labwise Chart API ******//
  public LabwiseSummary(req: any): Observable<any> {
    return this.http.post(
      this.ServiceURL + 'home/LabwiseSummary/',
      req,
      this.options
    );
  }

  // ***** Overallsummary semi circle pie Chart API ******//
  public LabOverallSummary(): Observable<any> {
    return this.http.get(this.ServiceURL + 'home/OverallSummary/');
  }

  // ***** OverallAvailability semi circle pie Chart API ******//
  public OverallAvailability(): Observable<any> {
    return this.http.get(this.ServiceURL + 'home/OverallAvailability/');
  }

  // ***** Report view data API ******//
  public getReportData(): Observable<any> {
    return this.http.get(this.ServiceURL + 'home/ReportView/');
  }

  // ***** Master view program data API ******//
  public getProgramData(): Observable<any> {
    return this.http.get(this.ServiceURL + 'home/AddProgram/');
  }

  // ***** Master view add program data API ******//
  public getProgramAddData(req: any): Observable<any> {
    return this.http.post(this.ServiceURL + 'home/AddProgram/',req);
  }

   // ***** Master view update program data API ******//
   public  getProgramUpdateData(req: any): Observable<any> {
    return this.http.put(this.ServiceURL + 'home/EditDeleteProgram/',req);
  }

   // ***** Master view delete program data API ******//
   public  getProgramDeleteData(req: any): Observable<any> {
    return this.http.post(this.ServiceURL + 'home/EditDeleteProgram/',req);
  }

   // ***** Master view Sku data API ******//
   public getSkuData(): Observable<any> {
    return this.http.get(this.ServiceURL + 'home/AddSku/');
  }

    // ***** Master view add sku data API ******//
    public getSkuAddData(req: any): Observable<any> {
      return this.http.post(this.ServiceURL + 'home/AddSku/',req);
    }

    // ***** Master view update sku data API ******//
   public  getSkuUpdateData(req: any): Observable<any> {
    return this.http.put(this.ServiceURL + 'home/EditDeleteSku/',req);
  }

     // ***** Master view delete sku data API ******//
     public  getSkuDeleteData(req: any): Observable<any> {
      return this.http.post(this.ServiceURL + 'home/EditDeleteSku/',req);
    }

  // ***** Master view vendor data API ******//
  public getVendorData(): Observable<any> {
    return this.http.get(this.ServiceURL + 'home/VendorData/');
  }

  // ***** Master view add vendor data API ******//
  public getVendorAddData(req: any): Observable<any> {
    return this.http.post(this.ServiceURL + 'home/VendorData/',req);
  }

  // ***** Master view update vendor data API ******//
  public  getVendorUpdateData(req: any): Observable<any> {
    return this.http.put(this.ServiceURL + 'home/VendorData/',req);
  }

  // ***** Master view delete vendor data API ******//
  public  getVendordelete(req: any): Observable<any> {
    return this.http.post(this.ServiceURL + 'home/DeleteVendor/',req);
  }

  // ***** Master view  team data API ******//
  public getTeamData(): Observable<any> {
    return this.http.get(this.ServiceURL + 'home/TeamData/');
  }

  // ***** Master view add team data API ******//
  public getTeamAddData(req: any): Observable<any> {
    return this.http.post(this.ServiceURL + 'home/TeamData/',req);
  }

  // ***** Master view update team data API ******//
  public getTeamUpdateData(req: any): Observable<any> {
    return this.http.put(this.ServiceURL + 'home/TeamData/',req);
  }
  
   // ***** Master view delete team data API ******//
   public getTeamDelete(req: any): Observable<any> {
    return this.http.post(this.ServiceURL + 'home/DeleteTeam/',req);
  }

   // *****  user data API ******//
   public getUserData(): Observable<any> {
    return this.http.get(this.ServiceURL + 'home/AddUser/');
  }

  // *****  Calling API for Role for user table(drop down select option) ******//
  public getRole(): Observable<any> {
    return this.http.get(this.ServiceURL + 'home/GetAllRoles/');
  }
  
  // ***** user view add user data API ******//
  public getAddUserData(req: any): Observable<any> {
    return this.http.post(this.ServiceURL + 'home/AddUser/',req);
  }
  
   // ***** User view update user data API ******//
   public getUserUpdateData(req: any): Observable<any> {
    return this.http.put(this.ServiceURL + 'home/AddUser/',req);
  }

   // ***** User view delete team data API ******//
   public getUserDelete(req: any): Observable<any> {
    return this.http.post(this.ServiceURL + 'home/DeleteUser/',req);
  }

  // ***** User details API ******//
  public getUserDetail(req:any): Observable<any> {
    return this.http.post(this.ServiceURL + 'home/GetCurrentUserData/',req, { withCredentials: true });
  }

    // ***** User details API authguard ******//
  getUserDetailP(req:any){
      return this.http.post(this.ServiceURL + 'home/GetCurrentUserData/',req, { withCredentials: true }).toPromise();
    }

  setValue(value: boolean) {
    this.userAuth = value;
  };

   // ***** WindowsAuth API for getting token ******//
  getWindowsAuth(){
     return this.http.get('https://iamws-i.intel.com/api/v1/token/WindowsAuth', { withCredentials: true });
  }
  

    // ***** WindowsAuth API for getting token authguard ******//
    getWindowsAuthP(){
      return this.http.get('https://iamws-i.intel.com/api/v1/token/WindowsAuth', { withCredentials: true }).toPromise();
   }
  
   
  // constructor(private http: HttpClient) {}

  // public LabProgramVendorSummary(): Observable<any> {
  //   return this.http.get(
  //     this.ServiceURL + 'home/LabProgramVendorSummary/Location'
  //   );
  // }

  // /**
  //  * @method GetPlatfroms -get the favourite filter selected for HSDES
  //  */

  /**
   * @method GetPlatfroms -get the favourite filter selected for HSDES
   */
  GetLocations() {
    return this.http.get(this.ServiceURL + 'home/ListAllLocations/');
  }

  getLabDetails(lab: any) {
    const serviceUrl = this.ServiceURL + 'home/LabDetails/';
    return this.http.post(serviceUrl, lab, {
      headers: {
        'Content-type': 'application/json',
      },
    });
  }

  getProgram() {
    return this.http.get(this.ServiceURL + 'home/GetProgramDetails/');
  }
  getSKU(program: any) {
    const serviceUrl = this.ServiceURL + 'home/GetSkuDetails/ ';
    return this.http.post(serviceUrl, program, {
      headers: {
        'Content-type': 'application/json',
      },
    });
  }
  getVendor() {
    return this.http.get(this.ServiceURL + 'home/GetVendorDetails');
  }
  getTeam() {
    return this.http.get(this.ServiceURL + 'home/GetTeamNames/');
  }
  saveBooking(data: any) {
    const serviceUrl = this.ServiceURL + 'home/BookBench/';
    return this.http.post(serviceUrl, data, {
      headers: {
        'Content-type': 'application/json',
      },
    });
  }
  deallocationBooking(data: any) {
    const serviceUrl = this.ServiceURL + 'home/DeallocateBenches/';
    return this.http.post(serviceUrl, data, {
      headers: {
        'Content-type': 'application/json',
      },
    });
  }
  viewApprovalRequests() {
    return this.http.get(this.ServiceURL + 'home/ViewApprovalRequests/ ');
  }
  approveBenchList(data: any) {
    const serviceUrl = this.ServiceURL + 'home/ViewApprovalRequests/';
    return this.http.post(serviceUrl, data, {
      headers: {
        'Content-type': 'application/json',
      },
    });
  }
  rejectBenchList(data: any) {
    const serviceUrl = this.ServiceURL + 'home/RejectApprovalRequests/';
    return this.http.post(serviceUrl, data, {
      headers: {
        'Content-type': 'application/json',
      },
    });
  }

  public getUserDetails(obj: any): Observable<any> {
    return this.http.post(
      'https://cppo.apps1-bg-int.icloud.intel.com/api/Account/GetUserDetails',
      obj,
      {
        withCredentials: true,
      }
    );
  }
  


}

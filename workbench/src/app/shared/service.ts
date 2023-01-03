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
}

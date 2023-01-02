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

  constructor(private http: HttpClient) {}

  public LabProgramVendorSummary(): Observable<any> {
    return this.http.get(
      this.ServiceURL + 'home/LabProgramVendorSummary/Location'
    );
  }

  /**
   * @method GetPlatfroms -get the favourite filter selected for HSDES
   */
  GetLocations() {
    return this.http.get(this.ServiceURL + 'home/ListAllLocations/');
  }
}

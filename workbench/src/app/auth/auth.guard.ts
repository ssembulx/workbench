import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SummaryService } from '../shared/service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  userDetails: any;
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
  });
  constructor(private service: SummaryService, private router: Router) { }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    // ***** Local code ***** //
    // const resAuth: any = {
    //     "emailId": "arundathix.manjunath@intel.com",
    //     "name": "Manjunath, ArundathiX",
    //     "idsid": "arundatx",
    //     "wwid": 12035082,
    //     "employeeBadgeType": "GB",
    //     "avatarURL": "https://photos.intel.com/images/12035082.jpg",
    //     "role": null,
    //     "domain": null,
    //     "comments": null,
    //     "displayName": "Manjunath, ArundathiX",
    //     "isApplicationAccess": false,
    //     "programAccesses": null,
    //     "Role": "User"
    // }
    // if (resAuth.Role) {
    //     debugger
    //   this.service.setValue(true);
    //   return true
    // } else {
    //     debugger
    //   this.router.navigate(['/access-ristrict']);
    //   return false
    // }



   


    // ******  Server code ****** //
     const tokenData: any = await this.service.getWindowsAuth()
    const resAuth: any = await this.service.getUserDetail({ token: tokenData.token })
    console.log(resAuth,"res Auth")
    if (resAuth.Role == 'Admin' || resAuth.Role == 'User' || resAuth.Role == 'Manager') {
      this.service.setValue(true);
      return true
    } else {
      this.router.navigate(['/access-ristrict']);
      return false
    }

  }

}

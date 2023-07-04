import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SummaryService } from '../shared/service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  userDetails: any;

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
  });
  constructor(private service: SummaryService, private router: Router) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // ***** Local code ***** //
    /*  const resAuth: any = {
      emailId: 'arundathix.manjunath@intel.com',
      name: 'Manjunath, ArundathiX',
      idsid: 'arundatx',
      wwid: 12035082,
      employeeBadgeType: 'GB',
      avatarURL: 'https://photos.intel.com/images/12035082.jpg',
      role: null,
      domain: null,
      comments: null,
      displayName: 'Manjunath, ArundathiX',
      isApplicationAccess: false,
      programAccesses: null,
      Role: 'Admin',
    };
    if (
      resAuth.Role == 'Admin' ||
      resAuth.Role == 'User' ||
      resAuth.Role == 'Lead' ||
      resAuth.Role == 'View'
    ) {
      this.service.authenticationDone(true);
      this.service.setValue(true);
      this.service.SetUser(resAuth);
      return true;
    } else if (resAuth.Role == 'View') {
      this.router.navigate(['/home']);
    } else {
      debugger;
      this.service.authenticationDone(true);
      this.service.SetUser(resAuth);
      this.router.navigate(['/access-restrict']);
      return false;
    }  */
    // ******  Server code ****** //
    //
    //   //  let userInfo = this.service.GetUser();
  let userInfo;
    this.service.GetUser().subscribe((res: any) => {
      console.log('userdeatils-auth', res);
      userInfo = res;
    });
    console.log(userInfo, 'res userInfo');
    if (userInfo == null || userInfo == undefined) {
      console.log(userInfo, 'if res userInfo');
      const tokenData: any = await this.service.getWindowsAuthP();
      const resAuth: any = await this.service.getUserDetailP({
        token: tokenData.token,
      });
      console.log(resAuth, 'res Auth');
      if (
        resAuth.Role == 'Admin' ||
        resAuth.Role == 'User' ||
        resAuth.Role == 'Lead' ||
        resAuth.Role == 'View'
      ) {
        this.service.authenticationDone(true);
        this.service.setValue(true);
        this.service.SetUser(resAuth);
        return true;
      } else {
        this.service.authenticationDone(true);
        this.service.SetUser(resAuth);
        this.router.navigate(['/access-restrict']);
        return false;
      }
    } else {
      console.log(userInfo, 'else res userInfo');
      return true;
    }

    //   if (!this.helper.token) {
    //     let userToken:any = await this.service.getWindowsAuthP();
    //     const payload = { "userToken": userToken.token }
    //     const userinfo: any = await this.service.getUserDetailP(payload)
    //      this.userDetails = userinfo
    //      this.helper.authenticationDone(true)
    //      if (this.userDetails.isAuthorize) {
    //       this.helper.setToken(this.userDetails.token)
    //       const data : any=   await this.service.getUserData()
    //       let userInfo:any = {
    //         avatarURL: this.userDetails.avatarURL,
    //         displayName: this.userDetails.name,
    //         emailId: this.userDetails.emailId,
    //         name: this.userDetails.name,
    //         idsid:this.userDetails.idsid,
    //         wwid:this.userDetails.wwid,
    //         employeeBadgeType:this.userDetails.employeeBadgeType,
    //         // isSuccess: true,
    //         // lastName: this.userDetails.name,
    //         isApplicationAccess:this.userDetails.isApplicationAccess,
    //         // message: null,
    //         role: this.userDetails.roleName,
    //         domain:this.userDetails.domain,
    //         comments:this.userDetails.comments,
    //         programAccesses:this.userDetails.programAccesses,
    //         Role:this.userDetails.Role
    //         // ssoId:this.userDetails.wwid,
    //         // userName: this.userDetails.idsid,
    //      // userConfig: null
    //       };
    //      Object.assign(userInfo ,{userConfig:data.userConfig})
    //        this.helper.editUser(userInfo);
    //        this.helper.SetUser(userInfo);
    //       //  this.accountService.setShowHeader(true);
    //        return true;
    //       } else {
    //       // this.accountService.setShowHeader(false);
    //       this.router.navigate(['/access-ristrict']);
    //       return false
    //      }
    //  } else {
    //    return true
    //  }
  }
}

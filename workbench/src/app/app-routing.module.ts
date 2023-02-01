import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllocationComponent } from './allocation/allocation.component';
import { ApproveComponent } from './approve/approve.component';
import { HomeComponent } from './home/home.component';
import { MasterComponent } from './master/master.component';
import { PlatformComponent } from './platform/platform.component';
import { PublishComponent } from './publish/publish.component';
import { ReportComponent } from './report/report.component';
// import { SkuComponent } from './sku/sku.component';
import { TeamComponent } from './team/team.component';
import { UserComponent } from './user/user.component';
import { VendorComponent } from './vendor/vendor.component';
const routes: Routes = [{
  path: '', component: HomeComponent
},
{
  path: 'home', component: HomeComponent
},
{
  path: 'allocation', component: AllocationComponent
}, {
  path: 'approve', component: ApproveComponent
},
{
  path: 'master', component: MasterComponent
},

{
  path: 'program', component: PlatformComponent
},

// {
//   path: 'sku', component: SkuComponent
// },

{
  path: 'vendor', component: VendorComponent
},

{
  path: 'team', component: TeamComponent
},

{
  path: 'report', component: ReportComponent
},
{
  path: 'user', component: UserComponent
},
{
  path: 'publish', component: PublishComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

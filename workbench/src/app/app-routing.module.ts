import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllocationComponent } from './allocation/allocation.component';
import { ApproveComponent } from './approve/approve.component';
import { HomeComponent } from './home/home.component';
import { MasterComponent } from './master/master.component';
import { PublishComponent } from './publish/publish.component';
import { ReportComponent } from './report/report.component';
import { UserComponent } from './user/user.component';
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
  path: 'report', component: ReportComponent
},
// {
//   path: 'user', component: UserComponent
// },
{
  path: 'publish', component: PublishComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

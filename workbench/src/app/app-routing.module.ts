import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { AllocationComponent } from './allocation/allocation.component';
import { ApproveComponent } from './approve/approve.component';
import { AuhenticateComponent } from './auhenticate/auhenticate.component';
import { AuthGuard } from './auth/auth.guard';
import { FeedbackComponent } from './feedback/feedback.component';
import { ForecastComponent } from './forecast/forecast.component';
import { HomeComponent } from './home/home.component';
import { LabEfficiencyUtilizationComponent } from './lab-efficiency-utilization/lab-efficiency-utilization.component';
import { MasterComponent } from './master/master.component';
import { OrganizationComponent } from './organization/organization.component';
import { PlatformComponent } from './platform/platform.component';
import { PublishComponent } from './publish/publish.component';
import { ReportComponent } from './report/report.component';
// import { SkuComponent } from './sku/sku.component';
import { TeamComponent } from './team/team.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { UserApproveComponent } from './user-approve/user-approve.component';
import { UserComponent } from './user/user.component';
import { VendorComponent } from './vendor/vendor.component';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'allocation',
    component: AllocationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'allocation/:id',
    component: AllocationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'approve',
    component: ApproveComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'master',
    component: MasterComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'program',
    component: PlatformComponent,
    canActivate: [AuthGuard],
  },

  // {
  //   path: 'sku', component: SkuComponent
  // },

  {
    path: 'vendor',
    component: VendorComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'team',
    component: TeamComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'organization',
    component: OrganizationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'LabEfficiencyUtilization',
    component: LabEfficiencyUtilizationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'forecast',
    component: ForecastComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'report',
    component: ReportComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'approveuser',
    component: UserApproveComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'publish',
    component: PublishComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'feedback',
    component: FeedbackComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'tutorial',
    component: TutorialComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'access-restrict',
    component: AccessDeniedComponent,
  },
  {
    path: 'User-authenticate',
    component: AuhenticateComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

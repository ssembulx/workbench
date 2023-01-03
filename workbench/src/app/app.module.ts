import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AllocationComponent } from './allocation/allocation.component';
import { ApproveComponent } from './approve/approve.component';
import { MasterComponent } from './master/master.component';
import { UserComponent } from './user/user.component';
import { VPGLabComponent } from './vpg-lab/vpg-lab.component';
/* import {MatTableModule} from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort'; */
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { OrderModule } from 'ngx-order-pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StackedChartComponentComponent } from './stacked-chart-component/stacked-chart-component.component';
import { LabwiseAllotedChartComponentComponent } from './labwise-alloted-chart-component/labwise-alloted-chart-component.component';
import { FullscreenDirective } from './shared/fullscreen.directive';
import { SSRCRD4LabComponent } from './ssr-crd4-lab/ssr-crd4-lab.component';
import { ProgramStackedChartComponentComponent } from './program-stacked-chart-component/program-stacked-chart-component.component';
import { VendorStackedChartComponentComponent } from './vendor-stacked-chart-component/vendor-stacked-chart-component.component';
import { ReportComponent } from './report/report.component';
import {
  SearchLab,
  SearchPipe,
  SearchProgram,
  SearchVendor,
} from './search.pipe';
import { SummaryService } from './shared/service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AllocationComponent,
    ApproveComponent,
    MasterComponent,
    UserComponent,
    VPGLabComponent,
    StackedChartComponentComponent,
    LabwiseAllotedChartComponentComponent,
    FullscreenDirective,
    SSRCRD4LabComponent,
    FullscreenDirective,
    ProgramStackedChartComponentComponent,
    VendorStackedChartComponentComponent,
    ReportComponent,
    SearchPipe,
    SearchLab,
    SearchProgram,
    SearchVendor,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    /*  MatTableModule,
     MatSortModule, */
    NgbModule,

    OrderModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 15000, // 15 seconds
      progressBar: true,
    }),
  ],
  providers: [
    SummaryService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

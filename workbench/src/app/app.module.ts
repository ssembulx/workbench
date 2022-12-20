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
    StackedChartComponentComponent,
    LabwiseAllotedChartComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    /*  MatTableModule,
     MatSortModule, */
    NgbModule,

    OrderModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }

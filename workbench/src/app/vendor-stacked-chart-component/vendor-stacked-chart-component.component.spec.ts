import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorStackedChartComponentComponent } from './vendor-stacked-chart-component.component';

describe('VendorStackedChartComponentComponent', () => {
  let component: VendorStackedChartComponentComponent;
  let fixture: ComponentFixture<VendorStackedChartComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorStackedChartComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorStackedChartComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

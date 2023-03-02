import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabEfficiencyUtilizationComponent } from './lab-efficiency-utilization.component';

describe('LabEfficiencyUtilizationComponent', () => {
  let component: LabEfficiencyUtilizationComponent;
  let fixture: ComponentFixture<LabEfficiencyUtilizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabEfficiencyUtilizationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabEfficiencyUtilizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

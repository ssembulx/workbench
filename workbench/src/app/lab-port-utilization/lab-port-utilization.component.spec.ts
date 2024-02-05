import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabPortUtilizationComponent } from './lab-port-utilization.component';

describe('LabPortUtilizationComponent', () => {
  let component: LabPortUtilizationComponent;
  let fixture: ComponentFixture<LabPortUtilizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabPortUtilizationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabPortUtilizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

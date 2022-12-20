import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabwiseAllotedChartComponentComponent } from './labwise-alloted-chart-component.component';

describe('LabwiseAllotedChartComponentComponent', () => {
  let component: LabwiseAllotedChartComponentComponent;
  let fixture: ComponentFixture<LabwiseAllotedChartComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabwiseAllotedChartComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabwiseAllotedChartComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

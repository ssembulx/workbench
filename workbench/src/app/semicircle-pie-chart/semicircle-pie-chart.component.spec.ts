import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemicirclePieChartComponent } from './semicircle-pie-chart.component';

describe('SemicirclePieChartComponent', () => {
  let component: SemicirclePieChartComponent;
  let fixture: ComponentFixture<SemicirclePieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SemicirclePieChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SemicirclePieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

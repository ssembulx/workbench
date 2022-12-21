import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramStackedChartComponentComponent } from './program-stacked-chart-component.component';

describe('ProgramStackedChartComponentComponent', () => {
  let component: ProgramStackedChartComponentComponent;
  let fixture: ComponentFixture<ProgramStackedChartComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramStackedChartComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramStackedChartComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

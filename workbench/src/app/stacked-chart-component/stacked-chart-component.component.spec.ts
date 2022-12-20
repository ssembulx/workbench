import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StackedChartComponentComponent } from './stacked-chart-component.component';

describe('StackedChartComponentComponent', () => {
  let component: StackedChartComponentComponent;
  let fixture: ComponentFixture<StackedChartComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StackedChartComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StackedChartComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

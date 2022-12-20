import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SSRCRD4LabComponent } from './ssr-crd4-lab.component';

describe('SSRCRD4LabComponent', () => {
  let component: SSRCRD4LabComponent;
  let fixture: ComponentFixture<SSRCRD4LabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SSRCRD4LabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SSRCRD4LabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

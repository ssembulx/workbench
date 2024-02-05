import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoApprovalComponent } from './auto-approval.component';

describe('AutoApprovalComponent', () => {
  let component: AutoApprovalComponent;
  let fixture: ComponentFixture<AutoApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoApprovalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VPGLabComponent } from './vpg-lab.component';

describe('VPGLabComponent', () => {
  let component: VPGLabComponent;
  let fixture: ComponentFixture<VPGLabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VPGLabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VPGLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

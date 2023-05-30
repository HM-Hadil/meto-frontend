import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdvConfirmeeAComponent } from './rdv-confirmee-a.component';

describe('RdvConfirmeeAComponent', () => {
  let component: RdvConfirmeeAComponent;
  let fixture: ComponentFixture<RdvConfirmeeAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RdvConfirmeeAComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RdvConfirmeeAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

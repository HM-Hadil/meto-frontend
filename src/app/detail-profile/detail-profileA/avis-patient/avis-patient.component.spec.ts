import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisPatientComponent } from './avis-patient.component';

describe('AvisPatientComponent', () => {
  let component: AvisPatientComponent;
  let fixture: ComponentFixture<AvisPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvisPatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvisPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailRdvPatientComponent } from './detail-rdv-patient.component';

describe('DetailRdvPatientComponent', () => {
  let component: DetailRdvPatientComponent;
  let fixture: ComponentFixture<DetailRdvPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailRdvPatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailRdvPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

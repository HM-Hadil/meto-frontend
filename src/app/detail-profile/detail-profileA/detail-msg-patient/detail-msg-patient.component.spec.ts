import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMsgPatientComponent } from './detail-msg-patient.component';

describe('DetailMsgPatientComponent', () => {
  let component: DetailMsgPatientComponent;
  let fixture: ComponentFixture<DetailMsgPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailMsgPatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailMsgPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

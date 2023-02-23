import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComptesPatientsComponent } from './comptes-patients.component';

describe('ComptesPatientsComponent', () => {
  let component: ComptesPatientsComponent;
  let fixture: ComponentFixture<ComptesPatientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComptesPatientsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComptesPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComptesPatientsDetailComponent } from './comptes-patients-detail.component';

describe('ComptesPatientsDetailComponent', () => {
  let component: ComptesPatientsDetailComponent;
  let fixture: ComponentFixture<ComptesPatientsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComptesPatientsDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComptesPatientsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

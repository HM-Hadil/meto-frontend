import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdvAvecMedComponent } from './rdv-avec-med.component';

describe('RdvAvecMedComponent', () => {
  let component: RdvAvecMedComponent;
  let fixture: ComponentFixture<RdvAvecMedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RdvAvecMedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RdvAvecMedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

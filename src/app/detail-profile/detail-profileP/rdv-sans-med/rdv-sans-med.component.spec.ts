import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdvSansMedComponent } from './rdv-sans-med.component';

describe('RdvSansMedComponent', () => {
  let component: RdvSansMedComponent;
  let fixture: ComponentFixture<RdvSansMedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RdvSansMedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RdvSansMedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

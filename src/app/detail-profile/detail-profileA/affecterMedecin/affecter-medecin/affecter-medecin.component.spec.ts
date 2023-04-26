import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffecterMedecinComponent } from './affecter-medecin.component';

describe('AffecterMedecinComponent', () => {
  let component: AffecterMedecinComponent;
  let fixture: ComponentFixture<AffecterMedecinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffecterMedecinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffecterMedecinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

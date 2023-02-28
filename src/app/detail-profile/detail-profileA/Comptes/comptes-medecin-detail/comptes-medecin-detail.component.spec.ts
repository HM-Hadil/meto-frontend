import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComptesMedecinDetailComponent } from './comptes-medecin-detail.component';

describe('ComptesMedecinDetailComponent', () => {
  let component: ComptesMedecinDetailComponent;
  let fixture: ComponentFixture<ComptesMedecinDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComptesMedecinDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComptesMedecinDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

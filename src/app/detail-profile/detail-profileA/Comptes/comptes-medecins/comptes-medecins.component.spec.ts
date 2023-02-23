import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComptesMedecinsComponent } from './comptes-medecins.component';

describe('ComptesMedecinsComponent', () => {
  let component: ComptesMedecinsComponent;
  let fixture: ComponentFixture<ComptesMedecinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComptesMedecinsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComptesMedecinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

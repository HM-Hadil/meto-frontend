import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdvAvecMedecinComponent } from './rdv-avec-medecin.component';

describe('RdvAvecMedecinComponent', () => {
  let component: RdvAvecMedecinComponent;
  let fixture: ComponentFixture<RdvAvecMedecinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RdvAvecMedecinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RdvAvecMedecinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

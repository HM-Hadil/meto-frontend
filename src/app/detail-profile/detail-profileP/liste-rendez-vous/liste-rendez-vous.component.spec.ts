import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeRendezVousComponent } from './liste-rendez-vous.component';

describe('ListeRendezVousComponent', () => {
  let component: ListeRendezVousComponent;
  let fixture: ComponentFixture<ListeRendezVousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeRendezVousComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeRendezVousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

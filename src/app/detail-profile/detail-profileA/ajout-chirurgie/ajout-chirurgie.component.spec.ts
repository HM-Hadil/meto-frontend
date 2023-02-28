import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutChirurgieComponent } from './ajout-chirurgie.component';

describe('AjoutChirurgieComponent', () => {
  let component: AjoutChirurgieComponent;
  let fixture: ComponentFixture<AjoutChirurgieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutChirurgieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutChirurgieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

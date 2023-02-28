import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierChirurgieComponent } from './modifier-chirurgie.component';

describe('ModifierChirurgieComponent', () => {
  let component: ModifierChirurgieComponent;
  let fixture: ComponentFixture<ModifierChirurgieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierChirurgieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierChirurgieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

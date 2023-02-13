import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeChirurgieSelectionnerComponent } from './type-chirurgie-selectionner.component';

describe('TypeChirurgieSelectionnerComponent', () => {
  let component: TypeChirurgieSelectionnerComponent;
  let fixture: ComponentFixture<TypeChirurgieSelectionnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeChirurgieSelectionnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeChirurgieSelectionnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

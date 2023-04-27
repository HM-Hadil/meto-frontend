import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValiderFactureComponent } from './valider-facture.component';

describe('ValiderFactureComponent', () => {
  let component: ValiderFactureComponent;
  let fixture: ComponentFixture<ValiderFactureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValiderFactureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValiderFactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

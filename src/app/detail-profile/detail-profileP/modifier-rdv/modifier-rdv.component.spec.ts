import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierRdvComponent } from './modifier-rdv.component';

describe('ModifierRdvComponent', () => {
  let component: ModifierRdvComponent;
  let fixture: ComponentFixture<ModifierRdvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierRdvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierRdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

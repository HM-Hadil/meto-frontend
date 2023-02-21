import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametresMComponent } from './parametres-m.component';

describe('ParametresMComponent', () => {
  let component: ParametresMComponent;
  let fixture: ComponentFixture<ParametresMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParametresMComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParametresMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

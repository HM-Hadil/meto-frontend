import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccepterRdvComponent } from './accepter-rdv.component';

describe('AccepterRdvComponent', () => {
  let component: AccepterRdvComponent;
  let fixture: ComponentFixture<AccepterRdvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccepterRdvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccepterRdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

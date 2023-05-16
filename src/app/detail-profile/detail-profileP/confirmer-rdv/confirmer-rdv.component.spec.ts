import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmerRDVComponent } from './confirmer-rdv.component';

describe('ConfirmerRDVComponent', () => {
  let component: ConfirmerRDVComponent;
  let fixture: ComponentFixture<ConfirmerRDVComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmerRDVComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmerRDVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

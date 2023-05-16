import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdvConfirmeeComponent } from './rdv-confirmee.component';

describe('RdvConfirmeeComponent', () => {
  let component: RdvConfirmeeComponent;
  let fixture: ComponentFixture<RdvConfirmeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RdvConfirmeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RdvConfirmeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdvConfirmeComponent } from './rdv-confirme.component';

describe('RdvConfirmeComponent', () => {
  let component: RdvConfirmeComponent;
  let fixture: ComponentFixture<RdvConfirmeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RdvConfirmeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RdvConfirmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

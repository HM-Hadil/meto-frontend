import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherDetailMedcComponent } from './afficher-detail-medc.component';

describe('AfficherDetailMedcComponent', () => {
  let component: AfficherDetailMedcComponent;
  let fixture: ComponentFixture<AfficherDetailMedcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherDetailMedcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfficherDetailMedcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailParcoursMedcComponent } from './detail-parcours-medc.component';

describe('DetailParcoursMedcComponent', () => {
  let component: DetailParcoursMedcComponent;
  let fixture: ComponentFixture<DetailParcoursMedcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailParcoursMedcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailParcoursMedcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

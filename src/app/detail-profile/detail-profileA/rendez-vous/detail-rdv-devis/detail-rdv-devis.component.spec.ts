import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailRdvDevisComponent } from './detail-rdv-devis.component';

describe('DetailRdvDevisComponent', () => {
  let component: DetailRdvDevisComponent;
  let fixture: ComponentFixture<DetailRdvDevisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailRdvDevisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailRdvDevisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAccptedApntComponent } from './detail-accpted-apnt.component';

describe('DetailAccptedApntComponent', () => {
  let component: DetailAccptedApntComponent;
  let fixture: ComponentFixture<DetailAccptedApntComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailAccptedApntComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailAccptedApntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

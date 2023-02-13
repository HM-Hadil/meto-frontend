import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChirurgiesComponent } from './chirurgies.component';

describe('ChirurgiesComponent', () => {
  let component: ChirurgiesComponent;
  let fixture: ComponentFixture<ChirurgiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChirurgiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChirurgiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

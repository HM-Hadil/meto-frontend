import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChirurgieSelecionneeComponent } from './chirurgie-selecionnee.component';

describe('ChirurgieSelecionneeComponent', () => {
  let component: ChirurgieSelecionneeComponent;
  let fixture: ComponentFixture<ChirurgieSelecionneeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChirurgieSelecionneeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChirurgieSelecionneeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

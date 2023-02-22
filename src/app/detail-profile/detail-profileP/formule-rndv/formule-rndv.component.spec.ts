import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormuleRndvComponent } from './formule-rndv.component';

describe('FormuleRndvComponent', () => {
  let component: FormuleRndvComponent;
  let fixture: ComponentFixture<FormuleRndvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormuleRndvComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormuleRndvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

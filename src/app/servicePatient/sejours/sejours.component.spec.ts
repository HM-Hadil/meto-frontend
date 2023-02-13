import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SejoursComponent } from './sejours.component';

describe('SejoursComponent', () => {
  let component: SejoursComponent;
  let fixture: ComponentFixture<SejoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SejoursComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SejoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

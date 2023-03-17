import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateChirurgieComponent } from './update-chirurgie.component';

describe('UpdateChirurgieComponent', () => {
  let component: UpdateChirurgieComponent;
  let fixture: ComponentFixture<UpdateChirurgieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateChirurgieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateChirurgieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

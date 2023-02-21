import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProfileMComponent } from './show-profile-m.component';

describe('ShowProfileMComponent', () => {
  let component: ShowProfileMComponent;
  let fixture: ComponentFixture<ShowProfileMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowProfileMComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowProfileMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowProfilePComponent } from './show-profile-p.component';

describe('ShowProfilePComponent', () => {
  let component: ShowProfilePComponent;
  let fixture: ComponentFixture<ShowProfilePComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowProfilePComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowProfilePComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

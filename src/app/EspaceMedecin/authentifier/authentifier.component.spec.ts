import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthentifierComponent } from './authentifier.component';

describe('AuthentifierComponent', () => {
  let component: AuthentifierComponent;
  let fixture: ComponentFixture<AuthentifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthentifierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthentifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

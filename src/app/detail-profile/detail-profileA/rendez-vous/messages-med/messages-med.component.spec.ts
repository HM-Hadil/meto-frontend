import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesMedComponent } from './messages-med.component';

describe('MessagesMedComponent', () => {
  let component: MessagesMedComponent;
  let fixture: ComponentFixture<MessagesMedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessagesMedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessagesMedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

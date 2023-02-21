import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesMComponent } from './messages-m.component';

describe('MessagesMComponent', () => {
  let component: MessagesMComponent;
  let fixture: ComponentFixture<MessagesMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessagesMComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessagesMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

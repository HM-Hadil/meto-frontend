import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesfromAdminComponent } from './messagesfrom-admin.component';

describe('MessagesfromAdminComponent', () => {
  let component: MessagesfromAdminComponent;
  let fixture: ComponentFixture<MessagesfromAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessagesfromAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessagesfromAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMedecinComponent } from './list-medecin.component';

describe('ListMedecinComponent', () => {
  let component: ListMedecinComponent;
  let fixture: ComponentFixture<ListMedecinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListMedecinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListMedecinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

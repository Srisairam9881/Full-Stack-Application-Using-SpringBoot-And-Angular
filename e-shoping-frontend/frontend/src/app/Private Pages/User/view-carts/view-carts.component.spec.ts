import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCartsComponent } from './view-carts.component';

describe('ViewCartsComponent', () => {
  let component: ViewCartsComponent;
  let fixture: ComponentFixture<ViewCartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCartsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

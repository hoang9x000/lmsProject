import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Showproducts1Component } from './showproducts1.component';

describe('Showproducts1Component', () => {
  let component: Showproducts1Component;
  let fixture: ComponentFixture<Showproducts1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Showproducts1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Showproducts1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

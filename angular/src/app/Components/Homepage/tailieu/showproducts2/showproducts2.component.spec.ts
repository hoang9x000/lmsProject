import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Showproducts2Component } from './showproducts2.component';

describe('Showproducts2Component', () => {
  let component: Showproducts2Component;
  let fixture: ComponentFixture<Showproducts2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Showproducts2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Showproducts2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

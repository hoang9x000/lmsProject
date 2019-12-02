import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiahanComponent } from './giahan.component';

describe('GiahanComponent', () => {
  let component: GiahanComponent;
  let fixture: ComponentFixture<GiahanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiahanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiahanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

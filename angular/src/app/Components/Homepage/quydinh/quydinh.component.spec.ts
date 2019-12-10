import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuydinhComponent } from './quydinh.component';

describe('QuydinhComponent', () => {
  let component: QuydinhComponent;
  let fixture: ComponentFixture<QuydinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuydinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuydinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

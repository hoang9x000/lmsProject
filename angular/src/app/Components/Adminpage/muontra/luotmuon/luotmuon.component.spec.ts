import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LuotmuonComponent } from './luotmuon.component';

describe('LuotmuonComponent', () => {
  let component: LuotmuonComponent;
  let fixture: ComponentFixture<LuotmuonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LuotmuonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LuotmuonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

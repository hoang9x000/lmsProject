import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserdattruocComponent } from './userdattruoc.component';

describe('UserdattruocComponent', () => {
  let component: UserdattruocComponent;
  let fixture: ComponentFixture<UserdattruocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserdattruocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserdattruocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

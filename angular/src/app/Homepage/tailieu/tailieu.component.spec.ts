import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TailieuComponent } from './tailieu.component';

describe('TailieuComponent', () => {
  let component: TailieuComponent;
  let fixture: ComponentFixture<TailieuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TailieuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TailieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

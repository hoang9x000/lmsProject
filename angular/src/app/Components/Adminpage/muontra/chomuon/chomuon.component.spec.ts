import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChomuonComponent } from './chomuon.component';

describe('ChomuonComponent', () => {
  let component: ChomuonComponent;
  let fixture: ComponentFixture<ChomuonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChomuonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChomuonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

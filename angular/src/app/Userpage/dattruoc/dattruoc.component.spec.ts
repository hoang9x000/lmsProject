import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DattruocComponent } from './dattruoc.component';

describe('DattruocComponent', () => {
  let component: DattruocComponent;
  let fixture: ComponentFixture<DattruocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DattruocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DattruocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

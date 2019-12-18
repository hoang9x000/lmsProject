import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditsachComponent } from './editsach.component';

describe('EditsachComponent', () => {
  let component: EditsachComponent;
  let fixture: ComponentFixture<EditsachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditsachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditsachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

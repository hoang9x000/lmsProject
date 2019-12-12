import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MuontraComponent } from './muontra.component';

describe('MuontraComponent', () => {
  let component: MuontraComponent;
  let fixture: ComponentFixture<MuontraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MuontraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MuontraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

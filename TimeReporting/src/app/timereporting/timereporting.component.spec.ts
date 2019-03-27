import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimereportingComponent } from './timereporting.component';

describe('TimereportingComponent', () => {
  let component: TimereportingComponent;
  let fixture: ComponentFixture<TimereportingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimereportingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimereportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

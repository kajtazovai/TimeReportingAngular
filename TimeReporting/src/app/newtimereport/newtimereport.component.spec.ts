import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewtimereportComponent } from './newtimereport.component';

describe('NewtimereportComponent', () => {
  let component: NewtimereportComponent;
  let fixture: ComponentFixture<NewtimereportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewtimereportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewtimereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

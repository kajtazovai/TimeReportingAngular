import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTimereportComponent } from './edit-timereport.component';

describe('EditTimereportComponent', () => {
  let component: EditTimereportComponent;
  let fixture: ComponentFixture<EditTimereportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTimereportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTimereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

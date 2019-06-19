import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedialogtimereportComponent } from './deletedialogtimereport.component';

describe('DeletedialogtimereportComponent', () => {
  let component: DeletedialogtimereportComponent;
  let fixture: ComponentFixture<DeletedialogtimereportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletedialogtimereportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletedialogtimereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

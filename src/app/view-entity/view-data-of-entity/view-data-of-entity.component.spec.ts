import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDataOfEntityComponent } from './view-data-of-entity.component';

describe('ViewDataOfEntityComponent', () => {
  let component: ViewDataOfEntityComponent;
  let fixture: ComponentFixture<ViewDataOfEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDataOfEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDataOfEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

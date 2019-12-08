import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSingleEntityComponent } from './view-single-entity.component';

describe('ViewSingleEntityComponent', () => {
  let component: ViewSingleEntityComponent;
  let fixture: ComponentFixture<ViewSingleEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSingleEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSingleEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

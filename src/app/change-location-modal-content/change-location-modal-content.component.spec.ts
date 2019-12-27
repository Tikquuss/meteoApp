import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeLocationModalContentComponent } from './change-location-modal-content.component';

describe('ChangeLocationModalContentComponent', () => {
  let component: ChangeLocationModalContentComponent;
  let fixture: ComponentFixture<ChangeLocationModalContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeLocationModalContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeLocationModalContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

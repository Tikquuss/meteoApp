import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeLocationModalComponent } from './change-location-modal.component';

describe('ChangeLocationModalComponent', () => {
  let component: ChangeLocationModalComponent;
  let fixture: ComponentFixture<ChangeLocationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeLocationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeLocationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

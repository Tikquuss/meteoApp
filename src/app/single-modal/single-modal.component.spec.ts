import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleModalComponent } from './single-modal.component';

describe('SingleModalComponent', () => {
  let component: SingleModalComponent;
  let fixture: ComponentFixture<SingleModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestbdComponent } from './testbd.component';

describe('TestbdComponent', () => {
  let component: TestbdComponent;
  let fixture: ComponentFixture<TestbdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestbdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestbdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

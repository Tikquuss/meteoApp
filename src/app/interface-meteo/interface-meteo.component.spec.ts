import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterfaceMeteoComponent } from './interface-meteo.component';

describe('InterfaceMeteoComponent', () => {
  let component: InterfaceMeteoComponent;
  let fixture: ComponentFixture<InterfaceMeteoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterfaceMeteoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterfaceMeteoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestOpenWeatherServiceComponent } from './test-open-weather-service.component';

describe('TestOpenWeatherServiceComponent', () => {
  let component: TestOpenWeatherServiceComponent;
  let fixture: ComponentFixture<TestOpenWeatherServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestOpenWeatherServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestOpenWeatherServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

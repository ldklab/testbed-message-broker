import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicesConnectedComponent } from './devices-connected.component';

describe('DevicesConnectedComponent', () => {
  let component: DevicesConnectedComponent;
  let fixture: ComponentFixture<DevicesConnectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevicesConnectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevicesConnectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

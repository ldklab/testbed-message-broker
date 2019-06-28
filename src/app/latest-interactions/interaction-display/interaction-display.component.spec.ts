import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractionDisplayComponent } from './interaction-display.component';

describe('InteractionDisplayComponent', () => {
  let component: InteractionDisplayComponent;
  let fixture: ComponentFixture<InteractionDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InteractionDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InteractionDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

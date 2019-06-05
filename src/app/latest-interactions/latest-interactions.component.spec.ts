import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestInteractionsComponent } from './latest-interactions.component';

describe('LatestInteractionsComponent', () => {
  let component: LatestInteractionsComponent;
  let fixture: ComponentFixture<LatestInteractionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatestInteractionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestInteractionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

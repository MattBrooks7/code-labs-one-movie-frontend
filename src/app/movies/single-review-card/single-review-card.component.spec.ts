import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleReviewCardComponent } from './single-review-card.component';

describe('SingleReviewCardComponent', () => {
  let component: SingleReviewCardComponent;
  let fixture: ComponentFixture<SingleReviewCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleReviewCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleReviewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

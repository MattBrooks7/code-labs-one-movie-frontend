import { Review } from './../../shared/models/review';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-review-card',
  templateUrl: './single-review-card.component.html',
  styleUrls: ['./single-review-card.component.scss']
})
export class SingleReviewCardComponent implements OnInit {
  @Input() review: Review
  constructor() { }

  ngOnInit(): void {
  }

}

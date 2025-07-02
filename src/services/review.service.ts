import { Injectable } from '@angular/core';
import { Review } from '../models/review.model';

@Injectable({ providedIn: 'root' })
export class ReviewService {
  private reviews: Review[] = [];

  constructor() {
    const data = localStorage.getItem('reviews');
    if (data) this.reviews = JSON.parse(data);
  }

  private save() {
    localStorage.setItem('reviews', JSON.stringify(this.reviews));
  }

  getReviewsForMovie(movieId: number): Review[] {
    return this.reviews.filter(r => r.movieId === movieId);
  }

  hasReviewed(movieId: number, userId: number): boolean {
    return this.reviews.some(r => r.movieId === movieId && r.userId === userId);
  }

  addReview(review: Review) {
    this.reviews.push(review);
    this.save();
  }
}

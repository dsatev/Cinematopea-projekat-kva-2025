import { Injectable } from "@angular/core";
import { Review } from "../models/review.model";

@Injectable({
    providedIn: 'root'
})

export class ReviewService {
    private reviews: Review[] = []

    addReview(review: Review): void {
        review.reviewId = Date.now()
        this.reviews.push(review)
    }

    getReviewsForMovie(movieId: number): Review[] {
        return this.reviews.filter(r => r.movieId === movieId)
    }

    getReviewsByUser(userId: number): Review[] {
        return this.reviews.filter(r => r.userId === userId)
    }
}
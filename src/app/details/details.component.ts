import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Movie } from '../../models/movie.model';
import { UtilsService } from '../../services/utils.service';
import { MovieService } from '../../services/movie.service';
import { Review } from '../../models/review.model';
import { ReviewService } from '../../services/review.service';
import { UserService } from '../../services/user.service';
import { ReservationService } from '../../services/reservation.service';
import { Projection } from '../../models/projection.model';
import { ProjectionService } from '../../services/projection.service';
import { MatTooltipModule } from '@angular/material/tooltip'

@Component({
  selector: 'app-details',
  imports: [NgIf, NgFor, MatCardModule, MatListModule,  MatButtonModule, MatTooltipModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  public movie: Movie | null = null
  public reviews: Review[] = []
  public projections: Projection[] = []
  public comment = ''
  public rating = 0
  public canReview = false

  public constructor(private route: ActivatedRoute, public utils: UtilsService, 
                      public reviewService: ReviewService, public userService: UserService, 
                      public reservationService: ReservationService, public projectionService: ProjectionService){
    route.params.subscribe(params => {
      MovieService.getMovieById(params['movieId'])
       .then(rsp => {
          this.movie = rsp.data


          if(!this.movie) return
          this.projections = this.projectionService.getProjectionByMovieId(this.movie.movieId)
            console.log('Movie ID:', this.movie?.movieId);
            console.log('Projekcije:', this.projections);
          const user = this.userService.getCurrentUser();
          if (!user) return;
          this.canReview = this.reservationService.hasWatched(this.movie.movieId, user.id);
          this.reviews = this.reviewService.getReviewsForMovie(this.movie.movieId);
          
       })
    })
  }


  setRating(r: number) {
    this.rating = r;
  }

  
  reserve(projectionId: number): void {
    const user = this.userService.getCurrentUser();
    if (!user) {
      alert('Morate biti prijavljeni da biste rezervisali.');
      return;
    }

    this.reservationService.addReservation({
      reservationId: 0,
      userId: user.id,
      projectionId,
      status: 'reserved'
    });

    alert('Uspešno rezervisano!');
  }
}


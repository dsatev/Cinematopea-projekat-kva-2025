import { CommonModule, NgFor, NgIf } from '@angular/common';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-details',
  imports: [NgIf, NgFor, CommonModule, MatCardModule, MatListModule,  MatButtonModule, MatTooltipModule, FormsModule,  MatIconModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  public movie: Movie | null = null
  public reviews: Review[] = []
  public projections: Projection[] = []
  public averageRating: number = 0
  public roundedRating: number = 0
  

  public constructor(private route: ActivatedRoute, public utils: UtilsService, 
                      public reviewService: ReviewService, public userService: UserService, 
                      public reservationService: ReservationService, public projectionService: ProjectionService){
    route.params.subscribe(params => {
      MovieService.getMovieById(params['movieId'])
       .then(rsp => {
          this.movie = rsp.data


          if(!this.movie) return
          this.projections = this.projectionService.getProjectionByMovieId(this.movie.movieId)
          this.reviews = this.reviewService.getReviewsForMovie(this.movie.movieId)

          const users = this.userService.getAllUsers()
          this.reviews.forEach(r => {
            const user = users.find(u => u.id === r.userId)
            r.userName = user ? `${user.firstName} ${user.lastName}` : 'Nepoznat korisnik'
          })

          if(this.reviews.length > 0) {
           const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
           this.averageRating = +(totalRating / this.reviews.length).toFixed(1);
           this.roundedRating = Math.round(this.averageRating);
          }
       })
    })
    
  }



  
  reserve(projectionId: number): void {
    const user = this.userService.getCurrentUser()
    if (!user) {
      alert('Morate biti prijavljeni da biste rezervisali.')
      return;
    }

    this.reservationService.addReservation({
      reservationId: 0,
      userId: user.id,
      projectionId,
      status: 'reserved'
    });

    alert('Uspešno rezervisano!')
  }
}


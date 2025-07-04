import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { ProjectionService } from '../../services/projection.service';
import { MovieService } from '../../services/movie.service';
import { UserService } from '../../services/user.service';
import { Reservation } from '../../models/reservation.model';
import { Projection } from '../../models/projection.model';
import { Movie } from '../../models/movie.model';
import { CommonModule } from '@angular/common';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  imports: [CommonModule, ],
  styleUrl: './cart.component.css'
})
export class CartComponent  {
  reservations: Reservation[] = []
  projections: Projection[] = []
  movies: Movie[] = []
  total: number = 0

  constructor(
    private reservationService: ReservationService,
    private projectionService: ProjectionService,
    private userService: UserService,
    public utils: UtilsService
  ) {const user = this.userService.getCurrentUser()
    if (!user) return

    this.reservations = this.reservationService.getUserReservations(user.id)
    this.projections = this.projectionService.getAllProjections()
    MovieService.getMovies().then(rsp => {
      this.movies = rsp.data;
      this.calculateTotal();
    })}


  getProjection(projId: number): Projection | undefined {
    return this.projections.find(p => p.projectionId === projId)
  }

  getMovie(projId: number): Movie | undefined {
    const proj = this.getProjection(projId)
    return this.movies.find(m => m.movieId === proj?.movieId)
  }

  calculateTotal(): void {
    this.total = this.reservations
      .filter(r => r.status === 'reserved')
      .map(r => this.getProjection(r.projectionId)?.price || 0)
      .reduce((acc, cur) => acc + cur, 0)
  }

  cancel(reservationId: number) {
    this.reservationService.updateStatus(reservationId, 'cancled')
    window.location.reload()
  }

  markAsWatched(reservationId: number) {
    this.reservationService.updateStatus(reservationId, 'watched')
    window.location.reload()
  }
}

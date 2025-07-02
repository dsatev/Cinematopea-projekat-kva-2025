import { CommonModule, NgFor, NgForOf, NgIf } from '@angular/common'
import { Component, Injectable, OnInit } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatToolbarModule } from '@angular/material/toolbar'
import { RouterLink, RouterOutlet, Router} from '@angular/router'
import { UserService } from '../services/user.service'
import { MovieService } from '../services/movie.service'
import { ReservationService } from '../services/reservation.service'
import { Projection } from '../models/projection.model'
import { ProjectionService } from '../services/projection.service'
import { Reservation } from '../models/reservation.model'
import { Movie } from '../models/movie.model'
import { MatDividerModule } from '@angular/material/divider'
import { MatMenuModule } from '@angular/material/menu'
import { MatIconModule } from '@angular/material/icon'
import { ReviewService } from '../services/review.service'
import { ReviewComponent } from './review/review.component'
import { MatDialogModule, MatDialog } from '@angular/material/dialog'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, MatToolbarModule, MatButtonModule, CommonModule, MatMenuModule, MatDividerModule, MatIconModule, MatDialogModule, FormsModule, NgForOf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent {
  reservations: Reservation[] = [];
  projections: Projection[] = [];
  movies: Movie[] = [];
  total: number = 0;

  public constructor(private router: Router, public userService: UserService,
                    public movieService: MovieService, public reservationService: ReservationService,
                    public projectionService: ProjectionService, public reviewService: ReviewService,
                    private dialog: MatDialog)
  {
    const user = this.userService.getCurrentUser()
    console.log('Ulogovani korisnik:', user);
   
    this.projections = this.projectionService.getAllProjections()
    MovieService.getMovies(0, 5).then(res => {
      this.movies = res.data
      this.calculateTotal()
    })
    if (!user) return
     this.reservations = this.reservationService.getUserReservations(user.id)
  }
  

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
      .reduce((a, b) => a + b, 0)
  }

  cancel(resId: number) {
    const confirmation = confirm('Da li ste sigurni da želite da otkažete ovu rezervaciju?')

    if(confirmation)
      this.reservationService.deleteReservation(resId)
  }


  markAsWatched(resId: number) {
    const res = this.reservations.find(r => r.reservationId === resId)
    if (!res) return

    this.reservationService.updateStatus(resId, 'watched')


    const movie = this.getMovie(res.projectionId)
    const user = this.userService.getCurrentUser()
    if (!user || !movie) return

    const dialogRef = this.dialog.open(ReviewComponent, {
      data: { movieTitle: movie.title }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.reservationService.deleteReservation(resId);

      if (result) {
        this.reviewService.addReview({
          movieId: movie.movieId,
          userId: user.id,
          rating: result.rating,
          comment: result.comment,
          timestamp: new Date().toISOString()
        });
        alert('Hvala na recenziji!')
      }
  });
}


  logout(){
    this.userService.logout()
    this.router.navigate(['/login'])
  }
}

import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation.model';
import { Projection } from '../models/projection.model';


@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private reservations: Reservation[] = []
  private projections: Projection[] = []

  constructor() {
    const r = localStorage.getItem('reservations')
    const p = localStorage.getItem('projections')
    if (r) this.reservations = JSON.parse(r)
    if (p) this.projections = JSON.parse(p)
  }

  private save() {
    localStorage.setItem('reservations', JSON.stringify(this.reservations))
  }

  addReservation(reservation: Reservation) {
    reservation.reservationId = Date.now()
    this.reservations.push(reservation)
    this.save()
  }
  deleteReservation(reservationId: number): void {
    this.reservations = this.reservations.filter(r => r.reservationId !== reservationId)
    this.save()
    }

  getUserReservations(userId: number): Reservation[] {
    return this.reservations.filter(r => r.userId === userId)
  }

  getProjectionById(projectionId: number): Projection | undefined {
    return this.projections.find(p => p.projectionId === projectionId)
  }

  getProjectionsForMovie(movieId: number): Projection[] {
    return this.projections.filter(p => p.movieId === movieId)
  }

  hasWatched(movieId: number, userId: number): boolean {
    return this.reservations.some(res =>
      res.userId === userId &&
      res.status === 'watched' &&
      this.getProjectionById(res.projectionId)?.movieId === movieId
    );
  }

  updateStatus(reservationId: number, status: 'watched' | 'cancled') {
    const res = this.reservations.find(r => r.reservationId === reservationId);
    if (res) {
        res.status = status;
        this.save();
    }
  }
}

export interface Reservation {
  reservationId: number
  userId: number
  projectionId: number
  status: 'reserved' | 'watched' | 'cancled'
}
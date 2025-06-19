import { Movie, Screening } from "./movie.model"

export interface Reservation{
    id: number
    userId: number
    screeningId: number[]
    total: number
    movies: Movie[]
    screenings: Screening[]
}
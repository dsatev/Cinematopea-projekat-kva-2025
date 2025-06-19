import { Review } from "./review.model"

export  interface Movie {
    movieId: number
    interanlId: string
    corporateId: string
    directorId: number
    title: string
    originalTitle: string
    description: string
    shortDescription: string
    poster: string
    startDate: string
    runTime: number
    createdAt: string
    updatedAt: null | string 
    director: Director
    movieActors: MovieActor[]
    movieGenres: MovieGenre[]
}
export interface Director{
        directorId: number
        name: string
        createdAt: string
    }
export interface MovieActor{
    movieActorId: number
    movieId: number
    actorId: number
    actor: Actor
}

export interface Actor {
    actorId: number
    name: string
    createdAt: string
}

export interface MovieGenre{
    movieGenreId: number
    movieId: number
    genreId: number
    genre: Genre
}

export interface Genre {
    genreId: number
    name: string
    createdAt: string
}

export interface Screening {
    id: number
    movieId: number
    date: string
    time: string
    hall: string
    availableSeats: number
    price: number
}
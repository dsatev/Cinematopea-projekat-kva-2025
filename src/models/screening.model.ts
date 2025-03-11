export interface Screening {
    id: number
    movieId: number
    dateTime: string
    price: number
    status: 'reserved' | 'watched' | 'cancled'
}
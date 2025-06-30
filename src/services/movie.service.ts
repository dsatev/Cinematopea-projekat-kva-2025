import axios from 'axios'
import { Screening } from '../models/movie.model'
import { Review } from '../models/review.model'
import { Injectable } from '@angular/core'

const client = axios.create ({
    baseURL: "https://movie.pequla.com/api",
    headers: {
        'Accept': 'application/json',
    },

    validateStatus: (status: number) => {
        return status === 200
    }
})

@Injectable({
    providedIn: 'root'
})


export class MovieService {
    private screenings: Screening[] = []
    private reviews : Review[] = []


    static async getMovies(page: number = 0, size: number = 10){
        return client.request({
            url: '/movie',
            method: 'GET',
            params: {
                'page' : page,
                'size' : size,
                'sort' : 'startDate, asc'
            }
        })
    }

    static async getMovieById(id: number) {
        return client.get(`/movie/${id}`)
    }
    
    static async getGenres(page: number = 0, size: number = 10){
        return client.request({
            url:'/genre',
            method: 'GET',
            params:{
                page: 'page',
                size: 'size'
            }
        })
    }

    static async getActors(page: number = 0, size: number = 10){
        return client.request({
            url: '/actor',
            method:'GET',
            params:{
                page: 'page',
                size: 'size'
            }
        })
    }

    static async getDirectos(page: number = 0, size: number = 10){
        return client.request({
            url: '/director',
            method: 'GET',
            params: {
                page: 'page',
                size: 'size'
            }
        })
    }

    
}
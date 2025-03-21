import axios from 'axios'

const client = axios.create ({
    baseURL: "https://movie.pequla.com/api",
    headers: {
        'Accept': 'application/json',
    },

    validateStatus: (status: number) => {
        return status === 200
    }
})


export class MovieService {
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
}
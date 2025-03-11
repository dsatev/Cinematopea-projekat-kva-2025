import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Movie, Genre } from '../../models/movie.model'
import { UtilsService } from '../../services/utils.service';
import { MovieService } from '../../services/movie.service';
import { AxiosError } from 'axios';
import { RouterLink } from '@angular/router';




@Component({
  selector: 'app-movies',
  imports: [NgIf, NgFor, MatButtonModule, MatCardModule],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent {
  public movies: Movie[] | null = null
  public movieGenres: Genre[] | null = null
  public error: string | null = null


  constructor(public utils: UtilsService){
    MovieService.getMovies(0, 10)
     .then(rsp => this.movies = rsp.data)
     .catch((e: AxiosError) => this.error = `${e.code}: ${e.message}`)

    MovieService.getGenres(0, 5)
    .then(rsp => this.movieGenres = rsp.data)
    .catch((e: AxiosError) => this.error = `${e.code}: ${e.message}`)

    console.log('Movies:', this.movies)
  }


}

import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Movie } from '../../models/movie.model'
import { UtilsService } from '../../services/utils.service';
import { MovieService } from '../../services/movie.service';
import { AxiosError } from 'axios';
import { RouterLink } from '@angular/router';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from '../search/search.component';



@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [NgFor, MatButtonModule, MatCardModule, MatAutocompleteModule, ReactiveFormsModule, RouterLink, SearchComponent, CommonModule],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent {
  public movies: Movie[] = []
  public filteredMovies: Movie[] = []
  public error: string | null = null



  constructor(public utils: UtilsService){
    MovieService.getMovies(0, 10)
     .then(rsp => {this.movies = rsp.data
          this.filteredMovies = rsp.data})
     .catch((e: AxiosError) => this.error = `${e.code}: ${e.message}`)
  }

  
onSearch(term: string) {
  if (!term) {
    this.filteredMovies = this.movies;
    return;
  }

  this.filteredMovies = this.movies.filter(movie =>
    movie.title?.toLowerCase().includes(term) ||
    movie.description?.toLowerCase().includes(term) ||
    movie.director.name?.toLowerCase().includes(term) ||
    movie.movieGenres?.some(g => g.genre.name.toLowerCase().includes(term)) ||
    movie.movieActors?.some(a => a.actor.name.toLowerCase().includes(term)) ||
    movie.startDate?.toLowerCase().includes(term)
  );
}


}

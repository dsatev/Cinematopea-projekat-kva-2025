import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Movie } from '../../models/movie.model';
import { UtilsService } from '../../services/utils.service';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-details',
  imports: [NgIf, NgFor, MatCardModule, MatListModule, RouterLink, MatButtonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  public movie: Movie | null = null

  public constructor(private route: ActivatedRoute, public utils: UtilsService){
    route.params.subscribe(params => {
      MovieService.getMovieById(params['movieId'])
       .then(rsp => {
          this.movie = rsp.data
       })
    })

    console.log('Movie:', this.movie)
  }
}

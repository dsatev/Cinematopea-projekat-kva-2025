import { NgFor, NgIf } from '@angular/common';
import { AfterViewInit, Component, ViewChild, ElementRef} from '@angular/core';
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { UtilsService } from '../../services/utils.service';
import { Movie } from '../../models/movie.model'
import { MovieService } from '../../services/movie.service';
import { AxiosError } from 'axios';
import { RouterLink } from '@angular/router';




@Component({
  selector: 'app-home',
  imports: [NgIf, NgFor, MatButtonModule, MatCardModule, MatIconModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {
  public movies: Movie[] | null = null
  public error: string | null = null
  @ViewChild('scrollable') scrollable!: ElementRef


  constructor(public utils: UtilsService){
    MovieService.getMovies(0, 5)
      .then(rsp => this.movies = rsp.data)
      .catch((e: AxiosError) => this.error = `${e.code}: ${e.message}`)
  }

  ngAfterViewInit() {
    this.smoothScroll(0)
  }

  scrollLeft(){
    this.smoothScroll(-300)
  }

  scrollRight(){
    this.smoothScroll(300)
  }

  smoothScroll(amount: number){
    this.scrollable.nativeElement.scrollBy({left: amount, behavior: 'smooth'})
  }
}


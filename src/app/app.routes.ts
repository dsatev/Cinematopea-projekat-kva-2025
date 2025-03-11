import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MoviesComponent } from './movies/movies.component';
import { DetailsComponent } from './details/details.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'movies', component: MoviesComponent},
    { path: 'details/:movieId', component: DetailsComponent},
    { path: '**', redirectTo: '' }
];

import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MoviesComponent } from './movies/movies.component';
import { DetailsComponent } from './details/details.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';
import { AllProjectionsComponent } from './all-projections/all-projections.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'movies', component: MoviesComponent},
    { path: 'details/:movieId', component: DetailsComponent},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'cart', component: CartComponent},
    { path: 'profile', component: ProfileComponent},
    { path: '**', redirectTo: '' }
];

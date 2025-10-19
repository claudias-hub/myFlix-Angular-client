// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { WelcomePage } from './welcome-page/welcome-page';
import { MovieCard } from './movie-card/movie-card';
import { Profile } from './profile/profile';

export const appRoutes: Routes = [
    { path: 'welcome', component: WelcomePage },
    { path: 'movies', component: MovieCard },
    { path: 'profile', component: Profile },
    { path: '', redirectTo: 'welcome', pathMatch: 'full' }
];

// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { WelcomePage } from './welcome-page/welcome-page';
import { MovieCard } from './movie-card/movie-card';
import { Profile } from './profile/profile';
import { authGuard } from './auth.guard';

export const appRoutes: Routes = [
    { path: 'welcome', component: WelcomePage },
    { path: 'movies', component: MovieCard, canActivate: [authGuard] },
    { path: 'profile', component: Profile, canActivate: [authGuard] },
    { path: '', redirectTo: 'welcome', pathMatch: 'full' }
];

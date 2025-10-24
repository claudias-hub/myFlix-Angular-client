// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { WelcomePage } from './welcome-page/welcome-page';
import { MovieCard } from './movie-card/movie-card';
import { Profile } from './profile/profile';
import { authGuard } from './auth.guard';

export const appRoutes: Routes = [
    { path: 'myFlix-Angular-client/welcome', component: WelcomePage },
    { path: 'myFlix-Angular-client/movies', component: MovieCard, canActivate: [authGuard] },
    { path: 'myFlix-Angular-client/profile', component: Profile, canActivate: [authGuard] },
    { path: '', redirectTo: 'myFlix-Angular-client/welcome', pathMatch: 'full' }, // for root
    { path: '**', redirectTo: 'myFlix-Angular-client/welcome' }                 // catch-all
];

//src/app/movie-card/movie-card.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FetchApiData } from '../fetch-api-data';
import { GenreDialog } from '../dialogs/genre-dialog/genre-dialog';
import { DirectorDialog } from '../dialogs/director-dialog/director-dialog';
import { SynopsisDialog } from '../dialogs/synopsis-dialog/synopsis-dialog';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
    
@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatButtonModule, 
    MatIconModule, 
    MatDialogModule,
    GenreDialog, 
    DirectorDialog, 
    SynopsisDialog,
    MatSnackBarModule,
    RouterLink,
    MatToolbarModule
  ],
  templateUrl: './movie-card.html',
  styleUrls: ['./movie-card.scss']
})

export class MovieCard implements OnInit {
  movies: any[] = [];
  favoriteIds = new Set<string>();
  username = '';

  constructor(
    public fetchApiData: FetchApiData, 
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadUserFavorites();
    this.getMovies();
  }

  private loadUserFavorites(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.username = user?.username || user?.Username || '';
    const favs: string[] = user?.favoriteMovies || user?.FavoriteMovies || [];
    this.favoriteIds = new Set(favs?.map(String));
  }

  private persistUserFavorites(newFavs: string[]): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    user.favoriteMovies = newFavs;
    localStorage.setItem('user', JSON.stringify(user));
    this.favoriteIds = new Set(newFavs.map(String));
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe({
      next: (resp: any) => { this.movies = resp || []; },
      error: (err) => {
        console.error('Failed to load movies:', err);
      }
    });
  }

  // UI helpers
  isFavorited(movieId: string): boolean {
    return this.favoriteIds.has(String(movieId));
  }

  toggleFavorite(movie: any): void {
    const id = String(movie?._id);
    if (!this.username || !id) {
      this.snackBar.open('Please log in', 'OK', { duration: 1500 });
      return;
    }
    if (this.isFavorited(id)) {
      this.removeFavorite(id);
    } else {
      this.addFavorite(id);
    }
  }

  private addFavorite(movieId: string): void {
    this.fetchApiData.addFavoriteMovie(this.username, movieId).subscribe({
      next: (updatedUser: any) => {
        const favs = updatedUser?.favoriteMovies || updatedUser?.FavoriteMovies || [];
        this.persistUserFavorites(favs);
        this.snackBar.open('Added to favorites', 'OK', { duration: 1200 });
      },
      error: () => this.snackBar.open('Could not add to favorites', 'OK', { duration: 1800 })
    });
  }

  private removeFavorite(movieId: string): void {
    this.fetchApiData.removeFavoriteMovie(this.username, movieId).subscribe({
      next: (updatedUser: any) => {
        const favs = updatedUser?.favoriteMovies || updatedUser?.FavoriteMovies || [];
        this.persistUserFavorites(favs);
        this.snackBar.open('Removed from favorites', 'OK', { duration: 1200 });
      },
      error: () => this.snackBar.open('Could not remove favorite', 'OK', { duration: 1800 })
    });
  }

  

  // Dialogs
  openGenre(movie: any)   { 
    this.dialog.open(GenreDialog, {
    width: '420px',
    maxWidth: '90vw',
    maxHeight: '80vh',
    autoFocus: false,
    panelClass: 'myflix-dialog',
    data: { 
      name: movie?.genre?.name,
      description: movie?.genre?.description
    }
   });
  }

  openDirector(movie: any){ 
    this.dialog.open(DirectorDialog, {
      width: '420px',
      maxWidth: '90vw',
      maxHeight: '80vh',
      autoFocus: false,
      panelClass: 'myflix-dialog',
      data: { 
        name: movie?.director?.name,
        bio: movie?.director?.bio,
        birthYear: movie?.director?.birthYear,
        deathYear: movie?.director?.deathYear
      }
    });
  }

  openSynopsis(movie: any){ 
    this.dialog.open(SynopsisDialog, {
      width: '420px',
      maxWidth: '90vw',
      maxHeight: '80vh',
      autoFocus: false,
      panelClass: 'myflix-dialog',
      data: { 
        title: movie?.title,
        description: movie?.description
      }
    });
  }

  logout(): void {
    localStorage.clear();
    window.location.href = '/welcome';
  }
}

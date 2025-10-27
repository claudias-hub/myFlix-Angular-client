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
import { Router, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
    
/**
 * Movies page that lists all movies and lets the user view details
 * (genre, director, synopsis) and toggle favorites.
 */
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
  /** Full list of movies for display. */
  movies: any[] = [];

  /** Set of favorited movie IDs for quick checks. */
  favoriteIds = new Set<string>();

  /** Username of the currently logged in user (from localStorage). */
  username = '';

  /**
   * @param fetchApiData API service for movie/user endpoints.
   * @param dialog Material dialog service for info dialogs.
   * @param snackBar Snackbar for user feedback.
   * @param router Router for auth redirects and logout.
   */
  constructor(
    public fetchApiData: FetchApiData, 
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  /**
   * Initialize the page:
   * - Redirect to welcome if unauthenticated
   * - Load favorites and fetch movies
   */
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.snackBar.open('Please log in first', 'OK', { duration: 2000 });
      this.router.navigate(['/myFlix-Angular-client/welcome']);
      return;
    }
    this.loadUserFavorites();
    this.getMovies();
  }

  /**
   * Load username and favorite IDs from localStorage.
   */
  private loadUserFavorites(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.username = user?.username || user?.Username || '';
    const favs: string[] = user?.favoriteMovies || user?.FavoriteMovies || [];
    this.favoriteIds = new Set(favs?.map(String));
  }

  /**
   * Persist a new favorite list to localStorage and update local state.
   * @param newFavs Movie IDs returned by the backend.
   */
  private persistUserFavorites(newFavs: string[]): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    user.favoriteMovies = newFavs;
    localStorage.setItem('user', JSON.stringify(user));
    this.favoriteIds = new Set(newFavs.map(String));
  }

  /**
   * Fetch all movies from the API for display.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe({
      next: (resp: any) => { this.movies = resp || []; },
      error: (err) => {
        console.error('Failed to load movies:', err);
      }
    });
  }

  /**
   * Check if a movie ID is currently favorited.
   * @param movieId Movie ObjectId.
   */
  isFavorited(movieId: string): boolean {
    return this.favoriteIds.has(String(movieId));
  }

  /**
   * Toggle favorite state for a given movie.
   * @param movie Movie object from the list.
   */
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

  /**
   * Add a movie to favorites and persist the updated list.
   * @param movieId Movie ObjectId.
   */
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

  /**
   * Remove a movie from favorites and persist the updated list.
   * @param movieId Movie ObjectId.
   */
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
  /**
   * Open the Genre details dialog for a movie.
   */
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

  /**
   * Open the Director details dialog for a movie.
   */
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

  /**
   * Open the Synopsis dialog for a movie.
   */
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

  /**
   * Logout session and navigate back to the welcome page.
   */
  logout(): void {
    localStorage.clear();
    this.router.navigate(['/myFlix-Angular-client/welcome']);
  }

  /**
   * Replace broken poster images with a placeholder.
   * @param event Browser image error event.
   */
  handleImageError(event: any): void {
    (event.target as HTMLImageElement).src = 'https://via.placeholder.com/300x450/cccccc/666666?text=No+Image';
  }
}

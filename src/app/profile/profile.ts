// src/app/profile/profile.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { FetchApiData } from '../fetch-api-data';
import { MatToolbarModule } from '@angular/material/toolbar';

/**
 * Profile page for viewing and editing user data.
 * Allows updating email/birthday, changing password, managing favorites, and account deletion.
 */
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    MatCardModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatButtonModule, 
    MatIconModule, 
    MatSnackBarModule,
    RouterLink,
    MatToolbarModule
  ],
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss']
})

export class Profile implements OnInit {
  /** User view model used by the template. */
  user: any = { username: '', email: '', birthday: '' };

  /** Set of favorite movie IDs for quick lookups and toggles. */
  favoriteIds = new Set<string>();

  /** List of movies to display favorite cards. */
  movies: any[] = []; 

  /**
   * @param api API service for user/movie calls.
   * @param snack Snackbar for user feedback.
   * @param router Router to redirect unauthenticated users and after destructive actions.
   */
  constructor(
    private api: FetchApiData, 
    private snack: MatSnackBar,
    private router: Router
  ) {}

  /**
   * Initialize the page:
   * - Redirect to welcome if not authenticated
   * - Load user data from localStorage
   * - Fetch full movie list to display favorite cards
   */
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.snack.open('Please log in first', 'OK', { duration: 2000 });
      this.router.navigate(['/myFlix-Angular-client/welcome']);
      return;
    }
    this.loadUserFromStorage();
    this.fetchFavoritesList();
  }

  /**
   * Populate the local `user` model and `favoriteIds` from localStorage.
   */
  loadUserFromStorage(): void {
    const u = JSON.parse(localStorage.getItem('user') || '{}');
    this.user.username = u?.username || u?.Username || '';
    this.user.email = u?.email || u?.Email || '';
    this.user.birthday = (u?.birthday || u?.Birthday) ? (u.birthday || u.Birthday).slice(0, 10) : '';
    const favs: string[] = u?.favoriteMovies || u?.FavoriteMovies || [];
    this.favoriteIds = new Set(favs.map(String));
  }

  /**
   * Fetch all movies and filter them by the user's favorites for display.
   */
  fetchFavoritesList(): void {
    // reuse getAllMovies and filter by favoriteIds to show favorite cards
    this.api.getAllMovies().subscribe({
      next: (all: any[]) => { this.movies = (all || []).filter(m => this.favoriteIds.has(String(m._id))); },
      error: () => {}
    });
  }

  /**
   * Save profile changes (email/birthday) to the backend.
   * Reloads user data from the server response.
   */
  saveProfile(): void {
    // Map to API expectations
    const payload = {
      email: this.user.email,
      birthday: this.user.birthday
    };

    const originalUsername = JSON.parse(localStorage.getItem('user') || '{}').username;

    this.api.editUser(originalUsername, payload).subscribe({
      next: (updated: any) => {
        localStorage.setItem('user', JSON.stringify(updated));
        this.snack.open('Profile updated', 'OK', { duration: 1500 });
        this.loadUserFromStorage();
      },
      error: (err) => {
        console.error('Update error:', err); // ← Add this to see the error
        this.snack.open('Update failed', 'OK', { duration: 2000 });
      }
    });
  }

  /**
   * Update the user's password.
   * @param newPassword New password to set.
   */
  changePassword(newPassword: string): void {
    if (!newPassword) return;
    this.api.editUser(this.user.username, { password: newPassword }).subscribe({
      next: () => this.snack.open('Password updated', 'OK', { duration: 1500 }),
      error: () => this.snack.open('Password update failed', 'OK', { duration: 2000 })
    });
  }

  /**
   * Remove a movie from the user's favorites.
   * Updates localStorage and local state on success.
   * @param movieId Movie ObjectId to remove.
   */
  removeFavorite(movieId: string): void {
    const username = this.user.username;
    this.api.removeFavoriteMovie(username, movieId).subscribe({
      next: (updatedUser: any) => {
        localStorage.setItem('user', JSON.stringify(updatedUser));
        const favs = updatedUser?.favoriteMovies || updatedUser?.FavoriteMovies || [];
        this.favoriteIds = new Set(favs.map(String));
        this.movies = this.movies.filter(m => String(m._id) !== String(movieId));
        this.snack.open('Removed from favorites', 'OK', { duration: 1200 });
      },
      error: () => this.snack.open('Could not remove favorite', 'OK', { duration: 1800 })
    });
  }

  /**
   * Permanently delete the current user's account after confirmation.
   * Clears local storage and navigates back to the welcome page.
   */
  deleteAccount(): void {
    if (!confirm('Delete your account? This cannot be undone.')) return; 
    this.api.deleteUser(this.user.username).subscribe({
      next: () => {
        this.snack.open('Account deleted successfully', 'OK', { duration: 2000 });
        localStorage.clear();
        this.router.navigate(['/myFlix-Angular-client/welcome']);  // Full path for GitHub Pages
      },
      error: () => this.snack.open('Failed to delete account', 'OK', { duration: 2000 })
    });
  }

  /**
   * Clear local session and redirect to the welcome page.
   */
  logout(): void {
    localStorage.clear();
    this.snack.open('Logged out', 'OK', { duration: 1200 });
    this.router.navigate(['/myFlix-Angular-client/welcome']);  // Full path for GitHub Pages
  }
}

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
import {  } from '@angular/router';

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
  user: any = { username: '', email: '', birthday: '' };
  favoriteIds = new Set<string>();
  movies: any[] = []; // optionally display favorite movie cards

  constructor(
    private api: FetchApiData, 
    private snack: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserFromStorage();
    this.fetchFavoritesList();
  }

  loadUserFromStorage(): void {
    const u = JSON.parse(localStorage.getItem('user') || '{}');
    this.user.username = u?.username || u?.Username || '';
    this.user.email = u?.email || u?.Email || '';
    this.user.birthday = (u?.birthday || u?.Birthday) ? (u.birthday || u.Birthday).slice(0, 10) : '';
    const favs: string[] = u?.favoriteMovies || u?.FavoriteMovies || [];
    this.favoriteIds = new Set(favs.map(String));
  }

  fetchFavoritesList(): void {
    // Optional: reuse getAllMovies and filter by favoriteIds to show favorite cards
    this.api.getAllMovies().subscribe({
      next: (all: any[]) => { this.movies = (all || []).filter(m => this.favoriteIds.has(String(m._id))); },
      error: () => {}
    });
  }

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

  changePassword(newPassword: string): void {
    if (!newPassword) return;
    this.api.editUser(this.user.username, { password: newPassword }).subscribe({
      next: () => this.snack.open('Password updated', 'OK', { duration: 1500 }),
      error: () => this.snack.open('Password update failed', 'OK', { duration: 2000 })
    });
  }

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

  deleteAccount(): void {
    if (!confirm('Delete your account? This cannot be undone.')) return;
    const username = this.user.username;
    this.api.deleteUser(username).subscribe({
      next: () => {
        localStorage.clear();
        this.snack.open('Account deleted', 'OK', { duration: 1500 });
        this.router.navigate(['']);
      },
      error: () => this.snack.open('Delete failed', 'OK', { duration: 2000 })
    });
  }

  logout(): void {
    localStorage.clear();
    this.snack.open('Logged out', 'OK', { duration: 1200 });
    this.router.navigate(['welcome']);
  }
}

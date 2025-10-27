//src/app/fetch-api-data.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// Declaring the api url that will provide data for the client app
/**
 * Base URL of the myFlix API.
 * Note: If you change hosting, update this value accordingly.
 */
const apiUrl = 'https://movie-api-w67x.onrender.com/';

/**
 * Service that wraps all HTTP requests to the myFlix API.
 * Returns RxJS Observables so components can subscribe to results.
 */
@Injectable({
  providedIn: 'root'
})
export class FetchApiData {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  /**
   * Create the service with Angular's HttpClient.
   * @param http Angular HttpClient used for all HTTP requests.
   */
  constructor(private http: HttpClient) {}

  /**
   * Register a new user.
   * @param userDetails Object with registration fields (e.g., username, password, email).
   * @returns Observable of server response or created user.
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Log in an existing user.
   * @param userDetails Object with login credentials (username, password).
   * @returns Observable with `{ user, token }` on success.
   */
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Get all movies.
   * @returns Observable array of movies.
   */
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      map((res: any) => res),
      catchError(this.handleError)
    );
  }
  
  /**
   * Get a movie by title.
   * @param title Movie title to fetch.
   * @returns Observable single movie.
   */
  public getMovieByTitle(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + encodeURIComponent(title), {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + token,
    }),
    }).pipe(
      map((res: any) => res), 
      catchError(this.handleError)
    );
  }

  /**
   * Get a director by name.
   * @param name Director's name.
   * @returns Observable director object.
   */
  public getDirectorByName(name: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'directors/' + encodeURIComponent(name), {
    headers: new HttpHeaders({ 
      Authorization: 'Bearer ' + token,
    }),
    }).pipe(
      map((res: any) => res), 
      catchError(this.handleError)
    );
  }

  /**
   * Get a genre by name.
   * @param name Genre name.
   * @returns Observable genre object.
   */
  public getGenreByName(name: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'genres/' + encodeURIComponent(name), {
    headers: new HttpHeaders({ 
      Authorization: 'Bearer ' + token,
    }),
    }).pipe(
      map((res: any) => res), 
      catchError(this.handleError)
    );
  }

  /**
   * Get a user by username.
   * @param username Username to fetch.
   * @returns Observable user object.
   */
  public getUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + encodeURIComponent(username), {
    headers: new HttpHeaders({ 
      Authorization: 'Bearer ' + token,
    }),
    }).pipe(
      map((res: any) => res), 
      catchError(this.handleError)
    );
  }

  /**
   * Get the user's favorite movies.
   * @param username Username whose favorites to fetch.
   * @returns Observable of favorite movie IDs or movie objects (depending on API).
   */
  public getFavoriteMovies(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + encodeURIComponent(username) + '/movies', {
    headers: new HttpHeaders({ 
      Authorization: 'Bearer ' + token,
    }),
    }).pipe(
      map((res: any) => res), 
      catchError(this.handleError)
    );
  }

  /**
   * Add a movie to a user's favorites.
   * @param username Username to update.
   * @param movieId Movie ObjectId to add.
   * @returns Observable updated user object.
   */
  public addFavoriteMovie(username: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(apiUrl + 'users/' + encodeURIComponent(username) + '/movies/' + encodeURIComponent(movieId),{},{ 
    headers: new HttpHeaders({ 
      Authorization: 'Bearer ' + token,
    }),
    }).pipe(
      map((res: any) => res), 
      catchError(this.handleError)
    );
  }

  /**
   * Edit user profile data.
   * @param username Username to update.
   * @param updateData Fields to update.
   * @returns Observable updated user object.
   */
  public editUser(username: string, updateData: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users/' + encodeURIComponent(username), updateData, { 
    headers: new HttpHeaders({ 
      Authorization: 'Bearer ' + token,
    }),
    }).pipe(
      map((res: any) => res), 
      catchError(this.handleError)
    );
  }

  /**
   * Delete a user by username.
   * @param username Username to delete.
   * @returns Observable server response.
   */
  public deleteUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + encodeURIComponent(username),{ 
    headers: new HttpHeaders({ 
      Authorization: 'Bearer ' + token,
    }),
    }).pipe(
      map((res: any) => res), 
      catchError(this.handleError)
    );
  }

  /**
   * Remove a movie from favorites.
   * @param username Username to update.
   * @param movieId Movie ObjectId to remove.
   * @returns Observable updated user object.
   */
  public removeFavoriteMovie(username: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + encodeURIComponent(username) + '/movies/' + encodeURIComponent(movieId),{ 
    headers: new HttpHeaders({ 
      Authorization: 'Bearer ' + token,
    }),
    }).pipe(
      map((res: any) => res), 
      catchError(this.handleError)
    );
  }

  /**
   * Normalize HTTP errors into a user-friendly message and log details to console.
   * @param error HttpErrorResponse returned by HttpClient.
   * @returns Observable error for subscribers to handle.
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}

//src/app/fetch-api-data.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// Declaring the api url that will provide data for the client app
const apiUrl = 'https://movie-api-w67x.onrender.com/';

@Injectable({
  providedIn: 'root'
})
export class FetchApiData {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) { }

  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // User login
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // Get all movies
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
  
  // Get a movie by title
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

  // Get a director by name
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

  // Get a genre by name
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

  // Get a user by username
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

  // Get favorite movies
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

  // Add a movie to favorites
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

  // Edit user details
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

  // Delete a user by username
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

  // Remove a movie from favorites
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

  // Error handling
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

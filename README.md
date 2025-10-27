# MyFlixAngularClient

## Overview
MyFlix Angular Client is the frontend for the myFlix movie API. It’s built with Angular (standalone app, routing + SCSS) and includes: 
- login/registration 
- movie list & single movie view
- profile management.

---

## Backend API
- Base URL: [https://movie-api-w67x.onrender.com/](https://movie-api-w67x.onrender.com/)
- Auth: JWT token returned by `POST /login` must be sent as `Authorization: Bearer <token>` for protected routes.

---

## Handoff / Setup Manual

### Prerequisites
- Node.js 18+ and npm
- Angular CLI:

```bash
npm install -g @angular/cli
```

## Environment
API base URL is configured in `src/environments/environment.ts` (and `environment.prod.ts`):

```ts
export const environment = {
  production: false,
  apiBaseUrl: 'https://movie-api-w67x.onrender.com'
};
```
If your backend changes, update `apiBaseUrl` accordingly.


## Install & Run

```bash
npm install
ng serve --open
```
App runs at http://localhost:4200/


## Documentation
- TypeDoc output (after generation): ./docs/index.html
- GitHub Pages: https://claudias-hub.github.io/myFlix-Angular-client/

### Generate docs:

```bash
npm run docs
# then open:
docs/index.html
```

## API Service (fetch-api-data.ts) :
### Public:
- POST /users — userRegistration(userDetails)
- POST /login — userLogin(userDetails)

### Protected (send Authorization: Bearer <token>):
- GET /movies — getAllMovies()
- GET /movies/:title — getMovieByTitle(title)
- GET /directors/:name — getDirectorByName(name)
- GET /genres/:name — getGenreByName(name)
- GET /users/:username — getUser(username)
- GET /users/:username/movies — getFavoriteMovies(username)
- POST /users/:username/movies/:movieId — addFavoriteMovie(username, movieId)
- PUT /users/:username — editUser(username, updateData)
- DELETE /users/:username — deleteUser(username)
- DELETE /users/:username/movies/:movieId — removeFavoriteMovie(username, movieId)

### Notes
- Standalone Angular setup (no app.module.ts).
- HttpClient is provided in app.config.ts via provideHttpClient().

### This project was generated using Angular CLI version 20.3.5.

## Scripts
- Development server:

```bash
ng serve
Open http://localhost:4200/.
```

- Building:

```bash
ng build
Build output in dist/.
```

- Code scaffolding:

```bash
ng generate component component-name
```

- For more schematics: 

```bash
ng generate --help
```


## Known Issues / TODO
- Improve error handling for auth failures (snackbars/messages).
- Add e2e tests when feature set stabilizes.

## AI Use Declaration
Parts of this project’s documentation and code comments were drafted with assistance from an AI assistant (Abacus.AI ChatLLM Teams).


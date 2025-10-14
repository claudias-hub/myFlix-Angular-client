# MyFlixAngularClient

* Overview
MyFlix Angular Client is the frontend for the myFlix movie API. It’s built with Angular (standalone app, routing + SCSS) and will grow to include login/registration, movie list, single movie view, and profile management.

* Backend API
Base URL: https://movie-api-w67x.onrender.com/
Auth: JWT token returned by POST /login must be sent as Bearer token for protected routes.

* Prerequisites
Node.js 18+ and npm
Angular CLI (installed globally): npm install -g @angular/cli

* Run locally
npm install
ng serve --open

* API Service (fetch-api-data.ts)

- Public:
POST /users — userRegistration(userDetails)
POST /login — userLogin(userDetails)

- Protected (send Authorization: Bearer ):
GET /movies — getAllMovies()
GET /movies/:title — getMovieByTitle(title)
GET /directors/:name — getDirectorByName(name)
GET /genres/:name — getGenreByName(name)
GET /users/:username — getUser(username)
GET /users/:username/movies — getFavoriteMovies(username)
POST /users/:username/movies/:movieId — addFavoriteMovie(username, movieId)
PUT /users/:username — editUser(username, updateData)
DELETE /users/:username — deleteUser(username)
DELETE /users/:username/movies/:movieId — removeFavoriteMovie(username, movieId)

* Notes
This project uses Angular’s standalone setup (no app.module.ts). HttpClient is provided in app.config.ts via provideHttpClient().



This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.5.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

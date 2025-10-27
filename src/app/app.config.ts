// src/app/app.config.ts

import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideNativeDateAdapter } from '@angular/material/core';
import { appRoutes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';

/**
 * Global application providers (standalone Angular app).
 * - Router configured with appRoutes
 * - HttpClient for HTTP requests
 * - Animations and Material date adapter
 * - Zone change detection and global error listeners
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(appRoutes),
    provideAnimations(),
    provideNativeDateAdapter()
  ]
};

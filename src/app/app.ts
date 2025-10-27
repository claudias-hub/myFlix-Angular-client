// src/app/app.ts

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Root application shell component.
 * Hosts the router outlet; all feature pages render inside this component.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {}

import { Component } from '@angular/core';
import { SideNav } from './core/layout/side-nav/side-nav';

@Component({
  selector: 'app-root',
  imports: [SideNav],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}

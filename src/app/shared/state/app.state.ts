import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppState {
  private _title = signal('Cosmos');
  readonly title = computed(() => this._title());
  
  setTitle(newTitle: string) {
    this._title.set(newTitle);
  }
}

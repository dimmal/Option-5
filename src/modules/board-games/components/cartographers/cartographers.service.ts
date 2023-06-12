import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartographersTerrain } from './cartographers.component';

@Injectable({
  providedIn: 'root'
})
export class CartographersService {
  selectedTerrain: CartographersTerrain;
  round = 1;

  resetRound = new Subject<void>();

  reset() {
    this.resetRound.next();
  }

  previousRound() {
    if (this.round > 1) {
      this.round--;
    }
  }

  nextRound() {
    this.round++;
  }
}

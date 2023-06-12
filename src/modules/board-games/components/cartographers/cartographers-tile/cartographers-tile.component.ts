import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CartographersTerrain } from '../cartographers.component';
import { CartographersService } from '../cartographers.service';

@Component({
  selector: 'o5-cartographers-tile',
  templateUrl: './cartographers-tile.component.html',
  styleUrls: ['./cartographers-tile.component.scss']
})
export class CartographersTileComponent {
  @Input() x: number;
  @Input() y: number;

  isRuins: boolean;
  isMountain: boolean;

  terrain: CartographersTerrain;
  roundModified: Array<number> = [];

  onDestroy$ = new Subject<void>();

  constructor(private game: CartographersService) { }

  ngOnInit() {
    this.initialize();
    this.listenToReset();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  initialize() {
    this.isMountain = (
      (this.x === 4 && this.y === 2) ||
      (this.x === 9 && this.y === 3) ||
      (this.x === 6 && this.y === 6) ||
      (this.x === 3 && this.y === 9) ||
      (this.x === 8 && this.y === 10)
    );

    this.isRuins = (
      (this.x === 2 && this.y === 3) ||
      (this.x === 6 && this.y === 2) ||
      (this.x === 10 && this.y === 3) ||
      (this.x === 2 && this.y === 9) ||
      (this.x === 10 && this.y === 9) ||
      (this.x === 6 && this.y === 10)
    )
  }

  listenToReset() {
    this.game.resetRound.pipe(takeUntil(this.onDestroy$)).subscribe(() => {
      if (this.game.round === this.roundModified[this.roundModified.length - 1]) {
        this.terrain = undefined;
        this.roundModified.pop();
      }
    });
  }

  clicked() {
    if (this.isMountain || (this.roundModified.length > 0 && this.game.round !== this.roundModified[this.roundModified.length - 1])) { return; }

    if (this.terrain) {
      this.terrain = this.terrain.code === this.game.selectedTerrain.code ? undefined : this.game.selectedTerrain;
      this.roundModified.pop();
    } else {
      this.terrain = { ...this.game.selectedTerrain };
      this.roundModified.push(this.game.round);
    }
  }
}


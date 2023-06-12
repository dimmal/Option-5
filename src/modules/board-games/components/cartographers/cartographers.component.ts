import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from 'src/modules/app/services/app.service';
import { NavigationService } from 'src/modules/app/services/navigation.service';
import { CartographersService } from './cartographers.service';

@Component({
  selector: 'o5-cartographers',
  templateUrl: './cartographers.component.html',
  styleUrls: ['./cartographers.component.scss']
})
export class CartographersComponent {
  rows = Array.from(Array(11).keys());
  columns = Array.from(Array(11).keys());
  gold = 0;
  terrains: Array<CartographersTerrain> = [
    {
      imgUrl: 'assets/images/board-games/cartographers/forest.png',
      isSelected: false,
      name: 'Forest',
      code: 'forest'
    },
    {
      imgUrl: 'assets/images/board-games/cartographers/village.png',
      isSelected: false,
      name: 'Villate',
      code: 'village'
    },
    {
      imgUrl: 'assets/images/board-games/cartographers/farm.png',
      isSelected: false,
      name: 'Farm',
      code: 'farm'
    },
    {
      imgUrl: 'assets/images/board-games/cartographers/water.png',
      isSelected: false,
      name: 'Water',
      code: 'water'
    },
    {
      imgUrl: 'assets/images/board-games/cartographers/monster.png',
      isSelected: false,
      name: 'Monster',
      code: 'monster'
    }
  ];
  totals = new CartographerTotals();

  get currentRound(): number {
    return this.game.round;
  }

  constructor(private navigation: NavigationService,
    private game: CartographersService,
    private dialog: MatDialog,
    private app: AppService) {
    this.app.currentPageTitle = 'Cartographers';
  }

  ngAfterViewInit() {
    this.terrainSelected(this.terrains[0]);
  }

  terrainSelected(selectedTerrain: CartographersTerrain) {
    this.terrains.forEach(terrain => terrain.isSelected = terrain.code === selectedTerrain.code);
    this.game.selectedTerrain = selectedTerrain;
  }

  reset() {
    this.game.reset();
  }

  previousRound() {
    this.game.previousRound();
  }

  nextRound() {
    this.game.nextRound();
  }

  addGold() {
    this.gold++;
  }

  removeGold() {
    if (this.gold > 0) {
      this.gold--;
    }
  }

  back() {
    this.navigation.goBack();
  }
}

export interface CartographersTerrain {
  imgUrl: string;
  isSelected: boolean;
  name: string;
  code: string;
}

export class CartographerTotals {
  season1 = {
    quest1: '',
    quest2: '',
    gold: '',
    monsters: '',
  };
  season2 = {
    quest1: undefined,
    quest2: undefined,
    gold: undefined,
    monsters: undefined,
  };
  season3 = {
    quest1: undefined,
    quest2: undefined,
    gold: undefined,
    monsters: undefined,
  };
  season4 = {
    quest1: undefined,
    quest2: undefined,
    gold: undefined,
    monsters: undefined,
  };

  get totals1(): string {
    const total = parseInt(this.season1.quest1) + parseInt(this.season1.quest2) + parseInt(this.season1.gold) + parseInt(this.season1.monsters);
    return isNaN(total)? '': total.toString();
  }
  get totals2(): string {
    const total = parseInt(this.season2.quest1) + parseInt(this.season2.quest2) + parseInt(this.season2.gold) + parseInt(this.season2.monsters);
    return isNaN(total)? '': total.toString();
  }
  get totals3(): string {
    const total = parseInt(this.season3.quest1) + parseInt(this.season3.quest2) + parseInt(this.season3.gold) + parseInt(this.season3.monsters);
    return isNaN(total)? '': total.toString();
  }
  get totals4(): string {
    const total = parseInt(this.season4.quest1) + parseInt(this.season4.quest2) + parseInt(this.season4.gold) + parseInt(this.season4.monsters);
    return isNaN(total)? '': total.toString();
  }
  get total(): string {
    const total = parseInt(this.totals1) + parseInt(this.totals2) + parseInt(this.totals3) + parseInt(this.totals4);
    return isNaN(total)? '': total.toString();
  }
}

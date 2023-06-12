
import { NgModule } from '@angular/core';

import { BoardGamesRoutingModule } from './board-games-routing.module';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';

import { BoardGamesDashboardComponent } from './components/board-games-dashboard/board-games-dashboard.component';
import { CartographersComponent } from './components/cartographers/cartographers.component';
import { CartographersTileComponent } from './components/cartographers/cartographers-tile/cartographers-tile.component';

@NgModule({
  imports: [
    BoardGamesRoutingModule,

    SharedModule,
    MaterialModule
  ],
  declarations: [
    BoardGamesDashboardComponent,
    CartographersComponent,
    CartographersTileComponent,
  ]
})
export class BoardGamesModule { }

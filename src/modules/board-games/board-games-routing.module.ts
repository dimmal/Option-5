import { Routes, RouterModule } from '@angular/router';
import { BoardGamesDashboardComponent } from './components/board-games-dashboard/board-games-dashboard.component';
import { CartographersComponent } from './components/cartographers/cartographers.component';

const routes: Routes = [
  { path: 'dashboard', component: BoardGamesDashboardComponent },
  { path: 'cartographers', component: CartographersComponent },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];

export const BoardGamesRoutingModule = RouterModule.forChild(routes);

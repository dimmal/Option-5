import { Routes, RouterModule } from '@angular/router';
import { DndCharacterSheetComponent } from './components/character-sheet/character-sheet.component';
import { DndConditionsComponent } from './components/dnd-conditions/dnd-conditions.component';
import { DndDashboardComponent } from './components/dnd-dashboard/dnd-dashboard.component';

const routes: Routes = [
  { path: 'dashboard', component: DndDashboardComponent },
  { path: 'character-sheet', component: DndCharacterSheetComponent },
  { path: 'conditions', component: DndConditionsComponent },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];

export const DndRoutingModule = RouterModule.forChild(routes);

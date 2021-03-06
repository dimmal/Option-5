
import { NgModule } from '@angular/core';

import { DndRoutingModule } from './dnd-routing.module';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';

import { DndCharacterSheetComponent } from './components/character-sheet/character-sheet.component';
import { DndDashboardComponent } from './components/dnd-dashboard/dnd-dashboard.component';
import { DndConditionsComponent } from './components/dnd-conditions/dnd-conditions.component';

@NgModule({
  imports: [
    DndRoutingModule,
    
    SharedModule,
    MaterialModule
  ],
  declarations: [
    DndDashboardComponent,
    DndCharacterSheetComponent,
    DndConditionsComponent
  ]
})
export class DndModule { }

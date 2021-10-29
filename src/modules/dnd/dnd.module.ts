
import { NgModule } from '@angular/core';

import { DndRoutingModule } from './dnd-routing.module';
import { MaterialModule } from '../material/material.module';

import { HttpClientModule } from '@angular/common/http';
import { DndCharacterSheetComponent } from './components/character-sheet/character-sheet.component';
import { DndDashboardComponent } from './components/dnd-dashboard/dnd-dashboard.component';

@NgModule({
  imports: [
    HttpClientModule,
    MaterialModule,
    DndRoutingModule
  ],
  declarations: [
    DndDashboardComponent,
    DndCharacterSheetComponent
  ]
})
export class DndModule { }

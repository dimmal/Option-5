
import { NgModule } from '@angular/core';

import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { AcceptedTestRoutingModule } from './accepted-test-routing.module';
import { AcceptedTestDetailsComponent } from './components/details/details.component';
import { AcceptedTestMainComponent } from './components/main/main.component';


@NgModule({
  imports: [
    AcceptedTestRoutingModule,
    
    SharedModule,
    MaterialModule
  ],
  declarations: [
    AcceptedTestDetailsComponent,
    AcceptedTestMainComponent,
  ]
})
export class AcceptedTestModule { }

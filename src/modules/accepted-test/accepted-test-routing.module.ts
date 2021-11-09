import { Routes, RouterModule } from '@angular/router';
import { AcceptedTestDetailsComponent } from './components/details/details.component';
import { AcceptedTestMainComponent } from './components/main/main.component';

const routes: Routes = [
  { path: 'main', component: AcceptedTestMainComponent },
  { path: 'details', component: AcceptedTestDetailsComponent },
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  }
];

export const AcceptedTestRoutingModule = RouterModule.forChild(routes);

import { Component } from '@angular/core';
import { AppService } from 'src/modules/app/services/app.service';
import { NavigationService } from 'src/modules/app/services/navigation.service';

@Component({
  selector: 'o5-dnd-dashboard',
  templateUrl: './dnd-dashboard.component.html',
  styleUrls: ['./dnd-dashboard.component.scss']
})
export class DndDashboardComponent {

  constructor(private navigation: NavigationService,
    private app: AppService) { 
      this.app.currentPageTitle = 'dnd.dashboard.title';
    }

  proceed() {
    this.navigation.navigateForward('app/dnd/character-sheet');
  }

  back() {
    this.navigation.goBack();
  }
}

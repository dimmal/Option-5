import { Component } from '@angular/core';
import { AppService } from 'src/modules/app/services/app.service';
import { NavigationService } from 'src/modules/app/services/navigation.service';

@Component({
  selector: 'o5-board-games-dashboard',
  templateUrl: './board-games-dashboard.component.html',
  styleUrls: ['./board-games-dashboard.component.scss']
})
export class BoardGamesDashboardComponent {

  constructor(private navigation: NavigationService,
    private app: AppService) {
      this.app.currentPageTitle = 'board-games.dashboard.title';
    }

  goToPath(path: string) {
    this.navigation.navigateForward(path);
  }

  back() {
    this.navigation.goBack();
  }
}

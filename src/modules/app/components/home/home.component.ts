import { Component } from '@angular/core';
import { AppService } from '../../services/app.service';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'o5-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private navigation: NavigationService,
    private app: AppService) {
    this.app.currentPageTitle = 'app.home.title';
  }

  proceed() {
    this.navigation.navigateForward('app/home2');
  }

  proceed2() {
    this.navigation.navigateForward('app/dnd');
  }

  back() {
    this.navigation.goBack();
  }
}

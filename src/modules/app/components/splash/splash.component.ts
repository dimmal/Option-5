import { Component } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'o5-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent {

  constructor(private navigation: NavigationService) { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.navigation.navigate('app/home', null, true);
    }, 2000)
  }

}

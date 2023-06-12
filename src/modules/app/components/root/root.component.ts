import { Component, ViewChild } from '@angular/core';
import { IonRouterOutlet } from '@ionic/angular';
import { routerTransitions } from 'src/animations/page-transitions';
import { NavigationService } from '../../services/navigation.service';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'o5-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
  animations: [routerTransitions]
})
export class RootComponent {
  @ViewChild(IonRouterOutlet) routerOutlet: IonRouterOutlet;

  constructor(private navigation: NavigationService) {

    SplashScreen.hide();
    // this.navigation.navigate('');
  }
}

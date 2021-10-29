import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { takeUntil } from 'rxjs/operators';
import { fadeInOut } from 'src/animations/fade';
import { routerTransitions } from 'src/animations/page-transitions';
import { Unsubscriber } from 'src/base-classes/unsubscriber';
import { AppService } from '../../services/app.service';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'o5-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerTransitions, fadeInOut]
})
export class AppComponent extends Unsubscriber {
  outletAnimation: string;
  sidebarOpened = false;
  title: string;

  constructor(public platform: Platform,
    public app: AppService,
    private navigation: NavigationService) {
    super();

  }

  ngAfterViewInit() {
    this.listenToRouteAnimationChanges();
  }

  openSidebar() {
    this.sidebarOpened = true;
  }

  animationDone() {
    setTimeout(() => {
      this.outletAnimation = 'default';
    }, 0);
  }

  listenToRouteAnimationChanges() {
    this.navigation.listenToRouteAnimationChanges()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(animation => {
        this.outletAnimation = animation;
      });
  }

  goBack() {
    window.history.back();
  }
}
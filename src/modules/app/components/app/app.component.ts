import { Component, Renderer2 } from '@angular/core';
import { Platform } from '@ionic/angular';
import { takeUntil } from 'rxjs/operators';
import { fadeInOut } from 'src/animations/fade';
import { routerTransitions } from 'src/animations/page-transitions';
import { Unsubscriber } from 'src/base-classes/unsubscriber';
import { AppService } from '../../services/app.service';
import { DeviceService } from '../../services/device.service';
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

  isDarkMode: boolean;

  constructor(public platform: Platform,
    private renderer: Renderer2,
    public app: AppService,
    private device: DeviceService,
    private navigation: NavigationService) {
    super();

    this.isDarkMode = this.device.retrieveFromMemory('dark-mode') == 'true';
    this.darkModeChanged();
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
    this.navigation.goBack();
  }

  goToRoot() {
    this.navigation.navigateBackward('');
  }

  darkModeChanged() {
    if(this.isDarkMode) {
      this.renderer.addClass(document.body, 'dark-mode');
    } else {
      this.renderer.removeClass(document.body, 'dark-mode');
    }

    this.device.saveToMemory('dark-mode', this.isDarkMode);
  }
}
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { AppService } from '../app.service';
import { NavigationService } from '../navigation.service';

@Injectable({
  providedIn: 'root'
})
export class SplashScreenGuard implements CanActivate {
  constructor(
    private app: AppService,
    private navigation: NavigationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

	  if(this.app.showSplashScreen) {
		  this.navigation.navigate('app/splash', null, true);
		  this.app.showSplashScreen = false;
	  }

    return !this.app.showSplashScreen; 
  }
}
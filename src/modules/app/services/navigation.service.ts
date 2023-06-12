import { Injectable } from '@angular/core';
import { NavigationEnd, NavigationExtras, NavigationStart, Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { NavItem } from 'src/models/navigation-item';
import { AppService } from './app.service';
import { DeviceService } from './device.service';
import { NavigationDataService } from './navigation-data.service';

@Injectable({
	providedIn: 'root'
})
export class NavigationService {
	private history = new Array<NavItem>();
	public currentPageTitle: boolean;
	private rootPath = 'app/home';

	constructor(private router: Router,
		private device: DeviceService,
		private platform: Platform,
		private app: AppService,
		private navigationData: NavigationDataService) {

		if (this.device.isApp) {
			this.listenToApplicationBackButton();
		}
	}

	private listenToApplicationBackButton() {
		this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
			this.goBack();

			processNextHandler();
		});
	}

	navigateForward(path: string, data?: any) {
		const forwardData = { ...data, animation: 'forward' };
		this.navigate(path, forwardData);
	}

	navigateBackward(path: string, data?: any) {
		const backwardData = { ...data, animation: 'backward' };
		this.navigate(path, backwardData);
	}

	navigate(path: string, data?: any, skipLocationChange?: boolean) {
		const navigationExtras: NavigationExtras = {
			skipLocationChange: skipLocationChange
		};

		path = path.replace(/^\.*\//g, '@');

		//set default animation, as fade in
		const navData = { ...{ animation: 'fade' }, ...data };
		this.navigationData.data = navData;
		this.router.navigateByUrl(path, navigationExtras);

		if (this.device.isApp && !skipLocationChange) {
			this.history.push(new NavItem(path, navigationExtras, navData));
		}
	}

	goBack() {
		if (this.device.isApp && this.history.length > 1) {
			// Cordova messes with the history.back feature duplicating screens.
			this.history.pop();
			const previousPage = this.history.pop();

			this.navigateBackward(previousPage.path, previousPage.data);
		} else if (!this.device.isApp) {
			window.history.back();
		}
	}

	listenToRouteAnimationChanges(): Observable<string> {
		let forcedAnimation: string;
		let previousPages = new Array<number>();

		return this.router.events
			.pipe(
				tap(event => {
					if (event instanceof NavigationStart) {

						this.app.currentPageTitle = null;

						if (!event.restoredState) {
							forcedAnimation = null;
						} else {
							const isPreviousPage = previousPages.indexOf(event.restoredState.navigationId) >= 0 || event.restoredState.navigationId < 0;

							if (event.restoredState.navigationId < 0) {
								previousPages = [];
							} else {
								const index = previousPages.indexOf(event.restoredState.navigationId);

								if (index >= 0) {
									previousPages.splice(index);
								}
							}

							forcedAnimation = isPreviousPage ? 'backward' : 'forward';
						}

						previousPages.push(event.id);
					}
				}),
				filter(event => event instanceof NavigationEnd),
				map((event) => {
					const routeData = this.navigationData.readData();

					this.app.isAtRootPath = location.hash.indexOf(this.rootPath) > 0 || location.hash === '#/';
					// popstate also means forward. Need to
					return forcedAnimation ? forcedAnimation : routeData?.animation;
				})
			);
	}
}

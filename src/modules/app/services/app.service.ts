import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
	showSplashScreen = true;
	private _currentPageTitle: string;

	get currentPageTitle(): string {
		return this._currentPageTitle;
	}
	set currentPageTitle(title: string) {
		this._currentPageTitle = title;
	}
}

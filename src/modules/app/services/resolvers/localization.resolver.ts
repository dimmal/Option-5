import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { LocalizationService } from '../localization.service';

@Injectable({ providedIn: 'root' })
export class LocalizationResolver implements Resolve<any> {

	constructor(private localization: LocalizationService) { }

	resolve(route: ActivatedRouteSnapshot): any {

		return this.localization.initialize();
	}
}

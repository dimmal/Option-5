import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { DnDDataService } from 'src/modules/dnd/services/dnd-data.service';

@Injectable({ providedIn: 'root' })
export class DnDResolver implements Resolve<any> {

	constructor(private dnd: DnDDataService) { }

	resolve(route: ActivatedRouteSnapshot): any {

		// return this.dnd.initialize();
	}
}

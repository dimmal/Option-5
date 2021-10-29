import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({
	providedIn: 'root'
})
export class DeviceService {
	isApp: boolean

	constructor(private platform: Platform) {
		this.isApp = this.platform.is('cordova');
	}
}
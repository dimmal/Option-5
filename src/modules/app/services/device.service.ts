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

	saveToMemory(key: string, value: any) {
		localStorage.setItem(`o5-${key}`, value);
	}

	retrieveFromMemory<T>(key: string): T {
		return ((localStorage.getItem(`o5-${key}`) as unknown) as T);
	}
}
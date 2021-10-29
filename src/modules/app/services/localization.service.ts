import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class LocalizationService {
	locale = 'en';
	language = 'en';
	translations = {};

	constructor(private http: HttpClient) { }

	initialize(): Observable<Array<object>> {
		return forkJoin(
			translationFiles.map(file => {
				return this.http.get(`assets/translations/${this.locale}/${file}.json`)
					.pipe(take(1), map(translations => (translations as object)))
			}))
			.pipe(
				take(1),
				tap(translations => {
					if (translations) {
						translations.forEach((fileContent) => {
							this.translations = { ...this.translations, ...fileContent };
						});
					}
				})
			);
	}

	translate(key: string): string {
		const value = this.translations[key];

		return value ? value : key;
	}

}

const translationFiles = [
	'app',
	'dnd'
]
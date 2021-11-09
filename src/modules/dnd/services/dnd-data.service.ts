import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, take, tap } from 'rxjs/operators';
import { DnDModuleCharacterData } from 'src/models/classes';

@Injectable({
	providedIn: 'root'
})
export class DnDDataService {
	charData: Array<DnDModuleCharacterData>;

	constructor(private http: HttpClient) {

	}

	initialize(): Promise<null> {
		return this.http.get(`assets/data/dnd/char-official.json`)
			.pipe(
				take(1),
				tap((data: Array<DnDModuleCharacterData>) => {
					this.charData = data;
					console.log('DND DATA BABY!!!', this.charData)
				}),
				map(() => null)
			).toPromise();
	}
}

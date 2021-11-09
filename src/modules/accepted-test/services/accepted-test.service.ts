import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { DnDModuleCharacterData } from 'src/models/classes';
import { GetDetailsResponse, GetListResponse, GetSportsResponse } from '../contracts/accepted-test-contract';

@Injectable({
	providedIn: 'root'
})
export class AcceptedTestService {
	charData: Array<DnDModuleCharacterData>;

	constructor(private http: HttpClient) {

	}

	getTestList(): Observable<GetListResponse> {
		return this.http.get('https://www.thesportsdb.com/api/v1/json/1/all_leagues.php').pipe(map(response => response as GetListResponse));
	}

	getDetails(id: string): Observable<GetDetailsResponse> {
		return this.http.get(`https://www.thesportsdb.com/api/v1/json/1/lookupleague.php?id=${id}`).pipe(map(response => response as GetDetailsResponse));
	}

	getSports(): Observable<GetSportsResponse> {
		return this.http.get('https://www.thesportsdb.com/api/v1/json/1/all_sports.php').pipe(map(response => response as GetSportsResponse));
	}
}

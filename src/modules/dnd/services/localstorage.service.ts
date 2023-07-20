import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class LocalstorageService {
  changed$ = new Subject();
  onDestroy$ = new Subject<void>();

	constructor(private http: HttpClient) {
    window.addEventListener("storage", () => {
      this.changed$.next();
    });
	}

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  setItem(key: string, value: any) {
    localStorage.setItem(key, value);
    this.changed$.next();
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
    this.changed$.next();
  }

  getItem(key): any {
    return localStorage.getItem(key);
  }
}

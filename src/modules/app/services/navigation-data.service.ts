import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { deepCopy } from 'src/helpers/static/deep-copy';

@Injectable({
  providedIn: 'root'
})
export class NavigationDataService {
  private temporaryNavigationData: object;

  get data(): object {
    const data = deepCopy(this.temporaryNavigationData);
    this.temporaryNavigationData = null;

    return data;
  }

  set data(data: object) {
    this.temporaryNavigationData = data;
  }

  readData(): any {
    const data = deepCopy(this.temporaryNavigationData);

    return data;
  }
}

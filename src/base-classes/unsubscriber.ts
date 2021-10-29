import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Directive()
export class Unsubscriber implements OnDestroy {
  protected onDestroy$ = new Subject<null>();

  dbOnDestroy() {
    // To be overrriden by the component
  }

  ngOnDestroy() {
    this.dbOnDestroy();
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }
}
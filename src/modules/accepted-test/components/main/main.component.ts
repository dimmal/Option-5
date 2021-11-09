import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, take, takeUntil } from 'rxjs/operators';
import { Unsubscriber } from 'src/base-classes/unsubscriber';
import { AppService } from 'src/modules/app/services/app.service';
import { NavigationService } from 'src/modules/app/services/navigation.service';
import { League } from '../../models/accepted-test';
import { AcceptedTestService } from '../../services/accepted-test.service';

@Component({
  selector: 'o5-accepted-test-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class AcceptedTestMainComponent extends Unsubscriber {
  leagues: Array<League>;
  filteredLeagues: Array<League>;
  form: FormGroup;
  sportTypes;

  constructor(private navigation: NavigationService,
    private acceptedTest: AcceptedTestService,
    private app: AppService) {
    super();

    this.app.currentPageTitle = 'Accepted test - List';

    this.form = new FormGroup({
      filter: new FormControl(),
      sport: new FormControl()
    });

    this.listenToFilters();
    this.loadSportTypes();
    this.loadList();
  }

  loadSportTypes() {
    this.acceptedTest.getSports().pipe(take(1)).subscribe(response => this.sportTypes = response.sports);
  }

  listenToFilters() {
    this.form.valueChanges.pipe(takeUntil(this.onDestroy$), debounceTime(750)).subscribe(() => {
      this.filterList();
    });
  }

  filterList() {
    const filter: string = this.form.get('filter').value;
    const sport: string = this.form.get('sport').value;
    let tempFilteredLeagues = this.leagues;

    if (!filter || filter.trim() === '') {
      tempFilteredLeagues = this.leagues;
    } else {
      tempFilteredLeagues = this.leagues.filter(league => league.strLeague.toUpperCase().indexOf(filter.toUpperCase()) >= 0);
    }

    if (sport) {
      tempFilteredLeagues = tempFilteredLeagues.filter(league => league.strSport === sport);
    }

    this.filteredLeagues = tempFilteredLeagues;
  }

  loadList() {
    this.acceptedTest.getTestList().pipe(take(1)).subscribe(response => {
      this.leagues = response.leagues;
      this.filterList();
    });
  }

  selectLeague(league: League) {
    this.navigation.navigateForward('app/test/details', { id: league.idLeague });
  }
}

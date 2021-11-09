import { Component, ElementRef, Renderer2 } from '@angular/core';
import { take } from 'rxjs/operators';
import { NavigationDataService } from 'src/modules/app/services/navigation-data.service';
import { LeagueDetails } from '../../models/accepted-test';
import { AcceptedTestService } from '../../services/accepted-test.service';

@Component({
  selector: 'o5-accepted-test-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class AcceptedTestDetailsComponent {
  data: LeagueDetails;

  constructor(private http: AcceptedTestService,
    private navigationData: NavigationDataService) {
    
    const data = (this.navigationData.readData() as AcceptedTestDetailsData);
    this.getDetails(data.id);
  }
  
  getDetails(id: string) {
    this.http.getDetails(id).pipe(take(1)).subscribe(response => {
      if(response && response.leagues && response.leagues.length > 0) {
        this.data = response.leagues[0];
        console.log('data', this.data);
      }
    })
  }
}

export class AcceptedTestDetailsData {
  id: string;
}
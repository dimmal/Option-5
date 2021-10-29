import { Component } from '@angular/core';
import { AppService } from 'src/modules/app/services/app.service';
import { NavigationService } from 'src/modules/app/services/navigation.service';

@Component({
  selector: 'o5-dnd-character-sheet',
  templateUrl: './character-sheet.component.html',
  styleUrls: ['./character-sheet.component.scss']
})
export class DndCharacterSheetComponent {

  constructor(private navigation: NavigationService,
    private app: AppService) {
    this.app.currentPageTitle = 'dnd.character-sheet.title';
  }

}

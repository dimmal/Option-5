import { Component } from '@angular/core';
import { Module } from 'src/models/module';
import { AppService } from '../../services/app.service';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'o5-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  availableModules: Array<Module> = modules;

  constructor(private navigation: NavigationService,
    private app: AppService) {
    this.app.currentPageTitle = 'app.home.title';
  }

  goToModule(path: string) {
    this.navigation.navigateForward(path);
  }
}


const modules: Array<Module> = [
  {
    icon: '/assets/images/modules/dnd.png',
    title: 'Dungeons & Dragons',
    path: 'app/dnd/dashboard',
    class: 'dnd'
  }
]

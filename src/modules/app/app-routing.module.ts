import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './components/app/app.component';
import { HomeComponent } from './components/home/home.component';
import { SplashComponent } from './components/splash/splash.component';
import { SplashScreenGuard } from './services/guards/splash-screen.guard';
import { DnDResolver } from './services/resolvers/dnd.resolver';
import { LocalizationResolver } from './services/resolvers/localization.resolver';

const routes: Routes = [
  {
    path: 'app',
    component: AppComponent,
    resolve: [LocalizationResolver],
    children: [
      { path: 'splash', component: SplashComponent },
      { path: 'home', component: HomeComponent, canActivate: [SplashScreenGuard] },
      { path: 'dnd', loadChildren: () => import('src/modules/dnd/dnd.module').then(m => m.DndModule), resolve: [DnDResolver] },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: 'app', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

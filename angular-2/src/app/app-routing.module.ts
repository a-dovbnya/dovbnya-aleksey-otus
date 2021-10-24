import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WordListComponent } from './word-list/word-list.component';
import { SettingsComponent } from './settings/settings.component';
import { EducationComponent } from './education/education.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: 'word-list',
    component: WordListComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: 'education',
    component: EducationComponent
  },
  { path: '',   redirectTo: '/word-list', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

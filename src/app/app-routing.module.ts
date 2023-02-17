import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupsComponent } from './components/groups.component';
import { HomeComponent } from './components/home.component';
import { LibraryComponent } from './components/library.component';
import { RegisterComponent } from './components/register.component';
import { SongComponent } from './components/song.component';

const routes: Routes = [
  // { path: '', redirectTo: '/songs', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'songs', component: LibraryComponent },
  { path: 'groups', component: GroupsComponent },
  { path: ':songId', component: SongComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

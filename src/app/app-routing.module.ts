import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryComponent } from './components/library/library.component';
import { SongComponent } from './components/song/song.component';

const routes: Routes = [
  { path: '', component: LibraryComponent },
  { path: ':songId', component: SongComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// import { AngularFireModule } from '@angular/fire/compat';
// import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LibraryComponent } from './components/library/library.component';
import { SongComponent } from './components/song/song.component';

@NgModule({
  declarations: [
    AppComponent,
    LibraryComponent,
    SongComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

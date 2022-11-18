import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { fbConfig } from './models/fbConfig';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LibraryComponent } from './components/library.component';
import { SongComponent } from './components/song.component';
import { LyricComponent } from './components/lyric.component';

@NgModule({
  declarations: [
    AppComponent,
    LibraryComponent,
    SongComponent,
    LyricComponent,
    // LyricComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(fbConfig),
    AngularFireDatabaseModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

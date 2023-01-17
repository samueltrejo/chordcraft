import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LibraryComponent } from './components/library.component';
import { SongComponent } from './components/song.component';
import { LyricComponent } from './components/lyric.component';
import { NavbarComponent } from './components/navbar.component';
import { ChordComponent } from './components/chord.component';

@NgModule({
  declarations: [
    AppComponent,
    LibraryComponent,
    SongComponent,
    LyricComponent,
    NavbarComponent,
    ChordComponent,
    // LyricComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

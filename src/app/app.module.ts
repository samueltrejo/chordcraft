import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LibraryComponent } from './components/library.component';
import { SongComponent } from './components/song.component';
import { LyricComponent } from './components/lyric.component';
import { NavbarComponent } from './components/navbar.component';
import { ChordComponent } from './components/chord.component';
import { GroupsComponent } from './components/groups.component';
import { HomeComponent } from './components/home.component';
import { RegisterComponent } from './components/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LibraryComponent,
    SongComponent,
    LyricComponent,
    NavbarComponent,
    ChordComponent,
    GroupsComponent,
    HomeComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

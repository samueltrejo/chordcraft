import { Component, OnInit } from '@angular/core';
// import { FirebaseService } from 'src/app/services/firebase.service';
import { Song } from 'src/app/models/song';
import { Router } from '@angular/router';
import { push, remove } from 'firebase/database';
import { Location } from '@angular/common';
import { SongService } from '../services/song.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-library',
  template: `
  <div class="library container p-0">
    <ul class="list-group">
      <!-- <li class="list-group-item title-row">
        <div class="d-flex justify-content-end">
          <div class="me-2 {{path === '/songs' ? 'library-nav-active' : 'library-nav'}}" routerLink="/songs">My Songs</div>
          <div class="{{path === '/groups' ? 'library-nav-active' : 'library-nav'}}" routerLink="/groups">Groups</div>
        </div>
      </li> -->
      <li class="list-group-item title-row">
        <div class="row mx-0">
          <div class="col-6 px-0">Title</div>
          <div class="col-6 px-0 align-self-center">Genres</div>
        </div>
      </li>
      <li *ngFor="let song of songs" class="list-group-item" (click)="goToSong($event, song.id)">
        <div class="row mx-0">
          <div class="col-6 px-0">
            <div style="font-weight: bold;">{{song.title}}</div>
            <div style="font-style: italic;">{{song.artist}}</div>
          </div>
          <div class="col-6 px-0 align-self-center justify-content-between">
            <div class="d-flex justify-content-between">
              <div><span *ngFor="let genre of song.genres">{{genre}} </span></div>
              <button id="delete-song-btn" class="btn btn-outline-primary btn-sm me-2 delete-song-btn" (click)="deleteSong(song.id)"><i id="delete-song-icon" class="bi bi-trash-fill"></i></button>
            </div>
          </div>
        </div>
      </li>
      <li class="list-group-item lib-song text-end" (click)="newSong()">
        <span>New Song</span>
        <!-- <i class="bi bi-music-note"></i> -->
        <i class="bi bi-plus"></i>
      </li>
    </ul>
  </div>
  `,
  styles: [
  ]
})
export class LibraryComponent implements OnInit {
  songs: Song[];
  // sharedSongs: Song[];

  constructor(
    private songService: SongService,
    // private location: Location,
    private router: Router) { }

  ngOnInit(): void {
    // this.path = this.location.path();
    this.getSongs();
  }

  getSongs(): void {
    this.songService.songsObserver.subscribe((songs) => {
      this.songs = songs;
    });
    this.songService.getSongs();
  }

  goToSong($event, songId: string): void {
    const elementId = $event.srcElement.id;
    if (elementId !== 'delete-song-btn' && elementId !== 'delete-song-icon') {
      this.router.navigate(['songs/' + songId]);
    }
  }

  newSong(): void {
    this.songService.addSong();
  }

  deleteSong(songId: string): void {
    this.songService.deleteSong(songId);
  }

}

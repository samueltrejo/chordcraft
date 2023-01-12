import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Song } from 'src/app/models/song';
import { Router } from '@angular/router';
import { push } from 'firebase/database';

@Component({
  selector: 'app-library',
  template: `
  <div class="library container p-0">
    <ul class="list-group">
      <li *ngFor="let song of songs" class="list-group-item" routerLink="{{song.id}}">{{song.title}}</li>
      <li class="list-group-item lib-song" (click)="newSong()">new song +</li>
    </ul>
  </div>
  `,
  styles: [
  ]
})
export class LibraryComponent implements OnInit {
  songs: Song[];
  isAuth: boolean = false;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router) { }

  ngOnInit(): void {
    this.populateData();
  }

  populateData(): void {
    this.isAuth = this.firebaseService.isAuth;
    this.songs = this.firebaseService.songs;
  }

  newSong(): void {
    const song: Song = {
      title: 'My Awsome Song',
      artist: this.firebaseService.user.displayName,
      lyrics: 'My [G]awsome song lyrics'
    }
    push(this.firebaseService.songsRef, song).then(x => this.router.navigate([x.key]));
  }

}

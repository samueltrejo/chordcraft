import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Song } from 'src/app/models/song';
import { DatabaseReference, onValue, push, child } from 'firebase/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-library',
  template: `
  <app-navbar></app-navbar>
  <div class="library container mt-3">
    <!-- <button class="btn btn-primary" (click)="googleSignIn()">sign in</button><br>
    <button class="btn btn-primary" (click)="googleSignOut()">sign out</button> -->
    <ul class="list-group">
      <li *ngFor="let song of songs" class="list-group-item bg-secondary" routerLink="{{song.id}}">{{song.title}}</li>
      <li class="list-group-item lib-song bg-secondary" (click)="newSong()">new song +</li>
    </ul>
  </div>
  `,
  styles: [
  ]
})
export class LibraryComponent implements OnInit {
  songs: any;
  songsRef: DatabaseReference;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router) { }

  ngOnInit(): void {
    this.getSongs();
  }

  googleSignIn() {
    this.firebaseService.googleSignIn();
  }

  googleSignOut() {
    this.firebaseService.googleSignOut();
  }

  getSongs(): void {
    this.songsRef = this.firebaseService.getSongsRef();
    onValue(this.songsRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      this.songs = Object.keys(data).map(songId => {
        data[songId].id = songId;
        return data[songId];
      });
    })
  }

  newSong(): void {
    const song: Song = {
      title: 'my new song...',
      artist: '',
      // genres: [],
      lyrics: ''
    }

    push(this.songsRef, song).then(x => this.router.navigate([x.key]));
  }

}

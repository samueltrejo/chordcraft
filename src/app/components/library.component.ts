import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Song } from 'src/app/models/song';
import { DatabaseReference, onValue, push, child } from 'firebase/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-library',
  template: `
  <div class="library container mt-5">
    <ul class="list-group">
      <li *ngFor="let song of songs" class="list-group-item" routerLink="{{song.id}}">{{song.title}}</li>
      <!-- <li class="list-group-item lib-song" (click)="newSong()">new song +</li> -->
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

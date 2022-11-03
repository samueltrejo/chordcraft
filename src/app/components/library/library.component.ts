import { Component, NgZone, OnInit } from '@angular/core';

// import { initializeApp } from "firebase/app";
// import { getDatabase, ref, onValue, get, set } from "firebase/database";
import { Song } from 'src/app/models/song';

const firebaseConfig = {
  apiKey: "AIzaSyDGvNAWeJsXvR1CsaC6eNL1EENzAiNsI44",
  authDomain: "chordcraft.firebaseapp.com",
  databaseURL: "https://chordcraft.firebaseio.com",
  projectId: "chordcraft",
  storageBucket: "chordcraft.appspot.com",
  messagingSenderId: "676185985496",
  appId: "1:676185985496:web:4f05397864d339ce70e2ad",
  measurementId: "G-Y8WT83KHTX"
};

// const app = initializeApp(firebaseConfig);
// const database = getDatabase(app);

// const songsRef = ref(database, 'songs/');

@Component({
  selector: 'app-library',
  template: `
  <div class="container mt-5">
    <ul class="list-group">
      <li *ngFor="let song of songs" class="list-group-item lib-song" routerLink="{{song.id}}">{{song.title}}</li>
    </ul>
  </div>
  `,
  styles: [
  ]
})
export class LibraryComponent implements OnInit {
  public songs: Song[] = [];

  constructor(private zone: NgZone) { }

  ngOnInit(): void {
    // onValue(songsRef, (snapshot) => {
    //   const dbSongs = snapshot.val();
    //   Object.keys(dbSongs).forEach((songId) => {
    //     dbSongs[songId].id = songId;
    //     this.zone.run(() => {
    //       this.songs.push(dbSongs[songId]);
    //     });
    //   });
    // });
  }

}

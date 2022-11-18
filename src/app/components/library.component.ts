import { Component, NgZone, OnInit } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Song } from 'src/app/models/song';

@Component({
  selector: 'app-library',
  template: `
  <div class="container mt-5">
    <ul class="list-group">
      <li *ngFor="let song of songs" class="list-group-item lib-song" routerLink="{{song.id}}">{{song.title}}</li>
      <li class="list-group-item lib-song" (click)="newSong()">new song +</li>
    </ul>
  </div>
  `,
  styles: [
  ]
})
export class LibraryComponent implements OnInit {
  songs: any;

  constructor(
    private zone: NgZone,
    private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.getSongs();
  }

  getSongs(): void {
    this.firebaseService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.songs = data;
    });
  }

  newSong(): void {
    const song: Song = {
      id: '',
      title: 'new song',
      artist: 'artist here',
      genres: [],
      lyrics: 'lyrics here'
    }
  }

}

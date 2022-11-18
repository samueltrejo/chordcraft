import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { FirebaseService } from 'src/app/services/firebase.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-song',
  template: `
    <div *ngIf="song" class="song container my-5 p-4 text-light" (keyup)="autoSave()">
      <div id="song-title">{{song.title}}</div>
      <!-- <div id="song-genres">{{song.genres}}</div> -->
      <div>
        <span *ngFor="let genre of song.genres" class="badge bg-light text-dark">{{genre}} <i class="bi bi-x" (click)="removeGenre(genre)"></i></span>
      </div>
      <div id="song-artist" class="mt-2">{{song.artist}}</div>

      <div class="lyrics-menu mt-3">
        <button class="btn btn-light btn-sm" (click)="toggleEdit()">Edit</button>
        <button class="btn btn-light btn-sm ms-3" (click)="transpose()">Transpose</button>
        <button class="btn btn-light btn-sm ms-3" (click)="updateSong()">Save</button>
      </div>

      <div *ngIf="!isEdit" class="song-lyrics mt-3">
        <table>
          <tbody *ngFor="let lyric of song.lyrics.split('\n')">
            <app-lyric [lyric]="lyric"></app-lyric>
          </tbody>
        </table>
      </div>

      <div *ngIf="isEdit">
        <textarea class="song-textarea text-light" rows="{{song.lyrics.split('\n').length}}">{{song.lyrics}}</textarea>
      </div>
    </div>

      <!-- <div id="sermon" class="h-100 w-100 border-0" style="padding-top: 12rem;" [innerHTML]="sermon.data" (click)="deletetverse($event)" (keyup)="autoSaveData()"></div> -->
      <!-- <div id="sermon" class="h-100 w-100 border-0" style="padding-top: 12rem;"></div> -->
  `,
  styles: [
  ]
})
export class SongComponent implements OnInit {
  songs: any;
  song: any;
  songId: string;
  isEdit: boolean = false;

  constructor(
    private firebaseService: FirebaseService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.songId = this.route.snapshot.paramMap.get("songId");
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
      this.song = data.find(x => x.id == this.songId);
    });
  }

  autoSave(): void {
    const songTitle = (document.getElementById('song-title') as HTMLInputElement).innerText;
    const songArtist = (document.getElementById('song-artist') as HTMLInputElement).innerText;
    // const songTitle = (document.getElementById('song-title') as HTMLInputElement).innerText;
    console.log(songTitle, songArtist);
  }

  removeGenre(genre: string): void {
    this.song.genres = this.song.genres.filter(x => x != genre)
  }

  toggleEdit($event: any): void {
    this.isEdit = !this.isEdit;
  }

  transpose(): void {
    const notes = ['a', 'a#', 'b', 'c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a'];
    let lyrics = this.song.lyrics;
    let transposedLyrics = "";
    while (lyrics.indexOf('[') !== -1) {
      const bracketPos1 = lyrics.indexOf('[');
      const bracketPos2 = lyrics.indexOf(']');
      transposedLyrics += lyrics.slice(0, bracketPos1 + 1);
      
      let chord = lyrics.slice(bracketPos1 + 1, bracketPos2);
      let chordNote;
      if (chord[1] == '#') {
        chordNote = chord.slice(0, 2).toLowerCase();
        chord = chord.slice(2);
      } else {
        chordNote = chord[0].toLowerCase();
        chord = chord.slice(1);
      }

      chord = notes[notes.indexOf(chordNote) + 1].toUpperCase() + chord;
      transposedLyrics += chord + ']';

      lyrics = lyrics.slice(bracketPos2 + 1);
    }
    this.song.lyrics = transposedLyrics;
  }

}

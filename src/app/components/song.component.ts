import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { child, DatabaseReference, get, ref, set } from "firebase/database";
import { Song } from '../models/song';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-song',
  template: `
    <div *ngIf="song" class="song container my-5 p-4 text-light" (keyup)="autoSave($event)">

      <form *ngIf="songForm" [formGroup]="songForm">

      <!-- song info -->
        <input id="title" class="d-block" formControlName="title" autocomplete="off" placeholder="Title">
        <input id="artist" class="d-block" formControlName="artist" autocomplete="off" placeholder="Artist">

        <!-- menu buttons -->
        <i class="bi bi-pencil" (click)="toggleEdit()"></i>
        <i class="bi bi-journal-arrow-down" (click)="transpose(false)"></i>
        <i class="bi bi-journal-arrow-up" (click)="transpose(true)"></i>

        <!-- song table -->
        <div *ngIf="!isEdit" class="song-lyrics mt-3">
          <table>
            <tbody *ngFor="let lyric of songForm.value.lyrics.split('\n')">
              <app-lyric [lyric]="lyric"></app-lyric>
            </tbody>
          </table>
        </div>

        <!-- song textarea -->
        <div *ngIf="isEdit">
          <!-- <textarea id="song-lyrics" class="song-textarea text-light" rows="{{song.lyrics.split('\n').length}}">{{song.lyrics}}</textarea> -->
          <textarea id="lyrics" class="song-textarea text-light" rows="{{song.lyrics.split('\n').length}}" formControlName="lyrics" placeholder="Lyrics"></textarea>
        </div>
      </form>

      <!-- song genres -->
      <!-- <div id="song-genres" class="mt-2">
        <span *ngFor="let genre of song.genres" class="badge bg-light text-dark me-2">{{genre}} <i class="bi bi-x" (click)="removeGenre(genre)"></i></span>
        <span class="badge bg-light text-dark"><i class="bi bi-plus" (click)="addGenre()"></i></span>
      </div> -->
    </div>

      <!-- <div id="sermon" class="h-100 w-100 border-0" style="padding-top: 12rem;" [innerHTML]="sermon.data" (click)="deletetverse($event)" (keyup)="autoSaveData()"></div> -->
      <!-- <div id="sermon" class="h-100 w-100 border-0" style="padding-top: 12rem;"></div> -->
  `,
  styles: [
  ]
})
export class SongComponent implements OnInit {
  songId: string;
  song: Song;
  songsRef: DatabaseReference;
  songForm: FormGroup;
  isEdit: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.songId = this.route.snapshot.paramMap.get("songId");
    this.songsRef = this.firebaseService.getSongsRef();
    this.getSongs();
  }

  getSongs(): void {
    get(child(this.songsRef, '/' + this.songId)).then(snapshot => {
      const data: Song = snapshot.val();
      data.id = this.songId;
      this.song = data;
      console.log(this.song);

      this.songForm = this.fb.group({
        title: [this.song.title],
        artist: [this.song.artist],
        lyrics: [this.song.lyrics]
      });
    });
  }

  autoSave($event): void {
    console.log($event.target.id);
    console.log(this.songForm.value);

    const songRef = this.firebaseService.getSongRef(this.songId);
    set(songRef, this.songForm.value);
  }

  // removeGenre(genre: string): void {
  //   this.song.genres = this.song.genres.filter(x => x != genre)
  // }

  // addGenre(): void {
    
  // }

  toggleEdit($event: any): void {
    this.isEdit = !this.isEdit;
  }

  transpose(transposeUp: boolean): void {
    const transposeVal = transposeUp ? 1 : -1;
    const notes = ['a', 'a#', 'b', 'c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a'];
    let lyrics = this.songForm.value['lyrics'];
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

      if (transposeUp && notes.indexOf(chordNote) == 11) {
        chord = notes[0].toUpperCase() + chord;
      } else if (!transposeUp && notes.indexOf(chordNote) == 0) {
        chord = notes[11].toUpperCase() + chord;
      } else {
        chord = notes[notes.indexOf(chordNote) + transposeVal].toUpperCase() + chord;
      }
      transposedLyrics += chord + ']';

      lyrics = lyrics.slice(bracketPos2 + 1);
      console.log(lyrics);

      if (lyrics.indexOf('[') == -1) {
        if (lyrics.length != 0) {
          transposedLyrics += lyrics;
        }
      }
    }
    this.songForm.controls['lyrics'].setValue(transposedLyrics);
  }

}

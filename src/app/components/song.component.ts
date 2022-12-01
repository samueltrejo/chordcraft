import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { child, DatabaseReference, get, ref, set } from "firebase/database";
import { Song } from '../models/song';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-song',
  template: `
    <div *ngIf="song" class="song">

      <div class="song-container container p-4">
        <form *ngIf="songForm" [formGroup]="songForm" (keyup)="autoSave()">
  
          <!-- song info -->
          <div id="song-genres" class="mt-2">
            <span *ngFor="let genre of song.genres" class="badge bg-primary me-2">{{genre}} <i class="bi bi-x" (click)="removeGenre(genre)"></i></span>
            <span class="badge bg-primary" data-bs-toggle="modal" data-bs-target="#genre-modal">Add Genre<i class="bi bi-plus"></i></span>
          </div>

          <div class="song-info">
            <input class="song-title d-block" formControlName="title" autocomplete="off" placeholder="Title">
            <input class="song-artist d-block" formControlName="artist" autocomplete="off" placeholder="Artist">
          </div>

          <!-- menu buttons -->
          <div class="song-menu d-flex mt-2">
            <button class="btn btn-outline-primary btn-sm me-2" (click)="toggleEdit()">Edit Lyrics</button>
            <button class="btn btn-outline-primary btn-sm me-2" (click)="transpose(false)">Transpose Down</button>
            <button class="btn btn-outline-primary btn-sm me-2" (click)="transpose(true)">Transpose Up</button>
          </div>
  
          <!-- song table -->
          <div *ngIf="!isEdit" class="song-table mt-2">
            <table>
              <tbody *ngFor="let lyric of songForm.value.lyrics.split('\n')">
                <app-lyric [lyric]="lyric"></app-lyric>
              </tbody>
            </table>
          </div>
  
          <!-- song textarea -->
          <div *ngIf="isEdit" class="mt-2">
            <!-- <textarea class="song-textarea" rows="{{song.lyrics.split('\n').length}}">{{song.lyrics}}</textarea> -->
            <textarea #lyrics id="lyrics" class="song-textarea" formControlName="lyrics" placeholder="Lyrics" autofocus></textarea>
          </div>

        </form>
      </div>

      <!-- genre modal -->
      <div class="genre-modal modal fade" id="genre-modal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <div class="modal-title" id="exampleModalLabel">Add a genre</div>
              <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> -->
              <i class="bi bi-x-circle" data-bs-dismiss="modal"></i>
            </div>
            <div class="modal-body position-relative">
              <!-- <input class="song-genre d-block" formControlName="title" autocomplete="off" placeholder="Genre"> -->
              <input #genre class="song-genre d-block" autocomplete="off" placeholder="Genre">
              <i class="genre-submit bi bi-send-fill" (click)="addGenre(genre)"></i>
            </div>
          </div>
        </div>
      </div>

    </div>
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

  @ViewChild('lyrics') textArea;

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

      if (this.song.genres == null) {
        this.song.genres = [];
      }

      console.log(this.song);

      this.songForm = this.fb.group({
        title: [this.song.title],
        artist: [this.song.artist],
        lyrics: [this.song.lyrics],
        genres: [this.song.genres]
      });
    });
  }

  autoSave(): void {
    console.log(this.songForm.value);

    const songRef = this.firebaseService.getSongRef(this.songId);
    set(songRef, this.songForm.value);
  }

  removeGenre(genre: string): void {
    this.song.genres = this.song.genres.filter(x => x != genre);
    this.songForm.controls['genres'].setValue(this.song.genres);
    this.autoSave();
  }

  addGenre(ref: any): void {
    if (ref.value != null && ref.value != '') {
      this.song.genres.push(ref.value);
      this.songForm.controls['genres'].setValue(this.song.genres);
      this.autoSave();
    }
  }

  toggleEdit(): void {
    this.isEdit = !this.isEdit;
    if (this.isEdit) {
      setTimeout(x => document.getElementById('lyrics').focus(), 100);
    }
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

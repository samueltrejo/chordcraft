import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { onValue } from 'firebase/database';
import { Subject } from 'rxjs';
import { Song } from '../models/song';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  private url: string = "/api/songs";
  // private songId: string;

  public songsObserver: Subject<Song[]> = new Subject<Song[]>();
  public songObserver: Subject<Song> = new Subject<Song>();
  private songListener;
  
  constructor(
    private router: Router,
    private http: HttpClient,
    private userService: UserService) {
    // this.songsObserver.subscribe(value => this.songs = value);

    // this.songsDataListener();
  }

  getSongs(): void {
    this.http.get<Song[]>(this.url + '/' + this.userService.user.uid)
      .subscribe((data) => {
        this.songsObserver.next(data);
      });
  }

  getSong(songId: string): void {
    // this.songId = songId;
    this.http.get<Song>(this.url + '/' + this.userService.user.uid + '/' + songId)
      .subscribe((data) => {
        console.log(data);
        this.songObserver.next(data);
      });
  }

  addSong(): void {
    const song: Song = {
      ownerId: this.userService.user.uid,
      title: 'My new song',
      artist: 'Chordcraft',
      genres: ['misc'],
      chords: ['G', 'C', 'D'],
      lyrics: 'My new s[G]ong in chordcraft.'
    }
    this.http.post(this.url, song, { responseType: 'text' }).subscribe((data) => this.router.navigate(['songs/' + data]));
  }

  updateSong(songId: string, song: Song): void {
    this.http.put(this.url + '/' + this.userService.user.uid + '/' + songId, song, { responseType: 'text' }).subscribe((data) => console.log(data));
  }

  deleteSong(songId: string): void {
    this.http.delete(this.url + '/' + songId).subscribe(() => {
      // TODO: error handle
      this.getSongs();
    });
  }

  initSongListener(songId: string): void {
    const songsRef = this.userService.getDbRef('songs/' + songId);
    this.songListener = onValue(songsRef, () => {
      this.getSong(songId);
    });
  }

  unsubsbribeSongListener(): void {
    this.songListener();
  }

}

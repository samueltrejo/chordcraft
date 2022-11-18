import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Song } from '../models/song';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private path = '/songs';
  songs : AngularFireList<Song> = null;

  constructor(private database: AngularFireDatabase) {
    this.songs = database.list(this.path);
  }

  getAll(): AngularFireList<Song> {
    return this.songs;
  }

  create(song: Song): any {
    return this.songs.push(song);
  }

  update(songId: string, song: Song): Promise<void> {
    return this.songs.update(songId, song);
  }

  delete(songId: string): Promise<void> {
    return this.songs.remove(songId);
  }
}

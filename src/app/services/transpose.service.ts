import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Song } from '../models/song';

@Injectable({
  providedIn: 'root'
})
export class TransposeService {
  // private path = '/songs';
  // songs : AngularFireList<Song> = null;

  constructor() {}
}

import { Injectable } from '@angular/core';
import { Song } from '../models/song';

import { FirebaseApp, initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, Database, DatabaseReference} from "firebase/database";
import { fbConfig } from '../models/fbConfig';
import { GoogleAuthProvider } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private path = '/songs';
  private app: FirebaseApp
  private db: Database;
  private google: GoogleAuthProvider;

  constructor() {
      // Initialize Firebase
      this.app = initializeApp(fbConfig);
      this.db = getDatabase();
      this.google = new GoogleAuthProvider();
  }

  getSongsRef(): DatabaseReference {
    return ref(this.db, '/songs');
  }

  getSongRef(songId: string): DatabaseReference {
    return ref(this.db, '/songs/' + songId);
  }
}

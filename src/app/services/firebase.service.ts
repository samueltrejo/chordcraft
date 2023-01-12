import { Injectable } from '@angular/core';
import { Song } from '../models/song';

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, Database, DatabaseReference, off} from "firebase/database";
import { fbConfig } from '../models/fbConfig';
import { GoogleAuthProvider, getAuth, signInWithRedirect, getRedirectResult, Auth, signInWithPopup, onAuthStateChanged, signOut, User } from 'firebase/auth';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private readonly path = '/songs';
  private db: Database;
  private google: GoogleAuthProvider;
  private auth: Auth;

  user: User;
  isAuth: boolean = false;
  isAuthObserver: Subject<boolean> = new Subject<boolean>();

  songsRef: DatabaseReference;
  songs: Song[];
  songsObserver: Subject<Song[]> = new Subject<Song[]>();

  constructor() {
    // Initialize Firebase
    initializeApp(fbConfig);
    this.db = getDatabase();

    // Initialize Auth
    this.google = new GoogleAuthProvider();
    this.auth = getAuth();

    // Get Auth Info
    this.isAuthObserver.subscribe(value => this.isAuth = value);
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.user = user;
        this.initSongsRef(user.uid);
      } else {

      }
    });
  }

  googleSignIn() {
    signInWithRedirect(this.auth, this.google);
  }

  googleSignOut() {
    signOut(this.auth).then(() => {
      this.user = null;
      this.isAuthObserver.next(false);
    }).catch((error) => {
      console.log('An error happened while logging out. ' + error);
    });
  }

  initSongsRef(uid: string): void {
    this.songsRef = ref(this.db, '/' + uid + this.path);
    onValue(this.songsRef, (snapshot) => {
      const data = snapshot.val();
      const songs: Song[] = Object.keys(data).map(songId => {
        data[songId].id = songId;
        return data[songId];
      });
      this.songs = songs;
      this.isAuthObserver.next(true);
    })
  }

  getSongRef(songId: string): DatabaseReference {
    return ref(this.db, '/' + this.user.uid + this.path + "/" + songId);
  }
}

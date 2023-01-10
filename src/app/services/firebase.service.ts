import { Injectable } from '@angular/core';
import { Song } from '../models/song';

import { FirebaseApp, initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, Database, DatabaseReference} from "firebase/database";
import { fbConfig } from '../models/fbConfig';
import { GoogleAuthProvider, getAuth, signInWithRedirect, getRedirectResult, Auth, signInWithPopup, onAuthStateChanged, signOut, User } from 'firebase/auth';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private readonly path = '/songs';
  private app: FirebaseApp
  private db: Database;
  private google: GoogleAuthProvider;
  private auth: Auth;

  user: User;
  userObserver: Subject<User> = new Subject<User>();

  constructor() {
    // Initialize Firebase
    this.app = initializeApp(fbConfig);
    this.db = getDatabase();

    // Initialize Auth
    this.google = new GoogleAuthProvider();
    this.auth = getAuth();

    // Get Auth Info
    this.userObserver.subscribe(value => this.user = value);
    onAuthStateChanged(this.auth, (user) => { this.userObserver.next(user) });
  }

  // getUser(): User {
  //   return this.user;
  // }

  googleSignIn() {
    signInWithRedirect(this.auth, this.google);
  }

  googleSignOut() {
    signOut(this.auth).then(() => {
      console.log('Sign-out successful.');
    }).catch((error) => {
      // An error happened.
    });
  }

  getSongsRef(): DatabaseReference {
    return ref(this.db, this.path);
  }

  getSongRef(songId: string): DatabaseReference {
    return ref(this.db, this.path + "/" + songId);
  }
}

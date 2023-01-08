import { Injectable } from '@angular/core';
import { Song } from '../models/song';

import { FirebaseApp, initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, Database, DatabaseReference} from "firebase/database";
import { fbConfig } from '../models/fbConfig';
import { GoogleAuthProvider, getAuth, signInWithRedirect, getRedirectResult, Auth, signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private path = '/songs';
  private app: FirebaseApp
  private db: Database;
  private google: GoogleAuthProvider;
  private auth: Auth;

  constructor() {
    // Initialize Firebase
    this.app = initializeApp(fbConfig);
    this.db = getDatabase();

    // Initialize Auth
    this.google = new GoogleAuthProvider();
    this.auth = getAuth();

    // Get Auth Info
    onAuthStateChanged(this.auth, (user) => {
      console.log('test');
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        console.log(user);
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }

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
    return ref(this.db, '/songs');
  }

  getSongRef(songId: string): DatabaseReference {
    return ref(this.db, '/songs/' + songId);
  }
}

import { Injectable } from '@angular/core';
import { Song } from '../models/song';

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, Database, DatabaseReference, off} from "firebase/database";
import { fbConfig } from '../models/fbConfig';
import { GoogleAuthProvider, getAuth, signInWithRedirect, getRedirectResult, Auth, signInWithPopup, onAuthStateChanged, signOut, User } from 'firebase/auth';
import { Subject } from 'rxjs';
import { Howl } from 'howler';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private readonly path = '/songs';
  private db: Database;
  private google: GoogleAuthProvider;
  private auth: Auth;

  private notes = {
    a: new Howl({ src: ['assets/a.wav'] }),
    as: new Howl({ src: ['assets/as.wav'] }),
    b: new Howl({ src: ['assets/b.wav'] }),
    c: new Howl({ src: ['assets/c.wav'] }),
    cs: new Howl({ src: ['assets/cs.wav'] }),
    d: new Howl({ src: ['assets/d.wav'] }),
    ds: new Howl({ src: ['assets/ds.wav'] }),
    e: new Howl({ src: ['assets/e.wav'] }),
    f: new Howl({ src: ['assets/f.wav'] }),
    fs: new Howl({ src: ['assets/fs.wav'] }),
    g: new Howl({ src: ['assets/g.wav'] }),
    gs: new Howl({ src: ['assets/gs.wav'] })
  };

  chords = [
    { name: 'a', root: this.notes.a, quality: '', notes: [ this.notes.cs, this.notes.e ] },
    { name: 'a#', root: this.notes.as, quality: '', notes: [ this.notes.d, this.notes.f ] },
    { name: 'b', root: this.notes.b, quality: '', notes: [ this.notes.ds, this.notes.fs ] },
    { name: 'c', root: this.notes.c, quality: '', notes: [ this.notes.e, this.notes.g ] },
    { name: 'c#', root: this.notes.cs, quality: '', notes: [ this.notes.f, this.notes.gs ] },
    { name: 'd', root: this.notes.d, quality: '', notes: [ this.notes.fs, this.notes.a ] },
    { name: 'd#', root: this.notes.ds, quality: '', notes: [ this.notes.g, this.notes.as ] },
    { name: 'e', root: this.notes.e, quality: '', notes: [ this.notes.gs, this.notes.b ] },
    { name: 'f', root: this.notes.f, quality: '', notes: [ this.notes.a, this.notes.c ] },
    { name: 'f#', root: this.notes.fs, quality: '', notes: [ this.notes.as, this.notes.cs ] },
    { name: 'g', root: this.notes.g, quality: '', notes: [ this.notes.b, this.notes.d ] },
    { name: 'g#', root: this.notes.gs, quality: '', notes: [ this.notes.c, this.notes.ds ] },
    { name: 'am', root: this.notes.a, quality: 'm', notes: [ this.notes.c, this.notes.e ] },
    { name: 'a#m', root: this.notes.as, quality: 'm', notes: [ this.notes.cs, this.notes.f ] },
    { name: 'bm', root: this.notes.b, quality: 'm', notes: [ this.notes.d, this.notes.fs ] },
    { name: 'cm', root: this.notes.c, quality: 'm', notes: [ this.notes.ds, this.notes.g ] },
    { name: 'c#m', root: this.notes.cs, quality: 'm', notes: [ this.notes.e, this.notes.gs ] },
    { name: 'dm', root: this.notes.d, quality: 'm', notes: [ this.notes.f, this.notes.a ] },
    { name: 'd#m', root: this.notes.ds, quality: 'm', notes: [ this.notes.fs, this.notes.as ] },
    { name: 'em', root: this.notes.e, quality: 'm', notes: [ this.notes.g, this.notes.b ] },
    { name: 'fm', root: this.notes.f, quality: 'm', notes: [ this.notes.gs, this.notes.c ] },
    { name: 'f#m', root: this.notes.fs, quality: 'm', notes: [ this.notes.a, this.notes.cs ] },
    { name: 'gm', root: this.notes.g, quality: 'm', notes: [ this.notes.as, this.notes.d ] },
    { name: 'g#m', root: this.notes.gs, quality: 'm', notes: [ this.notes.b, this.notes.ds ] },
    { name: 'a5', root: this.notes.a, quality: '5', notes: [ this.notes.cs ] },
    { name: 'a#5', root: this.notes.as, quality: '5', notes: [ this.notes.d ] },
    { name: 'b5', root: this.notes.b, quality: '5', notes: [ this.notes.ds ] },
    { name: 'c5', root: this.notes.c, quality: '5', notes: [ this.notes.e ] },
    { name: 'c#5', root: this.notes.cs, quality: '5', notes: [ this.notes.f ] },
    { name: 'd5', root: this.notes.d, quality: '5', notes: [ this.notes.fs ] },
    { name: 'd#5', root: this.notes.ds, quality: '5', notes: [ this.notes.g ] },
    { name: 'e5', root: this.notes.e, quality: '5', notes: [ this.notes.gs ] },
    { name: 'f5', root: this.notes.f, quality: '5', notes: [ this.notes.a ] },
    { name: 'f#5', root: this.notes.fs, quality: '5', notes: [ this.notes.as ] },
    { name: 'g5', root: this.notes.g, quality: '5', notes: [ this.notes.b ] },
    { name: 'g#5', root: this.notes.gs, quality: '5', notes: [ this.notes.c ] },
    { name: 'a6', root: this.notes.a, quality: '', notes: [ this.notes.cs, this.notes.e, this.notes.fs ] },
    { name: 'a#6', root: this.notes.as, quality: '', notes: [ this.notes.d, this.notes.f, this.notes.g ] },
    { name: 'b6', root: this.notes.b, quality: '', notes: [ this.notes.ds, this.notes.fs, this.notes.gs ] },
    { name: 'c6', root: this.notes.c, quality: '', notes: [ this.notes.e, this.notes.g, this.notes.a ] },
    { name: 'c#6', root: this.notes.cs, quality: '', notes: [ this.notes.f, this.notes.gs, this.notes.as ] },
    { name: 'd6', root: this.notes.d, quality: '', notes: [ this.notes.fs, this.notes.a, this.notes.b ] },
    { name: 'd#6', root: this.notes.ds, quality: '', notes: [ this.notes.g, this.notes.as, this.notes.c ] },
    { name: 'e6', root: this.notes.e, quality: '', notes: [ this.notes.gs, this.notes.b, this.notes.cs ] },
    { name: 'f6', root: this.notes.f, quality: '', notes: [ this.notes.a, this.notes.c, this.notes.d ] },
    { name: 'f#6', root: this.notes.fs, quality: '', notes: [ this.notes.as, this.notes.cs, this.notes.ds ] },
    { name: 'g6', root: this.notes.g, quality: '', notes: [ this.notes.b, this.notes.d, this.notes.e ] },
    { name: 'g#6', root: this.notes.gs, quality: '', notes: [ this.notes.c, this.notes.ds, this.notes.f ] },
    { name: 'am6', root: this.notes.a, quality: '', notes: [ this.notes.c, this.notes.e, this.notes.fs ] },
    { name: 'a#m6', root: this.notes.as, quality: '', notes: [ this.notes.cs, this.notes.f, this.notes.g ] },
    { name: 'bm6', root: this.notes.b, quality: '', notes: [ this.notes.d, this.notes.fs, this.notes.gs ] },
    { name: 'cm6', root: this.notes.c, quality: '', notes: [ this.notes.ds, this.notes.g, this.notes.a ] },
    { name: 'c#m6', root: this.notes.cs, quality: '', notes: [ this.notes.e, this.notes.gs, this.notes.as ] },
    { name: 'dm6', root: this.notes.d, quality: '', notes: [ this.notes.f, this.notes.a, this.notes.b ] },
    { name: 'd#m6', root: this.notes.ds, quality: '', notes: [ this.notes.fs, this.notes.as, this.notes.c ] },
    { name: 'em6', root: this.notes.e, quality: '', notes: [ this.notes.g, this.notes.b, this.notes.cs ] },
    { name: 'fm6', root: this.notes.f, quality: '', notes: [ this.notes.gs, this.notes.c, this.notes.d ] },
    { name: 'f#m6', root: this.notes.fs, quality: '', notes: [ this.notes.a, this.notes.cs, this.notes.ds ] },
    { name: 'gm6', root: this.notes.g, quality: '', notes: [ this.notes.as, this.notes.d, this.notes.e ] },
    { name: 'g#m6', root: this.notes.gs, quality: '', notes: [ this.notes.b, this.notes.ds, this.notes.f ] },
    { name: 'a7', root: this.notes.a, quality: '', notes: [ this.notes.cs, this.notes.e, this.notes.g ] },
    { name: 'a#7', root: this.notes.as, quality: '', notes: [ this.notes.d, this.notes.f, this.notes.gs ] },
    { name: 'b7', root: this.notes.b, quality: '', notes: [ this.notes.ds, this.notes.fs, this.notes.a ] },
    { name: 'c7', root: this.notes.c, quality: '', notes: [ this.notes.e, this.notes.g, this.notes.as ] },
    { name: 'c#7', root: this.notes.cs, quality: '', notes: [ this.notes.f, this.notes.gs, this.notes.b ] },
    { name: 'd7', root: this.notes.d, quality: '', notes: [ this.notes.fs, this.notes.a, this.notes.c ] },
    { name: 'd#7', root: this.notes.ds, quality: '', notes: [ this.notes.g, this.notes.as, this.notes.cs ] },
    { name: 'e7', root: this.notes.e, quality: '', notes: [ this.notes.gs, this.notes.b, this.notes.d ] },
    { name: 'f7', root: this.notes.f, quality: '', notes: [ this.notes.a, this.notes.c, this.notes.ds ] },
    { name: 'f#7', root: this.notes.fs, quality: '', notes: [ this.notes.as, this.notes.cs, this.notes.e ] },
    { name: 'g7', root: this.notes.g, quality: '', notes: [ this.notes.b, this.notes.d, this.notes.f ] },
    { name: 'g#7', root: this.notes.gs, quality: '', notes: [ this.notes.c, this.notes.ds, this.notes.fs ] },
    { name: 'am7', root: this.notes.a, quality: 'm', notes: [ this.notes.c, this.notes.e, this.notes.g ] },
    { name: 'a#m7', root: this.notes.as, quality: 'm', notes: [ this.notes.cs, this.notes.f, this.notes.gs ] },
    { name: 'bm7', root: this.notes.b, quality: 'm', notes: [ this.notes.d, this.notes.fs, this.notes.a ] },
    { name: 'cm7', root: this.notes.c, quality: 'm', notes: [ this.notes.ds, this.notes.g, this.notes.as ] },
    { name: 'c#m7', root: this.notes.cs, quality: 'm', notes: [ this.notes.e, this.notes.gs, this.notes.b ] },
    { name: 'dm7', root: this.notes.d, quality: 'm', notes: [ this.notes.f, this.notes.a, this.notes.c ] },
    { name: 'd#m7', root: this.notes.ds, quality: 'm', notes: [ this.notes.fs, this.notes.as, this.notes.cs ] },
    { name: 'em7', root: this.notes.e, quality: 'm', notes: [ this.notes.g, this.notes.b, this.notes.d ] },
    { name: 'fm7', root: this.notes.f, quality: 'm', notes: [ this.notes.gs, this.notes.c, this.notes.ds ] },
    { name: 'f#m7', root: this.notes.fs, quality: 'm', notes: [ this.notes.a, this.notes.cs, this.notes.e ] },
    { name: 'gm7', root: this.notes.g, quality: 'm', notes: [ this.notes.as, this.notes.d, this.notes.f ] },
    { name: 'g#m7', root: this.notes.gs, quality: 'm', notes: [ this.notes.b, this.notes.ds, this.notes.fs ] },
    { name: 'asus2', root: this.notes.a, quality: '', notes: [ this.notes.b, this.notes.e ] },
    { name: 'a#sus2', root: this.notes.as, quality: '', notes: [ this.notes.c, this.notes.f ] },
    { name: 'bsus2', root: this.notes.b, quality: '', notes: [ this.notes.cs, this.notes.fs ] },
    { name: 'csus2', root: this.notes.c, quality: '', notes: [ this.notes.d, this.notes.g ] },
    { name: 'c#sus2', root: this.notes.cs, quality: '', notes: [ this.notes.ds, this.notes.gs ] },
    { name: 'dsus2', root: this.notes.d, quality: '', notes: [ this.notes.e, this.notes.a ] },
    { name: 'd#sus2', root: this.notes.ds, quality: '', notes: [ this.notes.f, this.notes.as ] },
    { name: 'esus2', root: this.notes.e, quality: '', notes: [ this.notes.fs, this.notes.b ] },
    { name: 'fsus2', root: this.notes.f, quality: '', notes: [ this.notes.g, this.notes.c ] },
    { name: 'f#sus2', root: this.notes.fs, quality: '', notes: [ this.notes.gs, this.notes.cs ] },
    { name: 'gsus2', root: this.notes.g, quality: '', notes: [ this.notes.a, this.notes.d ] },
    { name: 'g#sus2', root: this.notes.gs, quality: '', notes: [ this.notes.as, this.notes.ds ] },
    { name: 'asus4', root: this.notes.a, quality: '', notes: [ this.notes.d, this.notes.e ] },
    { name: 'a#sus4', root: this.notes.as, quality: '', notes: [ this.notes.ds, this.notes.f ] },
    { name: 'bsus4', root: this.notes.b, quality: '', notes: [ this.notes.e, this.notes.fs ] },
    { name: 'csus4', root: this.notes.c, quality: '', notes: [ this.notes.f, this.notes.g ] },
    { name: 'c#sus4', root: this.notes.cs, quality: '', notes: [ this.notes.fs, this.notes.gs ] },
    { name: 'dsus4', root: this.notes.d, quality: '', notes: [ this.notes.g, this.notes.a ] },
    { name: 'd#sus4', root: this.notes.ds, quality: '', notes: [ this.notes.gs, this.notes.as ] },
    { name: 'esus4', root: this.notes.e, quality: '', notes: [ this.notes.a, this.notes.b ] },
    { name: 'fsus4', root: this.notes.f, quality: '', notes: [ this.notes.as, this.notes.c ] },
    { name: 'f#sus4', root: this.notes.fs, quality: '', notes: [ this.notes.b, this.notes.cs ] },
    { name: 'gsus4', root: this.notes.g, quality: '', notes: [ this.notes.c, this.notes.d ] },
    { name: 'g#sus4', root: this.notes.gs, quality: '', notes: [ this.notes.cs, this.notes.ds ] },
    { name: 'adim', root: this.notes.a, quality: '', notes: [ this.notes.c, this.notes.ds ] },
    { name: 'a#dim', root: this.notes.as, quality: '', notes: [ this.notes.cs, this.notes.e ] },
    { name: 'bdim', root: this.notes.b, quality: '', notes: [ this.notes.d, this.notes.f ] },
    { name: 'cdim', root: this.notes.c, quality: '', notes: [ this.notes.ds, this.notes.fs ] },
    { name: 'c#dim', root: this.notes.cs, quality: '', notes: [ this.notes.e, this.notes.g ] },
    { name: 'ddim', root: this.notes.d, quality: '', notes: [ this.notes.f, this.notes.gs ] },
    { name: 'd#dim', root: this.notes.ds, quality: '', notes: [ this.notes.fs, this.notes.a ] },
    { name: 'edim', root: this.notes.e, quality: '', notes: [ this.notes.g, this.notes.as ] },
    { name: 'fdim', root: this.notes.f, quality: '', notes: [ this.notes.gs, this.notes.b ] },
    { name: 'f#dim', root: this.notes.fs, quality: '', notes: [ this.notes.a, this.notes.c ] },
    { name: 'gdim', root: this.notes.g, quality: '', notes: [ this.notes.as, this.notes.cs ] },
    { name: 'g#dim', root: this.notes.gs, quality: '', notes: [ this.notes.b, this.notes.d ] },
    { name: 'aaug', root: this.notes.a, quality: '', notes: [ this.notes.cs, this.notes.f ] },
    { name: 'a#aug', root: this.notes.as, quality: '', notes: [ this.notes.d, this.notes.fs ] },
    { name: 'baug', root: this.notes.b, quality: '', notes: [ this.notes.ds, this.notes.g ] },
    { name: 'caug', root: this.notes.c, quality: '', notes: [ this.notes.e, this.notes.gs ] },
    { name: 'c#aug', root: this.notes.cs, quality: '', notes: [ this.notes.f, this.notes.a ] },
    { name: 'daug', root: this.notes.d, quality: '', notes: [ this.notes.fs, this.notes.as ] },
    { name: 'd#aug', root: this.notes.ds, quality: '', notes: [ this.notes.g, this.notes.b ] },
    { name: 'eaug', root: this.notes.e, quality: '', notes: [ this.notes.gs, this.notes.c ] },
    { name: 'faug', root: this.notes.f, quality: '', notes: [ this.notes.a, this.notes.cs ] },
    { name: 'f#aug', root: this.notes.fs, quality: '', notes: [ this.notes.as, this.notes.d ] },
    { name: 'gaug', root: this.notes.g, quality: '', notes: [ this.notes.b, this.notes.ds ] },
    { name: 'g#aug', root: this.notes.gs, quality: '', notes: [ this.notes.c, this.notes.e ] },
  ];

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

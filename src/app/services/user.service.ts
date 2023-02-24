import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { initializeApp } from 'firebase/app';
import { Database, DatabaseReference, getDatabase, ref } from 'firebase/database';
import { GoogleAuthProvider, getAuth, signInWithRedirect, Auth, onAuthStateChanged, signOut } from 'firebase/auth';

import { fbConfig } from '../models/fbConfig';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string = "/api/users";
  private google: GoogleAuthProvider;
  private auth: Auth;
  private db: Database;

  public user: User;
  public userObserver: Subject<User> = new Subject<User>();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    // Initialize Firebase
    initializeApp(fbConfig);
    this.db = getDatabase();

    // Initialize Auth
    this.google = new GoogleAuthProvider();
    this.auth = getAuth();

    // Get Auth Info
    this.userObserver.subscribe(value => this.user = value);
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.http.get<User>(this.url + '/' + user.uid)
          .subscribe((data) => {
            if (data) {
              this.userObserver.next(data);
            } else {
              const appUser: User = {
                uid: user.uid,
                displayName: user.displayName,
                email: user.email
              };
              this.addUser(appUser);
            }
        });
      } else {
        this.userObserver.next(null);
        this.router.navigate(['']);
      }
    });
  }

  googleSignIn() {
    signInWithRedirect(this.auth, this.google);
  }

  googleSignOut() {
    signOut(this.auth);
  }

  addUser(user: User): void {
    this.http.post<User>(this.url + '/' + user.uid, user).subscribe((data) => {
      this.userObserver.next(data);
    });
  }

  getDbRef(path: string): DatabaseReference {
    return ref(this.db, path);
  }
}
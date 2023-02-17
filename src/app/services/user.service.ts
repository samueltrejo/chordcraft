import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Subject } from 'rxjs';

import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth, signInWithRedirect, Auth, onAuthStateChanged, signOut } from 'firebase/auth';
import { fbConfig } from '../models/fbConfig';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string = "/api/users";
  private google: GoogleAuthProvider;
  private auth: Auth;

  public uid: string;
  public uidObserver: Subject<string> = new Subject<string>();
  public user: User;
  public userObserver: Subject<User> = new Subject<User>();

  constructor(private http: HttpClient,
    private router: Router) {
    // Initialize Firebase
    initializeApp(fbConfig);
    // this.db = getDatabase();

    // Initialize Auth
    this.google = new GoogleAuthProvider();
    this.auth = getAuth();

    // Get Auth Info
    this.userObserver.subscribe(value => this.user = value);
    this.uidObserver.subscribe(value => this.uid = value);
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.uidObserver.next(user.uid);
        this.http.get<User>(this.url + '/' + user.uid)
          .subscribe((data) => {
            if (data) {
              this.userObserver.next(data);
            } else {
              this.router.navigate(['/register']);
            }
          });
      }
    });
  }

  googleSignIn() {
    signInWithRedirect(this.auth, this.google);
  }

  googleSignOut() {
    signOut(this.auth).then(() => {
      this.userObserver.next(null);
    }).catch((error) => {
      console.log('An error occured while logging out. ' + error);
    });
  }

  getUser(): User {
    return this.user;
  }

  // getUser(): Observable<User> {
  //   return this.http.get<User>(this.url + '/9AKicXpRP2ZUSnyJ2BvGZZMt4vn1');
  // }
}
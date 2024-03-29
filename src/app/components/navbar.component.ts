import { Component, Input, OnInit } from '@angular/core';
import { User } from 'firebase/auth';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-navbar',
  template: `
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" routerLink="/">ChordCraft</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link active" routerLink="/">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link">New Song +</a>
          </li>
          <li class="nav-item">
            <a *ngIf="!isAuth" class="nav-link" (click)="googleSignIn()">Sign In</a>
            <a *ngIf="isAuth" class="nav-link" (click)="googleSignOut()">Sign Out</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  `,
  styles: [
  ]
})
export class NavbarComponent implements OnInit {
  @Input() isAuth;

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit(): void { }

  googleSignIn() {
    this.firebaseService.googleSignIn();
  }

  googleSignOut() {
    this.firebaseService.googleSignOut();
  }

}

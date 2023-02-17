import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  template: `
  <nav class="navbar navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" routerLink="/">ChordCraft</a>
      <ul class="navbar-nav">
        <!-- <li class="nav-item">
          <a class="nav-link active" routerLink="/">Home</a>
        </li> -->
        <!-- <li *ngIf="uid" class="nav-item">
          <a class="nav-link">{{uid}}</a>
        </li> -->
        <li class="nav-item">
          <a *ngIf="!uid" class="nav-link" (click)="googleSignIn()">Sign In</a>
          <a *ngIf="uid" class="nav-link" (click)="googleSignOut()">Sign Out</a>
        </li>
      </ul>
    </div>
  </nav>
  `,
  styles: [
  ]
})
export class NavbarComponent implements OnInit {
  @Input() user;
  uid: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.uidObserver.subscribe((value) => {
      this.uid = value;
    });
  }

  googleSignIn() {
    this.userService.googleSignIn();
  }

  googleSignOut() {
    this.userService.googleSignOut();
  }

}

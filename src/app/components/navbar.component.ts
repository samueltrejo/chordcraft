import { Component, Input, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  template: `
  <nav class="navbar navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" routerLink="/">ChordCraft</a>
      <ul class="navbar-nav">
        <li *ngIf="user" class="nav-item pe-3">
          <a class="nav-link" routerLink="/songs">Songs</a>
        </li>
        <li *ngIf="user" class="nav-item pe-3">
          <a class="nav-link" routerLink="/groups">Groups</a>
        </li>
        <li class="nav-item">
          <a *ngIf="!user" class="nav-link" (click)="googleSignIn()">Sign In</a>
          <a *ngIf="user" class="nav-link" (click)="googleSignOut()">Sign Out</a>
        </li>
      </ul>
    </div>
  </nav>
  `,
  styles: [
    `.navbar-nav {
      flex-direction: row;
    }`
  ]
})
export class NavbarComponent implements OnInit {
  @Input() user: User;

  constructor(private userService: UserService) { }

  ngOnInit(): void { }

  googleSignIn() {
    this.userService.googleSignIn();
  }

  googleSignOut() {
    this.userService.googleSignOut();
  }

}

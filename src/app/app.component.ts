import { Component } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { User } from './models/user';
import { UserService } from './services/user.service';

import { fbConfig } from './models/fbConfig';

@Component({
  selector: 'app-root',
  template: `
    <app-navbar [user]="user"></app-navbar>
    <!-- <div *ngIf="!user" class="text-light">Loading...</div> -->
    <router-outlet *ngIf="user"></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  // loading: boolean = true;
  user: User;
  
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    initializeApp(fbConfig);
    this.userService.userObserver.subscribe((value) => {
      this.user = value
    });
  }
}

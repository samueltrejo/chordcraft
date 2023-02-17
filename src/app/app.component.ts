import { Component } from '@angular/core';
import { User } from './models/user';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  template: `
    <app-navbar [user]="user"></app-navbar>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  user: User;
  
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.userObserver.subscribe((value) => {
      this.user = value;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  template: `
    <div class="home text-center">
      <button class="btn btn-primary mt-5"><i class="bi bi-google"></i> Sign in with Google</button>
      <!-- <button class="btn btn-primary mt-5">{{user.name}}</button> -->
    </div>
  `,
  styles: [
  ]
})
export class HomeComponent implements OnInit {
  user: User;

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.user = this.userService.user;
    if (this.user) {
      this.router.navigate(['/songs']);
    }
  }

}

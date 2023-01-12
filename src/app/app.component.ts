import { Component } from '@angular/core';
import { FirebaseService } from './services/firebase.service';

@Component({
  selector: 'app-root',
  template: `
    <app-navbar [isAuth]="isAuth"></app-navbar>
    <router-outlet *ngIf="isAuth"></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  isAuth: boolean = false;
  
  constructor(private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.firebaseService.isAuthObserver.subscribe((value) => {
      this.isAuth = value;
    });
  }
}

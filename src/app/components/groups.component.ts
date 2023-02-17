import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { push } from 'firebase/database';
import { Group } from '../models/group';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-groups',
  template: `
  <div class="library container p-0">
    <ul class="list-group">
      <li class="list-group-item title-row">
        <div class="d-flex justify-content-end">
          <div class="me-2 {{path === '/songs' ? 'library-nav-active' : 'library-nav'}}" routerLink="/songs">My Songs</div>
          <div class="{{path === '/groups' ? 'library-nav-active' : 'library-nav'}}" routerLink="/groups">Groups</div>
        </div>
      </li>
      <li class="list-group-item title-row">
        <div class="row mx-0">
          <div class="col-6 px-0">Title</div>
          <div class="col-6 px-0 align-self-center">Genres</div>
        </div>
      </li>
      <!-- <li *ngFor="let song of songs" class="list-group-item" (click)="goToSong($event, song.id)">
        <div class="row mx-0">
          <div class="col-6 px-0">
            <div style="font-weight: bold;">{{song.title}}</div>
            <div style="font-style: italic;">{{song.artist}}</div>
          </div>
          <div class="col-6 px-0 align-self-center justify-content-between">
            <div class="d-flex justify-content-between">
              <div><span *ngFor="let genre of song.genres">{{genre}} </span></div>
              <button id="delete-song-btn" class="btn btn-outline-primary btn-sm me-2 delete-song-btn" (click)="deleteSong(song.id)"><i id="delete-song-icon" class="bi bi-trash-fill"></i></button>
            </div>
          </div>
        </div>
      </li> -->
      <!-- <li class="list-group-item lib-song" (click)="newSong()">new song +</li> -->
      <li class="list-group-item lib-song text-end" (click)="newGroup()">
        <span>New Group</span>
        <!-- <i class="bi bi-music-note"></i> -->
        <i class="bi bi-plus"></i>
      </li>
    </ul>
  </div>
  `,
  styles: [
  ]
})
export class GroupsComponent implements OnInit {
  path: string;

  constructor(private firebaseService: FirebaseService, private location: Location) { }

  ngOnInit(): void {
    this.path = this.location.path();
  }

  newGroup(): void {
    const group: Group = {
      name: 'Group1',
      ownerId: this.firebaseService.user.uid,
      users: [ 'CyeosVZLLwQdhxtozRJ7s0Bq5wD3' ]
    }
    push(this.firebaseService.getGroupsRef(), group).then(x => console.log(x.key));
  }

}

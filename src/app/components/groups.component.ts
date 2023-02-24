import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { push } from 'firebase/database';
import { Group } from '../models/group';

@Component({
  selector: 'app-groups',
  template: `
  <div class="library song container p-0">
    <ul class="list-group">
      <li class="list-group-item">An item</li>
      <li class="list-group-item lib-song text-end" data-bs-toggle="modal" data-bs-target="#group-modal">
        <span>New Group</span>
        <!-- <i class="bi bi-music-note"></i> -->
        <i class="bi bi-plus"></i>
      </li>
    </ul>

    <!-- group modal -->
    <div class="genre-modal modal fade" id="group-modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-title" id="exampleModalLabel">Add a genre</div>
            <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> -->
            <i class="bi bi-x-circle" data-bs-dismiss="modal"></i>
          </div>
          <div class="modal-body position-relative">
            <!-- <input class="song-genre d-block" formControlName="title" autocomplete="off" placeholder="Genre"> -->
            <input #genre class="song-genre d-block" autocomplete="off" placeholder="Genre">
            <i class="genre-submit bi bi-send-fill" data-bs-dismiss="modal" (click)="newGroup()"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
  styles: [
  ]
})
export class GroupsComponent implements OnInit {
  path: string;

  constructor(
    ) { }

  ngOnInit(): void {
  }

  newGroup(): void {

  }

}

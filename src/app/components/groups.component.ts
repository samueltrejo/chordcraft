import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
    <div class="genre-modal modal fade show" id="group-modal" style="display: block;">
      <div class="modal-dialog">
        <div class="modal-content bg-light">
          <div class="modal-header">
            <div class="modal-title" id="exampleModalLabel">Create a Group</div>
            <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> -->
            <i class="bi bi-x-circle text-dark" data-bs-dismiss="modal"></i>
          </div>
          <div class="modal-body position-relative">
            <!-- <input class="song-genre d-block" formControlName="title" autocomplete="off" placeholder="Genre"> -->
            <!-- <input #genre class="song-genre d-block" autocomplete="off" placeholder="Genre">
            <i class="genre-submit bi bi-send-fill" data-bs-dismiss="modal" (click)="newGroup()"></i> -->
            <form [formGroup]="groupForm">
              <!-- <div class="title mb-3">Account Information</div> -->
              <div class="mb-3">
                <label for="name-input" class="form-label">What would you like to call your group?</label>
                <input type="text" class="form-control" id="name-input" formControlName="name" placeholder="Group Name" required>
                <!-- <div id="name-help" class="form-text">This is what others will see when interacting with you.</div> -->
              </div>
            </form>
            <form [formGroup]="groupForm" (submit)="addUser()">
              <div class="mb-3">
                <label for="user-add-input" class="form-label">Who would you like to add to your group?</label>
                <input type="text" class="form-control" id="user-add-input" formControlName="userToAdd" placeholder="User" required>
                <div id="name-help" class="form-text"></div>
              </div>
            </form>
            <form [formGroup]="groupForm" (submit)="addSong()">
              <div class="mb-3">
                <label for="song-add-input" class="form-label">Choose songs you want to share to your group?</label>
                <input type="text" class="form-control" id="song-add-input" formControlName="songToAdd" placeholder="Song" required>
                <div id="name-help" class="form-text"></div>
              </div>
            </form>
            <form [formGroup]="groupForm">
              <button type="button" class="btn btn-primary" (click)="createGroup()">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
  styles: [
    `.modal-title {
      font-size: 1.1rem;
    }`
  ]
})
export class GroupsComponent implements OnInit {
  groupForm: FormGroup = this.formBuilder.group({
    name: '',
    userToAdd: '',
    songToAdd: ''
  });
  
  constructor(private formBuilder: FormBuilder,) { }

  ngOnInit(): void { }

  addUser(): void {
    console.log(this.groupForm.controls['userToAdd'].value)
  }

  addSong(): void {
    console.log(this.groupForm.controls['songToAdd'].value)
  }

  createGroup(): void {
    console.log(this.groupForm.controls['name'].value)
  }

}

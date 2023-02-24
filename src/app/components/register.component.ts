import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  template: `
    <div class="register container">
      <form [formGroup]="registerForm" ngNativeValidate (submit)="registerUser()">
        <div class="title mb-3">Account Information</div>
        <div class="mb-3">
          <label for="name-input" class="form-label">What would you like us to call you?</label>
          <input type="text" class="form-control" id="name-input" formControlName="name" placeholder="Name" required>
          <div id="name-help" class="form-text">This is what others will see when interacting with you.</div>
        </div>
        <div class="mb-3">
          <label for="email-input" class="form-label">What is your email address?</label>
          <input type="email" class="form-control" id="email-input" formControlName="email" placeholder="Email" required>
          <div id="name-help" class="form-text"></div>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  `,
  styles: [
  ]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.initRegisterForm();
  }

  initRegisterForm(): void {
    this.registerForm = this.fb.group({
      name: '',
      email: ''
    });
  }

  registerUser(): void {
    // this.userService.addUser(this.registerForm.value);
  }

}

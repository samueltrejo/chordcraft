import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  template: `
    <div class="register container">
      <form ngNativeValidate>
        <div class="title mb-3">Account Information</div>
        <div class="mb-3">
          <label for="name-input" class="form-label">What would you like us to call you?</label>
          <input type="text" class="form-control" id="name-input" placeholder="Name" required>
          <div id="name-help" class="form-text">This is what others will see when interacting with you.</div>
        </div>
        <div class="mb-3">
          <label for="email-input" class="form-label">What is your email address?</label>
          <input type="email" class="form-control" id="email-input" placeholder="Email" required>
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

  constructor() { }

  ngOnInit(): void {
  }

}

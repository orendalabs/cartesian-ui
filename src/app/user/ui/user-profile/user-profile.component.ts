import { Component, OnInit } from '@angular/core';
import { UserSandbox } from '@app/user/user.sandbox';
import { Subscription } from 'rxjs';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
})
export class UserProfileComponent implements OnInit {
  token;
  user;

  subscriptions: Array<Subscription> = [];
  constructor(protected _sandbox: UserSandbox) {
    this.registerEvents();
    this._sandbox.fetchProfile(this.token);
  }

  registerEvents() {
    this.subscriptions.push(
      this._sandbox.token$.subscribe((token) => (this.token = token))
    );
    this.subscriptions.push(
      this._sandbox.profile$.subscribe((user) => (this.user = user))
    );
  }
  ngOnInit(): void {}
}

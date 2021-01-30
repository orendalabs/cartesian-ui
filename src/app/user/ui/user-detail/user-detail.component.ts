import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '@app/user/models';
import { UserSandbox } from '@app/user/user.sandbox';
import { Subscription } from 'rxjs';

@Component({
  selector: 'user-detail',
  templateUrl: './user-detail.component.html',
})
export class UserDetailComponent implements OnInit {
  userId: string;
  user;

  subscriptions: Subscription[] = []

  constructor(protected route: ActivatedRoute,
    protected _sandbox: UserSandbox
  ) { }

  ngOnInit(): void {
    this.registerEvents();
    this._sandbox.fetchUserById(this.userId);
  }

  registerEvents() {
    this.subscriptions.push(
      this.route.params.subscribe((params) => {
        this.userId = params.id;
      })
    )
    this.subscriptions.push(
      this._sandbox.user$.subscribe((user: User) => {
        this.user = user;
      })
    )
  }

  deleteUser = (id: string) => {
    const confirmation = confirm("Are you sure you want to delete the User with ID: " + id);
    if (confirmation) {
      this._sandbox.deleteUserById(id);
    }
  }

}

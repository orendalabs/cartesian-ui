import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SettingsSandbox } from '@app/settings/settings.sandbox';
import { Subscription } from 'rxjs';
import { SettingForm } from '../../models/create/setting.model'

@Component({
  selector: 'settings-add',
  templateUrl: './settings-create.component.html',
})
export class SettingsAddComponent implements OnInit {

  isSettingCreateSuccess: boolean;
  isSettingCreateFail: boolean;

  subscriptions: Subscription[] = []

  formGroup = new FormGroup({
    key: new FormControl('', Validators.required),
    value: new FormControl('', Validators.required)
  });
  constructor(public _sandbox: SettingsSandbox) {
    this.registerEvents()
  }

  registerEvents = () => {
    this.subscriptions.push(
      this._sandbox.isSettingCreateSuccess$.subscribe((success) => this.isSettingCreateSuccess = success)
    )
    this.subscriptions.push(
      this._sandbox.isSettingCreateFail$.subscribe((fail) => this.isSettingCreateFail = fail)
    )
  }

  unregisterEvents = () => {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    })
  }

  ngOnInit(): void { }

  create() {
    if (this.formGroup.valid) {
      let form = new SettingForm();
      form.key = this.formGroup.controls['key'].value;
      form.value = this.formGroup.controls['value'].value;
      this._sandbox.create(form);
    }
  }

}

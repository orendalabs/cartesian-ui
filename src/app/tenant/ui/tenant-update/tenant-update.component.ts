import { Component, Injector, OnDestroy, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '@app/core/ui';
import { FieldConfig } from '@app/shared/components/configurable-form/models/field-config.model';
import { TenantUpdateForm } from '@app/tenant/models/form';
import { TenantSandbox } from '@app/tenant/tenant.sandbox';

@Component({
  selector: 'tenant-update',
  templateUrl: './tenant-update.component.html',
})
export class TenantUpdateComponent
  extends BaseComponent
  implements OnInit, OnDestroy {

  deleting: boolean;
  loading: boolean;
  loaded: boolean;
  failed: boolean;

  id: string;

  config: FieldConfig[] = [
    {
      type: 'input',
      label: 'Name',
      name: 'name',
      validation: [Validators.required],
      invalidMessage: 'Please enter a name',
    },
    {
      type: 'input',
      label: 'Status',
      name: 'status',
      validation: [Validators.required],
      invalidMessage: 'Please enter a status',
    },
    {
      label: 'Save',
      name: 'submit',
      type: 'button',
      classes: 'btn btn-primary pull-right',
    },
  ];

  constructor(
    injector: Injector,
    private _sandbox: TenantSandbox,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.registerEvents();
  }

  ngOnDestroy(): void {
    this.unregisterEvents();
  }

  registerEvents(): void {
    this.subscriptions.push(
      this.route.params.subscribe((params) => {
        this.id = params.id;
      }),
      this._sandbox.tenantLoading$.subscribe((loading) => {
        if (loading && this.loading !== undefined) {
          if (this.deleting) {
            this.notify.info('Deleting tenant');
          } else {
            this.notify.info('Saving tenant');
          }
          this.config[1].disabled = true;
        }
        this.loading = loading;
      }),
      this._sandbox.tenantLoaded$.subscribe((loaded) => {
        if (loaded && this.loaded !== undefined) {
          if (this.deleting) {
            this.notify.success('Tenant deleted', 'Success!');
            this.router.navigate(['tenants']);
            this.deleting = false;
          } else {
            this.notify.success('Tenant saved', 'Success!');
          }
          this.config[1].disabled = false;
        }
        this.loaded = loaded;
      }),
      this._sandbox.tenantFailed$.subscribe((failed) => {
        if (failed && this.failed !== undefined) {
          if (this.deleting) {
            this.deleting = false;
          }
          this.config[1].disabled = false;
        }
        this.failed = failed;
      })
    );
  }

  save(group): void {
    if (this.loading) {
      this.notify.warn('Please wait for the previous request', 'Warning!');
    } else if (group.valid) {
      const form = new TenantUpdateForm({
        name: group.controls.name.value,
        status: group.controls.status.value,
      });
      this._sandbox.updateTenant(this.id, form);
    } else {
      this.notify.warn('Invalid form data', 'Warning!');
    }
  }

  delete(): void {
    this.message.confirm(
      `Are you sure you want to delete the tenant with id ${this.id}`,
      'Delete tenant',
      (res) => {
        if (res) {
          this.deleting = true;
          this._sandbox.deleteTenant(this.id);
        }
      }
    );
  }
}

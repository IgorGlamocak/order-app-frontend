import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { tap } from 'rxjs';
import { UsersService } from './users.service';
import { User } from './users.service';

@Component({
  selector: 'app-user-form-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    @if (isOpen) {
      <div
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      >
        <form
          [formGroup]="form"
          (ngSubmit)="onSubmit()"
          class="bg-white p-6 rounded shadow-lg w-96"
        >
          <h2 class="text-xl font-bold mb-4">
            {{ editing ? 'Edit User' : 'Add User' }}
          </h2>

          <label class="block mb-2">
            Full Name
            <input
              formControlName="fullName"
              class="w-full border p-1 rounded"
            />
          </label>

          <label class="block mb-2">
            Email
            <input
              type="email"
              formControlName="email"
              class="w-full border p-1 rounded"
            />
          </label>

          <label class="block mb-2">
            Role
            <select formControlName="role" class="w-full border p-1 rounded">
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </label>

          <label class="block mb-4">
            Password
            <input
              type="password"
              formControlName="password"
              class="w-full border p-1 rounded"
              [placeholder]="editing ? '(leave blank to keep current)' : ''"
            />
          </label>

          <div class="flex justify-end space-x-2">
            <button type="button" (click)="close()" class="px-3 py-1">
              Cancel
            </button>
            <button
              type="submit"
              [disabled]="form.invalid"
              class="px-3 py-1 bg-blue-600 text-white rounded"
            >
              {{ editing ? 'Save' : 'Create' }}
            </button>
          </div>
        </form>
      </div>
    }
  `,
})
export class UserFormModalComponent implements OnChanges {
  @Input() isOpen = false;
  @Input() editing = false;
  @Input() initial: User | null = null;

  @Output() saved = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private svc = inject(UsersService);

  form: FormGroup = this.fb.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    role: ['user', Validators.required],
    password: [''],
  });

  ngOnChanges(changes: SimpleChanges) {
    if (this.editing && this.initial) {
      this.form.patchValue({
        fullName: this.initial.fullName,
        email: this.initial.email,
        role: this.initial.role,
        password: '',
      });
    }
    if (!this.editing) {
      this.form.reset({ role: 'user', password: '' });
    }
  }

  onSubmit() {
    const raw = this.form.value as Partial<User & { password: string }>;
    const dto: any = {
      fullName: raw.fullName,
      email: raw.email,
      role: raw.role,
    };
    if (!this.editing || raw.password) {
      dto.password = raw.password;
    }

    const op$ = this.editing && this.initial
      ? this.svc.update(this.initial.id, dto)
      : this.svc.create(dto);

    op$
      .pipe(
        tap(() => {
          this.saved.emit();
          this.close();
        }),
      )
      .subscribe();
  }

  close() {
    this.closed.emit();
  }
}

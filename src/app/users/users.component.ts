import { Component, inject, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { UsersService, User } from './users.service';
import { UserFormModalComponent } from './user-form-modal';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [AsyncPipe, UserFormModalComponent],
  template: `
    <div class="bg-white min-h-screen py-12">
      <div class="p-6 max-w-4xl mx-auto bg-white">
        <h2 class="text-2xl font-bold mb-4">All Users</h2>

        @for (u of users$ | async; track u.id) {
          <div
            class="flex items-center justify-between border rounded p-4 mb-2"
          >
            <div>
              <div><strong>Name:</strong> {{ u.fullName }}</div>
              <div><strong>Email:</strong> {{ u.email }}</div>
              <div><strong>Role:</strong> {{ u.role }}</div>
            </div>
            <button
              (click)="openEdit(u)"
              class="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Edit
            </button>
          </div>
        } @empty {
          <p>Loading users…</p>
        }
        @if (formOpen()) {
          <app-user-form-modal
            [isOpen]="formOpen()"
            [initial]="selectedUser()"
            [editing]="true"
            (saved)="reload()"
            (closed)="closeForm()"
          ></app-user-form-modal>
        }
      </div>
    </div>
  `,
})
export class UsersComponent {
  private svc = inject(UsersService);
  users$ = this.svc.getAll();

  formOpen = signal(false);
  selectedUser = signal<User | null>(null);

  openEdit(u: User) {
    this.selectedUser.set(u);
    this.formOpen.set(true);
  }

  reload() {
    this.users$ = this.svc.getAll();
  }

  closeForm() {
    this.formOpen.set(false);
    this.selectedUser.set(null);
  }
}

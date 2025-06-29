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
import { ServicesService } from './services.service';
import { Service } from './services.model';

@Component({
  selector: 'app-service-form-modal',
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
            {{ editing ? 'Edit Service' : 'Add Service' }}
          </h2>

          <label class="block mb-2">
            Name
            <input
              formControlName="serviceName"
              class="w-full border p-1 rounded"
            />
          </label>

          <label class="block mb-2">
            Description
            <textarea
              formControlName="description"
              class="w-full border p-1 rounded"
            ></textarea>
          </label>

          <label class="block mb-2">
            Price
            <input
              type="number"
              formControlName="price"
              class="w-full border p-1 rounded"
            />
          </label>

          <label class="block mb-2">
            Execution Time
            <input
              formControlName="executionTime"
              placeholder="e.g. 7d"
              class="w-full border p-1 rounded"
            />
          </label>

          <label class="block mb-4">
            Image URL
            <input
              formControlName="imageUrl"
              class="w-full border p-1 rounded"
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
export class ServiceFormModalComponent implements OnChanges {
  @Input() isOpen = false;
  @Input() editing = false;
  @Input() initial: Service | null = null;

  @Output() saved = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private svc = inject(ServicesService);

  form: FormGroup = this.fb.group({
    serviceName: ['', Validators.required],
    description: ['', Validators.required],
    price: [0, Validators.required],
    executionTime: ['', Validators.required],
    imageUrl: ['', Validators.required],
  });

  ngOnChanges(changes: SimpleChanges) {
    if (this.editing && this.initial) {
      this.form.patchValue({
        serviceName: this.initial.serviceName,
        description: this.initial.description,
        price: this.initial.price,
        executionTime: this.initial.executionTime,
        imageUrl: this.initial.imageUrl,
      });
    }
    if (!this.editing) {
      this.form.reset({ price: 0 });
    }
  }

  onSubmit() {
    const dto = this.form.value as Omit<Service, 'id'>;
    const op$ =
      this.editing && this.initial
        ? this.svc.updateService(this.initial.id, dto)
        : this.svc.createService(dto);

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

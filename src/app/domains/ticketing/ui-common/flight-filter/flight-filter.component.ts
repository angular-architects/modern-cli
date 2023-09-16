import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, effect, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FlightFilter } from '../../data';
import { FlightFilterStore } from './flight-filter.store';

@Component({
  selector: 'app-flight-filter',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './flight-filter.component.html',
  styleUrls: ['./flight-filter.component.css']
})
export class FlightFilterComponent {
  @Input() set filter(filter: FlightFilter) {
    this.inputFilterForm.setValue(filter);
  }

  @Output() searchTrigger = new EventEmitter<FlightFilter>();

  inputFilterForm = inject(FormBuilder).nonNullable.group({
    from: ['', [Validators.required]],
    to: ['', [Validators.required]],
    urgent: [false]
  });

  search(): void {
    this.searchTrigger.next(this.inputFilterForm.getRawValue());
  }
}

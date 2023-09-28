import { AsyncPipe, JsonPipe, NgForOf, NgIf } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Flight, FlightService } from '../../data';
import { CityValidator, addMinutes } from 'src/app/shared/util-common';
import { FlightCardComponent } from '../../ui-common';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { combineLatest, debounceTime, filter } from 'rxjs';

@Component({
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    AsyncPipe,
    JsonPipe,
    FormsModule,
    FlightCardComponent,
    CityValidator,
  ],
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
})
export class FlightSearchComponent {
  private flightService = inject(FlightService);

  from = signal('Hamburg');
  to = signal('Graz');
  urgent = signal(false);
  flights = signal<Flight[]>([]);

  basket = signal<Record<number, boolean>>({
    3: true,
    5: true,
  });

  from$ = toObservable(this.from);
  to$ = toObservable(this.to);

  criteria$ = combineLatest({ from: this.from$, to: this.to$ }).pipe(
    filter((combi) => combi.from.length >= 3 && combi.to.length >= 3),
    debounceTime(300)
  );

  criteria = toSignal(this.criteria$, {
    initialValue: {
      from: '',
      to: '',
    },
  });

  flightRoute = computed(() => this.from() + ' to ' + this.to());

  constructor() {
    effect(() => {
      this.search();
    });
  }

  search(): void {
    const { from, to } = this.criteria();

    if (!from || !to) return;

    this.flightService
      .find(from, to)
      .subscribe((flights) => {
        this.flights.set(flights);
      });
  }

  delay(): void {
    this.flights.update((flights) => [
      { ...flights[0], date: addMinutes(flights[0].date, 15) },
      ...flights.slice(1),
    ]);
  }

  updateBasket(flightId: number, selected: boolean): void {
    this.basket.update((basket) => ({
      ...basket,
      [flightId]: selected,
    }));
  }
}

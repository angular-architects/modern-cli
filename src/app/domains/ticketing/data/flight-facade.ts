import { Injectable, inject } from '@angular/core';
import { patchState, selectSignal, signalState } from '@ngrx/signals';
import { Flight } from './flight';
import { FlightService } from './flight.service';

@Injectable({ providedIn: 'root' })
export class FlightFacade {
  private flightService = inject(FlightService);

  private state = signalState({
    from: '',
    to: '',
    flights: [] as Flight[],
    basket: {} as Record<number, boolean>,
  });

  readonly from = this.state.from;
  readonly to = this.state.to;
  readonly flights = this.state.flights;
  readonly basket = this.state.basket;

  readonly flightRoute = selectSignal(
    this.from,
    this.to,
    (from, to) => from + ' to ' + to
  );

  load(): void {
    this.flightService.find(this.from(), this.to()).subscribe((flights) => {
      patchState(this.state, { flights });
    });
  }
}

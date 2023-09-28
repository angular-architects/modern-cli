import { Injectable, inject } from '@angular/core';
import { patchState, selectSignal, signalState } from '@ngrx/signals';
import { Flight } from './flight';
import { FlightService } from './flight.service';
import { addMinutes } from 'src/app/shared/util-common';

export type Criteria = {from?: string, to?: string};

const initState = {
  from: '',
  to: '',
  flights: [] as Flight[],
  basket: {} as Record<number, boolean>,
};

@Injectable({ providedIn: 'root' })
export class FlightFacade {
  private flightService = inject(FlightService);

  private state = signalState(initState);

  readonly from = this.state.from;
  readonly to = this.state.to;
  readonly flights = this.state.flights;
  readonly basket = this.state.basket;

  readonly flightRoute = selectSignal(
    this.from,
    this.to,
    (from, to) => from + ' to ' + to
  );

  updateCriteria(criteria: Criteria): void {
    console.log('criteria', criteria);
    patchState(this.state, criteria);
    console.log('from', this.from);
    console.log('to', this.to);

  }

  async load(): Promise<void> {
    const flights = await this.flightService.findPromise(
      this.from(),
      this.to()
    );
    patchState(this.state, { flights });
  }

  updateBasket(flightId: number, selected: boolean): void {
    patchState(this.state, (state) => ({
      ...state,
      basket: {
        ...state.basket,
        [flightId]: selected,
      },
    }));
  }

  delay(): void {
    patchState(this.state, (state) => ({
      ...state,
      flights: [
        { ...state.flights[0], date: addMinutes(state.flights[0].date, 15) },
        ...state.flights.slice(1),
      ],
    }));
  }
}

import { Injectable, inject } from '@angular/core';
import { patchState, selectSignal, signalState } from '@ngrx/signals';
import { Flight } from './flight';
import { FlightService } from './flight.service';
import { addMinutes } from 'src/app/shared/util-common';

export type Criteria = { from?: string; to?: string };

@Injectable({ providedIn: 'root' })
export class FlightFacade {
  private flightService = inject(FlightService);

  private state = signalState({
    from: 'Graz',
    to: 'Hamburg',
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

  updateCriteria(criteria: Criteria): void {
    patchState(this.state, criteria);
  }

  async load(): Promise<void> {
    const flights = await this.flightService.findPromise(
      this.from(),
      this.to()
    );
    patchState(this.state, { flights });
  }

  updateBasket(flightId: number, selected: boolean): void {
    patchState(this.state, ({ basket }) => ({
      basket: {
        ...basket,
        [flightId]: selected,
      },
    }));
  }

  delay(): void {
    patchState(this.state, ({ flights }) => ({
      flights: [
        { ...flights[0], date: addMinutes(flights[0].date, 15) },
        ...flights.slice(1),
      ],
    }));
  }
}

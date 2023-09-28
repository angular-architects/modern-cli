import { inject } from '@angular/core';
import {
  patchState,
  selectSignal,
  signalStore,
  withMethods,
  withSignals,
  withState,
} from '@ngrx/signals';
import { Flight } from './flight';
import { FlightService } from './flight.service';
import { addMinutes } from 'src/app/shared/util-common';

export type Criteria = { from?: string; to?: string };

export const TicketingStore = signalStore(
  { providedIn: 'root' },
  withState({
    from: '',
    to: '',
    flights: [] as Flight[],
    basket: {} as Record<number, boolean>,
  }),
  withSignals(({ from, to }) => ({
    flightRoute: selectSignal(() => from() + ' to ' + to()),
  })),
  withMethods((state) => {
    const flightService = inject(FlightService);

    return {
      updateCriteria(criteria: Criteria): void {
        patchState(state, criteria);
      },
      async load(): Promise<void> {
        const flights = await flightService.findPromise(
          state.from(),
          state.to()
        );
        patchState(state, { flights });
      },
      updateBasket(flightId: number, selected: boolean): void {
        patchState(state, (state) => ({
          ...state,
          basket: {
            ...state.basket,
            [flightId]: selected,
          },
        }));
      },
      delay(): void {
        patchState(state, (state) => ({
          ...state,
          flights: [
            {
              ...state.flights[0],
              date: addMinutes(state.flights[0].date, 15),
            },
            ...state.flights.slice(1),
          ],
        }));
      },
    };
  })
);

// @Injectable({ providedIn: 'root' })
// export class FlightFacade {
//   private flightService = inject(FlightService);

//   private state = signalState(initState);

//   readonly from = this.state.from;
//   readonly to = this.state.to;
//   readonly flights = this.state.flights;
//   readonly basket = this.state.basket;

//   readonly flightRoute = selectSignal(
//     this.from,
//     this.to,
//     (from, to) => from + ' to ' + to
//   );

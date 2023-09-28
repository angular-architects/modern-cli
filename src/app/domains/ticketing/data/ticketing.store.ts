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
        patchState(state, ({ basket }) => ({
          basket: {
            ...basket,
            [flightId]: selected,
          },
        }));
      },
      delay(): void {
        patchState(state, ({ flights }) => ({
          flights: [
            {
              ...flights[0],
              date: addMinutes(flights[0].date, 15),
            },
            ...flights.slice(1),
          ],
        }));
      },
    };
  })
);

import { inject, Signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';

import {
  patchState,
  selectSignal,
  signalStore,
  withHooks,
  withMethods,
  withSignals,
  withState,
} from '@ngrx/signals';
import { Flight } from './flight';
import { FlightService } from './flight.service';
import { addMinutes } from 'src/app/shared/util-common';
import { debounceTime, filter, switchMap } from 'rxjs';

export type Criteria = { from?: string; to?: string };

export const TicketingStore = signalStore(
  { providedIn: 'root' },
  withState({
    from: 'Graz',
    to: 'Hamburg',
    flights: [] as Flight[],
    basket: {} as Record<number, boolean>,
  }),
  withSignals(({ from, to }) => ({
    flightRoute: selectSignal(() => from() + ' to ' + to()),
    criteria: selectSignal(() => ({ from: from(), to: to() })),
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
      loadBy(
        criteria: Signal<{ from: string; to: string }>
      ): void {
        toObservable(criteria)
          .pipe(
            filter((c) => c.from.length >= 3 && c.to.length >= 3),
            debounceTime(300),
            switchMap((c) => flightService.find(c.from, c.to))
          )
          .subscribe((flights) => {
            patchState(state, { flights });
          });
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
  }),
  withHooks({
    onInit: ({ criteria, loadBy }) => {
      loadBy(criteria);
    },
  })
);

import { flightBookingActions } from './flight-booking.actions';
import { map, switchMap } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FlightService } from '../flight.service';

@Injectable()
export class FlightBookingEffects {
  actions$ = inject(Actions);
  flightService = inject(FlightService);

  loadFlights$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(flightBookingActions.loadFlights),
      switchMap((a) => this.flightService.find(a.from, a.to, a.urgent)),
      map((flights) => flightBookingActions.flightsLoaded({ flights }))
    );
  });
}

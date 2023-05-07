import { flightBookingFeature } from './flight-booking.reducer';
import { provideState } from '@ngrx/store';
import { FlightBookingEffects } from './flight-booking.effects';
import { provideEffects } from '@ngrx/effects';

export const provideFlightBooking = [
  provideState(flightBookingFeature),
  provideEffects([FlightBookingEffects]),
];

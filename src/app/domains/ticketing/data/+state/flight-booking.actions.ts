import { Flight } from '../flight';
import { createActionGroup, props } from '@ngrx/store';

export const flightBookingActions = createActionGroup({
  source: 'FlightBooking',
  events: {
    'Load Flights': props<{ from: string; to: string; urgent: boolean }>(),
    'Flights Loaded': props<{ flights: Flight[] }>(),
  },
});

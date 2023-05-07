import { Flight } from '../flight';
import { flightBookingActions } from './flight-booking.actions';
import { createFeature, createReducer, on } from '@ngrx/store';

export interface State {
  flights: Flight[];
}

export const initialState: State = {
  flights: [],
};

export const flightBookingFeature = createFeature({
  name: 'flightBooking',
  reducer: createReducer(
    initialState,
    on(flightBookingActions.flightsLoaded, (state, action) => {
      const flights = action.flights;
      return { ...state, flights };
    })
  ),
});

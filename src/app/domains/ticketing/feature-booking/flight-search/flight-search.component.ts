import { AsyncPipe, JsonPipe, NgForOf, NgIf } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Criteria, TicketingStore } from '../../data';
import { CityValidator } from 'src/app/shared/util-common';
import { FlightCardComponent } from '../../ui-common';

@Component({
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    AsyncPipe,
    JsonPipe,
    FormsModule,
    FlightCardComponent,
    CityValidator,
  ],
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
})
export class FlightSearchComponent {
  private store = inject(TicketingStore);

  flights = this.store.flights;
  from = this.store.from;
  to = this.store.to;
  basket = this.store.basket;
  flightRoute = this.store.flightRoute;

  constructor() {
    effect(() => {
      console.log('callState', this.store.callState());
    });
  }
  
  search(): void {
    this.store.load();
  }

  delay(): void {
    this.store.delay();
  }

  updateBasket(flightId: number, selected: boolean): void {
    this.store.updateBasket(flightId, selected);
  }

  updateCriteria(field: keyof Criteria, value: unknown) {
    this.store.updateCriteria({ [field]: value });
  }
}

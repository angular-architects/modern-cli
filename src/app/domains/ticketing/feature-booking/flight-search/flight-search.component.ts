import { AsyncPipe, JsonPipe, NgForOf, NgIf } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Criteria, FlightFacade } from '../../data';
import { CityValidator } from 'src/app/shared/util-common';
import { FlightCardComponent } from '../../ui-common';
import { patchState } from '@ngrx/signals';

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
  private facade = inject(FlightFacade);

  flights = this.facade.flights;
  from = this.facade.from;
  to = this.facade.to;
  basket = this.facade.basket;
  flightRoute = this.facade.flightRoute;

  constructor() {
    // effect(() => {
    //   this.search();
    // });
  }

  search(): void {
    this.facade.load();
  }

  delay(): void {
    this.facade.delay();
  }

  updateBasket(flightId: number, selected: boolean): void {
    this.facade.updateBasket(flightId, selected);
  }

  updateCriteria(field: keyof Criteria, value: unknown) {
    this.facade.updateCriteria({ [field]: value });
  }
}

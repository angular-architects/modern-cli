import { AsyncPipe, JsonPipe, NgForOf, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  Flight,
  FlightFilter,
  FlightService,
} from '../../data';
import { CityValidator, addMinutes } from 'src/app/shared/util-common';
import { FlightCardComponent } from '../../ui-common';
import { FlightFilterComponent } from '../../ui-common';

// import { HiddenService } from "../../../checkin/data/hidden.service";
// import { CheckinService } from "@demo/checkin/data";

@Component({
  standalone: true,
  imports: [
    // CommonModule,
    NgIf,
    NgForOf,
    AsyncPipe,
    JsonPipe,

    FormsModule,
    FlightCardComponent,
    FlightFilterComponent,
    CityValidator,
  ],
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
})
export class FlightSearchComponent {
  private flightService = inject(FlightService);

  filter = {
    from: 'Hamburg',
    to: 'Graz',
    urgent: false
  };
  flights: Flight[] = [];

  basket: Record<number, boolean> = {
    3: true,
    5: true,
  };

  search(filter: FlightFilter): void {
    this.filter = filter;

    if (!this.filter.from || !this.filter.to) return;

    this.flightService
      .find(this.filter.from, this.filter.to, this.filter.urgent)
      .subscribe((flights) => {

        this.flights = flights;

      });
  }

  delay(): void {
    const flight = this.flights[0];
    flight.date = addMinutes(flight.date, 15);
  }
}

import { AsyncPipe, JsonPipe, NgForOf, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  Flight,
  FlightService,
} from '../../data';
import { CityValidator, addMinutes } from 'src/app/shared/util-common';
import { FlightCardComponent } from '../../ui-common';

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
    CityValidator,
  ],
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
})
export class FlightSearchComponent {
  private flightService = inject(FlightService);

  from = 'Hamburg'; // in Germany
  to = 'Graz'; // in Austria
  flights: Flight[] = [];

  basket: { [id: number]: boolean } = {
    3: true,
    5: true,
  };

  search(): void {
    if (!this.from || !this.to) return;

    this.flightService
      .find(this.from, this.to)
      .subscribe((flights) => {

        this.flights = flights;

      });
  }

  delay(): void {
    const flight = this.flights[0];
    flight.date = addMinutes(flight.date, 15);
  }
}
